"use server";

import { connectToDatabase } from "..";
import { formatNumberWithCommas, handleError } from "@/lib/utils";
import Companies from "../models/company.model";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { CompanySignUpFormSchema } from "@/lib/zod/authZod";
import Users from "../models/users.model";
import { v4 as uuidv4 } from "uuid";
import { SettingsFormSchema } from "@/lib/zod";

export const createCompany = async (
  data: z.infer<typeof CompanySignUpFormSchema>
) => {
  try {
    await connectToDatabase();

    const validatedFields = CompanySignUpFormSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid credentials." };
    }

    const {
      name,
      email,
      password,
      size,
      industry,
      about,
      logo,
      twitter,
      facebook,
      linkedin,
      mail,
    } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 7);

    // Check for duplicate email or name
    const existingCompany = await Companies.findOne({
      $or: [{ email: email }, { company: name }],
    });

    if (existingCompany) {
      return { error: "Name or email already in use." };
    }

    // Format size with commas
    const formattedSize = formatNumberWithCommas(size);

    // Create a user or company id
    const userId = uuidv4();

    // Construct the company
    const company = {
      userId,
      company: name,
      email,
      about,
      password: hashedPassword,
      logo,
      industry,
      company_size: `${formattedSize}+ employees`,
      contact: [twitter, facebook, linkedin, mail],
      accountType: "company",
      provider: "credentials",
    };

    // Save company in all users collection and companies collection
    await Promise.all([
      Users.create({
        userId,
        name,
        email,
        password: hashedPassword,
        image: logo,
        accountType: "company",
        provider: "credentials",
      }),
      Companies.create(company),
    ]);

    console.log("Company created!");
  } catch (error: any) {
    handleError(error);
  }
};

export const getCompanies = async (page = 1, limit = 10) => {
  try {
    await connectToDatabase();

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    const companies = await Companies.find({})
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    // Get the total number of companies
    const companiesCount = await Companies.find({}).countDocuments();
    const totalPages = Math.ceil(companiesCount / limit);

    const companiesNoLimit = await Companies.find({});

    if (!companies) {
      throw new Error("Could not fetch companies.");
    }

    return {
      companies: JSON.parse(JSON.stringify(companies)),
      totalPages,
      companiesNoLimit: JSON.parse(JSON.stringify(companiesNoLimit)),
    };
  } catch (error: any) {
    handleError(error);
  }
};

export const getCompanyById = async (companyId: string) => {
  try {
    await connectToDatabase();
    const company = await Companies.findById(companyId);
    if (!company) {
      throw new Error("Company not found.");
    }
    return JSON.parse(JSON.stringify(company));
  } catch (error) {
    handleError(error);
  }
};

export const getCompanyByUserId = async (companyId: string) => {
  try {
    await connectToDatabase();
    const company = await Companies.findOne({ userId: companyId });
    if (!company) {
      throw new Error("Company not found.");
    }
    return JSON.parse(JSON.stringify(company));
  } catch (error) {
    handleError(error);
  }
};

export const getCompanyByName = async (companyName: string) => {
  try {
    await connectToDatabase();
    const company = await Companies.findOne({ company: companyName });
    if (!company) {
      throw new Error("Company not found.");
    }
    return JSON.parse(JSON.stringify(company));
  } catch (error) {
    handleError(error);
  }
};

export const getCompaniesByIndustry = async (industry: string) => {
  try {
    await connectToDatabase();

    const companies = await Companies.find({ industry: { $in: [industry] } });

    if (!companies) {
      throw new Error("Companies not found.");
    }

    return JSON.parse(JSON.stringify(companies));
  } catch (error) {
    handleError(error);
  }
};

export const getArrayPropertyValuesFrequency = async (arrayField: string) => {
  try {
    await connectToDatabase();

    const result = await Companies.aggregate([
      { $unwind: `$${arrayField}` },
      {
        $group: {
          _id: `$${arrayField}`,
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    if (!result) {
      throw new Error("Could not get property values frequency.");
    }

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
};

export const handleCompanyFilter = async (
  industryFilter: string[],
  search?: string[],
  page = 1,
  limit = 10
) => {
  try {
    await connectToDatabase();

    // Build the query object based on the provided filters
    const query: any = {};

    if (industryFilter && industryFilter.length > 0) {
      query.industry = { $in: industryFilter };
    }

    if (search && search.length > 0) {
      const [value1] = search;

      // Make a search pattern using special rules that ensure each word is included in the text.
      let companyNameString = value1.split(/\s+/);
      let pattern = companyNameString
        .map((string) => `(?=.*${string})`)
        .join("");

      query.$or = [
        {
          company: {
            $regex: pattern,
            $options: "i",
          },
        },
        {
          industry: {
            $regex: pattern,
            $options: "i",
          },
        },
      ];
    }

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    // Perform the query to filter documents
    const companies = await Companies.find(query)
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    const companiesNoLimit = await Companies.find({});

    // Get the total number of companies
    const companiesCount = await Companies.find(query).countDocuments();
    const totalPages = Math.ceil(companiesCount / limit);

    if (!companies) {
      throw new Error("Could not filter companies.");
    }

    return {
      companies: JSON.parse(JSON.stringify(companies)),
      totalPages,
      companiesNoLimit: JSON.parse(JSON.stringify(companiesNoLimit)),
    };
  } catch (error) {
    handleError(error);
  }
};

export const updateCompany = async (
  data: z.infer<typeof SettingsFormSchema>,
  company: Company,
  industry: string[]
) => {
  const validatedFields = SettingsFormSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid credentials." };
  }

  let hashedPassword: string | undefined;

  if (data.currentPassword && data.newPassord && data.confirmPassword) {
    const passwordMatch = await bcrypt.compare(
      data.currentPassword,
      company.password
    );

    if (!passwordMatch)
      return { error: "Current password does not match user password." };

    if (data.newPassord === data.confirmPassword) {
      // Hash new password
      hashedPassword = await bcrypt.hash(data.confirmPassword, 7);
    } else {
      return { error: "Passwords do not match." };
    }
  }

  // Format size with commas
  const formattedSize = formatNumberWithCommas(data.company_size);

  try {
    await connectToDatabase();

    // Fields to update
    const updateFields: {
      company: string | undefined;
      email: string | undefined;
      password: string | undefined;
      logo: string | undefined;
      company_size: string | undefined;
      about: string | undefined;
      industry: string[] | undefined;
      contact: string[] | undefined;
    } = {
      company: data.name,
      email: data.email,
      password: hashedPassword ?? company.password,
      logo: data.image,
      company_size: `${formattedSize}+ employees`,
      about: data.about,
      industry: industry,
      contact: [data.twitter, data.facebook, data.linkedin, data.mail],
    };

    // Save company in all users collection and company collection
    const updatedCompany = await Promise.all([
      Companies.updateOne({ userId: company.userId }, { $set: updateFields }),
      Users.updateOne({ userId: company.userId }, { $set: updateFields }),
    ]);

    return JSON.parse(JSON.stringify(updatedCompany));
  } catch (error) {
    handleError(error);
  }
};

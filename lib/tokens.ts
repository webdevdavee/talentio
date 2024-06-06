// import { getVerificationTokenByEmail } from "@/database/actions/verificationtoken.actions";
// import { v4 as uuidv4 } from "uuid";
// import VerificationToken from "@/database/models/verificationtoken.model";

// export const generateVerificationToken = async (email: string) => {
//   const token = uuidv4();
//   // Calculate expiration date one hour from now
//   const expires = new Date(new Date().getTime() + 3600 * 1000);

//   const existingToken = await getVerificationTokenByEmail(email);
//   if (existingToken) {
//     await VerificationToken.deleteOne({ _id: existingToken._id });
//   }

//   const verificationToken = await VerificationToken.create({
//     email,
//     token,
//     expires,
//   });

//   return verificationToken;
// };

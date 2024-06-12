// Handle error
export const handleError = (error: any) => {
  console.error(error);
  throw new Error(error.message);
};

// Create URL
import { ReadonlyURLSearchParams } from "next/navigation";
export const createURL = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramString = params.toString();
  const queryString = `${paramString.length ? "?" : ""}${paramString}`;
  return `${pathname}${queryString}`;
};

// This function counts the occurrences of each value for a given property in an array of data.
export const countPropertyValues = (
  data: Job[] | Company[] | undefined,
  property: string
) => {
  const countMap: Record<string, number> = {};

  // Updated incrementCount function to handle string arrays.
  const incrementCount = (value: string | string[]) => {
    if (Array.isArray(value)) {
      // If the value is an array, increment the count for each string in the array.
      value.forEach((val) => {
        countMap[val] = (countMap[val] || 0) + 1;
      });
    } else {
      // If the value is a string, increment its count.
      countMap[value] = (countMap[value] || 0) + 1;
    }
  };

  const countValueOccurrences = (obj: any, propName: string) => {
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !(obj[key] instanceof Array)
      ) {
        countValueOccurrences(obj[key], propName);
      } else if (key === propName) {
        incrementCount(obj[key]);
      }
    }
  };

  data?.forEach((d) => countValueOccurrences(d, property));

  return Object.entries(countMap).map(([_id, count]) => ({ _id, count }));
};

// Convert a file to url
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// Format file size

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  else if (bytes < 1024 * 1024 * 1024)
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";
};

// Custom password validation function
export const validatePassword = (password: string) => {
  // Define your password validation rules here
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-\\/]/.test(password);

  // Check if all conditions are met
  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
};

// Format numbers with commas
export const formatNumberWithCommas = (number: string) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Check if the string is a valid URL
export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Utility function to convert date format
export const convertDateFormat = (dateString: string | Date) => {
  // Create a new Date object from the given string
  let date = new Date(dateString);

  // Get the day of the month (1-31)
  let day = date.getDate();

  // Get the month (0-11) and add 1 to get the correct number (1-12)
  let month = date.getMonth() + 1;

  // Get the full year (four digits)
  let year = date.getFullYear();

  // Add ordinal suffix to the day (st, nd, rd, or th)
  let ordinal = "";
  if (day % 10 == 1 && day != 11) {
    ordinal = "st";
  } else if (day % 10 == 2 && day != 12) {
    ordinal = "nd";
  } else if (day % 10 == 3 && day != 13) {
    ordinal = "rd";
  } else {
    ordinal = "th";
  }

  // Create an array of month names
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the name of the month from the array
  let monthName = monthNames[month - 1];

  // Concatenate the day, month name, and year with spaces
  let formattedDate = day + ordinal + " " + monthName + ", " + year;

  // Return the formatted date
  return formattedDate;
};

export const sortArray = (array: any[], property: string, order: string) => {
  const sortedArray = [...array].sort((a, b) => {
    if (typeof a[property] === "string") {
      return order === "asc"
        ? a[property].localeCompare(b[property])
        : b[property].localeCompare(a[property]);
    } else {
      return order === "asc"
        ? a[property] - b[property]
        : b[property] - a[property];
    }
  });
  return sortedArray;
};

// Sort string like this: $70,000 - $85,000
export const sortSalaryRanges = (
  salaries: any[],
  property: string,
  order: string
) => {
  const extractMinSalary = (salaryRange: string): number => {
    const [minSalary] = salaryRange.match(/\$\d+(?:,\d{3})*/g) || [""];
    return parseInt(minSalary.replace(/[^\d]/g, ""), 10);
  };

  const sortedSalaries = [...salaries].sort((a, b) => {
    const minSalaryA = extractMinSalary(a[property]);
    const minSalaryB = extractMinSalary(b[property]);

    return order === "asc" ? minSalaryA - minSalaryB : minSalaryB - minSalaryA;
  });

  return sortedSalaries;
};

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

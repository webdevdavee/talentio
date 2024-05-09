// Handle error
export const handleError = (error: unknown) => {
  console.log(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
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

// This function counts the occurrences of each value for a given property in an array of jobs.
export const countPropertyValues = (
  jobs: Job[] | undefined,
  property: string
) => {
  // Create a map to keep track of the count of each property value.
  const countMap: Record<string, number> = {};

  // This function increases the count for a given value in the countMap.
  const incrementCount = (value: string) => {
    if (countMap[value]) {
      // If the value already exists, increment its count.
      countMap[value]++;
    } else {
      // If the value doesn't exist, initialize it with a count of 1.
      countMap[value] = 1;
    }
  };

  // This function recursively goes through each property of an object.
  // If the property matches the one we're looking for, it calls incrementCount.
  const countValueOccurrences = (obj: any, propName: string) => {
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !(obj[key] instanceof Array)
      ) {
        // If the property is an object (not an array), recursively count its properties.
        countValueOccurrences(obj[key], propName);
      } else if (key === propName) {
        // If the property is the one we're looking for, increment its count.
        incrementCount(obj[key]);
      }
    }
  };

  // Iterate over each job and count the occurrences of the property value.
  jobs?.forEach((job) => countValueOccurrences(job, property));

  // Convert the countMap to an array of CountResult objects.
  return Object.entries(countMap).map(([_id, count]) => ({ _id, count }));
};

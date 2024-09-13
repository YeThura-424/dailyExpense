export const toTitleCase = (str) => {
  return str
    .split("_") // Split by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
    .join(" "); // Join words with spaces
};

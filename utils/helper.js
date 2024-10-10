export const toTitleCase = (str) => {
  return str
    .split("_") // Split by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
    .join(" "); // Join words with spaces
};

export const getPreviousMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const previousMonths = [];
  for (let i = 0; i <= currentMonth; i++) {
    previousMonths.push({
      id: i + 1,
      name: new Date(currentDate.getFullYear(), i).toLocaleString('default', { month: 'long' }),
      value: i
    })
  }

  return previousMonths;
}

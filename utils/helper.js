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
      name: new Date(currentDate.getFullYear(), i).toLocaleString("default", {
        month: "long",
      }),
      value: i,
    });
  }

  return previousMonths;
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return;
  }
  const parts = dateString.split(" ")[0].split("-");
  return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
};

export const isSameDate = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const dayToName = (rawDate) => {
  const formattedDate = rawDate.split("T")[0];
  const date = new Date(formattedDate);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDate(date, today)) return "Today";
  if (isSameDate(date, yesterday)) return "Yesterday";
  return formattedDate;
};

export const dateLocalString = (rawDate) => {
  const [datePart, timePart, period] = rawDate.split(" ");
  const [day, month, year] = datePart.split("-");
  let [hour, minute, second] = timePart.split(":");

  if (period.toLowerCase() === "pm" && hour !== "12") {
    hour = parseInt(hour, 10) + 12;
  } else if (period.toLowerCase() === "am" && hour === "12") {
    hour = "00";
  }

  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // Format the date
  return date.toLocaleString("en-GB", options);
};

export const getCurrency = () => {
  const profile = useCookie("profile");
  let userCurrency = profile?.value?.currency ?? "ks";
  const currency = {
    ks: "Ks",
    usd: "$",
    baht: "B",
  };

  return currency[userCurrency] ?? "Ks";
};

export const formatAmount = (amount) => {
  let currency = new Intl.NumberFormat();

  return `${getCurrency()} ${currency.format(amount)}`;
};

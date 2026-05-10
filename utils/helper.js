export const toTitleCase = (str) => {
  return str
    .split("_") // Split by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
    .join(" "); // Join words with spaces
};

export const getPreviousMonth = (year) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const previousMonths = [];

  const isPastYear = year !== currentYear;
  if (isPastYear) {
    for (let i = 0; i < 12; i++) {
      previousMonths.push({
        id: i + 1,
        name: new Date(2024, i).toLocaleString("default", {
          month: "long",
        }),
        value: i + 1,
      });
    }
  } else {
    for (let i = 0; i <= currentMonth; i++) {
      previousMonths.push({
        id: i + 1,
        name: new Date(2024, i).toLocaleString("default", {
          month: "long",
        }),
        value: i + 1,
      });
    }
  }

  return previousMonths;
};

export const getPreviousYear = (minYear) => {
  const today = new Date();

  const currentYear = today.getFullYear(); //2025

  let previousYear = minYear; //2023

  const years = [];
  let i = 1;
  do {
    years.push({
      id: i + 1,
      name: previousYear,
      value: previousYear,
    });
    previousYear++;
    i++;
  } while (previousYear <= currentYear);

  return years;
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return;
  }

  return dateString.split("T")[0];
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
  const date = new Date(rawDate);

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

  if (!amount || amount < 0) return `${getCurrency()} - 0`;

  return `${getCurrency()} ${currency.format(amount)}`;
};

export const getDateByMonth = (month) => {
  const today = new Date();
  const newDate = new Date(today.getFullYear(), month, today.getDate());

  return newDate.toISOString();
};

export const debugLog = (message, data) => {
  console.log(message, data);
  throw new Error("Debug Logging ...");
};

export const isOnline = () => {
  if (process.client) {
    console.log(
      "Initially " + (window.navigator.onLine ? "on" : "off") + "line"
    );

    return window.navigator.onLine;
  }
};

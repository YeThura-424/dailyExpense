import { createClient } from "@supabase/supabase-js";

const categories = [
  { name: "Rent", type: "expense", is_default: true },
  { name: "Transportation", type: "expense", is_default: true },
  { name: "Food & Drink", type: "expense", is_default: true },
  { name: "Skincare", type: "expense", is_default: true },
  { name: "Health Care", type: "expense", is_default: true },
  { name: "Body Care", type: "expense", is_default: true },
  { name: "Gift", type: "expense", is_default: true },
  { name: "Donation", type: "expense", is_default: true },
  { name: "Grocery", type: "expense", is_default: true },
  { name: "Clothing & Accessories", type: "expense", is_default: true },
  { name: "Salary", type: "income", is_default: true },
  { name: "Bonus", type: "income", is_default: true },
  { name: "Sales", type: "income", is_default: true },
];

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

const { error } = await supabase.from("categories").insert(categories);

if (error) {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`
  );
  process.exit(1);
}

console.log("Categories seeded successfully.");

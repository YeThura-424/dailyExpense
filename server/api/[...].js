import { useCookie } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const token = useCookie("token");
  const paramPath = event.contex.params._;
  const method = event.req.method;
  let body = null;
  if (event.req.method === "POST") {
    body = await readBody(event);
  }

  console.log("▼ method ▼", event.req.method);
  console.log("▼ req ▼", body);
  const { data } = await $fetch(`http://localhost:8000/api/${paramPath}`, {
    method: method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
      "x-api-token": "4fGh9Kj7Lm1Nq2RzXw8T",
    },
    body: body,
  });

  return data;
});

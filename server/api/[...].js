export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const paramPath = event.context.params._;
  let body = null;
  if (method === "POST") {
    body = await readBody(event);
  }

  const token = getCookie(event, "token");
  const { data } = await $fetch(`http://localhost:8000/api/${paramPath}`, {
    method: method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-token": "4fGh9Kj7Lm1Nq2RzXw8T",
    },
    body: body,
  });
  return data;
});

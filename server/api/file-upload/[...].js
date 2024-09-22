export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const method = event.req.method;
  const paramPath = event.context.params._;
  const formData = await readFormData(event);

  let query = "";
  let split = "";

  if (event.req.url.includes("?")) {
    split = event.req.url.split("?");
    query = split[1];
  }
  const token = getCookie(event, "token");
  const data = await $fetch(`${config.public.url}/api/${paramPath}`, {
    method: method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-token": "4fGh9Kj7Lm1Nq2RzXw8T",
    },
    body: formData,
  });
  return { data };
});

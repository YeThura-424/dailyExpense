export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const method = event.req.method;
  const paramPath = event.context.params._;
  let body = null;
  if (method === "POST") {
    body = await readBody(event);
  }

  let query = "";
  let split = "";

  if (event.req.url.includes("?")) {
    split = event.req.url.split("?");
    query = split[1];
  }
  const token = getCookie(event, "token");
  const response = await $fetch(
    `${config.public.url}/api/${paramPath}?${query}`,
    {
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-token": config.apiSecret,
      },
      body: body,
    }
  );
  let data = null;

  if (response.hasOwnProperty("json")) {
    data = await response.json();
  } else {
    data = response;
  }

  return { data };
});

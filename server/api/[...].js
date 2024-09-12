export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const params = event.context.params._;
  const method = event._method;
  const { data } = await $fetch(`http://localhost:8000/api/${params}`, {
    method: "GET",
    body: body,
  });

  return data;
});

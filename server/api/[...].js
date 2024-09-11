export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const params = event.context.params;
  console.log(params, "server");
  const method = event._method;
  const { data } = await $fetch(`http://localhost:8000/api/${params}`, {
    method: method,
    body: body,
  });

  return data;
});

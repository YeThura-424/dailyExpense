import { backendRequest } from '../../utils/backend';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const paramPath = event.context.params._;
  const formData = await readFormData(event);

  const data = await backendRequest(event, paramPath, {
    method,
    query: getQuery(event),
    body: formData,
  });

  return { data };
});

import { showError } from '#app';

export const compactQuery = (payload = {}) => Object.fromEntries(
  Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== '')
);

export const transactionPayload = (payload) => ({
  categoryId: String(payload.categoryId),
  walletId: String(payload.walletId),
  description: payload.description,
  amount: Number(payload.amount),
  type: payload.type,
  action_date: new Date(payload.action_date).toISOString(),
});

export const budgetPayload = (payload) => ({
  title: payload.title,
  categoryIds: (payload.categoryIds || payload.category || (payload.categoryId ? [payload.categoryId] : [])).map(category => String(category.id ?? category)),
  total: Number(payload.total),
  alert: payload.alert ?? false,
  alertPercent: Number(payload.alertPercent ?? 0),
});

export const exportQuery = (payload = {}) => compactQuery({
  range: payload.range,
  ...(payload.range === 'day' ? {
    from_date: payload.from_date ? new Date(payload.from_date).toISOString().split('T')[0] : undefined,
    to_date: payload.to_date ? new Date(payload.to_date).toISOString().split('T')[0] : undefined,
  } : {}),
  ...(payload.range === 'month' ? { month: payload.month, year: payload.year } : {}),
  ...(payload.range === 'year' ? { year: payload.year } : {}),
});

// Keep the result shape expected by the existing pages.
export const apiResult = (data, error) => {
  // The server proxy keeps its original { data: backendResponse } envelope.
  const responseData = data?.value;
  const result = responseData?.success === undefined && typeof responseData?.data?.success === 'boolean'
    ? responseData.data
    : responseData;
  if (!error?.value && result?.success !== false) {
    if (result) return result;
  }
  const response = error?.value?.data;
  const details = response?.data || response || result || error?.value;
  const message = details?.message || details?.error || 'Unable to connect. Please try again.';
  const statusCode = Number(error?.value?.statusCode || error?.value?.status || result?.statusCode)
    || (error?.value || !result ? 503 : undefined);

  // Keep expected form/authentication errors inline; outages need a recovery page.
  if (statusCode >= 500) {
    showError({
      statusCode,
      statusMessage: 'Service unavailable',
      fatal: true,
      data: { kind: 'api' },
    });
  }

  return { success: false, error: message, message, statusCode };
};

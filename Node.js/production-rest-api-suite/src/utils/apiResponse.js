export const successResponse = ({ message, data = null, meta = null }) => ({
  success: true,
  message,
  ...(data !== null ? { data } : {}),
  ...(meta ? { meta } : {})
});

export const errorResponse = ({ message, errors = [] }) => ({
  success: false,
  message,
  errors
});

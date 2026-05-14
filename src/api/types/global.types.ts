/** When the backend wraps payloads as `{ success, message, data }`. */
export type ApiSuccess<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type ApiErrorBody = {
  success?: false;
  message?: string;
  error?: string;
};

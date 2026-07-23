import { AxiosError } from "axios";

interface ApiError {
  message?: string;
}

export function getApiErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ??
      error.message ??
      "Unexpected error."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error.";
}
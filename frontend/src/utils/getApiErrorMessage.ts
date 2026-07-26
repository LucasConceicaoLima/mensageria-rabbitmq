import { AxiosError } from "axios";

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
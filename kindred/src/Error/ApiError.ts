export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data
        ? String(data.message)
        : "Request failed";

    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}
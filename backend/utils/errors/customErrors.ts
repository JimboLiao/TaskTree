export class CustomError extends Error {
  public statusCode: number;
  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = "Not found") {
    super(message, "NotFoundError", 404);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = "Validation error") {
    super(message, "ValidationError", 400);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = "Bad request") {
    super(message, "BadRequestError", 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = "Unauthorized") {
    super(message, "UnauthorizedError", 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = "Forbidden") {
    super(message, "ForbiddenError", 403);
  }
}

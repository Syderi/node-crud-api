export const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export const enum StatusCodes {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500
}

export const enum ErrorMessage {
  NotFound = 'User not found',
  BadRequest = 'Bad Request',
  ServerError = 'Server Error',
  IncorrectRoute = 'Query not correctly',
  InvalidId = 'ID is not valid'
}

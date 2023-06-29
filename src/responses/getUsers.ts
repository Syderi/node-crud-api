import { ServerResponse } from "http";
import { validate } from "uuid";
import { ErrorMessage, StatusCodes } from "../types/enums";
import { IServerDataBase } from "../types/inteface";
import { sendErrorResponse } from "../utils/sendErrorResponse";

export const getUsers = (
  url: string,
  response: ServerResponse,
  SERVER_DATA_BASE: IServerDataBase
): void => {
  if (url === '/api/users') {
    try {
      response.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(SERVER_DATA_BASE));
    } catch (error) {
      sendErrorResponse(response, StatusCodes.InternalServerError, ErrorMessage.ServerError);
    }
  } else if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    const user = SERVER_DATA_BASE.find((i) => i.id === id);

    if (!id) {
      sendErrorResponse(response, StatusCodes.NotFound, ErrorMessage.NotFound);
    } else if (!validate(id)) {
      sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.InvalidId);
    } else if (!user) {
      sendErrorResponse(response, StatusCodes.NotFound, ErrorMessage.NotFound);
    } else {
      response.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(user));
    }
  } else {
    sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.IncorrectRoute);
  }
};


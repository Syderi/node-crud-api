import { IncomingMessage, ServerResponse } from "http";
import { changeUser } from "../responses/changeUser";
import { deleteUser } from "../responses/deleteUser";
import { getUsers } from "../responses/getUsers";
import { setUser } from "../responses/setUser";
import { ErrorMessage, Methods, StatusCodes } from "../types/enums";
import { IServerDataBase } from "../types/inteface";
import { sendErrorResponse } from "../utils/sendErrorResponse";


export const Routes = (request: IncomingMessage, response: ServerResponse, db: IServerDataBase) => {
  const { method, url } = request;

  switch (method) {
    case Methods.GET:
      if (url) getUsers(url, response, db);
      break;
    case Methods.POST:
      if (url) setUser(url, request, response, db);
      break;
    case Methods.PUT:
      if (url) changeUser(url, request, response, db);
      break;
    case Methods.DELETE:
      if (url) deleteUser(url, response, db);
      break;
    default:
      sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.IncorrectRoute);
  }
}

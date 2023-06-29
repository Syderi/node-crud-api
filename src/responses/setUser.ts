import { IncomingMessage, ServerResponse } from 'http';
import { v4 } from 'uuid';
import { checkJSON } from '../utils/checkJSON';
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { ErrorMessage, StatusCodes } from '../types/enums';
import { IServerDataBase, IUser } from '../types/inteface';

export const setUser = async (
  url: string,
  request: IncomingMessage,
  response: ServerResponse,
  SERVER_DATA_BASE: IServerDataBase

): Promise<void> => {
  if (url === '/api/users') {
    try {
      let data: IUser = await checkJSON(request, response);
      if (
        ['username', 'age', 'hobbies'].every((key) => data.hasOwnProperty(key)) &&
        Array.isArray(data.hobbies) &&
        data.username.trim().length > 0
      ) {
        sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.BadRequest);
      } else {
        const { username, age, hobbies } = data;
        const getUser: IUser = {
          id: v4(),
          username: username.trim(),
          age,
          hobbies,
        };

        response.writeHead(StatusCodes.Created, {
          'Content-Type': 'application/json',
        });
        SERVER_DATA_BASE.push(getUser);
        response.end(JSON.stringify(getUser));
      }
    } catch (error) {
      sendErrorResponse(response, StatusCodes.InternalServerError, ErrorMessage.ServerError);
    }
  } else {
    sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.IncorrectRoute);
  }
};

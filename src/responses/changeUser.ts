import { IncomingMessage, ServerResponse } from 'http';
import { checkJSON } from '../utils/checkJSON';
import { validate } from 'uuid';
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { ErrorMessage, StatusCodes } from '../types/enums';
import { IServerDataBase, IUser } from '../types/inteface';

export const changeUser = async (
  url: string,
  request: IncomingMessage,
  response: ServerResponse,
  SERVER_DATA_BASE: IServerDataBase
): Promise<void> => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    if (!id) {
      sendErrorResponse(response, StatusCodes.NotFound, ErrorMessage.NotFound);
    } else if (!validate(id)) {
      sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.InvalidId);
    } else if (!SERVER_DATA_BASE.find((i) => i.id === id)) {
      sendErrorResponse(response, StatusCodes.NotFound, ErrorMessage.NotFound);
    } else {
      try {
        const data: IUser = await checkJSON(request, response);

        if (
          ['username', 'age', 'hobbies'].every((key) => data.hasOwnProperty(key)) &&
          Array.isArray(data.hobbies) &&
          data.username.trim().length > 0
        ) {
          sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.BadRequest);
        } else {
          const { username, age, hobbies } = data;
          const correctUser: IUser = {
            id,
            username: username.trim(),
            age,
            hobbies,
          };

          const index = SERVER_DATA_BASE.findIndex((i) => i.id === id);
          SERVER_DATA_BASE[index] = correctUser;

          response.writeHead(StatusCodes.OK, {
            'Content-Type': 'application/json',
          });
          response.end(JSON.stringify(correctUser));
        }
      } catch (err) {
        sendErrorResponse(response, StatusCodes.InternalServerError, ErrorMessage.ServerError);
      }
    }
  } else {
    sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.IncorrectRoute);
  }
};

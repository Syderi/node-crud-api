import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { ErrorMessage, StatusCodes } from '../types/enums';
import { IServerDataBase } from '../types/inteface';
import { sendErrorResponse } from '../utils/sendErrorResponse';

export const deleteUser = (
  url: string,
  response: ServerResponse,
  SERVER_DATA_BASE: IServerDataBase
) => {
  if (url?.startsWith('/api/users/')) {
    const id = url.split('/')[3];
    try {
      const user = SERVER_DATA_BASE.find((i) => i.id === id);
      if (!id) {
        sendErrorResponse(response, StatusCodes.NotFound, ErrorMessage.NotFound);
      } else if (!validate(id)) {
        sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.InvalidId);
      } else if (!user) {
        sendErrorResponse(response, StatusCodes.NotFound, ErrorMessage.NotFound);
      } else {
        const deleteUser = SERVER_DATA_BASE.splice(parseInt(id) - 1, 1);
        response.writeHead(StatusCodes.NoContent, {
          'Content-Type': 'application/json',
        });
        response.end(JSON.stringify(deleteUser));
      }
    } catch (err) {
      sendErrorResponse(response, StatusCodes.InternalServerError, ErrorMessage.ServerError);
    }
  } else {
    sendErrorResponse(response, StatusCodes.BadRequest, ErrorMessage.IncorrectRoute);
  }
};














// import { ServerResponse } from 'http';
// import { DBtype } from '../types/IUser';
// import { StatusCodes } from '../types/StatusCodes';
// import { wrongRoute } from '../utils/wrongRoute';
// import { ErrorMessage } from '../types/ErrorMessage';
// import { validate } from 'uuid';

// export const deleteUser = (
//   url: string,
//   response: ServerResponse,
//   arr: DBtype
// ) => {
//   if (url?.startsWith('/api/users/')) {
//     const id = url.split('/')[3];
//     try {
//       const user = arr.find((i) => i.id === id);
//       if (!id) {
//         response.writeHead(StatusCodes.NotFound, {
//           'Content-Type': 'application/json',
//         });
//         response.end(JSON.stringify({ message: ErrorMessage.NotFound }));
//       }
//         else if (!validate(id)) {
//           response.writeHead(StatusCodes.BadRequest, {
//             'Content-Type': 'application/json',
//           });
//           response.end(JSON.stringify({ message: ErrorMessage.InvalidId }));
//         }
//       else if (!user) {
//         response.writeHead(StatusCodes.NotFound, {
//           'Content-Type': 'application/json',
//         });
//         response.end(JSON.stringify({ message: ErrorMessage.NotFound }));
//       } else {
//         const deleteUser = arr.splice(parseInt(id) - 1, 1);
//         response.writeHead(StatusCodes.NoContent, {
//           'Content-Type': 'application/json',
//         });
//         return response.end(JSON.stringify(deleteUser));
//       }
//     } catch (err) {
//       console.log(err);
//       response.writeHead(StatusCodes.InternalServerError, {
//         'Content-Type': 'application/json',
//       });
//       response.end(JSON.stringify({ message: ErrorMessage.ServerError }));
//     }
//   } else {
//     wrongRoute(response);
//   }
// };


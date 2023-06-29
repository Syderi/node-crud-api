import { ServerResponse } from "http";

export const sendErrorResponse = (
  response: ServerResponse,
  statusCode: number,
  message: string
): void => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message }));
};

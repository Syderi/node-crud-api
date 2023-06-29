import { IncomingMessage, ServerResponse } from "http";

export const Router = (request: IncomingMessage, response: ServerResponse,) => {
  response.end('<h1>HELLO<h1>')
}
import cluster from "cluster";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { cpus } from "os";
import { SERVER_PORT, SERVERS_PORT } from "../data/const";
import { Router } from "../router/router";
import 'dotenv/config';

import { IServerDataBase } from "../types/inteface";

let SERVER_DATA_BASE: IServerDataBase = [];

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  Router(request, response)
})

export const initServer = (): void => {
  server.listen(SERVER_PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}`);
  });
}

export const initServers = (): void => {
  if (cluster.isPrimary) {
    console.log(`Master start ${process.pid}`)
    cpus().forEach((_, i) => {
      const port = +SERVERS_PORT + i;
      cluster.fork({ SERVERS_PORT: port });
      cluster.on('message', async (worker, message) => {
        worker.send(message);
      });
    })
  }
  if (cluster.isWorker) {
    server.listen(process.env.SERVERS_PORT, () => console.log(`server started ${SERVERS_PORT}, Worker start ${process.pid}`))
    process.on('message', (message: IServerDataBase) => {
      SERVER_DATA_BASE = message
    })
  }
}

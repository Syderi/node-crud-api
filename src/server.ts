import { initServer, initServers } from './init_server/initServer'

const args = process.argv.slice(2)

args.length ? initServers() : initServer()
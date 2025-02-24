import { Server } from "@/lib/server";

const SAVED_SERVERS_INTERFACE_VERSION: number = 1;

interface SavedServers {
    version: number;
    servers: Server[];
}

export { type SavedServers, SAVED_SERVERS_INTERFACE_VERSION }
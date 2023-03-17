import { VisitorClient } from 'utils/grpc/clients/index.js';

import grpcServer from "./grpcServer.js";

export default class VisitorServer extends grpcServer
{
    constructor()
    {
        super(VisitorClient, { });
    }
};
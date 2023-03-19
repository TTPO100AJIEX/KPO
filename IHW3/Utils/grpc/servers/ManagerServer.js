import ManagerClient from 'utils/grpc/clients/ManagerClient.js';

import BaseServer from "./BaseServer.js";

export default class ManagerServer extends BaseServer
{
    constructor(port) { super(ManagerClient, port); }
};
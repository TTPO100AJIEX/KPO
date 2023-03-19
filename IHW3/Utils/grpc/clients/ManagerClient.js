import util from 'util';

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const options = { keepCase: true, includeDirs: [ `Utils/grpc/protobufs` ] };
const BaseManagerClient = grpc.loadPackageDefinition(protoLoader.loadSync(`manager.proto`, options)).manager;

export default class ManagerClient extends BaseManagerClient
{
    constructor(port)
    {
        super(`localhost:${port}`, grpc.credentials.createInsecure());
        for (const key in this) this[key] = util.promisify(this[key]);
    }
};
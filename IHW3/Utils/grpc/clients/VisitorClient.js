import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const options = { keepCase: true, includeDirs: [ `Utils/grpc/protobufs` ] };
const BaseVisitorClient = grpc.loadPackageDefinition(protoLoader.loadSync(`visitor.proto`, options)).visitor;

export default class VisitorClient extends BaseVisitorClient
{
    constructor()
    {
        super();
    }
};
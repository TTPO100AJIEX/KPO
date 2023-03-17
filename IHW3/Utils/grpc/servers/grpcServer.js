import grpc from '@grpc/grpc-js';

export default class grpcServer
{
    static #server = undefined;
    static #createServer()
    {
        if (grpcServer.#server) return;
        if (!process.argv[2]) throw 'Server port must be specified as the only command line argument';
        grpcServer.#server = new grpc.Server();
        grpcServer.#server.bindAsync(`localhost:${process.argv[2]}`, grpc.ServerCredentials.createInsecure(), () => {
            grpcServer.#server.start();
            console.log("Server started");
        });
    }

    constructor(clientClass, methods)
    {
        grpcServer.#createServer();
        grpcServer.#server.addService(clientClass.service, methods);
    }
};
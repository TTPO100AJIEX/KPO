import grpc from '@grpc/grpc-js';

export default class BaseServer extends grpc.Server
{
    constructor(clientClass, port)
    {
        super();
        this.bindAsync(`localhost:${port}`, grpc.ServerCredentials.createInsecure(), () => {
            const methods = Object.fromEntries(Object.keys(clientClass.service).map(methodName => [ methodName, this[methodName].bind(methodName) ]));
            this.addService(clientClass.service, methods);
            this.start();
            console.log("Server started");
        });
    }
};
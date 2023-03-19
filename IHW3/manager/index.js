import ManagerServer from "utils/grpc/servers/ManagerServer.js";

class Manager extends ManagerServer
{
    constructor(port) { super(port); }

    getMenu(data, callback)
    {
        callback(null, { data: "test" });
    }
};

const manager = new Manager(process.argv.at(-1));


// Multiple copies may exist
/*class Manager
{
    constructor() { }
    start() { }
    
    
        How it should work:
        1. All visitors are stored somewhere. They are divided into two groups:
            a. the first ones are waiting to get a menu
            b. the other ones are reading the menu and building their order
        2. When a visitor comes:
            a. He is placed in the first queue.
            b. If the menu is being requested, do nothing
            c. If the menu is not currently being requested, call the other agent for menu, but keep accepting new visitors and doing other job
        3. When a menu is received, give it to everybody in the first queue and empty the queue
        4. When an order is received from some visitor, TODO
    
    accept_visitor() { }
    give_menu() { }
    get_order() { }
};*/
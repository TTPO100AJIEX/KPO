import ManagerClient from 'utils/grpc/clients/ManagerClient.js';

class Visitor
{
    #manager;
    constructor(managerPort)
    {
        this.#manager = new ManagerClient(managerPort);
        this.#run();
    }
    async #run()
    {
        const menu = await this.#manager.getMenu({ });
        const chosen = this.#choose(menu);
        await this.#manager.placeOrder(chosen);
    }
    

    async #choose(menu)
    {
        return menu;
    }
};

const visitor = new Visitor(process.argv.at(-1));
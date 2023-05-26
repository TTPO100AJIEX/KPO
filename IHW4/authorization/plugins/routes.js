import fs from 'fs';
import path from 'path';

async function register(app, options)
{
    for (const filename of fs.readdirSync("authorization/routes"))
    {
        if (!fs.lstatSync(path.join("authorization/routes", filename)).isFile()) continue;
        const { default: module } = await import(path.join("../routes", filename));
        app.register(module);
    }
    await app.after();
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'routes', encapsulate: false });
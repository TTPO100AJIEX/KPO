import fs from 'fs';
import path from 'path';
import url from 'url';

async function register(app, options)
{
    const routesDirectory = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "../routes");
    for (const filename of fs.readdirSync(routesDirectory))
    {
        if (!fs.lstatSync(path.join(routesDirectory, filename)).isFile()) continue;
        const { default: module } = await import(path.join("../routes", filename));
        app.register(module);
    }
    await app.after();
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'routes', encapsulate: false });
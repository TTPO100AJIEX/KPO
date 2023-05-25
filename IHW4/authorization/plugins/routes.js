import fs from 'fs';
import path from 'path';

async function register(app, options)
{
    for (const filename of fs.readdirSync("authorization/routes"))
    {
        if (!fs.lstatSync(path.join("authorization/routes", filename)).isFile()) continue;
        const { default: routes } = await import(path.join("../routes", filename));
        for (const route of routes)
        {
            route.paths ??= [ ];
            if (route.path) route.paths.push(route.path);
            const { paths: _, ...routeCopy } = route;
            for (const path of route.paths)
            {
                routeCopy.url = path;
                app.route(routeCopy);
            }
        }
    }
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'routes', encapsulate: false });
import plugin from 'fastify-plugin';

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
async function register_routes(app, options)
{
    app.get('/favicon.ico', (req, res) => res.sendFile("favicon.ico", dirname(dirname(fileURLToPath(import.meta.url))) + '/static/images/favicon'));
    app.get('/apple-touch-icon.png', (req, res) => res.sendFile("apple-touch-icon.png", dirname(dirname(fileURLToPath(import.meta.url))) + '/static/images/favicon'));
    app.get('/robots.txt', (req, res) => res.sendFile("robots.txt", dirname(dirname(fileURLToPath(import.meta.url)))));
    app.get('/sitemap.xml', (req, res) => res.sendFile("sitemap.xml", dirname(dirname(fileURLToPath(import.meta.url)))));

    for (const filename of fs.readdirSync("website/routes"))
    {
        if (!fs.lstatSync(path.join("website/routes", filename)).isFile()) continue;
        const { default: routes } = await import(path.join("../routes", filename));
        for (const route of routes)
        {
            route.config ??= { };
            route.config.access ??= route.access;
            delete route.access;

            if ("paths" in route)
            {
                for (const path of route.paths)
                {
                    const { paths: _, ...routeCopy } = route;
                    routeCopy.path = path;
                    app.route(routeCopy);
                }
            }
            else
            {
                app.route(route);
            }
        }
    }
}

export default plugin(register_routes, {
    name: 'routes', encapsulate: false,
    decorators: { reply: [ "sendFile", "render", "error", "login", "logout" ] },
    dependencies: [ 'security', 'utility', 'other', 'request', 'response', 'oauth' ]
});
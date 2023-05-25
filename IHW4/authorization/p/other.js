import plugin from 'fastify-plugin';

import config from 'common/configs/config.js';

import fastify_cookie from "@fastify/cookie";

function register_other_plugins(app, options, done)
{
    /*----------------------------------COOKIE----------------------------------*/
    
    done();
}

export default plugin(register_other_plugins, { name: 'other', encapsulate: false });

async function register(app, options)
{
    app.post("/create", async function(req, res)
    {
        
    });
    
    app.get("/login", async function(req, res)
    {
        if (req.authorize()) res.logout();
    });
    
    app.get("/", async function(req, res)
    {
        
    });
    
    app.get("/logout", async function(req, res)
    {
        
    });
}
async function get_main(req, res) { return (await req.authorize()) ? res.redirect("/violations") : res.render("oauth.ejs"); }
function post_oauth(req, res) { return res.login(req.body.login, req.body.password); }
function get_logout(req, res) { return res.logout(); }

export default [
    { method: "GET", paths: [ "/", "/main" ], schema: GENERAL_SCHEMA, handler: get_main },
    { method: "POST", path: "/oauth", schema: OAUTH_SCHEMA, handler: post_oauth },
    { method: "GET", path: "/logout/v2", config: { access: [ "Заказчик", "Подрядчик", "Работник" ] }, schema: LOGOUT_SCHEMA, handler: get_logout },
]


import plugin from 'fastify-plugin';
export default plugin(register, { name: 'routes', encapsulate: false });
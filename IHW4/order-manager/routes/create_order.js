import { OrdersDatabase } from 'common/postgreSQL/postgreSQL.js';

async function register(app, options)
{
    const CREATE_ORDER_SCHEMA =
    {
        summary: "Create a new order",
        body:
        {
            type: "object",
            required: [ "dishes" ],
            additionalProperties: false,
            properties:
            {
                "dishes":
                {
                    type: "array",
                    minItems: 1,
                    items: 
                    {
                        type: "object",
                        required: [ "id", "amount" ],
                        additionalProperties: false,
                        properties:
                        {
                            "id": { $ref: "id" },
                            "amount": { type: "integer", minimum: 1 }
                        }
                    }
                },
                "special_requests": { type: "string", default: "None" }
            }
        },
        security: [ { cookieAuth: [ ] } ],
        response:
        {
            200:
            {
                id: { $ref: "id" }
            },
            default: { $ref: "http_error" }
        }
    };
    app.post("/create_order", { schema: CREATE_ORDER_SCHEMA, config: { access: [ 'CUSTOMER', 'CHEF', 'MANAGER' ] } }, async function(req, res)
    {
        const { id: orderId } = await OrdersDatabase.query(`INSERT INTO orders(user_id, special_requests) VALUES ($1, $2) RETURNING id`, [ req.authorization.id, req.body.special_requests ], { one_response: true });
        await OrdersDatabase.query(OrdersDatabase.format(`INSERT INTO order_dishes(order_id, dish_id, quantity) VALUES %L`, req.body.dishes.map(dish => [ orderId, dish.id, dish.amount ])));
        return res.send({ id: orderId });
    });
}

import plugin from 'fastify-plugin';
export default plugin(register, { name: 'routes', encapsulate: false });
import { OrdersDatabase } from "common/postgreSQL/postgreSQL.js";

async function handle_order()
{
    const { id } = await OrdersDatabase.query(`SELECT id FROM orders WHERE status = 'WAITING' LIMIT 1`, [ ], { one_response: true });
    if (id)
    {
        await OrdersDatabase.query(`UPDATE orders SET status = 'PROCESSING' WHERE id = $1`, [ id ]);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 10000 + 20000)); // 10 to 20 seconds processing
        if (Math.random() < 0.25) // 25% chance of failure
        {
            await OrdersDatabase.query(`UPDATE orders SET status = 'CANCELLED' WHERE id = $1`, [ id ]);
        }
        else
        {
            await OrdersDatabase.query(`UPDATE orders SET status = 'COMPLETED' WHERE id = $1`, [ id ]);
        }
    }
    setTimeout(handle_order, Math.random() * 30000 + 30000); // 30 to 60 seconds delay
}
handle_order();
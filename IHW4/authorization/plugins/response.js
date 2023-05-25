import config from "common/configs/config.json" assert { type: "json" };

import compress from "@fastify/compress";

async function register(app, options)
{
    /*----------------------------------COMPRESS----------------------------------*/
    await app.register(compress);


    /*----------------------------------ERROR----------------------------------*/
    function get_default_error_description(code)
    {
        switch(code)
        {
            case 200: return [ "Действие было выполнено успешно!", "Вы будете перенаправлены обратно в ближайшее время!" ];

            case 400: return [ "Запрос неверен!", "Повторите попытку!" ];
            case 401: return [ "Ошибка авторизации!", "Авторизуйтесь и повторите попытку!" ];
            case 402: return [ "Запрошенный ресурс доступен только после оплаты!", "Оплатите доступ к ресурсу и попробуйте снова!" ];
            case 403: return [ "У вас нет доступа к запрошенному ресурсу!", "Повторите попытку позже или обратитесь в поддержку!" ];
            case 404: return [ "Запрошенный ресурс не найден!", "Убедитесь, что указан верный адрес!" ];
            case 429: return [ "Вы отправляете слишком много запросов!", "Попробуйте позже!" ];

            case 500: return [ "Ошибка сервера!", "Повторите попытку позже или обратитесь в поддержку!" ];
            case 502: return [ "Ошибка взаимодействия!", "Повторите попытку позже или обратитесь в поддержку!" ];
            case 503: return [ "Сервер перегружен!", "Повторите попытку позже или обратитесь в поддержку!" ];
            case 504: return [ "Ошибка взаимодействия!", "Повторите попытку позже или обратитесь в поддержку!" ];
            case 508: return [ "Ошибка обработки запроса!", "Повторите попытку позже или обратитесь в поддержку!" ];

            default: return [ "Произошла неизвестная ошибка!", "Повторите попытку позже или обратитесь в поддержку!" ];
        }
    }
    app.decorateReply("error", function(code, description, opts)
    {
        if (!description) description = get_default_error_description(code);
        return this.status(isNaN(code) ? 500 : code).send({ error: ("join" in description) ? description.join('\n') : description });
    });
    app.setNotFoundHandler({ preHandler: app.rateLimit({ max: 25, timeWindow: 60000, ban: 40 }) }, (req, res) => res.error(404));
    app.setErrorHandler((error, req, res) =>
    {
        if (config.stage == "testing") console.error(error);
        res.error(error.statusCode ?? 500, [ "Ошибка сервера!", error.message ?? error ]);
    });
}

import plugin from 'fastify-plugin';
export default plugin(register, {
    name: 'response',
    decorators:
    {
        fastify: [ 'rateLimit' ]
    },
    dependencies: [ '@fastify/rate-limit' ],
    encapsulate: false
});
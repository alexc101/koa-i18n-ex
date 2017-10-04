const Router = require('koa-router');
const router = new Router();

async function testApi(ctx) {

/*    let locale = ctx.getLocaleFromHeader();
    ctx.i18n.setLocale(locale);*/

    console.log(ctx.i18n)

    console.log(ctx.i18n.__('Hello'))

    ctx.body = {
        status: 'success',
        message: ctx.i18n.__('Hello')
    };
}


module.exports = (router) => {
    router.get('/', testApi);
};
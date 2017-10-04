const Koa = require('koa');
const routes = require('./routes');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const convert = require('koa-convert')
const locale = require('koa-locale')
const i18n = require('koa-i18n')

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());
app.use(logger());
app.use(routes());

locale(app)

app.use(i18n(app, {
    directory: './locales',
    locales: [ 'fr', 'en', 'en-US', 'de'],
    extension: '.json',
    header: true,
    modes: [
        'header',               //  optional detect header      - `Accept-Language: zh-CN,zh;q=0.5`
    ]
}))

app.use(async (ctx, next) => {
    let locale = await ctx.getLocaleFromHeader();
    ctx.i18n.setLocale(locale);
})

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
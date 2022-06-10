import Koa from 'koa'
import resource from 'koa-static'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import path from 'path'
import routes from '#routes';
import dataFormatting from '#middleware/dataFormatting.js'
import errorHandler from '#middleware/errorHandler.js'
import db from '#db';
import config from './config.js';
import mkdir from '#utils/mkdir.js';

global.config = config;
// 初始化数据库
db.dbInit();
// 初始化资源目录
await mkdir('public/upload');
await mkdir('public/images');

const app = new Koa();

// 跨域
app.use(cors({
	origin(ctx) {
		// 请求域名
		const url = ctx.header.origin;
		// 白名单
		const whiteList = config.whiteList;
		// 白名单为空则不限制
		if(whiteList.length === 0) return '*';
		// 允许白名单中的域名跨域访问
		if(whiteList.includes(url)) return url;
	}
}));
app.use(logger());
app.use(resource(config.publicDir));
app.use(dataFormatting);
app.use(errorHandler);

app.use(koaBody({
	multipart: true, // 文件上传
	formidable: {
		uploadDir: path.resolve(config.uploadDir), // 文件上传存放目录
		maxFieldsSize: config.maxFileSize,	// 限制文件大小
		keepExtensions: true, // 保留后缀
	}
}))

app.use(routes.routes(), routes.allowedMethods());


app.listen(config.port);

console.log(`服务地址: http://localhost:${config.port}`);
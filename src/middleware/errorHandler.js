const errorHandler = async (ctx, next) => {
	try {

		ctx.error = (code, message) => {
      if (typeof code !== 'number') {
				message = code;
				code = 400;
			}
      ctx.throw(code, message || '服务器错误');
    };

		await next();
	} catch (error) {
		ctx.body = {
			status: error.status,
			message: error.message
		}
	}
}

export default errorHandler;
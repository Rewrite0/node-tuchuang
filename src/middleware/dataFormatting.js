const dataFormatting = async (ctx, next) => {

	ctx.success = (data) => {
		ctx.body = {
			code: 200,
			...data
		}
	}

	ctx.fail = (msg, code = 500) => {
		ctx.body = {
			msg,
			code
		}
	}

	await next();
};

export default dataFormatting;
const dataFormatting = async (ctx, next) => {

	ctx.success = (msg, data) => {
		ctx.body = {
			code: 200,
			data: {
				msg,
				...data
			}
		}
	}

	ctx.fail = (msg, code = 500) => {
		ctx.body = {
			code,
			msg
		}
	}

	await next();
};

export default dataFormatting;
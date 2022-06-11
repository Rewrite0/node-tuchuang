import db from '#db'

export const getFiles = async (ctx) => {
  const {
    page = 1,
    pageSize = 10
  } = ctx.query;

  const data = db.dbGet({page, pageSize});
  if(data.msg) {
    ctx.fail(data.msg)
  } else {
    ctx.success(data);
  }
}
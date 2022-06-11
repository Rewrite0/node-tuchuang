import db from '#db';

export const search = async (ctx) => {
  const {
    name
  } = ctx.query;

  const data = db.dbSearch(name);
  ctx.success(data);
}
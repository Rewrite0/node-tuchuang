import db from '#db'
import delFile from '#utils/delFile.js'

export const del = async (ctx) => {
  const {
    name
  } = ctx.query;

  const res = db.dbDel(name);

  if (res.changes === 0) {
    ctx.fail('删除失败, 请确认名字是否正确！')
  } else {
    await delFile(name);
    ctx.success({
      msg: '删除成功！',
      data: res
    })
  }
}
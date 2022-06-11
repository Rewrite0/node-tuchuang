import path from 'path';
import fs from 'fs/promises';
import db from '#db';

/**
 * 文件上传
 */
export const upload = async (ctx) => {
  if (!ctx.request.files.file) {
    ctx.fail('没有文件');
    return;
  }
  const file = ctx.request.files.file;
  const imageDir = path.resolve('./public/images');

  const filePath = file.path;
  const name = file.name;
  const newName = path.join(imageDir, name);
  // 上传时间的时间戳
  const date = new Date().getTime();
  const mime = file.type;

  // 查找是否有同名文件
  const res = db.dbSearch(name);
  if (res.length === 0) {
    // 插入数据库并重命名临时文件
    db.dbInsert({ name, date, mime });
    const err = await fs.rename(filePath, newName);
    if (err) throw err;
    ctx.success({
      msg: '上传完成',
      file: {
        name,
        date,
        mime
      }
    })
  } else {
    // 删除临时文件
    await fs.unlink(filePath);
    ctx.fail('文件名重复');
  }
}
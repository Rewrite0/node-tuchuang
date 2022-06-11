import path from 'path'
import fs from 'fs/promises'

/**
 * 删除图片目录下的文件
 * @param {String} name 文件名
 */
async function delFile(name) {
  const img = path.join(global.config.fileDir, name);
  await fs.unlink(img);
}

export default delFile;
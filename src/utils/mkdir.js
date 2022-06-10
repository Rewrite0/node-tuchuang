import fs from 'fs/promises';
import path from 'path'

/**
 * 检测目录是否存在,不存在则创建
 * @param {String} dir 目录路径
 * @param {function} callback 可选 => 回调函数
 */
async function mkdir(dir, callback) {
  try {
    await fs.stat(dir);
    if(typeof callback === 'function') callback();
  } catch (error) {
    const prevDir = path.dirname(dir);
    await mkdir(prevDir, async () => {
      await fs.mkdir(dir)
      if(typeof callback === 'function') callback();
    })
  }
}

export default mkdir;
import path from 'path'

export default {
  // 服务端口
  port: 3000,
  // 跨域访问白名单, 为空时不限制
  whiteList: [],
  // 静态文件目录
  publicDir: path.resolve('./public'),
  // 上传文件临时目录
  uploadDir: path.resolve('./public/upload'),
  // 上传文件最大大小
  maxFileSize: 100 * 1024 * 1024,
}
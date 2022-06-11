# node-tuchuang

这是一个使用 Node.js 编写的，基于koa2的一个简单的图床后端程序  

并使用sqlite存储数据

实现了一些基本的功能：
- 图片上传
- 图片删除
- 图片搜索
- 图片列表分页

# 部署

```
git clone https://github.com/Rewrite0/node-tuchuang.git --depth=1

# 安装依赖
cd node-tuchuang && yarn
```

# 使用

```
# 启动
yarn start

# 重启
yarn restart

# 停止
yarn stop

# 日志 (也可直接查看logs目录下的文件)
yarn logs

# 停止pm2
yarn kill
```
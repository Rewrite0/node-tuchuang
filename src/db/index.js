import Database from 'better-sqlite3';
import fs from 'fs';

/**
 * 创建一个新数据库连接, 如果数据库文件不存在则创建
 * @returns 数据库连接
 */
const openDb = (options) => {
	return new Database('database.sqlite', options)
}

/**
 * 初始化数据库
 */
const dbInit = () => {
	fs.stat('database.sqlite', (err, stat) => {
		if (!(stat && stat.isFile())) {
			console.log('初始化数据库')
			const db = openDb();
			db.prepare(`CREATE TABLE images(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, date VARCHAR, mime VARCHAR)`).run();
			db.close();
			console.log('初始化完成')
		}
	})
}

/**
 * 获取所有数据
 * @param {Object} param => {page: String, pageSize: String}, 可选参数,用于分页
 */
const dbGet = ({ page = 1, pageSize = 10 }) => {
	const db = openDb();

	const count = db.prepare(`SELECT count(*) as res FROM images;`).all();
	// 计算总页数,向上取整
	const pageNum = Math.ceil(count[0].res / pageSize);
	// limit: 起始位, 限制数量
	let limit = `${(page - 1) * pageSize}, ${pageSize}`;

	const res = db.prepare(`SELECT * FROM images limit ${limit};`)
	db.close();

	if (res.length === 0) {
		throw '没有数据!'
	} else if (page > pageNum) {
		throw '超过总页码!'
	}

	return {
		images: res,
		paging: {
			page,
			pageSize,
			pageNum
		}
	};
}

/**
 * 插入数据
 * @param {Object} param => {name: String, date: String, mime: String}
 * @returns 返回插入结果
 */
const dbInsert = ({ name, date, mime }) => {
	const db = openDb();
	const res = db.prepare(`INSERT INTO images VALUES (null, '${name}', '${date}', '${mime}');`).run();
	db.close();
	return res;
}

/**
 * 根据name删除数据
 * @param {String} name => 文件名称
 * @returns 删除结果
 */
const dbDel = (name) => {
	const db = openDb();
	const res = db.prepare(`DELETE FROM images WHERE name = '${name}';`).run();
	db.close();
	return res;
}

/**
 * 根据name查找数据, 模糊查找
 * @param {String} name => 搜索文本
 * @returns 搜索结果
 */
const dbSearch = (name) => {
	const db = openDb();
	const res = db.prepare(`SELECT * FROM images WHERE name like '%${name}%';`).all();
	db.close();
	return res;
}

export default {
	openDb,
	dbInit,
	dbGet,
	dbInsert,
	dbDel,
	dbSearch
}
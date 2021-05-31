/**
 * 依赖收集 发布 类
 * 
 * */

let _id = 0;
export default class Dep {
	constructor() {
		this._id = _id ++; // 唯一 id
		this.subs = []; // 依赖数组
	}
	// 收集依赖
	addSub(sub) {
		this.subs.push(sub);
	}
	// 依赖
	depend() {
		console.log('收集-----------')
		if (Dep.target) {
			this.addSub(Dep.target);
		}
	}
	// 通知 发布
	notify() {
		const subs = this.subs.slice();
		console.log('发布通知', subs);
		subs.forEach(item => {
			item.update();
		});
	}
}
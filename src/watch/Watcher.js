/**
 * 观察依赖
 * */

import Dep from './Dep';
import {parsePath} from './utils'

let _id = 0
export default class Watcher {
	constructor(data, expression, callback) {
		this._id = _id ++;
		this.target = data;
		this.getter = parsePath(expression);
    	this.callback = callback
		this.value = this.get();
	}	
	get() { // 获取到要监控字段的值 // 处于收集阶段时执行
	   Dep.target = this; // 将Dep的静态属性 target 设置为 Wather 的实例对象 在Dep要收集依赖时直接收集 Dep.target
	   let val;
	   try {
	   	val = this.getter(this.target);
	   } finally {
	   	Dep.target = null;
	   }

	   return val
	}
	update() { // 更新函数 当Dep发布时触发 用于更新数据 视图（DOM）
		this.getAndInvoke(this.callback);
	}
	getAndInvoke(cb) { // 获取 更新值 与 旧值 最后调用回调函数
		const val = this.get();
		const oldVal = this.value;
		if(val !== oldVal || typeof val === 'object') {
			cb.call(this, val, oldVal);
		}
	}
}






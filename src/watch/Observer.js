/*
	数据检测
	生成__ob__ 放到data上
*/

import { def } from './utils';
import defineReactive from './defineReactive';
import {arrayMethods} from './array';
import observe from './observe';
import Dep from './Dep';

export default class Observer {
	constructor(data) {
		this.dep = new Dep();
		// 在数据上生成 __ob__
		def(data, '__ob__', this, false);
		// 循环监听
		if (Array.isArray(data)) { //如果是数组的话要改写原型
			Object.setPrototypeOf(data, arrayMethods);
			this.forArr(data);
		} else {
			this.walk(data);
		}
	}
	walk(data) { // 循环
		for(let key in data) {
			defineReactive(data, key);
		}
	}
	forArr(arr) { // 数组侦测
		for (let i = 0, len = arr.length; i < len; i++) {
			observe(arr[i]);
		}
	}
}
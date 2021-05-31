/**
 * 数据侦听函数 
 * 
 */
import observe from './observe';
import Dep from './Dep';

export default function defineReactive(data, key, val) {
	if (val === undefined) {
		val = data[key];
	}
	let co = observe(val)
	const dep = new Dep()
	Object.defineProperty(data, key, {
		// 可枚举
    	enumerable: true,
    	// 可以被配置，比如可以被delete
    	configurable: true,
    	get() {
    		console.log('要看一下 ' + key);
    		if(Dep.target) { // target 有值说明处于收集阶段
    			dep.depend();
    			if (co && Array.isArray(val)) {
    				co.dep.depend();
    			}
    		}
    		return val
    	},
    	set(newVal) {
    		console.log('修改一下 ' + key);
    		if(newVal === val) {
    			return
    		}
    		val = newVal;
    		observe(newVal);
    		// 更新数据
    		dep.notify();
    	}

	})
}
/*
 * 检测data是否是响应式 
 * __ob__为是否是响应式的标记
 */

import Observer from './Observer'

export default function observe(data) {
	// 如果data不是引用值 则什么都不做
	if (typeof data !== 'object') return
	let ob = data.__ob__
	if (!ob) { // __ob__ 不存在则生成一个
		ob = new Observer(data)
	}
	return ob
}
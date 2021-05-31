/**
 * 工具函数 集
 * */

export function def(data, key, val, enumerable) { // 在对象中 添加不可枚举的项
	Object.defineProperty(data, key, {
		value: val, // 值
    	enumerable, // 可枚举
    	writable: true, // 可写
    	configurable: true // 可配置（删除）
	})
}

export function parsePath(str) {	// 解析 . 语法
  var segments = str.split('.');
  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
/**
 * 由于数组 不能 arr[i] = xxx 来侦测
 * 只能改写数组的方法
 * 这里的方法主要是改变原数组的方法
 * 侦测数组
 * 
 * */
 import {def} from './utils';
// 保存原来的 数组原型
const arrayProto = Array.prototype;

// 创建新的 原型方法
export const arrayMethods = Object.create(arrayProto);

// 要改写的数组方法
const arrayMethodsList = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'reverse',
  'splice'
];

arrayMethodsList.forEach(item => {
  // 保存原始的方法
  const originMet = arrayProto[item];
  def(arrayMethods, item, function() {
    console.log('数组方法', this);
    // 将ob声明一下
    const ob = this.__ob__;
    // 调用时将 this 改变一下
    originMet.apply(this, arguments);
    // push shift splice  这几个方法有些不同 都有新加入的项 新的项也要侦听起来
    let newItem;
    switch(item) {
      case 'push':
      case 'shift':
        newItem = Array.prototype.slice.call(arguments, 0);
        break;
      case 'splice':
        newItem = Array.prototype.slice.call(arguments, 2);
        break;
    }

    // 这时触发数据更新
    ob.dep.notify();

    // 新项监听
    if(newItem) {
      ob.forArr(newItem);
    }
  }, false);
});



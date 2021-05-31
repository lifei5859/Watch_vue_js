import observe from './watch/observe';
import Watcher from './watch/Watcher';
const data = {
	a: 11,
	b: 12,
	c: {
		d: 22,
		n: {

		}
	},
	d: [
		{a: '2'},
		{a: '2'},
		{a: '2'},
		{a: '2'},
		{a: 'a'}
	]
}

observe(data)
new Watcher(data, 'a', function(val, oldVal) {
	console.log('new Watcher', val, oldVal);
})
new Watcher(data, 'd', function(val, oldVal) {
	console.log('new Watcher', val[5], oldVal);
})
console.log(data.a)
data.a = 44
console.log(data.a)
console.log(data.c.d)
data.c.d = 'pppp'
data.d.push({a: 'ppp'})
console.log(data)
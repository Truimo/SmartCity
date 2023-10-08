export default {
	url: uni.getStorageSync("url") || "http://124.93.196.45:10001",
	data: null,
	req(op = {}) {
		return new Promise((rs, rc) => {
			uni.request({
				url: this.url + op.url,
				method: op.method || 'GET',
				data: op.data,
				header: op.header,
				success: res => {
					rs(res.data)
				},
				fail: (e) => {
					rc(e)
				}
			});
		})
	},
	geturl() {
		this.url = uni.getStorageSync("url")
	},
	h(url, method, data = {}, op = {}) {
		// console.log(url);
		op.url = url
		op.method = method
		op.data = data
		op.header = {
			Authorization: uni.getStorageSync("token")
		}
		return this.req(op)
	},
	hs(url, method, data = {}, op = {}) {
		op.url = url
		op.method = method
		op.data = data
		return this.req(op)
	}
	// ,
	// getDate() {
	// 	let temp = new Date()
	// 	let month = temp.getMonth() + 1
	// 	this.data = temp.getFullYear() + "-" + month + "-" + temp.getDate() + " " + temp
	// 		.getHours() + ":" + temp.getMinutes()
	// 	return this.data
	// }
}
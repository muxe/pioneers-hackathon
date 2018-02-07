import axios from 'axios'

const baseUrl = 'http://172.16.3.201:4001'

export default {
	getMarket () {
		return axios.get(baseUrl + '/market')
	},
	postDemand (data) {
		return axios.post(baseUrl + '/market/demand', data)
	},
	postOffer (data) {
		return axios.post(baseUrl + '/market/offer', data)
	}
}

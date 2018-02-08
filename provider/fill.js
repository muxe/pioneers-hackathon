const moment = require('moment')
const axios = require('axios')

const baseUrl = 'http://172.16.3.201:4001'

let maxItems = 10
let fromDate = moment().unix()
let toDate = fromDate + 604800

let cities = ['Berlin', 'Munich', 'Cologne', 'Paris']

let getRandomCity = function (exception) {
	let chosen = cities[Math.floor(Math.random()*cities.length)]
	if (chosen === exception) {
		chosen = getRandomCity(exception)
	}
	return chosen
}

let getRandom = function (min, max) {
	return Math.floor(Math.random()*(max-min+1)+min)
}

let insert = function () {
	let from = getRandomCity()
	let to = getRandomCity(from)
	let toInsert = {
		'price': getRandom(10, 200),
		"date": getRandom(fromDate, toDate),
		"capacity": getRandom(1, 300),
		"travel_time": getRandom(1, 15),
		"from": from,
		"to": to
	}
	
	axios.post(baseUrl + '/market/offer', toInsert)
		.then((response) => {
			console.log('ok')
		})
		.catch((error) => {
			console.log(error);
		})

	setTimeout(() => {
		insert()
	}, 3000)
}

insert()

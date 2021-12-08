export class http {
	static HEADERS = { 'Content-Type': 'application/json' }
	static async get(url) {
		try {
			return await request(url, 'GET')
		} catch (error) {
			console.log(error)
		}
	}

	static async post(url, data = {}) {
		try {
			return await request(url, 'POST', data)
		} catch (error) {
			console.log(error)
		}
	}

	static async delete(url) {
		try {
			return await request(url, 'DELETE')
		} catch (error) {
			console.log(error)
		}
	}

	static async patch(url, data = {}) {
		try {
			return await request(url, 'PATCH', data)
		} catch (error) {
			console.log(error)
		}
	}
}

async function request(url, method = 'GET', data) {
	const config = { method, headers: http.HEADERS }
	if (method === 'POST' || method === 'PATCH') {
		config.body = JSON.stringify(data)
	}
	console.log(config)
	const response = await (await fetch(url, config)).json()
	return response
}

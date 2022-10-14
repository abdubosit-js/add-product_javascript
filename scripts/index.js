class App {
    baseUrl = "http://142.93.246.144"
    
    products = []
    async fetchApi(url, method, data) {
        const config = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
        }

        if (method === 'POST' || method === 'DELETE') {
            let body = JSON.stringify(data)

            if (data instanceof FormData) {
                body = data
                delete config.headers["Content-Type"]
            }
            config.body = body
        }

        try {
            const respose = await fetch(this.baseUrl + url, config)
            const result = await respose.json()
            return result
        } catch(err) {
            alert(err)
        }
    }
}
class Auth extends App {

    async renderLogin() {
        const textbox = document.querySelector('#textbox')
        const passwordbox = document.querySelector('#passwordbox')

        const login = await this.fetchApi('/login', 'POST', {
            username: textbox.value,
            password: passwordbox.value
        })

        localStorage.setItem('token', login.token)
        localStorage.setItem('username', login.user.username)

        if (localStorage.getItem('token') === "undefined") {
            window.location.pathname = '/login.html'
            alert(login.message)
        }

        if (localStorage.getItem('token') === login.token) {
            window.location.pathname = '/index.html'
        }
        

    }

    async renderAddProduct() {
        const titleValue = document.getElementById('title')
        const priceValue = document.getElementById('price')
        const imagefile = document.getElementById('image')
        const descriptionValue = document.getElementById('description')

        const formdata = new FormData()
            formdata.append('title', titleValue.value)
            formdata.append('price', priceValue.value)
            formdata.append('image', imagefile.files[0])
            formdata.append('description', descriptionValue.value)
        
        const addProduct = await this.fetchApi('/product', 'POST', formdata)
        
        if (addProduct.message === "You are cool!") {
            window.location.href = "/"            
        } else {
            window.location.href = "addProduct.html"
        }
    }

    async renderSignUp() {
        const userValue = document.getElementById('username_signup').value
        const passwordValue = document.getElementById('password').value
        const confirmPasswordValue = document.getElementById('confirmPassword').value
        
        const data = {
            username: userValue,
            password: passwordValue,
            confirmPassword: confirmPasswordValue
        } 
        
        const signup = await this.fetchApi('/signup', 'POST', data)
        
        alert(signup.message)

        if (signup.message === "Foydalanuvchi tuzildi!") {
            window.location.pathname = '/login.html'
        }
    }

} 

const auth = new Auth()
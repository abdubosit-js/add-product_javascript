class Product extends App {
    
    async renderProducts() {
        let products = await this.fetchApi('/products', 'GET')
        this.products = products
        const productContainer = document.querySelector(".product-container")
        const fragment = document.createDocumentFragment()

        this.products.forEach(product => {
            const div = document.createElement("div")
            let date = new Date(product.createdDate)
            div.classList.add('product-box_warpper')

            div.insertAdjacentHTML('beforeend', `
                <div class='image_wrapper'>
                    <img src='${this.baseUrl + "/" + product.image}' />
                </div>
                <div class="title_wrapper">
                    <h1>${product.title}</h1>
                    <h2>$${product.price}</h2>
                    <div class="flex_data">
                        <a class="desc" href='/product.html?id=${product.id}'>More</a>
                        <a href='/product.html?id=${product.id}' class="delete">delete</a>
                    </div>
                        
                    <p class="date">${"0" + date.getMonth() + "." + date.getDate() + "." + date.getFullYear()}</p>
                </div>
            `)
            fragment.appendChild(div)
        });
        productContainer.append(fragment)
    }

    async renderProduct(id) {
        const product = await this.fetchApi(`/products/${id}`, 'GET')
        
        const productContainer = document.querySelector('.product-container')
        productContainer.insertAdjacentHTML('beforeend', `
        <div class="image_wrapper">
            <img src="${this.baseUrl + "/" + product.image}" alt="" />
        </div>
        <div class="title-cnt">
            <h1>${product.title}</h1>
            <h2>$${product.price}</h2>
            <h5>${product.description}</h5>
            <button class="delete" data-id=${id} onclick="product.deletedFunc(event)">delete</button>
        </div>
        `)
    }

    async deletedFunc(element) {
        const id = element.target.dataset.id
        const deleted = await this.fetchApi(`/products/${id}`, 'DELETE').then((res) => window.location.href = "/")
    }

    
    /* 
        time does not work ....
        searchFunc(e) {
            const value = e.target.value
            const filterProducts = this.products.filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
            return filterProducts
        }
    */

    logout() {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
    }

    headerFunc() {
        const header = document.querySelector('header')
        
        header.insertAdjacentHTML('beforeend', `
            <div class="search-cnt">
                <img class="search-image" src="assets/search.svg" alt="">            
                <input type="search" placeholder="search..." id="search" onkeyup="product.searchFunc(event)">
            </div>
            <nav>
                <ul>
                    <li><a href="/index.html">home</a></li>
                    ${Boolean(localStorage.getItem('token')) ? '<li><a href="/addProduct.html">addProduct</a></li>' : ""}
                </ul>
                <ul>
                    ${Boolean(localStorage.getItem('token')) ? '<li><a href="" onclick="product.logout()">logout</a></li>' : '<li><a href="/login.html">login</a></li>'}
                    ${Boolean(localStorage.getItem('token')) ? "" : '<li><a href="/signup.html">signup</a></li>'}
                    <h3 id="username">${Boolean(localStorage.getItem('username')) ? localStorage.getItem('username') : "" }</h3>
                </ul>
            </nav>
        `)
    }

    viewPassword() {
        const x = document.getElementById('password')
        const a = document.getElementById('confirmPassword')
        if (x.type === "password" && a.type === "password") {
            x.type = "text";
            a.type = "text";
        } else {
            x.type = "password";
            a.type = "password";
        }
    }
}

const product = new Product()

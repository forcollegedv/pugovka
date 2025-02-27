window.onload = () => {
    const params = new URLSearchParams(window.location.search)

    let product = {}
    if (params.get("p") === null || params.get("p") >= products.length) {
        params.set("p", 0)
        window.location = window.location.href.split("?")[0] + "?" + params.toString()
    } else {
        product = products[params.get("p")]
    }


    document.querySelector("title").innerHTML = `Пуговка - ${product.name}`
    document.querySelector(".product__wrapper img").src = `img/products/${product.id}.jpg`
    document.querySelector("#product__name").innerHTML = `${product.name}`
    document.querySelector("#product__price").innerHTML = `${product.price} ₽`


    product.select.forEach((option, n) => {
        document.querySelector("#product__type").innerHTML += `
            <option value="" ${n == 0 ? "selected disabled" : ""}>${option}</option>
        `

    });

    document.querySelector(".product__properties").innerHTML = `
    <li>
        <div class="property__name">Страна</div>
        <div class="dots"></div>
        <div class="property__value">${product.country}</div>
    </li>
    <li>
        <div class="property__name">Материал</div>
        <div class="dots"></div>
        <div class="property__value">${product.materials}</div>
    </li>
    <li>
        <div class="property__name">Сезон</div>
        <div class="dots"></div>
        <div class="property__value">${product.season}</div>
    </li>
    `
    
    
    products.filter(p => p.category == product.category && p.id !== product.id).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value).slice(0, 4).forEach(product => {
        document.querySelector(".also__wrapper").innerHTML += `
            <a href="product.html?p=${product.id}" class="product">
                <img src="img/products/${product.id}.jpg" alt="">
                <div class="product__info">
                    <p class="product__price">${product.price} ₽</p>
                    <p class="product__name">${product.name}</p>
                </div>
            </a>
        `
    });
}
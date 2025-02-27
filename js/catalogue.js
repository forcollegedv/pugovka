const params = new URLSearchParams(window.location.search)
const lowerprice = document.querySelector("#lower-price")
const higherprice = document.querySelector("#higher-price")
const searchButton = document.querySelector("#search")

if (params.get("bo") === null){
    params.set("min", minprice)
    params.set("max", maxprice)
    params.set("sort", document.querySelector(`input[name="sort"]:checked`).value)
    params.set("bo", "t")
    params.set("gi", "t")
    params.set("ba", "t")
    window.location = window.location.href.split("?")[0] + "?" + params.toString()
}

if (params.get("min") === null) {
    lowerprice.value = minprice
    params.set("min",minprice)
} else {
    lowerprice.value = params.get("min")
}
if (params.get("max") === null) {
    higherprice.value = maxprice
    params.set("max",maxprice)
} else {
    higherprice.value = params.get("max")
}


function setAll() {
    canShow = []
    let categories = {
        boys: false,
        girls: false,
        babies: false
    }
    if (params.get("bo") === "t") {
        categories.boys = true
        document.querySelector("#boys").checked = true
    }
    if (params.get("gi") === "t") {
        categories.girls = true
        document.querySelector("#girls").checked = true
    }
    if (params.get("ba") === "t") {
        categories.babies = true
        document.querySelector("#babies").checked = true
    }
    sort = params.get("sort")
    document.querySelector(`#${sort}`).checked = true

    products.forEach(product => {
        if (product.price <= params.get("max") && product.price >= params.get("min")) {
            if (categories[product.category]) {
                canShow.push(product)
            }
        }
    });
    if (sort == "price") {
        canShow.sort(function (a, b) {
            return a.price - b.price;
        });
    }
    if (sort == "name") {
        canShow.sort(function (a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
    }

    document.querySelector(".catalogue__items").innerHTML = ``

    canShow.forEach(product => {
        document.querySelector(".catalogue__items").innerHTML += `
            <a href="product.html?p=${product.id}" class="product">
                <img src="img/products/${product.id}.jpg" alt="">
                <div class="product__info">
                    <p class="product__price">${product.price} ₽</p>
                    <p class="product__name">${product.name}</p>
                </div>
            </a>
        `
    });

    let ending = ""
    switch (canShow.length % 10) {
        case 1:
            ending = ""
            break;
        case 2:
            ending = "а"
        case 3:
            ending = "а"
        case 4:
            ending = "а"
            break;
        default:
            ending = "ов"
            break;
    }

    document.querySelector("h2").innerHTML = `Каталог, ${canShow.length} товар${ending}`

    


    document.querySelector(".pinkline").style = `left:${(params.get("min")-minprice)/maxprice*100}%; width:${(params.get("max")-params.get("min"))/maxprice*100+5}%`
    document.querySelector("#left-circle").style = `left:${(params.get("min")-minprice)/maxprice*100}%;`
    document.querySelector("#right-circle").style = `left:${(params.get("min")-minprice)/maxprice*100+(params.get("max")-params.get("min"))/maxprice*100+5}%;`


}

setAll()
document.querySelector("form").onsubmit = (e) => {
    e.preventDefault()
}

function setParams() {
    console.log({min:minprice,l:lowerprice.value,h:higherprice.value,max:maxprice});
    console.log(higherprice.value >= lowerprice.value);
    
    if (lowerprice.value >= minprice && lowerprice.value <= maxprice && higherprice.value <= maxprice && parseInt(higherprice.value) >= parseInt(lowerprice.value)){
        if (document.querySelector("#boys").checked) {
            params.set("bo", "t")
        } else {
            params.set("bo", "f")
        }
    
        if (document.querySelector("#girls").checked) {
            params.set("gi", "t")
        } else {
            params.set("gi", "f")
        }
    
        if (document.querySelector("#babies").checked) {
            params.set("ba", "t")
        } else {
            params.set("ba", "f")
        }
        params.set("min", lowerprice.value)
        params.set("max", higherprice.value)
        params.set("sort", document.querySelector(`input[name="sort"]:checked`).value)
        window.location = window.location.href.split("?")[0] + "?" + params.toString()
    }else{
        alert("Неправильно указаны цены!")
    }
}

searchButton.onclick = () => {
    setParams()
}
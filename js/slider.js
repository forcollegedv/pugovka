window.onload = setUp
window.onresize = setUp

function setUp() {
    let maxheight = 0
    document.querySelectorAll(".reviews__item").forEach(item => {
        if (item.clientHeight > maxheight) {
            maxheight = item.clientHeight
        }
    });
    document.querySelectorAll(".reviews__item").forEach(item => {
        item.style = `margin-top:${(maxheight - item.clientHeight) / 2}px`
    });
    document.querySelector(".reviews__wrapper").style = `height: ${maxheight}px;`





    const sliders = document.querySelectorAll(".slider")
    sliders.forEach(slider => {
        slider.setAttribute("data-id", 0)
        slider.querySelectorAll(".slider__item").forEach((item, id) => {
            item.style.transform = `translateX(${100 * id}%)`
        });
        document.querySelector(".slider__next").onclick = () => {
            if (parseInt(slider.getAttribute("data-id")) < slider.querySelectorAll(".slider__item").length - 1) {
                slider.setAttribute("data-id", parseInt(slider.getAttribute("data-id")) + 1)
            } else {
                slider.setAttribute("data-id", 0)
            }
            slider.querySelectorAll(".slider__item").forEach((item, id) => {
                item.style.transform = `translateX(${100 * (id - parseInt(slider.getAttribute("data-id")))}%)`
            });
        }
        document.querySelector(".slider__prev").onclick = () => {
            if (parseInt(slider.getAttribute("data-id")) > 0) {
                slider.setAttribute("data-id", parseInt(slider.getAttribute("data-id")) - 1)
            } else {
                slider.setAttribute("data-id", slider.querySelectorAll(".slider__item").length - 1)
            }
            slider.querySelectorAll(".slider__item").forEach((item, id) => {
                item.style.transform = `translateX(${100 * (id - parseInt(slider.getAttribute("data-id")))}%)`
            });
        }
    });
}

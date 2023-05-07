'use script';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preload]")

window.addEventListener("load", function () {
    preloader.classList.add("loaded")
    document.body.classList.add("loaded")
})



/**
 * add event lisetener on multiple elements
 */

const addEventOnElements = function (elements, event, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(event, callback);
    }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]")
const navTogglers = document.querySelectorAll("[data-nav-toggler]")
const overlay = document.querySelector("[data-overlay]")

const toggleNavbar = function () {
    navbar.classList.toggle("active")
    overlay.classList.toggle("active")
    document.body.classList.toggle("nav-active")
}

addEventOnElements(navTogglers, 'click', toggleNavbar)



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]")
const backTopBtn = document.querySelector("[data-back-top-btn]")

let lastScrollpos = 0

const hideHeader = function () {
    const isScrollBottom = lastScrollpos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide")
    } else {
        header.classList.remove("hide")
    }

    lastScrollpos = window.scrollY;
}

window.addEventListener('scroll', function () {
    if (window.scrollY >= 50) {
        header.classList.add("active")
        backTopBtn.classList.add("active")
        hideHeader();
    } else {
        header.classList.remove("active")
        backTopBtn.classList.remove("active")
    }
})



/**
 * HERO
 */

const heroSlider = document.querySelector("[data-hero-slider]")
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]")
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]")
const heroSliderNextBtn = document.querySelector("[data-next-btn]")

let currentSliderPos = 0
let lastActiveSliderItem = heroSliderItems[0]

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active")
    heroSliderItems[currentSliderPos].classList.add("active")
    lastActiveSliderItem = heroSliderItems[currentSliderPos]
}

const slideNext = function () {
    if ( currentSliderPos >= heroSliderItems.length -1 ) {
        currentSliderPos = 0
    } else {
        currentSliderPos++;
    }

    updateSliderPos()
}

heroSliderNextBtn.addEventListener("click", slideNext)

const slidePrev = function () {
    if ( currentSliderPos <= 0 ) {
        currentSliderPos = heroSliderItems.length - 1
    } else {
        currentSliderPos--;
    }

    updateSliderPos()
}

heroSliderPrevBtn.addEventListener("click", slidePrev)

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext()
    }, 7000)
}       

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval)
})

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide)



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]")

let x, y;

window.addEventListener("mousemove", function (event) {
    
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    // reverse the number eg. 20 --> -20, -5 --> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0; i < parallaxItems.length; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`
    }

})
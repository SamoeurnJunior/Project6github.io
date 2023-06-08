const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];
let isDragging = false,startX,startScrollLeft,timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
});

carouselChildrens.slice(0,cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML("beforrend",card.outerHTML);
});

arrowBtns.forEach(btn =>{
    btn.addEventListener("click",() =>{
        // console.log(btn.id);
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const autoPlay = () => {
    if(window.innerWidth <800) return;
    timeoutId = setTimeout(() =>carousel.scrollLeft +=firstCardWidth,2500)
}
autoPlay();
const infiniteScroll = () =>{
    if(carousel.scrollLeft ===0){
        carousel.classList.add("no-transition");
        // console.log("You've reached to the left end");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth );
        carousel.classList.remove("no-transition");
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        // console.log("You've reached to the right end");
        carousel.classList.remove("no-transition");
        carousel.scrollLeft = carousel.offsetWidth ;
    }
    clearTimeout(timeoutId);
    if(wrapper.matches(":hover"))autoPlay();
}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll",infiniteScroll);
wrapper.addEventListener("mouseenter",() =>clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave",autoPlay);
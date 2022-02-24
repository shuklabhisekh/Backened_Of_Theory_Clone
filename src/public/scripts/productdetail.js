// let data=[
//     {
//     image1:"https://ak-media.theory.com/i/theory/TH_L1009514_001_L0?$TH-pdp-large-desktop$",
//     image2:"https://ak-media.theory.com/i/theory/TH_L1009514_001_F0?$TH-pdp-large-desktop$",
//     title:"Semi-Sheer Top in Satin",
//     price:"23,400.00"
//     }
// ]
// console.log(data)

//checkout button CSS CHANGE WHILE ON SCROLL
var addToCartFixed = document.querySelector("#smallbox2box16fixed");

console.log(addToCartFixed);
window.onscroll = function (e) {
  if (window.scrollY > 900) {
    addToCartFixed.classList.add("addToCartFixed_scroll");
  } else {
    addToCartFixed.classList.remove("addToCartFixed_scroll");
  }
};

// let data=[
//     {
//     image1:"https://ak-media.theory.com/i/theory/TH_L1009514_001_L0?$TH-pdp-large-desktop$",
//     image2:"https://ak-media.theory.com/i/theory/TH_L1009514_001_F0?$TH-pdp-large-desktop$",
//     title:"Semi-Sheer Top in Satin",
//     price:"23,400.00"
//     }
// ]
// console.log(data)
let data=JSON.parse(localStorage.getItem("product_details"))
console.log(data)

let smallbox1= document.getElementById("smallbox1")
let smallbox2= document.getElementById("smallbox2")
let smallbox2box1=document.getElementById("smallbox2box1")
let smallbox2box2=document.getElementById("smallbox2box2")
showDetials(data)
function showDetials(elem){


    

    let smallbox1Image1=document.getElementById("smallbox1Image1")
    let Image1=document.getElementById("Image1")
    Image1.src=elem.image1
    smallbox1Image1.append(Image1)

    let smallbox1Image2=document.getElementById("smallbox1Image2")
    let Image2=document.getElementById("Image2")
    Image2.src=elem.image2
    smallbox1Image2.append(Image2)





    smallbox2box1.textContent=`Women  /  Tops  / ${ elem.title}`
    
    let smallbox2box2title=document.getElementById("smallbox2box2title")
    smallbox2box2title.textContent=elem.title
    let smallbox2box2price=document.getElementById("smallbox2box2price")
    smallbox2box2price.textContent=`${elem.price}`
}


//checkout button CSS CHANGE WHILE ON SCROLL
var addToCartFixed = document.querySelector("#smallbox2box16fixed")
window.onscroll = function (e) {
    if(window.scrollY > 900){
        addToCartFixed.classList.add("addToCartFixed_scroll")
    }else{
        addToCartFixed.classList.remove("addToCartFixed_scroll")
    
    }
};

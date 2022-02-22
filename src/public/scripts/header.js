//HEADER CSS CHANGE WHILE ON SCROLL
var header = document.querySelector("#navbar")
window.onscroll = function (e) {
    if(window.scrollY > 20){
    	header.classList.add("nav_scroll")
    }else{
    	header.classList.remove("nav_scroll")
      
    }
};


let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

  append_final(cart)




function append_final(el){
    el.map((data)=>{

  


    let img = document.createElement("img");
    img.setAttribute("class","image00v")
    img.src = data.image2;


    let desc = document.createElement("p")
    desc.innerHTML=data.title;
    let price = document.createElement("p")
    price.innerHTML = data.price;
    let quantity = document.createElement("div")
    quantity.innerHTML= '1'
    

    let sTotal = document.createElement("p")
    sTotal.setAttribute("class","sTotal")
    sTotal.innerHTML = data.price;


   var row = document.createElement("tr")
   var first_col = document.createElement('td')
   
   var col3 = document.createElement("td")
   col3.append(price) 
   var col4 = document.createElement("td") 
    col4.append(quantity)
   var col5 = document.createElement("td") 
   


   var showimage = document.createElement('tr')
   showimage.setAttribute('class', 'showimagev')


   var col1 = document.createElement("td")
   col1.append(img);
   var col2 = document.createElement("td") 
   col2.append(desc);

   showimage.append(col1,col2)
   first_col.append(showimage)

   let line = document.createElement('hr')


   row.append(showimage, col4, col3,col5);
    document.querySelector("tbody").append(row,line);

})

}


var amountDisplay = JSON.parse(localStorage.getItem('Totalamount'))
console.log('amountDisplay:', amountDisplay)



var amount_show = document.querySelector('.displaypricev')
amount_show.innerText = amountDisplay

var amount_show1 = document.querySelector('.displaypricev1')
amount_show1.innerText = amountDisplay

var amount_show2 = document.querySelector('.displaypricev2')
amount_show2.innerText = amountDisplay

var amount_show3 = document.querySelector('.displaypricev3')
amount_show3.innerText = amountDisplay



let vbutton = document.getElementById('vbutton')
vbutton.addEventListener('click', function(){
  window.location.href = 'end.html'
})
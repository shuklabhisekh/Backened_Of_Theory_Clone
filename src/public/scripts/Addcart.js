
let cart = JSON.parse(localStorage.getItem("cart"));
    
let maincart = document.getElementById("maincart");
let Recommend = document.getElementById("Recommend");
let cartempty = document.getElementById("cartempty");




if (cart.length != 0) {


    console.log(cart);
append(cart)

   

    function append(data) {

        if (data.length == 0) {
            maincart.style.display = "none";
            Recommend.style.display = "none";
            cartempty.style.display = "block";
            return;
        }


            var totalPrice = 0;
            for (var i = 0; i < cart.length; i++) {
                if(cart[i].price[0] == "₹"){
                    amount = cart[i].price.slice(2).replace(",", "")
                }
                else{
                    amount = Math.floor(cart[i].price.slice(1))
                }

                totalPrice += +amount;
        
      
            }
            var subamount = document.querySelector("#Price")
            subamount.innerHTML = "₹ " + (totalPrice) + ".00";

            var totalamount = document.querySelector("#Price2");
            totalamount.innerHTML = "₹ " + (totalPrice) + ".00";

            let code = document.getElementById("code");

            document.getElementById("apply").addEventListener("click", function discount() {
                if (code.value == "masai30") {
                    let disc = Math.floor(totalPrice - (totalPrice * 0.3));
                    subamount.innerHTML = null;
                    subamount.innerHTML = "₹ " + (disc) + ".00";
                    totalamount.innerHTML = null;
                    totalamount.innerHTML = "₹ " + (disc) + ".00";
                    code.value = "";
                    localStorage.setItem("Totalamount", JSON.stringify(disc));
        
                }

                // else {
                //     alert("Invalid Coupon Code");
                    
                // }

           
            });


       
          

            document.querySelector("tbody").innerHTML = "";
            data.forEach((el, index) => {


                let img = document.createElement("img");
                img.setAttribute("class", "image")
                img.src = el.image2;


                let desc = document.createElement("p")
                desc.innerHTML = el.title;
                let price = document.createElement("p")
                if(el.price[0] != "₹ "){
                    price.innerHTML = `₹ ${el.price.slice(1)}`
                }else{
                    price.innerHTML = el.price;
                }
                
                let quantity = document.createElement("div")
                quantity.innerHTML = `<select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
    </select>`
        

                let sTotal = document.createElement("p")
                sTotal.setAttribute("class", "sTotal")
                if(el.price[0] != "₹ "){
                    sTotal.innerHTML = `₹ ${el.price.slice(1)}`
                }else{
                    sTotal.innerHTML = el.price;
                }
            


                let edit = document.createElement("p")
                edit.innerHTML = "Edit";
                edit.setAttribute('class', 'edit')

                let remove = document.createElement("p")
                remove.innerHTML = "Remove";
                remove.setAttribute('class', 'edit')

                remove.addEventListener("click", function () {
                    deletefunc(index);
                })



                var row = document.createElement("tr")
                var col1 = document.createElement("td")
                col1.append(img);
                var col2 = document.createElement("td")
                col2.append(desc);
                var col3 = document.createElement("td")
                col3.append(price)
                var col4 = document.createElement("td")

                col4.append(quantity, edit);
                var col5 = document.createElement("td")
                col5.append(sTotal, remove);

   


                row.append(col1, col2, col3, col4, col5);
                document.querySelector("tbody").append(row);

            })
        

    }

    function deletefunc(index) {
        cart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(cart));
        document.querySelector(".cart-count").textContent = cart.length
        append(cart);
    }
    
}

else {
    maincart.style.display = "none";
    Recommend.style.display = "none";
    cartempty.style.display = "block";
}

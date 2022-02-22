function appendData(products , location){
	location.innerHTML = "";
	products.map((item)=>{
		let div = document.createElement("div")
		div.style.cursor = "pointer"
		let imgdiv = document.createElement("div")
		imgdiv.setAttribute("class" , "product-img")
		let icon = document.createElement("span")
		icon.innerHTML = `<i class="fa fa-heart-o heart-icon" style="font-size:20px"></i>`
		let img = document.createElement("img")
		img.src = item.image1

		//HOVER Add TO CART
		let hoverdiv = document.createElement("div")
		hoverdiv.setAttribute("class" , "hoverCart")
		hoverdiv.innerText = "Quick Add"
		hoverdiv.style.display = "none"
		//HOVER CHANGE IMAGES
		imgdiv.addEventListener("mouseover" , function(){
			img.src = item.image2
			hoverdiv.style.display = "block"
		})

		imgdiv.addEventListener("mouseout" , function() {
			img.src = item.image1
			hoverdiv.style.display = "none"
		})

		//STORING DATA TO PRODUCT DETAILS PAGE
		img.addEventListener("click" , function(){
			localStorage.setItem("product_details" , JSON.stringify(item))
			window.location.href = "../pages/productdetail.html";
		})

		//STRONGING DATA FOR ADD TO CART
		hoverdiv.addEventListener("click" , function(){
			 addTocart(item)
		})		


		

		let detail_div = document.createElement("div")
		detail_div.setAttribute("class" , "products-name")
		let colorPlate = document.createElement("div")
		colorPlate.innerHTML = `<div class="Colors-plate">
							<span class="tan"></span>
							<span class="active-color-border black"></span>
							<span class="lightslategrey"></span>
						</div>`
		let title = document.createElement("p")
		title.innerText = item.title

		let price = document.createElement("p")
		price.innerText = item.price

		imgdiv.append(img , hoverdiv , icon)
		detail_div.append(colorPlate , title , price)
		div.append(imgdiv , detail_div)
		location.append(div)

						
	})

}

var cart=JSON.parse(localStorage.getItem("cart")) || [];
function addTocart(product){
	console.log(product)
	cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.querySelector(".cart-count").textContent = cart.length
}

export default appendData;
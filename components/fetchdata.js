async function getdata(query){
	try{
		let res = await fetch(`https://zappos-realtime-data.p.rapidapi.com/search.php?keyword=${query}&page=1`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "zappos-realtime-data.p.rapidapi.com",
			"x-rapidapi-key": "0d07084d19msh5335006a4301007p143e99jsna37e1a4147b0"
		}
	})

	let response = await res.json()
	console.log(response.results)
	appendData(response.results)
	}catch(err){
		console.log(err)
	}
}

function appendData(items) {
	let maindiv = document.querySelector("#SearchResult")
	console.log(maindiv)
	document.querySelector("#SearchResult").innerHTML = ""
	let count = 0
	items.map((item)=>{
		
        let div = document.createElement("div")
		div.style.cursor = "pointer"
		let imgdiv = document.createElement("div")
		imgdiv.setAttribute("class" , "product-img")
		let icon = document.createElement("span")
		icon.innerHTML = `<i class="fa fa-heart-o heart-icon" style="font-size:20px"></i>`
		let img = document.createElement("img")
		img.src = item.thumbnailImageUrl

		//HOVER Add TO CART
		let hoverdiv = document.createElement("div")
		hoverdiv.setAttribute("class" , "hoverCart")
		hoverdiv.innerText = "Quick Add"
		hoverdiv.style.display = "none"

        //HOVER CHANGE IMAGES
		imgdiv.addEventListener("mouseover" , function(){
			hoverdiv.style.display = "block"
		})

		imgdiv.addEventListener("mouseout" , function() {
			hoverdiv.style.display = "none"
		})

        //STRONGING DATA FOR ADD TO CART
		imgdiv.addEventListener("click" , function(){
            addTocart(item)
       })

        let detail_div = document.createElement("div")
		detail_div.setAttribute("class" , "products-name")
		
		let title = document.createElement("p")
		title.innerText = item.productName

		let price = document.createElement("p")
		price.innerText = item.originalPrice

		
		
		if(item.thumbnailImageUrl != null){
            imgdiv.append(img , hoverdiv , icon)
		    detail_div.append(title , price)
		    div.append(imgdiv , detail_div)
		    document.querySelector("#SearchResult").append(div)
		}else{
			count+= 1
		}
		
	})

	console.log(count)
	if(count == items.length){
		document.querySelector("#SearchResult").innerHTML = "<h1>NO RESULT'S</h2>"
	}
}

var cart=JSON.parse(localStorage.getItem("cart")) || [];

function addTocart(product){
	
	let obj = {
		image2 : product.thumbnailImageUrl ,
		title : product.productName ,
		price : product.originalPrice
	}
	console.log(obj)
	cart.push(obj);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.querySelector(".cart-count").textContent = cart.length
}
export default getdata;

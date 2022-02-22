import {checkoutHeader, checkOutFooter} from "../components/checkoutHeader.js"
// console.log('checkoutHeader:', checkoutHeader)

var nav = document.getElementById('vnavbar')
nav.innerHTML = checkoutHeader()

var foot = document.getElementById('vfoot')
foot.innerHTML = checkOutFooter()
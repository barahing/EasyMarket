$cardShopping = document.getElementById("card-shopping")
$cardShopping2 = document.getElementById("card-shopping2")
$cardShopping3 = document.getElementById("card-shopping3")
$cardShopping4 = document.getElementById("card-shopping4")
$cardShopping5 = document.getElementById("card-shopping5")
$total = document.getElementById("total");
$close = document.getElementById("close");
$close2 = document.getElementById("close2");
$close3 = document.getElementById("close3");
$close4 = document.getElementById("close4");
$pay = document.getElementById("pay");
// Simulamos una compra con 4 productos de forma estática

let price1= 4799000, price2=5399000, price3=1399000, price4=789999;
let total= price1+price2+price3+price4;



$close.addEventListener ("click", ()=> {
	$cardShopping.style.cssText = 'display: none';
	$close.style.cssText = 'display: none';
	total -= price1;
	$total.innerHTML = `Total: $ ${total.toLocaleString("es")}`;
	console.log("Terminado")
})

$close2.addEventListener ("click", ()=> {
	$cardShopping2.style.cssText = 'display: none';
	$close2.style.cssText = 'display: none';
	total -= price2;
	$total.innerHTML = `Total: $ ${total.toLocaleString("es")}`;
	console.log("Terminado")
})

$close3.addEventListener ("click", ()=> {
	$cardShopping3.style.cssText = 'display: none';
	$close3.style.cssText = 'display: none';
	total -= price3;
	$total.innerHTML = `Total: $ ${total.toLocaleString("es")}`;
	console.log("Terminado")
})

$close4.addEventListener ("click", ()=> {
	$cardShopping4.style.cssText = 'display: none';
	$close4.style.cssText = 'display: none';
	total -= price4;
	$total.innerHTML = `Total: $ ${total.toLocaleString("es")}`;
	console.log("Terminado")
})

$total.innerHTML = `Total: $ ${total.toLocaleString("es")}`;

$pay.addEventListener("click", ()=> {
	if (total===0)
		alert("Carrito vacío");
	else location.href = 'paymentMethods.html'
})
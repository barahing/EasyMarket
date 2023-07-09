$cartIcon = document.querySelectorAll(".cart-icon");
$cartCount = document.getElementById("cart-count");
productos = $cartCount.value;
for (cont=0; cont<$cartIcon.length; cont++){
    $cartIcon[cont].addEventListener ("click", () => {
			console.log(productos);
			console.log($cartCount.value)
			if (productos>=5)
				alert("No puedes comprar más de 5 productos");
			else if (productos===undefined){
				$cartCount.innerHTML = "1";
				productos=1;
			}
			else {
				productos++;
				$cartCount.innerHTML = productos;
			}
			 
    })
}
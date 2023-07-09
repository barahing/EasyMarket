let $id = document.getElementById("user-id"),
    $username = document.getElementById("username"),
    $city = document.getElementById("city"),
    $address = document.getElementById("address"),
    $email = document.getElementById("email"),
    $password = document.getElementById("password"),
    $phone = document.getElementById("phone"),
    $save = document.getElementById("save"),
    $idError = document.getElementById("id-error"),
		$userError = document.getElementById("user-error"),
		$cityError = document.getElementById("city-error"),
		$addressError = document.getElementById("address-error"),
		$emailError = document.getElementById("email-error"),
		$passwordError = document.getElementById("password-error"),
		$phoneError = document.getElementById("phone-error")
    
$save.addEventListener("click", function submit (){
	let errors=0;
	if ($id.value=="" || isNaN($id.value) || $id.value.length>10 || $id.value<=0) {
		$idError.innerHTML="El id debe ser el documento del cliente y debe contener máximo 10 digitos";
		$idError.style.cssText = "height: 10px !Important";
		errors++;
	} else $idError.innerHTML="";

	if ($username.value=="" || $username.value.length>60) {
		$userError.innerHTML="El nombre no puede estar vacío ni contener más de 60 caracteres";
		$userError.style.cssText = "height: 10px !Important";
		errors++;
	} else $userError.innerHTML="";

	if ($city.value=="" || $city.value>10) {
		$cityError.innerHTML="La ciudad no puede estar vacía ni ser mayor a 10";
		$cityError.style.cssText = "height: 10px !Important";
		errors++;
	} else $cityError.innerHTML="";

	if ($address.value=="" || $address.value.length>50) {
		$addressError.innerHTML="La dirección no puede estar vacía contener más de 50 caracteres";
		$addressError.style.cssText = "height: 10px !Important";
		errors++;
	} else $addressError.innerHTML="";

	if ($email.value=="" || !validateEmail($email.value)){
		$emailError.innerHTML="El email ingresado no es válido. Ingrese un email así: usuario@dominio.com";
		$emailError.style.cssText = "height: 10px !Important";
		errors++;
	} else $emailError.innerHTML="";

	if ($password.value=="" || $password.value.length<4 || $password.value.length>10) {
		$passwordError.innerHTML="La contraseña debe tener entre 4 y 10 caracteres";
		$passwordError.style.cssText = "height: 10px !Important";
		errors++;
	} else $passwordError.innerHTML="";

	if ($phone.value=="" || isNaN($phone.value) || $phone.value.length!=10 || $phone.value<=3000000000) {
		$phoneError.innerHTML="Ingrese un teléfono de 10 dígitos: 3XXXXXXXXX o 60XXXXXXXX";
		$phoneError.style.cssText = "height: 10px !Important";
		errors++;
	} else $phoneError.innerHTML="";

	if (errors===0){
		$.ajax({
			type: "GET",
			url: "/userManagement/",
			contentType: 'application/json',
			success: function(response) {
				console.log("Response" + response);
				for (cont=0; cont<response.length; cont++) {
					console.log("Registros verificados" + cont);
						if($id.value==response[cont].id_usuario){
							return alert("El id de usuario ya existe");
						}
					}
					console.log("Valor de email: "+$email.value);
					$.ajax({
						type: "POST",
						url: "/userManagement",
						data: {"id_usuario": $id.value, "nombre_usuario": $username.value, "id_ciudad": $city.value, "direccion": $address.value, 
							"rol": 2, "estado":1, "contrasena_usuario": $password.value, "correo_usuario": $email.value, "telefono_usuario": $phone.value},
						datType: 'json',
						success: function(response) {
						},
						error: function(jqXHR, textStatus, errorThrown) {
							alert("error");
						},
			
					});

					$id.value="";
					$username.value = "";
					$city.value = "";
					$address.value = "";
					$email.value = "";
					$password.value = "";
					$phone.value = "";
					alert("Usuario ingresado con éxito");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("error");
			},
		});
	}
});



function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}
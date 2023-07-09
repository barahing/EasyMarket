let $userId = document.getElementById("user-id"),
    $search = document.getElementById("search"),
    $username = document.getElementById("username"),
    $city = document.getElementById("city"),
    $address = document.getElementById("address"),
    $email = document.getElementById("email"),
    $phone = document.getElementById("phone"),
    $save = document.getElementById("save"),
    $userError = document.getElementById("username-error"),
    $cityError = document.getElementById("city-error"),
    $addressError = document.getElementById("address-error"),
    $emailError = document.getElementById("email-error"),
    $phoneError = document.getElementById("phone-error");


$search.addEventListener("click", function search() {
    if($userId.value=="" || isNaN($userId.value)){
        alert("Ingrese un documento de identidad válido");
        return;
    }

    $.ajax({
        type: "GET",
        url: `/searchUser/${$userId.value}`,
        contentType: 'application/json',
        success: function(response) {
            if (response[0].length==0)
                return alert("Usuario no existe");
            else {
                let resultado=response[0][0];
                console.log(resultado);
                $username.value=resultado.nombre_usuario;
                $city.value=resultado.id_ciudad;
                $address.value=resultado.direccion;
                $email.value=resultado.correo_usuario;
                $phone.value=resultado.telefono_usuario;
                $userId.readOnly=true;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("error");
        },
    });
})

$save.addEventListener("click", function () {
    let errors=0;
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

	if ($phone.value=="" || isNaN($phone.value) || $phone.value.length!=10 || $phone.value<=3000000000) {
		$phoneError.innerHTML="Ingrese un teléfono de 10 dígitos: 3XXXXXXXXX o 60XXXXXXXX";
		$phoneError.style.cssText = "height: 10px !Important";
		errors++;
	} else $phoneError.innerHTML="";

    if (errors===0){ 
        $.ajax({
            type: 'PUT',
            url: '/userManagement/',
            data: {"nombre_usuario": $username.value, "id_ciudad": $city.value, "direccion": $address.value, "rol": 2, "estado":1, 
            "correo_usuario": $email.value, "telefono_usuario": $phone.value, "id_usuario": $userId.value},
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
              alert('Usuario modificado.');
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("error");
            }
          });
    }

})






function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}
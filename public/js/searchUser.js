let $userId = document.getElementById("user-id"),
    $search = document.getElementById("search"),
    $username = document.getElementById("username"),
    $city = document.getElementById("city"),
    $address = document.getElementById("address"),
    $email = document.getElementById("email"),
    $phone = document.getElementById("phone");

    

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
                $username.readOnly=true;
                $city.readOnly=true;
                $address.readOnly=true;
                $email.readOnly=true;
                $phone.readOnly=true;

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("error");
        },
    });

})

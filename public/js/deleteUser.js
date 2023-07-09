let $userId = document.getElementById("user-id"),
    $search = document.getElementById("search"),
    $username = document.getElementById("username"),
    $city = document.getElementById("city"),
    $address = document.getElementById("address"),
    $email = document.getElementById("email"),
    $phone = document.getElementById("phone"),
    $delete = document.getElementById("delete"),
    info=false;
    
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
                $username.readOnly=true;
                $city.readOnly=true;
                $address.readOnly=true;
                $email.readOnly=true;
                $phone.readOnly=true;
                info=true;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("error");
        },
    });
})


$delete.addEventListener("click", function () {
    let proceder = confirm("¿Estás seguro que deseas continuar?");
    if (proceder==false) {}
    else if(info){
        $.ajax({
            type: 'DELETE',
            url: `/userManagement/${$userId.value}`,
            contentType: 'application/json',
            success: function(response) {
                alert('Usuario eliminado.');
                $username.value="";
                $city.value="";
                $address.value="";
                $email.value="";
                $phone.value="";
                $userId.readOnly=false;
                $username.readOnly=false;
                $city.readOnly=false;
                $address.readOnly=false;
                $email.readOnly=false;
                $phone.readOnly=false;
                info=false;
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log("error");
            }
        });
    }
    else alert ("Error: Usuario vacío o no encontrado");
})
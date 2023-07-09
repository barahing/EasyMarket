	const $user = document.getElementById("user") ,
	$password = document.getElementById("password"),
	$loginButton = document.getElementById("login-button");

	$loginButton.addEventListener("click", ()=> {
		const user=parseInt($user.value), 
		password=$password.value;
		let regex = /\s/g;

		if (regex.test(user))
			alert("El usuario no debe contener espacios en blanco");
		else if (regex.test(password))
			alert("La contraseña no debe contener espacios en blanco");
		else if (isNaN(user))
			alert("El usuario debe ser el documento de identidad del cliente")
		else if (password.length<4 || password.length>10)
			alert("La contraseña debe contener entre 4 y 10 caracteres")
		else {
			$.ajax({
				type: "POST",
				url: "/login",
				data: {"id_usuario": user, "contrasena_usuario": password},
				datType: 'json',
				success: function(response) {
					console.log(response[0]);
					if (response[0].length!=0)
						location.href = 'home.html';
					else
						alert("Nombre de usuario y/o contraseña inválidos");
				},
				error: function(jqXHR, textStatus, errorThrown) {
						alert("error");
				},
		
			});
	}
})


/* GET FUNCIONANDO
$.ajax({
	type: "GET",
	url: "/login",
	contentType: 'application/json',
	success: function(response) {
		  // alert("success!");
		  console.log(response)
	},
	error: function(jqXHR, textStatus, errorThrown) {
			alert("error");
	},

});*/
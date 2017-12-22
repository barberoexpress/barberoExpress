var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var ref;
//var providerG = new firebase.auth.GoogleAuthProvider();  //instancia de google




// -------------------- FUNCION PARA INICIAR SESION CON FACEBOOK --------------------


/*function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}*/

function FbSignIn(){
  FB.logout(function(response) {});
  var provider = new firebase.auth.FacebookAuthProvider(); //instancia de facebook
  provider.addScope('public_profile');
  var loggearFb = "null";
  var email;
  var nombre;
  //nos envia a la pagina de fb a loggearnos
  //firebase.auth().signInWithRedirect(provider);
  //chekeamos si nos loggeamos correctamente
  firebase.auth().signInWithPopup(provider).then(function(result){
    var token = result.credential.accessToken;
    var user = result.user;
    email = user.email;
    /*if(email != null && email != "" && email != "null"){
      var errores = true;
      for (var i = 0; i < email.length; i++){
        if(email[i] == '@'){
          errores = false;
        }
      }
      if(errores == true){
        throw "Porfavor inicia sesion con tu correo electronico";
      }
    }*/
    nombre = user.displayName;
    
    setTimeout(function() {
      var SearchRef = firebase.database().ref("USUARIOS");
      SearchRef.orderByChild('correo').equalTo(email).on("child_added", function(snapshot) {
      loggearFb = snapshot.val().correo;
      });
    }, 1000);


    setTimeout(function() {
      //if(errores == false){
        localStorage.setItem("USERNAME2", nombre);
        window.alert("Bienvenido " + nombre + " que bueno tenerte de vuelta");
        if(loggearFb == "null" || loggearFb == "undefined" || loggearFb == undefined){
          InformacionBaseDatosNoRedirect(email,nombre);
        }else{
          window.location.href="../../index.html";
        }
      //}
    }, 1000);
  
    setTimeout(function(){
      //if(errores == false){
        window.location.href="../../index.html";
      //}
    }, 1000);

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
  localStorage.setItem("PROVEEDOR","FACEBOOK");
  
}









// -------------------- FUNCION PARA INICIAR SESION CON GOOGLE --------------------
function onSignIn(googleUser) {
  //if(localStorage.getItem("PROVEEDOR") == "GOOGLE"){
      var profile = googleUser.getBasicProfile();   
      var loggearGoogle = "null";
      var email = profile.getEmail();
      var password = "clave1234567890";
      var nombre = profile.getName();

      var errores = false;
      console.log("YA ESAMOS LOGGEADOS CON GOOGLE: " + nombre + ", CON EMAIL: " +  email);

    /*chekeamos si debemos iniciar sesion con google o crearle una cuenta al usuario con google */
    var SearchRef = firebase.database().ref("USUARIOS");
    SearchRef.orderByChild('correo').equalTo(email).on("child_added", function(snapshot) {
      loggearGoogle = snapshot.val().correo;

    });

    
    setTimeout(function() {
      //ESTAMOS YA REGISTRADOS
      if(loggearGoogle != "null" && loggearGoogle != "undefined" && loggearGoogle != undefined){
        console.log("Ya estamos registrados, somos: " +  loggearGoogle);
        localStorage.setItem("USERNAME2", nombre);
        firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        //MANEJO DE ERRORES
        if (errorCode === 'auth/wrong-password'){
                errores = true;
                alert('Ya tienes una cuenta creada de la forma normal.');
                return;
              } else if (errorCode === 'auth/user-not-found'){
                errores = true;
                alert('Usuario no encontrado.');
                return;

              } else if(errorCode === 'auth/invalid-email'){
                errores = true;
                alert('Email invalido.');
                return;

              } else if(errorCode === 'auth/user-disabled'){
                errores = true;
                alert('Usuario bloqueado.');
                return;

              }else{
                errores = true;
                alert(errorMessage);
                return;
              }
        });

      }//NO ESTAMOS REGISTRADOS
      else{
        console.log("No estamos registrados");
        //NOS REGISTRAMOS
        firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === 'auth/wrong-password') {
                alert('Contraseña equivocada.');
                errores = true;
                return;
            } else {
              errores = true;
                alert(errorMessage);
                return;
            }
        });
        InformacionBaseDatosNoRedirect(email,nombre);
      }
    }, 2000);


    localStorage.setItem("PROVEEDOR","GOOGLE");
  //}
  
}








// -------------------- FUNCION PARA AGREGAR INFORMACION A LA DB --------------------
function InformacionBaseDatosNoRedirect(correo,nombre){
  var ref = firebaseRef.child("USUARIOS");
  ref.push({
    correo: correo,
    nombre: nombre,
    apellido: "null",
    telefono: {telefonoCelular: "null", telefonoFijo: "null"},
    direccion: {direccion: "null", direccion2: "null", ciudad:"null", informacionAdicional: "null"},
    carritoCompras: {vaciar:"false",keyUsuario:"null", productos: {id:9999999999, nombre: "FINAL"}},
    foto: "null",
    historialCompras: "null",
    vaciarA: true,
    vaciarB: true
  });
}








// -------------------- FUNCION PARA INICIAR SESION CON LA FORMA CONVENCIONAL --------------------
function IniciarSeccion(){
	var email = document.getElementById('inputEmail').value;
	var password = document.getElementById("inputPassword").value;
  var errores = false;


	firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  //MANEJO DE ERRORES
	  if (errorCode === 'auth/wrong-password'){
            errores = true;
            alert('Contraseña equivocada.');
            return;
          } else if (errorCode === 'auth/user-not-found'){
            errores = true;
            alert('Usuario no encontrado.');
            return;

      	  } else if(errorCode === 'auth/invalid-email'){
            errores = true;
      	  	alert('Email invalido.');
      	  	return;

      	  } else if(errorCode === 'auth/user-disabled'){
            errores = true;
      	  	alert('Usuario bloqueado.');
      	  	return;

      	  }else{
            errores = true;
      	  	alert(errorMessage);
      	  	return;
      	  }
	});

   window.alert("Bienvenido " + email + " que bueno tenerte de vuelta");
   localStorage.setItem("PROVEEDOR","LOCAL");
  setTimeout(function() {
    if(errores == false){
      window.location.href="../../index.html";
    }
  }, 1000);
  
}








// -------------------- FUNCION PARA TOMAR LOS VALORES DE KEY USUARIO Y NOMBRE DE USUARIO EN LOCALSTORAGE --------------------

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	var SearchRef = firebase.database().ref("USUARIOS");

	var correo = user.email;
	var nombre = user.displayName;

  var count = 0;

	SearchRef.orderByChild('correo').equalTo(correo).on("child_added", function(snapshot) {
		 key = snapshot.key;
		 ref = firebase.database().ref("USUARIOS/" + key);
     localStorage.setItem("USERKEY2", key);
     localStorage.setItem("USERNAME2", snapshot.val().nombre);
	});
    console.log("HEY ESTAMOS LOGGEADOS Y ESTAMOS TOMANDO INFORMACION DESDE LOGIN.JS")
  } else {
    console.log("nadie ha iniciado seccion");
  }
});










// -------------------- FUNCION PARA AGREGAR PRODUCTOS AL CARRO DE COMPRAS --------------------

function AgregarAlCarrito(){

  var user = firebase.auth().currentUser;

  if (user) {
    var nombre = $("#nombreProducto").text();
    var precioHTML = $("#precioProducto").text();
    var precio = precioHTML.substring(1);
    var id = parseInt($("#id_Producto").text());
    var cantidad = document.getElementById( "cantidad" ).value;

    var marca = $("#marcaProducto").text();
    var descuento = "0";
    var foto = $('#imagenProducto').attr('src');
    var keyP = localStorage.getItem("PROD_KEY")

   ref.child("carritoCompras/productos").push({
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      id: id,
      key: keyP,
      marca: marca,
      descuento: descuento,
      foto: foto
    });
    window.alert("Producto Agregado");
    //window.location.href="product_summary.html";
    window.location.href= "carritoCompras.html";
  } else {
    window.alert("Inicia sesion primero");
  }
}








// -------------------- FUNCION PARA IR A LA VENTANA DE CADA PRODUCTO -------------------- RESPLICADOOOOOO, BORRAR, YA ESTA EN FIREBASEBARBERO
function Ir_producto(prodKey){
  localStorage.setItem("PROD_KEY", prodKey);
  window.location.href= "productoSimple.html";

}







//--------------------- RAMON, ¿QUE ES ESTO?, REVISALO Y BORRARLO SI NO ES NECESARIO PORFA -----------//
function sumarUno(){
  var valor = document.getElementById( "cantidad" ).value;
  var num = parseInt( valor );
    console.log("valor: "+valor+" num: "+num);
    num++;
    console.log("valor: "+valor+" num: "+num);
  //document.getElementById( "cantidad" ).innerHTML = num ;
  document.getElementById("cantidad").value = num ;
}

function restarUnoCompras(){
  var valor = document.getElementById( "cantidad" ).value;
  var num = parseInt( valor );
    console.log("valor: "+valor+" num: "+num);
    if(num <= 1){
      num = 1;
    }else{
      num--;
    }
    console.log("valor: "+valor+" num: "+num);
    document.getElementById("cantidad").value = num ;
}








// -------------------- FUNCION PARA USAR EL BUSCADOR --------------------
function Buscar(){
  var queryText = document.getElementById("srchFld").value;
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "];
  var descripcion = [" ", " "];
  var keyProducto = [" ", " "];

  if(queryText.length >= 2){
    firebaseRef.child("PRODUCTOS").orderByChild('nombre').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
        foto_Url.push(snapshot.val().foto);
        nombre.push(snapshot.val().nombre);
        precio.push(snapshot.val().precio);
        descripcion.push(snapshot.val().descripcion);
        keyProducto.push(snapshot.key);
    });

    firebaseRef.child("PRODUCTOS").orderByChild('marca').startAt(queryText).endAt(queryText+"\uf8ff").on('child_added', function(snapshot) {
        foto_Url.push(snapshot.val().foto);
        nombre.push(snapshot.val().nombre);
        precio.push(snapshot.val().precio);
        descripcion.push(snapshot.val().descripcion);
        keyProducto.push(snapshot.key);
    });

    setTimeout(function(){
      localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
      localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
      localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
      localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
      localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
      window.location.href="buscar-4columnas.html";
    }, 1000);

  }else{
    localStorage.setItem("FOTO_URL_BS", JSON.stringify(foto_Url));
    localStorage.setItem("NOMBRE_BS", JSON.stringify(nombre));
    localStorage.setItem("PRECIO_BS", JSON.stringify(precio));
    localStorage.setItem("DESCRIPCION_BS", JSON.stringify(descripcion));
    localStorage.setItem("KEYPRODUCTO_BS", JSON.stringify(keyProducto));
    window.location.href="buscar-4columnas.html";
  }
}





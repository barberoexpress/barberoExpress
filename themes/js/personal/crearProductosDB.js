var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();
var firebaseAuth = firebase.auth();
var id = 0;
var vacio = ".";
var selectedFile;

function Añadir(){

	firebaseRef.child("PRODUCTOS").on("child_added", function(snapshot) {
		id = snapshot.val().id;
	});

	setTimeout(function(){
		id = id + 1;
		var nombre = document.getElementById('nombre').value;
		var precio = document.getElementById("precio").value;
		var marca = document.getElementById("marca").value;
		var tipo = document.getElementById("tipo").value;

		firebaseRef.child("PRODUCTOS").push({
			nombre: nombre,
	    	marca: marca,
			precio: precio,
			foto: "null",
			gif:"null",
			descripcion:"null",
			id: id,
			disponibles: 10,
			numCompras: 0,
			tipo: tipo,
			recomendado: false
		});

		document.getElementById("nombre").innerHTML = vacio;
		document.getElementById("precio").innerHTML = vacio;
		setTimeout(function(){
			CargarFoto();
		}, 4000);

	}, 4000);

}


/*function Agregar(){
	var keys = [" ", " "];
	var recomendado = document.getElementById("recomendado").value;
	firebaseRef.child("PRODUCTOS").on("child_added", function(snapshot) {
		keys.push(snapshot.key);
	});
	
	setTimeout(function(){
		for(j = 2; j < keys.length; j++){
			firebaseRef.child("PRODUCTOS").child(keys[j]).update({
				recomendado : false
			});
		}
		console.log(keys);
    }, 3000)
	
}
*/

document.getElementById('file').onchange = function() {
//$("#file").on("change", function(event){
//$(document).on('change', 'input[type="file"]',function(){
	selectedFile = event.target.files[0];
}

function CargarFoto(){
	var fileName = selectedFile.name;
	var NombreProducto = id;
	var storageRef = firebase.storage().ref('/Productos/'+  id + '/' + fileName);
	var uploadTask = storageRef.put(selectedFile);
	var key_Producto;


	uploadTask.on('state_changed', function(snapshot){
  	  // Observe state change events such as progress, pause, and resume
  	  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	 /* var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
	    case firebase.storage.TaskState.PAUSED: // or 'paused'
	      console.log('Upload is paused');
	      break;
	    case firebase.storage.TaskState.RUNNING: // or 'running'
	      console.log('Upload is running');
	      break;
	    }*/
	}, function(error) {
  		window.alert("Error al subir la imagen, intenta de nuevo");
	}, function() {
  		var downloadURL = uploadTask.snapshot.downloadURL;
  		var firebaseRef = firebase.database().ref("PRODUCTOS");
  		firebaseRef.orderByChild('id').equalTo(id).on("child_added", function(snapshot) {
				key_Producto = snapshot.key
		});

  		setTimeout(function(){
	  		console.log(firebaseRef.child(key_Producto));
	  		firebaseRef.child(key_Producto).update({
	  			imagen: downloadURL
	  		});
  		}, 4000);
   		//console.log(downloadURL);
   		window.alert("Foto Agregada Exitosamente");
	});
}


function PreviewPhoto(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function (e){
			$('#preview img').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

/*document.getElementById('input[type="file"]').onchange = function() {
	PreviewPhoto(this);
}*/
/*$(document).on('change', 'input[type="file"]',function(){
	PreviewPhoto(this);
})*/


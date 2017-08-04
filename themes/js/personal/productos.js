/*var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);*/

//var firebaseRef = firebase.database().ref();
//var firebaseAuth = firebase.auth();


  	var imagenes = '<div class="tab-pane  active" id="blockView">'
  		           + '<ul class="thumbnails">';
  	var rows = 1;
  	var foto_Url = [" ", " "];
  	var nombre = [" ", " "];
    var precio = [" ", " "];
    var descripcion = [" ", " "];
    var keyProducto = [" ", " "];
    //SI QUEREMOS AGREGAR MAS VALORES, PONERLOS ARRIBA
  	var refProductos = firebase.database().ref("PRODUCTOS");

  	for(var r = 0; r < rows; r++)
  	{
  		refProductos.orderByChild("id").limitToFirst(12).on("child_added", function(snapshot){
  			foto_Url.push(snapshot.val().foto);
  			nombre.push(snapshot.val().nombre);
        precio.push(snapshot.val().precio);
        descripcion.push(snapshot.val().descripcion);
        keyProducto.push(snapshot.key);
  		});
  	}

  	setTimeout(function(){
  	var j = 2;
  		while(j < foto_Url.length){

      imagenes += '<li class="span3">';
  		imagenes += '<div class="thumbnail">';
  		imagenes +=	'<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" style="width:200px;height:200px;" alt=""/>';
  		imagenes +=	'<div class="caption">';                                    
  		imagenes +=	'<h5>'+ nombre[j] +'</h5>';
  		imagenes +=	'<p>'+ descripcion[j] +'</p>';
  		imagenes +=	'<h4 style="text-align:center"><a class="btn" href="product_details.html"> <i class="icon-zoom-in"></i></a> <a class="btn" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')">Add to <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&dollar;'+precio[j]+'</a></h4>';
  		imagenes +=	'</div>';
  		imagenes +=	'</div>';
  		imagenes += '</li>';

  			j++;
  		}
      imagenes += '</ul>';
               +  '<hr class="soft"/>';
               +  '</div>';
  		document.getElementById("blockView").innerHTML = imagenes;
    }, 3000);

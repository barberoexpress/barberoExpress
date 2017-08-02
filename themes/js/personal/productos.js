var config = {
    apiKey: "AIzaSyD1UUijWvL3lVdaCNUBRVwS_tntGpBPCxM",
    authDomain: "barberoexpress-8c13c.firebaseapp.com",
    databaseURL: "https://barberoexpress-8c13c.firebaseio.com",
    projectId: "barberoexpress-8c13c",
    storageBucket: "barberoexpress-8c13c.appspot.com",
    messagingSenderId: "634083713883"
};
firebase.initializeApp(config);

//var firebaseRef = firebase.database().ref();
//var firebaseAuth = firebase.auth();


// LLAMADAS HTTP

  // GET  --> PETICIÓN



  //POST  --> INGRESO



  //UPDATE -->  ACTUALIZACIÓN
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	actualizar = false;
  	var imagenes = '<div class="tab-pane  active" id="blockView">'
  		           + '<ul class="thumbnails">';
  	var rows = 1;
  	var foto_Url = [" ", " "];
  	var nombre = [" ", " "];
    //SI QUEREMOS AGREGAR MAS VALORES, PONERLOS ARRIBA
  	var refProductos = firebase.database().ref("PRODUCTOS");

  	for(var r = 0; r < rows; r++)
  	{
  		refProductos.orderByChild("id").on("child_added", function(snapshot){
  			foto_Url.push(snapshot.val().foto);
  			nombre.push(snapshot.val().nombre);
  		});
  	}

  	setTimeout(function(){
  	var j = 2;
  		while(j < foto_Url.length){

        imagenes += '<li class="span3">';
  		imagenes +=               '<div class="thumbnail">';
                        //var link = foto_Url[j];
                        //console.log(link);
  		imagenes +=	              '<a href="product_details.html"><img src="'+foto_Url[j]+'" style="width:200px;height:200px;" alt=""/></a>';
  		imagenes +=	                 '<div class="caption">';
                          //var nombreFoto = nombre[j];
  		imagenes +=	                     '<h5>'+ nombre[j] +'</h5>';
  		imagenes +=	                     '<p> Tocamela toda </p>';
  		imagenes +=	                    '<h4 style="text-align:center"><a class="btn" href="product_details.html"> <i class="icon-zoom-in"></i></a> <a class="btn" href="#">Add to <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&euro;222.00</a></h4>';
  		imagenes +=	                 '</div>';
  		imagenes +=	            '</div>';
  			imagenes +=         '</li>';

  			// table += '<tr>';
  			// table += '<td>' + '<img src="themes/images/products/4.jpg" alt="Mountain View" style="width:60px;height:auto;">' + '</td>';
  			// table += '<td>' + caracteristicas[j] +'</td>';
  			// table += '<td>' + marca[j] + '</td>';
  			// table += '<td>' + botonCantidad + '</td>';
  			// table += '<td>' + precio[j] + '</td>';
  			// table += '<td>' + descuento[j] + '</td>';
  			// table += '<td>' + total + '</td>';
  			// table += '</tr>';
  			j++;
  		}
      imagenes += '</ul>';
               + '<hr class="soft"/>';
               + '</div>';
  		document.getElementById("blockView").innerHTML = imagenes;
    }, 3000);





  } else {
     console.log("Inicia seccion primero");
  }
});


  //DELETE   --> BORRAR

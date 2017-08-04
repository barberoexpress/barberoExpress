  

  var imagenes = '<ul class="thumbnails" id= "fotos_index">';
  var rows = 1;
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "]
  var keyProducto = [" ", " "];
  var descripcion = [" ", " "];
        //SI QUEREMOS AGREGAR MAS VALORES, PONERLOS ARRIBA
  var refProductos = firebase.database().ref("PRODUCTOS");

  for(var r = 0; r < rows; r++)
        {
          refProductos.orderByChild("id").on("child_added", function(snapshot){
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
            imagenes += '<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" style="width:200px;height:200px;" alt=""/>';
            imagenes += '<div class="caption">';                                    
            imagenes += '<h5>'+ nombre[j] +'</h5>';
            imagenes += '<p> Tocamela toda </p>';
            imagenes += '<h4 style="text-align:center"><a class="btn" href="product_details.html"> <i class="icon-zoom-in"></i></a> <a class="btn" href="#">Añadir <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&dollar;'+precio[j]+'</a></h4>';
            imagenes += '</div>';
            imagenes += '</div>';
            imagenes += '</li>';
            j++;
    }
      document.getElementById("fotos_index").innerHTML = imagenes + '</ul>';
    }, 3000)
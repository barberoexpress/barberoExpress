

  var imagenes = '<ul class="thumbnails" id= "fotos_index">';
  var rows = 1;
  var foto_Url = [" ", " "];
  var nombre = [" ", " "];
  var precio = [" ", " "]
  var keyProducto = [" ", " "];
  var descripcion = [" ", " "];
  var recomendado = [" ", " "];
        //SI QUEREMOS AGREGAR MAS VALORES, PONERLOS ARRIBA
  var refProductos = firebase.database().ref("PRODUCTOS");

  for(var r = 0; r < rows; r++)
        {
          refProductos.orderByChild("id").limitToFirst(8).on("child_added", function(snapshot){
            foto_Url.push(snapshot.val().foto);
            nombre.push(snapshot.val().nombre);
            precio.push(snapshot.val().precio);
            descripcion.push(snapshot.val().descripcion);
            recomendado.push(snapshot.val().recomendado);
            console.log(snapshot.val().recomendado);
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
            imagenes += '<h4 style="text-align:center"> </a>  <a class="btn btn-primary" h> &dollar;'+precio[j]+'</a></h4>';
            imagenes += '</div>';
            imagenes += '</div>';
            imagenes += '</li>';
            j++;
    }
      document.getElementById("fotos_index").innerHTML = imagenes + '</ul>';
    }, 3000);


    setTimeout(function(){
          var imagenes_referidos = '<div class="item active">' + '<ul class="thumbnails">';
          var j = 2;
          var No_productos = 0;
            while(j < recomendado.length){
              if(recomendado[j] == true){
                if(No_productos == 4){
                  No_productos = 0;
                  imagenes_referidos += '</ul>' + '</div>';
                  imagenes_referidos += '<div class="item">' + '<ul class="thumbnails">';
                }
                imagenes_referidos += '<li class="span3">';
                imagenes_referidos += '<div class="thumbnail">';
                imagenes_referidos += '<i class="tag"></i>';
                imagenes_referidos += '<img src="'+foto_Url[j]+'" onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')" style="width:200px;height:200px;" alt=""/>';
                imagenes_referidos += '<div class="caption">';
                imagenes_referidos += '<h5>'+ nombre[j] +'</h5>';
                imagenes_referidos += '<h4 onclick="Ir_producto('+"'"+ keyProducto[j]+"'"+')"><a class="btn"> Ver </a><span class="pull-right">$'+precio[j]+'</span></h4>';
                imagenes_referidos += '</div>';
                imagenes_referidos += '</div>';
                imagenes_referidos += '</li>';
                j++;
                No_productos++;
              }
            }
      document.getElementById("imagenes_recomendados").innerHTML = imagenes_referidos;
    }, 3000);

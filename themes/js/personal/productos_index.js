  var imagenes = '<ul class="thumbnails">';
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
                                    //onclick="Producto('+KeyProducto[j] +')"
      		imagenes +=	'<img src="'+foto_Url[j]+'" onclick="Producto('+keyProducto[j] +')" style="width:200px;height:200px;" alt=""/>';
      		imagenes +=	'<div class="caption">';                                    
      		imagenes +=	'<h5>'+ nombre[j] +'</h5>';
      		imagenes +=	'<p> Tocamela toda </p>';
      		imagenes +=	'<h4 style="text-align:center"><a class="btn" href="product_details.html"> <i class="icon-zoom-in"></i></a> <a class="btn" href="#">Add to <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">&euro;222.00</a></h4>';
      		imagenes +=	'</div>';
      		imagenes +=	'</div>';
      		imagenes += '</li>';

      			 /*<ul class="thumbnails"> ---> OK
        <li class="span3">
          <div class="thumbnail">
          <a  href="product_details.html"><img src="themes/images/products/6.jpg" alt=""/></a>
          <div class="caption">
            <h5>Product name</h5>
            <p> 
            Lorem Ipsum is simply dummy text. 
            </p>
           
            <h4 style="text-align:center"><a class="btn" href="product_details.html"> <i class="icon-zoom-in"></i></a> <a class="btn" href="#">Add to <i class="icon-shopping-cart"></i></a> <a class="btn btn-primary" href="#">$222.00</a></h4>
          </div>
          </div>
        </li>*/
      	j++;
  }
        /*imagenes += '</ul>';
                   + '<hr class="soft"/>';
                   + '</div>';
      		document.getElementById("blockView").innerHTML = imagenes;*/
  }, 3000);
      
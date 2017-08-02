# barberoExpress
Inicio SERIO del proyecto barberoExpress


## REQUERIMIENTOS DEL USUARIO
1) Modelo del producto
    - Nombre
    - ID
    - Foto
    - Precio
    - Descripción
    - GIF

2) Búsqueda del producto
    - Buscador
    - Lista de productos (precios, nombre, foto)

3) Carrito de compras
    - Nombre
    - Precio por producto
    - Precio total

4) Home
    - Imagen publicitaria (posible inversión)
    - Productos populares
    - Recomendados
    - Nuevos
    - Crear cuenta
    - Iniciar sesión
    - Carro compras
    - Buscador

5) Crear cuenta
    - Nombre
    - Teléfono
    - Dirección (física, google maps)

## REQUERIMIENTOS DE LA BASE DE DATOS
1) USUARIO (redes sociales, independiente){
    - KeyUsuario{
      - Nombre
      - Teléfono
      - Dirección (física, google maps)
      - Foto
      - Carrito compra {
          KeyProducto: {
            idCompra, Nombre, Precio
          }
        }
      - Historial de compras{
          keyCompra {
            fechaCompra, idProducto, nombre, precio
          }
      }
    }

2) Producto {
    - KeyProducto{
      - Nombre
      - Precio
      - id
      - Foto
      - GIFT
      - Descripcion
      - NumCompras
    }
   }

### REUNIONES
#### PRIMERA REUNIÓN
    Se elige el modelo de plantilla que se va a desarrollar

#### SEGUNDA REUNIÓN
    - Click Producto  --> Pantalla producto     [JOSE]
    - Búsqueda (Final)
      - Indice invertido
      - Más buscados
    - Productos en Home                         [CRISTIAN]
    - Agregar atributos en Productos            [RAMON]
      - # ventas
      - + vendidos
    - Estructurar BackEnd. (Final)
    - Arreglar barra de inicio                  [JOSE]
    - Productos ofertas especiales              [CRISTIAN]
    - Paginación
    - Mejorar el Front (Final)

### GRUPO DE TRABAJO
    - Santiago R. Alvarez Gomez
    - Cristian Franco Bedoya
    - Jose M. Mira Barrientos

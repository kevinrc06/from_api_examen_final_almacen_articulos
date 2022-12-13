//funciones js para el modulo de usuarios
const urlApi3 = "http://localhost:9000";//colocar la url con el puerto



function listarArticulos(){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/articulos",settings)
    .then(response => response.json())
    .then(function(data){
        
            var articulos = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de articulos</h1>
                </div>
                  
                <a href="#" onclick="registerArticulo('true')"  class="btn btn-outline-success"><i class="fa-solid fa-cart-plus"></i></a>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">codigo</th>
                        <th scope="col">Name</th>
                        <th scope="col">descripcion</th>
                        <th scope="col">fecha_registro</th>
                        <th scope="col">stock</th>
                        <th scope="col">categoria</th>
                        <th scope="col">usuario</th>
                        <th scope="col">precio_venta</th>
                        <th scope="col">precio_compra</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;
            for(const articulo of data){
                //console.log(usuario.correo)
                articulos += `
                
                        <tr>
                            <th scope="row">${articulo.id}</th>
                            <td>${articulo.codigo}</td>
                            <td>${articulo.nombre}</td>
                            <td>${articulo.descripcion}</td>
                            <td>${articulo.fecha_registro}</td>
                            <td>${articulo.stock}</td>
                            <td>${articulo.categoria.nombre}</td>
                            <td>${articulo.usuario.nombre}</td>
                            <td>${articulo.precio_venta}</td>
                            <td>${articulo.precio_compra}</td>
                            <td>
                            <button type="button" class="btn btn-outline-danger" 
                            onclick="eliminaArticulo('${articulo.codigo}')">
                                   <i class="fa-solid fa-trash"></i>
                            </button>
                            <a href="#" onclick="verModificarArticulo('${articulo.codigo}')" class="btn btn-outline-warning">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a href="#" onclick="verArticulo('${articulo.codigo}')" class="btn btn-outline-info">
                                <i class="fa-solid fa-eye"></i>
                            </a>
                            </td>
                        </tr>
                    `;
                
            }
            articulos += `
            </tbody>
                </table>
            `;
            document.getElementById("datos").innerHTML = articulos;
    })
}

function eliminaArticulo(codigo){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/articulo/"+codigo,settings)
    .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        listarArticulos();
        alertas("Se ha eliminado el usuario exitosamente!",2)
      })
}

function verModificarArticulo(codigo){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/articulo/codigo/"+codigo,settings)
    .then(response => response.json())
    .then(function(articulo){
            var cadena='';
            if(articulo){    
                var date =articulo.fecha_registro+"";
                //console.log(date)
                var dato =date.split('T');            
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-pen"></i> Modificar Articulo</h1>
                </div>
              
                <form action="" method="post" id="myForm">
                <input type="hidden" name="id" id="id" value="${articulo.id}">
                <label for="codigo" class="form-label">Codigo</label>
                <input type="text" class="form-control" name="codigo" id="codigo" required value="${articulo.codigo}"> <br>
                <label for="nombre"  class="form-label">Nombre</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required value="${articulo.nombre}"> <br>
                <label for="descripcion"  class="form-label">Descripcion</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" required value="${articulo.descripcion}"> <br>
                
                <label for="fecha_registro"  class="form-label">Fecha de registro</label>
                <input type="date" class="form-control" name="direccion" id="fecha_registro" required > <br>
                <div id="prueba" onclick="categoria()" ">
                <label  for="categoria">Escoja categoria</label>
                <select  class="form-control" id="id_categoria" name="id_categoria" >
                <option class="FORM-CONTROL" selected disable value="">Seleccione</option>
                </select>
                </div>
                 <br>
                <label for="stock"  class="form-label">Stock</label>
                <input type="number" class="form-control" name="stock" id="stock" value="${articulo.stock}"> <br>
                <label for="precio_venta"  class="form-label">Precio venta</label>
                <input type="number" class="form-control" name="precio_venta" id="precio_venta" value="${articulo.precio_venta}" > <br>
                <label for="precio_compra" class="form-label">precio compra</label>
                <input type="number" class="form-control" name="precio_compra" id="precio_compra" required value="${articulo.precio_compra}"> <br>
                    <button type="button" class="btn btn-outline-warning" 
                        onclick="modificarArticulo('${articulo.codigo}')">Modificar
                    </button>
                </form>`;
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

async function modificarArticulo(codigo){
    validaToken();
    let userid= "1";
    let nombre = document.querySelector('#myForm #nombre').value;
    let descripcion = document.querySelector('#myForm #descripcion').value;
    let fecha_registro = document.querySelector('#myForm #fecha_registro').value;
    let categoria = document.querySelector('#myForm #id_categoria').value;
    let stock = parseInt(document.querySelector('#myForm #stock').value) ;
    let precio_venta =parseFloat(document.querySelector('#myForm #precio_venta').value);
    let precio_compra = parseFloat(document.querySelector('#myForm #precio_compra').value);
    var jsonData = {
        "codigo":codigo,
        "nombre":nombre,
        "descripcion":descripcion,
        "fecha_registro":fecha_registro,
        "stock":stock,
        "categoria":{
            "id_categoria":categoria
        },
        "usuario":{
            "id":userid
        },
        
        "precio_venta":precio_venta,
        "precio_compra":precio_compra,
        };
        console.log(jsonData);
    const request = await fetch(urlApi3+"/articulo/"+codigo, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    
        listarArticulos();
        alertas("Se ha modificado el articulo exitosamente!",1)
        document.getElementById("contentModal").innerHTML = '';
        var myModalEl = document.getElementById('modalUsuario')
        var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
        modal.hide();

}

function verArticulo(codigo){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi3+"/articulo/codigo/"+codigo,settings)
    .then(response => response.json())
    .then(function(articulo){
            var cadena='';
            if(articulo){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Articulo</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">codigo: ${articulo.codigo}</li>
                    <li class="list-group-item">nombre: ${articulo.nombre}</li>
                    <li class="list-group-item">descripcion: ${articulo.descripcion}</li>
                    <li class="list-group-item">stock: ${articulo.stock}</li>
                    <li class="list-group-item">categoria: ${articulo.categoria.nombre}</li>
                    <li class="list-group-item">usuario: ${articulo.usuario.nombre}</li>
                    <li class="list-group-item">precio venta: ${articulo.precio_venta}</li>
                    <li class="list-group-item">precio compra: ${articulo.precio_compra}</li>
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

function alertas(mensaje,tipo){
    var color ="warning";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta =`<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                    <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
    document.getElementById("alerta").innerHTML = alerta;
}

/*function registerForm(auth=false){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Usuario</h1>
            </div>
              
            <form action="" method="post" id="myFormReg">
                <input type="hidden" name="id" id="id">
                <label for="nombre" class="form-label">First Name</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
                <label for="apellidos"  class="form-label">Last Name</label>
                <input type="text" class="form-control" name="apellidos" id="apellidos" required> <br>
                <label for="documento"  class="form-label">document</label>
                <input type="text" class="form-control" name="documento" id="documento" required> <br>
                <label for="correo" class="form-label">correo</label>
                <input type="correo" class="form-control" name="correo" id="correo" required> <br>
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarUsuario('${auth}')">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}*/
function registerArticulo(auth=false){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-square-plus"></i> Registrar Articulo</h1>
            </div>
              
            <form action="" method="post" id="myForm7">
            <input type="hidden" name="id" id="id">
            <label for="codigo" class="form-label">Codigo</label>
            <input type="text" class="form-control" name="codigo" id="codigo" required> <br>
            <label for="nombre"  class="form-label">Nombre</label>
            <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
            <label for="descripcion"  class="form-label">Descripcion</label>
            <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>
            <label for="fecha_registro"  class="form-label">Fecha registro</label>
            <input type="date" class="form-control" name="fecha_registro" id="fecha_registro" > <br>
            <label for="stock"  class="form-label">Stock</label>
            <input type="number" class="form-control" name="stock" id="stock" > <br>
            <div id="prueba" onclick="categoria()">
                <label  for="categoria">Escoja categoria</label>
                <select  class="form-control" id="id_categoria" name="id_categoria">
                 <option class="FORM-CONTROL" selected disable value="">Seleccione</option>
                </select>
            </div>
            <br>
            <label for="precio_venta"  class="form-label">Precio venta</label>
            <input type="number" class="form-control" name="precio_venta" id="precio_venta" > <br>
            <label for="precio_compra" class="form-label">precio compra</label>
            <input type="number" class="form-control" name="precio_compra" id="precio_compra" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="registrarArticulo('${auth}')">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            document.getElementById("exampleModalLabel").innerHTML = "Gestión de Articulos";
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}

/*async function registrarUsuario(auth=false){
    var myForm = document.getElementById("myFormReg");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    console.log("data user ",jsonData);
    const request = await fetch(urlApi3+"/usuario", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(function(respuesta){
        console.log("respuesta peticion", respuesta)
    });
    if(auth){
        listarUsuarios();
    }
    alertas("Se ha registrado el usuario exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}*/
async function categoria()
{
        let categoria1 = document.querySelector('#id_categoria');
        var settings={
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
        }
        fetch(urlApi3+"/categorias",settings)
        .then((response) => response.json())
        .then(function (data) {
            let template = ''
            for(const categorias of data){
                template += "<option value="+categorias.id_categoria+">"+categorias.nombre+"</option>"
            }
           categoria1.innerHTML = template
        
        })
        .catch(function (error) {
            console.log(error);
        });
        document.getElementById('prueba').onclick = "";
}
async function registrarArticulo(auth=false){
   validaToken();    
    let userid= "1";
    let codigo = document.querySelector('#myForm7 #codigo').value;
    let nombre = document.querySelector('#myForm7 #nombre').value;
    let descripcion = document.querySelector('#myForm7 #descripcion').value;
    let fecha_registro = document.querySelector('#myForm7 #fecha_registro').value;
    let categoria = document.querySelector('#myForm7 #id_categoria').value;
    let stock = parseInt(document.querySelector('#myForm7 #stock').value) ;
    let precio_venta =parseFloat(document.querySelector('#myForm7 #precio_venta').value);
    let precio_compra = parseFloat(document.querySelector('#myForm7 #precio_compra').value);
    
    var jsonData = {
        "codigo":codigo,
        "nombre":nombre,
        "descripcion":descripcion,
        "fecha_registro":fecha_registro,
        "stock":stock,
        "categoria":{
            "id_categoria":categoria
        },
        "usuario":{
            "id":userid
        },
        "precio_venta":precio_venta,
        "precio_compra":precio_compra,
        };
        console.log(jsonData);
            const request = await fetch(urlApi3+"/articulo", {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(function(respuesta){
                console.log("respuesta peticion", respuesta)
            });
            if(auth){
                listarArticulos();
            }
            alertas("Se ha registrado la categoria exitosamente!",1)
            document.getElementById("contentModal").innerHTML = '';
            var myModalEl = document.getElementById('modalUsuario')
            var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
            modal.hide();
      /*listarArticulos();
      alertas("Se ha registrado el articulo exitosamente!",1)
      document.getElementById("contentModal").innerHTML = '';
      var myModalEl = document.getElementById('modalUsuario')
      var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
      modal.hide();*/

     
}

function modalConfirmacion(texto,funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}

function salir(){
    localStorage.clear();
    location.href = "index.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}



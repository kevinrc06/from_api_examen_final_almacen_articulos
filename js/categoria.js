// funciones js para el modelo de usuario 

const urlApi2 = "http://localhost:9000";//colocar la url con el puerto



function listarCategorias(){
    validaToken();
    
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi2+"/categorias",settings)
    .then(response => response.json())
    .then(function(data){
        
            var categorias = '';
            for(const categoria of data){
                //console.log(usuario.correo)
                categorias += `
    
                <tr>
 
                        <th scope="row">${categoria.id}</th>
                        <td>${categoria.nombre}</td>
                        <td>${categoria.descripcion}</td>

                        <td>
                        <button type="button" class="btn btn-outline-danger" 
                        onclick="eliminaCategoria('${categoria.id}')">
                            <i class="fa-solid fa-user-minus"></i>
                        </button>
                        <i class= "fas fa-edit" onclick="eliminaCategoria('${categoria.id}')" ></i>
                        <a href="#" onclick="verModificarCategoria('${categoria.id}')" class="btn btn-outline-warning">
                            <i class="fa-solid fa-user-pen"></i>
                        </a>
                        <a href="#" onclick="verCategoria('${categoria.id}')" class="btn btn-outline-info">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                        
                        <button type="button" class="btn btn-info" onclick="registerForm2()">registrar categoria</button>
                        </td>
                        
                        <br/>
                </tr>

                
                `;
                
            }
            document.getElementById("datos").innerHTML = categorias;
            
    })
}





function verCategoria(id){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi2+"/categoria/"+id,settings)
    .then(response => response.json())
    .then(function(categoria){
            var cadena='';
            if(categoria){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Categoria</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Nombre: ${categoria.nombre}</li>
                    <li class="list-group-item">descripcion: ${categoria.descripcion}</li>
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

function alertas(mensaje,tipo){
    var color ="";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta =`<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">
                    <strong><i class="fa-solid fa-triangle-exclamation"></i></strong>
                        ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
    document.getElementById("alerta").innerHTML = alerta;
}


function registerForm2(){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Categoria</h1>
            </div>
              
            <form action="" method="post" id="myForm4">
                <input type="hidden" name="id" id="id">
                <label for="nombre" class="form-label">First Name</label>
                <input type="text" class="form-control" name="nombre" id="nombre" required> <br>
                <label for="descripcion"  class="form-label">Last Name</label>
                <input type="text" class="form-control" name="descripcion" id="descripcion" required> <br>

                <button type="button" class="btn btn-outline-info" onclick="registrarCategoria()">Registrar</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
}

async function registrarCategoria(){
    var myForm = document.getElementById("myForm4");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApi2+"/categoria", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });

    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
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
//para acceder a el carrito se pueede usar cualquiera  de las siguientes
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito');
//el tbody donde se van a mostrar los cursos
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
//todo el listado de cursos donde esta cada curso a clickear
const listCursos = document.querySelector('#lista-cursos');
//boton de vaciar el carrito
const vaciaCarritoBTN = document.querySelector('#vaciar-carrito');

//array de los cursos
let articulosCarrito=[];

RegistrarEventListeners();
//funcion donde se registran los event listeners
function RegistrarEventListeners(){
    listCursos.addEventListener('click',agregarCurso);
    carrito.addEventListener('click', eliminaCurso);
    vaciaCarritoBTN.addEventListener('click',vaciarCarrito);
}



// funciones
function agregarCurso(event){
    event.preventDefault();
    if(event.target.classList.contains('agregar-carrito')){
        //viaja a dos padres arriba
        const cursoSeleccionado= event.target.parentElement.parentElement;
        leerDatosCursoSelec(cursoSeleccionado);
    }
}

function leerDatosCursoSelec(cursoSelected){
    const cursoInfo= {
        nombre: cursoSelected.querySelector('p').textContent,
        imagen: cursoSelected.querySelector('img').src,
        precio:cursoSelected.querySelector('.precio span').textContent,
        id: cursoSelected.querySelector('a').getAttribute('data-id'),
        cantidad:1,
    }
    //si el articulo a agregar ya se encuentra en el carrito
    existe = articulosCarrito.some(c=> c.id === cursoInfo.id);

    if(existe){
        cursos = articulosCarrito.map(c=>{ //crea una copia del array original
            //c es la referencia de cursos
            if(c.id===cursoInfo.id){//retorna curso duplicado actualizado
                c.cantidad++;
                // c.precio=c.precio*2;
                return c;
            }else{//retorna los que no son actualizados
                return c;
            }
        });
        articulosCarrito=[...cursos];
    }
    else{
        //agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, cursoInfo];
    }

    console.log(articulosCarrito);
    CarritoHTML();
}

//Carrito html
function CarritoHTML(){
    limpiar();
    articulosCarrito.forEach(curso=>{
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${curso.imagen}" width="100px"/>
        </td>
        <td>
            ${curso.nombre}
        </td>
        <td>
            ${curso.precio}"
        </td>
        <td>
            ${curso.cantidad}
        </td>
        <td>
            <a href="#" data-id="${curso.id}" class="borrar-curso">X<a/>
        </td>
    `;
    contenedorCarrito.appendChild(row);
    });
    console.log(contenedorCarrito);

    //cada vez que se agrega uno nuevo se duplican
    //cada vez que se vaya a agregar un nuevo elemento limpiar
}

//limpiar el html antes de agregar nuevo
function limpiar(){
    contenedorCarrito.innerHTML='';
}


//eliminar elemento del acarrito
function eliminaCurso(event){
    event.preventDefault();
    if(event.target.classList.contains('borrar-curso')){
        const idCursoBorrar= event.target.getAttribute('data-id');
        articulosCarrito= articulosCarrito.filter(curso=>curso.id!=idCursoBorrar);
        console.log(articulosCarrito);
    }
    CarritoHTML();
}


//vaciar carrito
function vaciarCarrito(){
    articulosCarrito=[];
    limpiar();
    console.log(articulosCarrito);
}
let myData = [];
fetch("./setting.json")
.then ((response)=>response.json())
.then ((data)=>{
    myData = data;
    const recorridoProductos = ()=>{
        data.forEach((producto)=>{
            const card = document.createElement ("div");
            card.innerHTML = `
            <img id="move-${producto.id}" width="100" src=${producto.imagenUrl} alt=${producto.nombre}>
            <h2>${producto.nombre}</h2>
            <h3>${producto.precio} USD</h3>
            <button id="select-${producto.id}">Select</button>
            <hr/>
            `;
            bagsContainer.append(card); //agrego el contenedor al html
    
            const selectButton = document.getElementById (`select-${producto.id}`);
            selectButton.addEventListener("click", ()=>{
                agregarAlCarrito(producto.id);
            })//creas la funcion en el boton y al clikear se agrega al carrito
    
            const imgChange = document.getElementById(`move-${producto.id}`);
            imgChange.addEventListener("mouseover",()=>{
                imgChange.src = producto.imagenUrlChange;
            })
            imgChange.addEventListener("mouseout", ()=>{
                imgChange.src = producto.imagenUrl;
            })
        })
    }
    recorridoProductos();

})


const bagsContainer = document.getElementById ("bagsContainer");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoContainer = document.getElementById ("carritoHtml");

const totall = () =>{
    const totalR = carrito.reduce ((accum,item)=>(accum + item.cantidad*item.precio),  0);
    carritoContainer.innerHTML;
    const total = document.createElement("li");
    total.innerHTML = ` 
    <p>Total: ${totalR}</p>
    `;
    carritoContainer.append(total);
}; 

//recorrer el carrito con los itemes agregados y mostrarlo
const recorridoCarrito = () =>{
    carritoContainer.innerHTML="";
    console.log ("carrito")
    carrito.forEach (item =>{

        const li = document.createElement("li");
        li.innerHTML += ` 
        <p>${item.nombre}, cantidad: ${item.cantidad}, precio: ${item.precio * item.cantidad} USD</p>
        <button id="vaciar-${item.id}">Eliminar producto</button>
        `;
        carritoContainer.append(li);

        const deleteButton = document.getElementById (`vaciar-${item.id}`);
        deleteButton.addEventListener("click", ()=>{
         eliminarProducto(item);
         Swal.fire({
            icon: 'error',
            title: 'DELETE',
            text: 'You have just delete the item!',
          })

        });
    });

   totall ()
}


//agregar al carrito o iniciar item si es que no esta
const agregarAlCarrito = (productoId) =>{
    const item = myData.find((myData)=>myData.id === productoId);
    const productoEnCarrito = carrito.some((item)=> item.id===productoId);
    console.log(productoEnCarrito);

    if (productoEnCarrito){
        item.cantidad++;
    }else {
        item.cantidad = 1;
        carrito.push(item);
    }
    localStorage.setItem("carrito",JSON.stringify(carrito));
    recorridoCarrito ();
}

//funcion de eliminar prodcuto
const deleteCarrito = (productoId) => {
    const item = myData.find((item)=>item.id === productoId);

    if (item.cantidad === 1){
        eliminarProducto (item.id);
    } else {
        item.cantidad--;
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    recorridoCarrito();
}

const eliminarProducto = (item) => {
    carrito = carrito.filter ((prod)=>prod.id !== item.id);
    localStorage.setItem ("carrito", JSON.stringify    (carrito));
    recorridoCarrito ();
};
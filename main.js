let myData
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


const bagsContainer = document.getElementById("bagsContainer")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoContainer = document.getElementById ("carrito");


//recorrer el carrito con los itemes agregados y mostrarlo
const recorridoCarrito = () =>{
    carritoContainer.innerHTML="";
    carrito.forEach (item =>{
        const carritoFinal = document.createElement("ul");
        carritoFinal.innerHTML = ` 
        <li>${item.nombre},cantidad: ${item.cantidad}, precio: ${item.precio * item.cantidad}</li>
        <button id="vaciar-${item.id}">Eliminar producto</button>
        `;
        const deleteButton = document.getElementById (`vaciar-${item.id}`);
        deleteButton.addEventListener("click", ()=>{
             eliminarProducto();
        })
        carritoContainer.append(carritoFinal);
    })
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
agregarAlCarrito ();

//funcion de eliminar prodcuto
const deleteCarrito = (productoId) => {
    const item = myData.find((myData)=>myData.id === productoId);
    if (data.cantidad === 1){
        eliminarProducto (myData.id);
    } else {
        producto.cantidad--;
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    recorridoCarrito();
}
const eliminarProducto = (id) => {
    carrito = carrito.filter ((myData)=>myData.id !== id);
    localStorage.setItem ("carrito", JSON.stringify(carrito));
    recorridoCarrito ();
};
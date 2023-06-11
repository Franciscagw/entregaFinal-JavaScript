const productos = [
    {id:0, nombre: "Medium Dior Ammi Bag",precio: 3500, imagenUrl:"../media/bags/ammi-adel.avif", imagenUrlChange: "../media/bags/ami-atras.avif"},
    {id:1, nombre: "Saddle Bag with Strap",precio: 5800, imagenUrl:"../media/bags/bandolera-saddle.jpg.avif", imagenUrlChange: "../media/bags/bandolera-saddle-atras.jpg.avif"},
    {id:2, nombre: "Large Dior Book Tote",precio: 3000, imagenUrl: "../media/bags/book-tote-grande-adelante.avif",imagenUrlChange: "../media/bags/book-tote-grande-atras.avif"},
    {id:3, nombre: "CD Lounge Bag Blue Dior Oblique Jacquard",precio: 2600, imagenUrl: "../media/bags/cd-lounge-adel.avif",imagenUrlChange: "../media/bags/cd-lounge-arri.avif"},
    {id:4, nombre: "Mini Lady Dior Bag",precio: 5100, imagenUrl: "../media/bags/mini-lady-dior-adelant.avif",imagenUrlChange: "../media/bags/mini-lady-dior-atras.avif"},
    {id:5, nombre: "Small 30 Montaige Bag",precio: 2900, imagenUrl: "../media/bags/montaige-adel.avif",imagenUrlChange: "../media/bags/montaige-atras.avif"},
    {id:6, nombre: "Small Dior Key Bag",precio: 4200, imagenUrl: "../media/bags/key-adel.avif",imagenUrlChange: "../media/bags/key-atras.avif"},
];




const bagsContainer = document.getElementById("bagsContainer")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoContainer = document.getElementById ("carrito");


//recorro el array de los productos y los presento en el html
const recorridoProductos = () =>{
    productos.forEach (producto =>{
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
recorridoProductos ();


//recorrer el carrito con los itemes agregados y mostrarlo
const recorridoCarrito = () =>{
    carritoContainer.innerHTML="";
    carrito.forEach (item =>{
        const carritoFinal = document.createElement("ul");
        carritoFinal.innerHTML = ` 
        <li>${item.nombre},cantidad: ${item.cantidad}, precio: ${item.precio * item.cantidad}</li>
        <button id="vaciar-${item.id}">Eliminar producto</button>
        `;
       const deleteButton = document.getElementById (`vaciar${item.id}`);
       deleteButton.addEventListener("click", ()=>{
            eliminarProducto();
        })
        carritoContainer.append(carritoFinal);
    })
}
//agregar al carrito o iniciar item si es que no esta
const agregarAlCarrito = (productoId) =>{
    const item = productos.find((producto)=>producto.id === productoId);
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
/*const deleteCarrito = (productoId) => {
    const item = productos.find((producto)=>producto.id === productoId);
    if (producto.cantidad === 1){
        eliminarProducto (producto.id);
    } else {
        producto.cantidad--;
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    recorridoCarrito();
}*/
const eliminarProducto = (id) => {
    carrito = carrito.filter ((producto)=>producto.id !== id);
    localStorage.setItem ("carrito", JSON.stringify(carrito));
    recorridoCarrito ();
}
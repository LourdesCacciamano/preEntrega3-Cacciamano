let compraNuevo = "";
const DateTime = luxon.DateTime;

class Producto {
    constructor(flor, color, cantidad, id ) {
        this.flor = flor;
        this.color = color;
        this.cantidad = cantidad;
        this.id = id;
        this.precio = this.obtenerPrecio();
     
    }

    
    obtenerPrecio() {

        if((this.flor === "ROSAS") || (this.flor === "ROSA") || (this.flor === "rosas") || (this.flor === "rosa")) {
            return 300;
        } else if((this.flor === "ALSTROEMERIAS") || (this.flor === "ALSTROEMERIA")|| (this.flor === "alstroemerias") || (this.flor === "alstroemeria")) {
            return 100;
        } else if((this.flor === "GERBERAS") || (this.flor === "GERBERA") || (this.flor === "gerberas") || (this.flor === "gerbera")) {
            return 250;
        } else{
            return 0;
        }
    }
}

const horaActual = document.getElementById("horaActual");
setInterval(() => {
    const tiempo = new Date();
    let hora = tiempo.getHours().toString().padStart(2,"0");
    let minuto = tiempo.getMinutes().toString().padStart(2,"0");
    let segundo = tiempo.getSeconds().toString().padStart(2,"0");

    horaActual.innerHTML = `
    ${hora}:${minuto}:${segundo}
    `;
})


class ticketCompra{
    constructor(tienda, flor) {
        this.tienda = tienda;
        this.flor = flor;
    
    }

    carritoCompra(){

        const carritoDeCompra = document.getElementById("carritoDeCompra");
        carritoDeCompra.classList = "row row-cols-md-2 ";
        carritoDeCompra.innerHTML = "";

        const contenedorFinalizarCompra = document.createElement("div");
        contenedorFinalizarCompra.classList = "row row-cols-md-2 ";
        

        this.flor.map(flor => {
            const columnas = document.createElement("div");
            columnas.classList = "col";

            const div = document.createElement("div");
            div.classList = "card animate__animated animate__flipInY";

            const principal = document.createElement("h4");
            principal.innerHTML = `${flor.flor.toUpperCase()} -> ${flor.color}`;
            principal.classList = "card-header";
           

            const main = document.createElement("div");
            main.classList = " card-body";
           
            const cant = document.createElement("h5");
            cant.innerHTML = `Cantidad: ${flor.cantidad}`;

            const precio = document.createElement("h5");
            precio.innerHTML = `Precio: $ ${flor.precio}`;

            const final = document.createElement("h4");
            final.innerHTML = `Precio Total: $ ${flor.precio*flor.cantidad}`;
            final.classList = "precioFinal";

            const id = document.createElement("p");
            id.innerHTML = `ID: ${flor.id}`;
           

            const eliminar = document.createElement("button");
            eliminar.classList = "btnEliminar";
            eliminar.innerHTML = `Eliminar`;
            eliminar.addEventListener("click", () => {
            this.eliminarCompra(flor.id);
             this.carritoCompra();
            });
            

            div.appendChild(principal);
            main.append(id);
            main.appendChild(cant);
            main.appendChild(precio);
            main.appendChild(final);
            main.appendChild(eliminar);
            div.appendChild(main);
            columnas.appendChild(div);
            carritoDeCompra.appendChild(columnas);
            carritoDeCompra.appendChild(contenedorFinalizarCompra);

            console.log(flor);
        })

     
        const resumen = document.createElement("button");
        resumen.classList = "btnResumenCompra";
        resumen.innerHTML = "Resumen de la Compra";
        resumen.addEventListener("click", () => {
        this.resumenCompra();
        });
         carritoDeCompra.appendChild(resumen);

                
        const infoCompra = document.createElement("div");
        infoCompra.id = "infoCompra";
        infoCompra.classList = "resumen";

        carritoDeCompra.appendChild(infoCompra);
    
        const finalizar = document.createElement("button");
        finalizar.innerHTML = `COMPRAR`;
        finalizar.classList = "btnComprar";
        finalizar.addEventListener("click", () => {
            this.finalizarCompra();
        });

        carritoDeCompra.appendChild(finalizar);
     
    }

    agregarCompra(flores) {
         if(flores.flor === "" || flores.color === "" || flores.cantidad === "") {
            Toastify({
                text : "¡Debes completar TODOS los campos requeridos!",
                duration : 5000,
                gravity: "top",
                position: "right",
                style: {
                    background: "#7D938A",
                    color: "#fdca40",
                    width:"300px",
                    height:"80px",
                    borderRadius: "15px",
                    textAlign: "center",
                    fontSize: "20px",
                }
            }).showToast();
            return;
        } 

        fetch("../json/data.json")
        .then((response) => response.json())
        .then((data) => {
            const productoEncontrado = data.find(
                (producto) => 
                producto.flor.toLowerCase() === flores.flor.toLowerCase() &&
                producto.color.toLowerCase() === flores.color.toLowerCase()
            );

             if(productoEncontrado) {
                flores.id = Math.round(Math.random()*20);
                this.flor.push(flores);
                localStorage.setItem("compra", JSON.stringify(this));
                document.getElementById("tipoDeFlor").value = "";
                document.getElementById("colorDeFlor").value = "";
                document.getElementById("cantidadDeFlores").value = "";

                this.carritoCompra();

             } else{
                Toastify({
                    text: "No hay Stock del producto ingresado",
                    duration: 5000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "#7D938A",
                        color: "#fdca40",
                        width: "300px",
                        height: "80px",
                        borderRadius: "15px",
                        textAlign: "center",
                        fontSize: "20px",
                    },
                }).showToast();

                document.getElementById("tipoDeFlor").value = "";
                document.getElementById("colorDeFlor").value = "";
                document.getElementById("cantidadDeFlores").value = "";
             }

        })

       .catch((error) => {
        console.log("Error al realizar la consulta a la API:", error);
       })
    } 


    eliminarCompra(tipoCompra){
        swal.fire({
            title: "Eliminar Producto",
            icon:"question",
            iconColor: "#99582a",
            text: "¿Seguro que deseea Eliminar este Producto?",
            showCancelButton : true,
            confirmButtonText:"ELIMINAR",
            cancelButtonText:"CANCELAR",
            confirmButtonColor: "#80b918",
            cancelButtonColor:"#df2935",
            padding: "15px",
            width: "350px",
            color:"#450920",
            background: "#ffe45e",
        }).then((result) => {
            if(result.isConfirmed){
                swal.fire({
                    title: "Producto Eliminado",
                    icon:"success",
                    iconColor: "#020202",
                    text:"El Producto fue Eliminado del Carrito",
                    confirmButtonColor: "#020202",
                    padding: "15px",
                    width: "400px",
                    color:"#343a40",
                    background: "#16db65",
                }) .then(() => {
                        this.flor = this.flor.filter(flor => flor.id !== tipoCompra);
                        localStorage.setItem("compra", JSON.stringify(this));
                        this.carritoCompra();
                });

                   
            } else{
                swal.fire({
                    title: "Cancelado",
                    icon:"error",
                    iconColor: "#020202",
                    text:"El Producto NO fue Eliminado del Carrito",
                    confirmButtonColor: "#020202",
                    padding: "15px",
                    width: "400px",
                    color:"#020202",
                    background: "#bf0603",
                })

            }
        })

    }

    eliminarCarritoDeCompra(){
        swal.fire({
            title: "Eliminar Carrito",
            icon:"question",
            iconColor: "#99582a",
            text: "¿Seguro que deseea Eliminar todos los productos del Carrito?",
            showCancelButton : true,
            confirmButtonText:"ELIMINAR",
            cancelButtonText:"CANCELAR",
            confirmButtonColor: "#80b918",
            cancelButtonColor:"#df2935",
            padding: "15px",
            width: "350px",
            color:"#450920",
            background: "#ffe45e",
        }).then((result) => {
            if(result.isConfirmed){
                swal.fire({
                    title: "Carrito Eliminado",
                    icon:"success",
                    iconColor: "#020202",
                    text:"Tu Carrito de compra fue Eliminado",
                    confirmButtonColor: "#020202",
                    padding: "15px",
                    width: "400px",
                    color:"#343a40",
                    background: "#16db65",
                }) .then(() => {

                    this.flor = [];
                    localStorage.removeItem("compra");
                    this.carritoCompra();                        
                });

                   
            } else{
                swal.fire({
                    title: "Cancelado",
                    icon:"error",
                    iconColor: "#020202",
                    text:"Tu Carrito de compra NO fue Eliminado",
                    confirmButtonColor: "#020202",
                    padding: "15px",
                    width: "400px",
                    color:"#020202",
                    background: "#bf0603",
                })

            }
        })
    }
    
    resumenCompra() {
        const precioTotal = this.calcularPrecioTotal();
        const productosComprados = this.flor
        .filter((flor) => flor.cantidad > 0)
        .map((flor) => `${flor.flor} (${flor.color}): ${flor.cantidad}`)
        
        if(productosComprados.length  === 0) {
            infoCompra.innerHTML = `
            <h3 class="prodComp">No hay productos en el resumen de compra.</h3>
        `;

        } else{

        infoCompra.innerHTML = `
                <h3 class="prodComp">Productos comprados:</h3>
                <ul>
                    ${productosComprados.map(producto => `<li class= "itemsResumen">${producto.toUpperCase()}</li>`).join("")}
                </ul>
                <h3 class= "totalResumen">Precio total: $ ${precioTotal}</h3>
                `;
        }
    

      
    }

    calcularPrecioTotal() {
        let total = 0;
        this.flor.forEach(flor => {
          total += flor.precio * flor.cantidad;
        });
        return total;
      }

      finalizarCompra() {
        const fecha = DateTime.now();
        swal.fire({
            title: "¿Seguro que quieres Finalizar la Compra?",
            icon:"question",
            iconColor: "#99582a",
            showCancelButton : true,
            confirmButtonText:"FINALIZAR",
            cancelButtonText:"CANCELAR",
            confirmButtonColor: "#80b918",
            cancelButtonColor:"#df2935",
            padding: "15px",
            width: "400px",
            color:"#450920",
            background: "#ffe45e",

        }) .then((result) => {
            if(result.isConfirmed){

                swal.fire({
                    title: "Compra Finalizada",
                    icon: "success",
                    iconColor: "#020202",
                    text: `¡MUCHAS GRACIAS POR SU COMPRA! ❤️ \n  ${fecha.toLocaleString(DateTime.DATE_FULL)}`,
                    timer: 15000,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#020202",
                    padding: "15px",
                    width: "400px",
                    color:"#343a40",
                    background: "#16db65",

                }).then(() => {
                    this.flor = [];
                    localStorage.removeItem("compra");
                    location.reload();
                });

               
                
            } else{
                swal.fire({
                    title: " Compra Cancelada",
                    icon: "error",
                    iconColor: "#020202",
                    text: "No se Realizo la Compra",
                    confirmButtonColor: "#020202",
                    padding: "15px",
                    width: "400px",
                    color:"#020202",
                    background: "#bf0603",
                })
            }
        })
      
      }
}


class Agregar{
    constructor(tipo){
        this.tipo=tipo;
    }

    crearFormulario(){
        switch(this.tipo){
            case "nuevo":
                const formularioFlor = document.createElement("form");
                formularioFlor.id = "formularioDeFlores";
                formularioFlor.className = "formularioAgregar";

          const tipoFlor = document.createElement("input");
          tipoFlor.id = "tipoDeFlor";
          tipoFlor.className = "input";
          tipoFlor.type = "text";
          tipoFlor.placeholder = "Ingrese el Tipo de Flor";
          
          
          const colorFlor = document.createElement("input");
          colorFlor.id = "colorDeFlor";
          colorFlor.className = "input";
          colorFlor.type = "text";
          colorFlor.placeholder = "Ingrese el Color";
      
          const cantidadFlor = document.createElement("input");
          cantidadFlor.id = "cantidadDeFlores";
          cantidadFlor.className = "input";
          cantidadFlor.type = "number";
          cantidadFlor.placeholder = "Ingrese la Cantidad";
      
          const btnAgregarFlor = document.createElement("input");
          btnAgregarFlor.id = "btnAgregarDeFlor";
          btnAgregarFlor.className = "btnAgregar";
          btnAgregarFlor.type = "submit";
          btnAgregarFlor.value = "AGREGAR";
  
          formularioFlor.appendChild(tipoFlor);
          formularioFlor.appendChild(colorFlor);
          formularioFlor.appendChild(cantidadFlor);
          formularioFlor.appendChild(btnAgregarFlor);
         
         document.getElementById("agregarForm").appendChild(formularioFlor);

            formularioFlor.addEventListener("submit", (e) => {
                e.preventDefault();
            const tipoDeFlor = document.getElementById("tipoDeFlor").value;
            const colorDeFlor = document.getElementById("colorDeFlor").value;
            const cantidadDeFlores = document.getElementById("cantidadDeFlores").value;
            const flores = new Producto(tipoDeFlor, colorDeFlor, cantidadDeFlores);
               compraNuevo.agregarCompra(flores);
               compraNuevo.carritoCompra();

            });
                break;
                
            default:
                break;
        }
    }
}

const iniciar = () => {
    compraGuardada = localStorage.getItem("compra");
    if(compraGuardada){
        compraGuardada = JSON.parse(compraGuardada);
        compraNuevo = new ticketCompra(compraGuardada.tienda, compraGuardada.flor);
        compraNuevo.carritoCompra();
    } else{
        compraNuevo = new ticketCompra("Flowers´Naturals",[]);
        localStorage.setItem("compra", JSON.stringify(compraNuevo));
    }

    const btnEliminarCarrito = document.getElementById("btnEliminarCarrito");
    btnEliminarCarrito.addEventListener("click", () => {
        compraNuevo.eliminarCarritoDeCompra();
        compraNuevo.carritoCompra();
    });
    document.getElementById("navbarNav").appendChild(btnEliminarCarrito);


const agregar = new Agregar("nuevo");
agregar.crearFormulario();
}

iniciar();
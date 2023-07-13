let compraNuevo = "";
let error = document.getElementById("error");
error.className= " errorCampos";
let fecha = new Date();

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

class ticketCompra{
    constructor(tienda, flor) {
        this.tienda = tienda;
        this.flor = flor;
    
    }

    carritoCompra(){

        const carritoDeCompra = document.getElementById("carritoDeCompra");
        carritoDeCompra.classList = "row row-cols-md-2";
        carritoDeCompra.innerHTML = "";

        const contenedorFinalizarCompra = document.createElement("div");
        contenedorFinalizarCompra.classList = "row row-cols-md-2";
        

        this.flor.map(flor => {
            const columnas = document.createElement("div");
            columnas.classList = "col";

            const div = document.createElement("div");
            div.classList = "card";

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
            error.innerHTML = ` ! "Debes completar Todos los campos requeridos"  `;
            return;
        } 

       
        flores.id = Math.round(Math.random()*20);
        this.flor.push(flores);
        localStorage.setItem("compra", JSON.stringify(this));
         document.getElementById("tipoDeFlor").value = "";
         document.getElementById("colorDeFlor").value = "";
         document.getElementById("cantidadDeFlores").value = "";

         
       
    } 


    eliminarCompra(tipoCompra){
        this.flor = this.flor.filter(flor => flor.id !== tipoCompra);
        localStorage.setItem("compra", JSON.stringify(this));
        console.log(tipoCompra);
    }
    
    resumenCompra() {
        const precioTotal = this.calcularPrecioTotal();
        const productosComprados = this.flor.map(flor => `${flor.flor} (${flor.color}): ${flor.cantidad}`);



     infoCompra.innerHTML = `
        <h3 class="prodComp">Productos comprados:</h3>
        <ul>
            ${productosComprados.map(producto => `<li class= "itemsResumen">${producto.toUpperCase()}</li>`).join("")}
        </ul>
        <h3 class= "totalResumen">Precio total: $ ${precioTotal}</h3>
        `;

      
      }

    calcularPrecioTotal() {
        let total = 0;
        this.flor.forEach(flor => {
          total += flor.precio * flor.cantidad;
        });
        return total;
      }

      finalizarCompra() {
        this.flor = [];
        localStorage.removeItem("compra");
        location.reload();
        alert(`¡MUCHAS GRACIAS POR SU COMPRA! ❤️ \n En la fecha: ${fecha}`);
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
const agregar = new Agregar("nuevo");
agregar.crearFormulario();
}

iniciar();
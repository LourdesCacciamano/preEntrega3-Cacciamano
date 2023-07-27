let formulario = document.getElementById("formulario");
let inputNombre = document.getElementById("inputNombre");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputNombre.value !== "") {
        let nombreMayuscula = inputNombre.value.toUpperCase();
        formulario.innerHTML = `<h1 class= "tituloF animate__animated animate__flipInY"> BIENVENIDO/A ${nombreMayuscula} A "FLOWERS´NATURALS"</h1>`;
    } else {
        Toastify({
            text: " ¡Ingrese su Nombre PorFavor! ",
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
            }
        }).showToast();
        return;
    }
});

const infoEmpresa = document.getElementById("infoTienda");
infoEmpresa.addEventListener("click", () => {
    swal.fire({
        title: "FLOWERS: ",
        text: ` »TIENDA: ${Empresa?.nombre}  »DIRECCIÓN: ${Empresa?.direccion}  »TELEFONO: ${Empresa.telefono}  »HORARIOS: ${Empresa?.horarios}`,
        icon: "info",
        iconColor: "#99582a",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#99582a",
        padding: "15px",
        width: "350px",
        color: "#450920",
        background: "#ffe45e",

    });
});

const Empresa = {
    nombre: "Flowers´ Naturals",
    direccion: "Barrio Alberdi 3041",
    telefono: "351-564-998",
    horarios: "Lun a Vie de 08hs a 18hs || Sab y Dom de 09hs a 13hs",
};

const listadoDeStock = document.getElementById("listadoDeStock");

let stockActual = document.getElementById("stockActual");
stockActual.addEventListener("click", () => {
    fetch("./json/data.json")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((producto) => {
                const li = document.createElement("li");
                li.innerHTML = `
                <h4>${producto.flor}</h4>
                <h6>${producto.color}</h6>
                <hr/>
            `;
                listadoDeStock.appendChild(li)
            })
        })
})







































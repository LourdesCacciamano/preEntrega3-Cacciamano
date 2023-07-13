let formulario = document.getElementById("formulario");
let inputNombre = document.getElementById("inputNombre");
let error = document.getElementById("error");
error.className = "errorTitulo";



formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputNombre.value !== "") {
        let nombreMayuscula = inputNombre.value.toUpperCase();
        formulario.innerHTML = `<h1 class= "tituloF"> BIENVENIDO/A ${nombreMayuscula} A "FLOWERS´NATURALS"</h1>`;
    } else{
        error.innerHTML = "Ingrese su Nombre PorFavor";
        return;
    }
});




    const infoEmpresa = document.getElementById("infoTienda");
        infoEmpresa.addEventListener("click", () => {
        alert( `TIENDA: ${Empresa?.nombre} \n DIRECCIÓN: ${Empresa?.direccion} \n TELEFONO: ${Empresa.telefono} \n HORARIOS: ${Empresa?.horarios}`);
});



            const Empresa = {
      nombre: "Flowers´ Naturals",
     direccion: "Barrio Alberdi 3041",
     telefono: "351-564-998",
     horarios: "Lun a Vie de 08hs a 18hs || Sab y Dom de 09hs a 13hs",
};

    
    





 
     





  


























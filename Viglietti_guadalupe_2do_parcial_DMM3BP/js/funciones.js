

document.getElementById("leerMas").addEventListener("click", function () {
    const button = this;
    const bloque = document.getElementById("infoboton");

    if (bloque.classList.contains("show")) {
        button.textContent = "Leer Más";
    } else {
        button.textContent = "Leer Menos";
    }
});

document.getElementById("infoboton").addEventListener("show.bs.collapse", function () {
    document.getElementById("leerMas").textContent = "Leer Menos";
});

document.getElementById("infoboton").addEventListener("hide.bs.collapse", function () {
    document.getElementById("leerMas").textContent = "Leer Más";
});







document.getElementById("app").addEventListener("hide.bs.collapse", function () {
    document.getElementById("acceder").textContent = "Acceder";
});

document.getElementById("app").addEventListener("show.bs.collapse", function () {
    document.getElementById("acceder").textContent = "Ocultar";
});

filtro.addEventListener("change", function () {
    let diaElegido = document.querySelector("option:checked").value;
    let notas = document.querySelectorAll("#contenido .card");
    notas.forEach(card => {
        card.classList.add("oculto");
    });

    if (diaElegido == "todas") {
        notas.forEach(card => {
            card.classList.remove("oculto");
        });

    } else {
        document.querySelectorAll(`#contenido .${diaElegido}`).forEach(card => {
            card.classList.remove("oculto");
        });
    }
});

document.querySelector("#formAgregar").addEventListener("submit", function (e) {
    e.preventDefault();

    let diaElegido = document.getElementById("dia").value;
    let tipoComida = document.getElementById("tipoComida").value;
    let nombreComida = document.getElementById("nombreComida").value;
    let ingredientes = document.getElementById("ingredientes").value;
    let tipo = document.getElementById("tipo").value;

    const nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add("card", "m-2", "text-start", "d-inline-block", "border-0", "rounded-5", diaElegido, tipo);
    nuevoDiv.innerHTML = `
        <h4 class="card-header border-0 py-3">${diaElegido} - ${tipoComida}</h4>
        <div class="card-body pt-5 border-0">
            <h5 class="card-title ">${nombreComida}</h5>
            <p class="card-text">${ingredientes}</p>
            <p class="card-text pb-3">${tipo}</p>
            <button class="btn mt-4 btn-primary modificar" data-bs-toggle="modal" data-bs-target="#modificar">Modificar</button>
            <button class="btn mt-4 btn-danger eliminar">Eliminar</button>
        </div>
    `;

    document.getElementById("contenido").prepend(nuevoDiv);
    document.querySelector("#formAgregar").reset();

    let notasActuales = document.getElementById("contenido").innerHTML;
    localStorage.setItem("codigo", notasActuales);






    const botonesModificar = nuevoDiv.querySelector(".modificar");
    botonesModificar.addEventListener("click", function () {
        document.getElementById("dia_mod").value = diaElegido;
        document.getElementById("tipoComida_mod").value = tipoComida;
        document.getElementById("nombreComida_mod").value = nombreComida;
        document.getElementById("ingredientes_mod").value = ingredientes;
        document.getElementById("tipo_mod").value = tipo;

        const formModificar = document.querySelector("#formModificar");
        formModificar.addEventListener("submit", function (e) {
            e.preventDefault();

            const diaAnterior = diaElegido;

            diaElegido = document.getElementById("dia_mod").value;
            tipoComida = document.getElementById("tipoComida_mod").value;
            nombreComida = document.getElementById("nombreComida_mod").value;
            ingredientes = document.getElementById("ingredientes_mod").value;
            tipo = document.getElementById("tipo_mod").value;

            nuevoDiv.querySelector(".card-header").textContent = `${diaElegido} - ${tipoComida}`;
            nuevoDiv.querySelector(".card-title").textContent = nombreComida;
            nuevoDiv.querySelector(".card-text:nth-child(2)").textContent = ingredientes;
            nuevoDiv.querySelector(".card-text:nth-child(3)").textContent = tipo;

            
            nuevoDiv.classList.remove(diaAnterior);
            nuevoDiv.classList.remove("oculto");
            nuevoDiv.classList.add(diaElegido);

            
            let notasActuales = document.getElementById("contenido").innerHTML;
            localStorage.setItem("codigo", notasActuales);

            const modificarModal = document.getElementById("modificar");
            modificarModal.hide();
        });
    });




    const botonesEliminar = nuevoDiv.querySelector(".eliminar");
    botonesEliminar.addEventListener("click", function () {
        nuevoDiv.remove();
        let notasActuales = document.getElementById("contenido").innerHTML;
        localStorage.setItem("codigo", notasActuales);
    });

    document.getElementById("formAgregar").reset();
    document.getElementById("ingresar").hide();
});




document.getElementById("eliminar_todo").addEventListener("click", function () {
    let rta = confirm("¿Estás seguro que querés eliminar todas las comidas?");
    if (rta) {
        document.getElementById("contenido").innerHTML = "";
        localStorage.clear();
    }
});

document.getElementById("contenido").addEventListener("click", function (e) {
    if (e.target.classList.contains("eliminar")) {
        let rta = confirm("¿Estás seguro que querés eliminar esta nota?");
        if (rta) {
            e.target.parentElement.parentElement.remove();
            let notasActuales = document.getElementById("contenido").innerHTML;
            localStorage.setItem("codigo", notasActuales);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let guardados = localStorage.getItem("codigo");
    if (guardados != null) {
        document.getElementById("contenido").innerHTML = guardados;
    }
});








document.addEventListener("DOMContentLoaded", function () {
    const recetas = [
        { nombre: "Ensalada de Quinoa", tipo: "Saludable", ingredientes: ["Quinoa", "Tomate", "Pepino", "Aguacate"], imagen: "imagenes/ensalada_quinoa.jpg" },
        { nombre: "Pizza Casera", tipo: "Chatarra", ingredientes: ["Masa de pizza", "Tomate", "Queso mozzarella", "Pepperoni"], imagen: "imagenes/pizza_casera.jpg" },
        { nombre: "Sopa de Pollo", tipo: "Saludable", ingredientes: ["Pollo", "Verduras", "Caldo de pollo"], imagen: "imagenes/sopa_pollo.jpg" },
        { nombre: "Hamburguesa Clásica", tipo: "Chatarra", ingredientes: ["Pan de hamburguesa", "Carne de res", "Queso cheddar", "Lechuga", "Tomate"], imagen: "imagenes/hamburguesa_clasica.jpg" },
        { nombre: "Tacos Mexicanos", tipo: "Chatarra", ingredientes: ["Tortillas de maíz", "Carne de res", "Salsa", "Aguacate"], imagen: "imagenes/tacos_mexicanos.jpg" },
        { nombre: "Pasta Alfredo", tipo: "Chatarra", ingredientes: ["Pasta", "Crema de leche", "Queso parmesano", "Mantequilla"], imagen: "imagenes/pasta_alfredo.jpg" }
    ];

    const recetasContainer = document.getElementById("recetasContainer");
    const mostrarRecetasBtn = document.getElementById("mostrarRecetas");

    function mostrarRecetas() {
        if (recetasContainer.innerHTML == "") {
            recetas.forEach(receta => {
                const card = document.createElement("div");
                card.classList.add("card", "col-lg-4", "col-md-6", "mb-4", "p-0", "cReceta", "border-0");
                card.innerHTML = `
                    <div class="card-header p-0">
                        <img src="${receta.imagen}" class="card-img-top" alt="${receta.nombre}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${receta.nombre}</h5>
                        <p class="card-text"><strong>Tipo:</strong> ${receta.tipo}</p>
                        <p class="card-text"><strong>Ingredientes:</strong> ${receta.ingredientes.join(", ")}</p>
                    </div>
                `;
                recetasContainer.appendChild(card);
            });
            mostrarRecetasBtn.textContent = "Ocultar Recetas";
        } else {
            recetasContainer.innerHTML = "";
            mostrarRecetasBtn.textContent = "Mostrar Recetas";
        }
    }

    mostrarRecetasBtn.addEventListener("click", mostrarRecetas);
});












document.addEventListener("DOMContentLoaded", function() {
    const mostrarFormularioBtn = document.getElementById("mostrarFormulario");
    const formularioContacto = document.getElementById("formularioContacto");

    mostrarFormularioBtn.addEventListener("click", function() {
        const button = this;

        button.style.display = "none";

        formularioContacto.innerHTML = `
            <div class="col-md-8 offset-md-2">
                <form id="formulario" class="p-4 border rounded">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="apellido" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="apellido" name="apellido" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="mensaje" class="form-label">Mensaje</label>
                        <textarea class="form-control" id="mensaje" name="mensaje" rows="3"></textarea>
                    </div>
                    <button type="button" class="btn btn-secondary ms-2 fw-bold cerrar" id="cerrarFormulario">Cerrar</button>
                    <button type="submit" class="btn btn-primary fw-bold enviar">Enviar</button>
                    
                </form>
            </div>
        `;

        const cerrarFormularioBtn = document.getElementById("cerrarFormulario");
        cerrarFormularioBtn.addEventListener("click", function() {
            formularioContacto.innerHTML = "";

            button.style.display = "inline-block";
        });

        const formulario = document.getElementById("formulario");
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();

            alert("Mindfull Eating ha recibido tu mensaje correctamente.");

            formularioContacto.innerHTML = "";

            button.style.display = "inline-block";
        });
    });
});










document.getElementById("mostrarInfo").addEventListener("click", function () {
    const modalContainer = document.getElementById("modalContainer");

    if (modalContainer.textContent == "") {
        modalContainer.innerHTML = `
            <div class="container">
                <div class="row justify-content-evenly align-items-center mb-5">
                    <div class="col-md-auto py-3">
                        <div class="row justify-content-center justify-content-md-evenly align-items-center">
                            <div class="col-sm-5 col-md py-3 py-sm-0 py-md-3">
                                <ul class="list-group text-start mx-5 mx-sm-0 fs-6 text-center text-sm-start">
                                    <li class="list-group-item bg-transparent border-0 text-light border-0">
                                        <img src="imagenes/Guada.jpg" alt="Guadalupe Viglietti">
                                    </li>
                                    <li class="list-group-item bg-transparent border-0 text-light">Guadalupe Viglietti</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-10 col-sm-12 col-md-auto py-3">
                        <ul class="list-group text-start m-sm-5 fs-6">
                            <li class="list-group-item bg-transparent border-0 text-light"><span class="fw-bold">Comisión:</span> DMM3BP</li>
                            <li class="list-group-item bg-transparent border-0 text-light"><span class="fw-bold">Materia:</span> Diseño y Programación Web I</li>
                            <li class="list-group-item bg-transparent border-0 text-light"><span class="fw-bold">Docente:</span> Omar Toyos</li>
                            <li class="list-group-item bg-transparent border-0 text-light"><span class="fw-bold">Año:</span> 2024</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("infoModal").addEventListener("click", function (event) {
            if (event.target.id == "infoModal") {
                modalContainer.innerHTML = "";
            }
        });
    } else {
        modalContainer.innerHTML = "";
    }
});






const contenedorCards = document.getElementById("contenedor-cards");
const contenedorCheckboxes = document.getElementById("contenedor-checkboxes");



let listArray = [];
let buscador = document.getElementById("buscador");
let formulario = document.querySelector("form");



function traerDatos(){
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(datosApi =>{
    console.log(datosApi)    
    let cardsGeneradas = crearCards(datosApi.events);
    let checkBoxesGeneradas = crearCheckboxes(datosApi.events);
    let eventosFiltrados = datosApi.events;

    contenedorCards.innerHTML = cardsGeneradas;
    contenedorCheckboxes.innerHTML = checkBoxesGeneradas;

    formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      eventosFiltrados = datosApi.events.filter(
        (evento) =>
          evento.name.toLowerCase().includes(buscador.value.toLowerCase()) ||
          evento.description.toLowerCase().includes(buscador.value.toLowerCase())
      );
      actualizarCards(eventosFiltrados);
    });
    
    // Agregar el siguiente bloque de código para manejar el evento "submit" del formulario:
    formulario.addEventListener("submit", (event) => {
      event.preventDefault();
    
      // Obtener los valores de los checkboxes marcados
      let checkboxesMarcados = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      );
      let listArray = Array.from(checkboxesMarcados).map((checkbox) => {
        return checkbox.value;
      });
    
      // Filtrar los eventos según las categorías seleccionadas
      eventosFiltrados = datosApi.events.filter((evento) =>
        listArray.includes(evento.category)
      );
    
      // Filtrar los eventos según el texto del buscador
      eventosFiltrados = eventosFiltrados.filter(
        (evento) =>
          evento.name.toLowerCase().includes(buscador.value.toLowerCase()) ||
          evento.description.toLowerCase().includes(buscador.value.toLowerCase())
      );
    
      // Actualizar las cards con los eventos filtrados
      actualizarCards(eventosFiltrados);
    });

  })
  .catch(error => console.log(error.message))
}

traerDatos()




function actualizarCards(eventos) {
  let cards = crearCards(eventos);
  if (eventos.length === 0) {
    cards = `<p>No se encontraron resultados. Prueba modificando los filtros.</p>`;
  }
  contenedorCards.innerHTML = cards;
}

function crearCards(arrayDatos) {
  let cards = "";

  for (const evento of arrayDatos) {
    cards += `<aside class="col-12 col-md-6 col-lg-3 pb-5">
        <div class="card">
          <img src= ${evento.image} />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text d-block flex-grow-1">${evento.description}</p>                        
            <div
              class="card-footer d-flex justify-content-between border-0 bg-white"
            >
              <p>$ ${evento.price}</p>
              <a href="./pages/details.html?_id=${evento._id}" class="btn btn-outline-success"
                >Ver mas</a
              >
            </div>
          </div>
        </div>
      </aside>`;
  }
  return cards;
}
function crearCheckboxes(arrayDatos) {
  let checkboxes = "";

  for (const evento of arrayDatos) {
    if (!checkboxes.includes(evento.category)) {
      checkboxes += `<div class="form-check col-12 col-md-6 col-lg-3">
      <input
        class="form-check-input"
        type="checkbox"
        value="${evento.category}"
        id="${evento.category}"             
      />
      <label class="form-check-label" for="${evento.category}"> ${evento.category} </label>
    </div>`;
    }
  }
  return checkboxes;
}

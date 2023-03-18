const contenedorDetalles = document.getElementById("contenedorDetalles")


  


function traerDatos(){
fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then((datosApi) => {
  const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get('_id')
  const eventoSeleccionado = datosApi.events.find(evento => evento._id == id)
  printCard(eventoSeleccionado)
})
}
traerDatos()

function printCard(eventoSeleccionado){
  let card = `<div class="card card-details">
  <img src= ${eventoSeleccionado.image} />
  <div class="card-body d-flex flex-column ">
    <h5 class="card-title">${eventoSeleccionado.name}</h5>
    <div  class="card-text d-block d-flex flex-grow-1">
    <p class='d-block'>${eventoSeleccionado.description}</p>                        
    </div>
    <div
      class="card-footer d-flex justify-content-between  bg-white"
    >
      <p> <i class="bi bi-currency-dollar text-success"></i>Price: <br>$ ${eventoSeleccionado.price}</p>
      <p> <i class="bi bi-person-fill text-info"></i>Capacity:<br> ${eventoSeleccionado.capacity } people</p>
      <p> <i class="bi bi-calendar-date text-danger"></i>Date:<br> ${eventoSeleccionado.date } </p>
      <p><i class="bi bi-house-door text-warning"></i> Place:<br> ${eventoSeleccionado.place } </p>
      <p> <i class="bi bi-bookmarks-fill text-secondary"></i> Category:<br> ${eventoSeleccionado.category } </p>
    </div>
  </div>
  </div>`
  contenedorDetalles.innerHTML= card
}



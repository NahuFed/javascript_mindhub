const contenedorCards = document.getElementById("contenedor-cards")

let cardsGeneradas = crearCards(data.events)

contenedorCards.innerHTML = cardsGeneradas





function crearCards(arrayDatos){
    let cards = ''
    
    for (const evento of arrayDatos){
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
      </aside>`
        
        
    }
    return cards
}




let buscador = document.getElementById('buscador')
let formulario = document.querySelector('form')

formulario.addEventListener('submit',(event)=>{
  event.preventDefault()
  let eventosFiltrados = data.events.filter(evento => evento.name.toLowerCase().includes(buscador.value.toLowerCase()))  
  let cardsFiltradas = crearCards(eventosFiltrados)
  contenedorCards.innerHTML= cardsFiltradas
  console.log(cardsFiltradas)
})

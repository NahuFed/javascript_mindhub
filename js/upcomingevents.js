const contenedorCards = document.getElementById("contenedor-cards")
const currentDate = new Date(data.currentDate)
let cardsGeneradas = crearCards(data.events)

contenedorCards.innerHTML = cardsGeneradas





function crearCards(arrayDatos){
    let cards = ''
    let n=0
    for (const evento of arrayDatos){
        let  eventDate = new Date(data.events[n].date)
        if(eventDate > currentDate){
        cards += `<aside class="col-12 col-md-6 col-lg-3 pb-5">
        <div class="card">
          <img src= ${data.events[n].image} />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${data.events[n].name}</h5>
            <p class="card-text d-block flex-grow-1">${data.events[n].description}</p>                        
            <div
              class="card-footer d-flex justify-content-between border-0 bg-white"
            >
              <p>$ ${data.events[n].price}</p>
              <a href="./details.html" class="btn btn-outline-success"
                >Ver mas</a
              >
            </div>
          </div>
        </div>
      </aside>`
        }
        n++
    }
    return cards
}

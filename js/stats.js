const contenedorTabla1 = document.getElementById("tabla1");
const contenedorTabla2 = document.getElementById("tabla2");
const contenedorTabla3 = document.getElementById("tabla3");

let eventos = [];

function traerDatos() {
  // fetch('../data.json')
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((datosApi) => {
      eventos = datosApi.events;
      const currentDate = new Date(datosApi.currentDate);
      crearTabla1(eventos, currentDate);
      crearTabla2(eventos, currentDate);
      crearTabla3(eventos, currentDate);
    });
}

traerDatos();

function crearTabla1(arrayDatos, currentDate) {
  let tabla1 = `
    <thead>
          <tr>
            <th colspan="3">Events statistics</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
    <tr>
            <td>Event with the highest percentage of attendence</td>
            <td>Event with the lowest percentage of attendance</td>
            <td>Event with the largest capacity</td>
          </tr>

          <tr>
          <td>${eventoConMayorPorcentajeAsistencia(
            arrayDatos,
            currentDate
          )}</td>
          <td>${eventoConMenorPorcentajeAsistencia(
            arrayDatos,
            currentDate
          )}</td>
          <td>${eventoConMayorCapacidad(arrayDatos)}</td>
        </tr>
    `;

  contenedorTabla1.innerHTML = tabla1;
}

function crearTabla2(arrayDatos, currentDate) {
  let tabla2 = `<thead>
    <tr>
      <th colspan="3">Upcoming events statistics by category</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr>
      <td>Categories</td>
      <td>Revenues estimated</td>
      <td>Percentage of attendance estimated</td>
    </tr>
    `;

  // Agrupar eventos por categoría
  const eventosPorCategoria = {};
  for (const evento of arrayDatos) {
    const eventDate = new Date(evento.date);
    if (eventDate > currentDate) {
      if (!eventosPorCategoria[evento.category]) {
        eventosPorCategoria[evento.category] = [];
      }
      eventosPorCategoria[evento.category].push(evento);
    }
  }

  // Calcular estadísticas por categoría y agregar filas a la tabla
  for (const categoria in eventosPorCategoria) {
    const eventos = eventosPorCategoria[categoria];
    let totalRevenues = 0;
    let totalAttendance = 0;
    for (const evento of eventos) {
      totalRevenues += evento.price * evento.estimate;
      totalAttendance += Math.trunc((100 * evento.estimate) / evento.capacity);
    }
    const averageAttendance = Math.trunc(totalAttendance / eventos.length);
    tabla2 += `<tr>
      <td>${categoria}</td>
      <td>$ ${totalRevenues}</td>
      <td>${averageAttendance}%</td>
    </tr>`;
  }

  contenedorTabla2.innerHTML = tabla2;
}
function crearTabla3(arrayDatos, currentDate) {
  let tabla3 = `<thead>
    <tr>
      <th colspan="3">Upcoming events statistics by category</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr>
      <td>Categories</td>
      <td>Revenues</td>
      <td>Percentage of attendance</td>
    </tr>
    `;

  // Agrupar eventos por categoría
  const eventosPorCategoria = {};
  for (const evento of arrayDatos) {
    const eventDate = new Date(evento.date);
    if (eventDate < currentDate) {
      if (!eventosPorCategoria[evento.category]) {
        eventosPorCategoria[evento.category] = [];
      }
      eventosPorCategoria[evento.category].push(evento);
    }
  }

  // Calcular estadísticas por categoría y agregar filas a la tabla
  for (const categoria in eventosPorCategoria) {
    const eventos = eventosPorCategoria[categoria];
    let totalRevenues = 0;
    let totalAttendance = 0;
    for (const evento of eventos) {
      totalRevenues += evento.price * evento.assistance;
      totalAttendance += Math.trunc(
        (100 * evento.assistance) / evento.capacity
      );
    }
    const averageAttendance = Math.trunc(totalAttendance / eventos.length);
    tabla3 += `<tr>
      <td>${categoria}</td>
      <td>$ ${totalRevenues}</td>
      <td>${averageAttendance}%</td>
    </tr>`;
  }

  contenedorTabla3.innerHTML = tabla3;
}

function eventoConMayorPorcentajeAsistencia(eventos, currentDate) {
  let mayorPorcentajeAsistencia = -1;
  let eventoMayorPorcentajeAsistencia;

  for (const evento of eventos) {
    const eventDate = new Date(evento.date);
    if (eventDate < currentDate) {
      const porcentajeAsistencia = evento.assistance / evento.capacity;
      if (porcentajeAsistencia > mayorPorcentajeAsistencia) {
        mayorPorcentajeAsistencia = porcentajeAsistencia;
        eventoMayorPorcentajeAsistencia =
          evento.name +
          " (" +
          (mayorPorcentajeAsistencia * 100).toFixed(2) +
          "%)";
      }
    }
  }
  return eventoMayorPorcentajeAsistencia;
}
function eventoConMenorPorcentajeAsistencia(eventos, currentDate) {
  let menorPorcentajeAsistencia = Infinity;
  let eventoMenorPorcentajeAsistencia;

  for (const evento of eventos) {
    const eventDate = new Date(evento.date);
    if (eventDate < currentDate) {
      const porcentajeAsistencia = evento.assistance / evento.capacity;
      if (porcentajeAsistencia < menorPorcentajeAsistencia) {
        menorPorcentajeAsistencia = porcentajeAsistencia;
        eventoMenorPorcentajeAsistencia =
          evento.name +
          " (" +
          (menorPorcentajeAsistencia * 100).toFixed(2) +
          "%)";
      }
    }
  }
  return eventoMenorPorcentajeAsistencia;
}

function eventoConMayorCapacidad(eventos) {
  let mayorCapacidad = -Infinity;
  let eventoMayorCapacidad;

  for (const evento of eventos) {
    if (evento.capacity > mayorCapacidad) {
      mayorCapacidad = evento.capacity;
      eventoMayorCapacidad = evento.name + " (" + evento.capacity + ")";
    }
  }
  return eventoMayorCapacidad;
}

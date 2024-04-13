const container = document.getElementById("main-container");
const spinner = document.querySelector(".spinner_container");

const baseUrl = "https://661463082fc47b4cf27c3d2f.mockapi.io/api/alumnas";

//Traer todas las alumnas

const getAlumnas = (fetchUrl) => {
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => renderAlumnas(data))
    .catch((err) => console.log(err));
};

getAlumnas(baseUrl);

//Mostrar todas las alumnas

const renderAlumnas = (alumnas) => {
  renderSpinner();

  setTimeout(() => {
    hideSpinner();
    container.innerHTML = "";
    alumnas.forEach((alumna) => {
      const { name, id } = alumna;

      container.innerHTML += `
        <div class="card">
        <img
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQgByBT5IiAT_a2x9pUVb4VMoOrlzHH7Jrzj-HB5jzHlR4lNLMS"
          alt=""
          class="card_img"
        />
        <div class="card_text_container">
          <h2 class="card_title">${name}</h2>
          <button class="view_detail_btn" data-cardid="${id}" >Ver Detalle</button>
        </div>
      </div>
      `;
    });

    asignarEventosVerDetalle(document.querySelectorAll(".view_detail_btn"));
  }, 2000);
};

//Mostrar el spinner
const renderSpinner = () => {
  container.innerHTML = "";
  spinner.classList.remove("hidden");
};

//Ocultar el spinner
const hideSpinner = () => {
  spinner.classList.add("hidden");
};

//Asignar eventos Ver Detalle

const asignarEventosVerDetalle = (btns) => {
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      getDetalleAlumna(btn.dataset.cardid);
      //getDetalleAlumna(btn.getAttribute("data-cardid"));
    })
  );
};

//Get detalle de una alumna

const getDetalleAlumna = (idAlumna) => {
  fetch(`${baseUrl}/${idAlumna}`)
    .then((res) => res.json())
    .then((data) => mostrarDetalleAlummna(data))
    .catch((err) => console.log(err));
};

//Mostrar detalle de una alumna

const mostrarDetalleAlummna = (alumna) => {
  renderSpinner();

  setTimeout(() => {
    hideSpinner();
    container.innerHTML = "";

    const { name, id, location } = alumna;

    container.innerHTML = `
        <div class="card_detail">
         <a href="javascript:void(0);" class="go_back">Regresar</a>
        <h2 class="card_name">${name}</h2>
        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQgByBT5IiAT_a2x9pUVb4VMoOrlzHH7Jrzj-HB5jzHlR4lNLMS" alt="" class="card_img" />
        <p class="card_location">${location}</p>
        <button class="card_button_editar" data-cardId="${id}">Editar</button>
        <button class="card_button_eliminar" data-cardId="${id}">Eliminar</button>
      </div>

       <form id="editar-alumna" class="hidden">
        <label for="">Nombre</label>
        <input type="text" name="" id="name-input" />
        <label for="">Location</label>
        <input type="text" name="" id="location-input" />
        <input type="submit" value="Editar" />
      </form>`;

    //funcion regresar

    document
      .querySelector(".go_back")
      .addEventListener("click", () => getAlumnas(baseUrl));

    document
      .querySelector(".card_button_editar")
      .addEventListener("click", () => mostrarFormEditarAlumna(alumna));

    const editarAlumnaForm = document.getElementById("editar-alumna");

    //Mostrar Form Editar Alummna

    const mostrarFormEditarAlumna = (alumna) => {
      const nameInput = document.getElementById("name-input");
      const locationInput = document.getElementById("location-input");
      nameInput.value = alumna.name;
      locationInput.value = alumna.location;
      editarAlumnaForm.classList.remove("hidden");
    };
  }, 2000);
};

//Confirmar Editar una alumna

const confirmarEditarAlumna = (alumnaId) => {};

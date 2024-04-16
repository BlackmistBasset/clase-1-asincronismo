const container = document.getElementById("main-container");
const spinner = document.querySelector(".spinner_container");
const nuevaAlumnaBtn = document.getElementById("nueva-alumna");

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
        <button class="card_button_eliminar">Eliminar</button>
      </div>

       <form id="editar-alumna" class="hidden">
        <label for="">Nombre</label>
        <input type="text" name="" id="name-input" />
        <label for="">Location</label>
        <input type="text" name="" id="location-input" />
        <input type="submit" value="Editar" />
      </form>
       
      <div class="modal_contenedor hidden">
        <p>Estás seguro que deseas borrar la información de la alumna?</p>

        <button id="confirmar-eliminar" data-cardId="${id}">Eliminar Alumna</button>
        <button id="cancelar-eliminar">Cancelar</button>
      </div>
      
      `;

    //funcion regresar

    document
      .querySelector(".go_back")
      .addEventListener("click", () => getAlumnas(baseUrl));

    const editarAlumnaForm = document.getElementById("editar-alumna");

    //Mostrar Form Editar Alummna
    document
      .querySelector(".card_button_editar")
      .addEventListener("click", () => mostrarFormEditarAlumna(alumna));

    const nameInput = document.getElementById("name-input");
    const locationInput = document.getElementById("location-input");

    const mostrarFormEditarAlumna = (alumna) => {
      nameInput.value = alumna.name;
      locationInput.value = alumna.location;
      editarAlumnaForm.classList.remove("hidden");
    };

    //Confirmar Editar una alumna

    const confirmarEditarAlumna = (alumna) => {
      const alumnaEdit = {
        ...alumna,
        location: locationInput.value,
        name: nameInput.value,
      };

      fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alumnaEdit),
      })
        .then((res) => {
          if (res.ok) {
            getDetalleAlumna(id);
          }
        })
        .catch((err) => console.log(err));

      // console.log(alumnaEdit);
    };

    editarAlumnaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      confirmarEditarAlumna(alumna);
    });

    //Mostrar modal eliminar alumna
    const btnEliminarAlumna = document.querySelector(".card_button_eliminar");
    const modalEliminarAlumna = document.querySelector(".modal_contenedor");

    btnEliminarAlumna.addEventListener("click", () => {
      modalEliminarAlumna.classList.remove("hidden");
    });

    //Confirmar eliminar alumna

    document
      .getElementById("confirmar-eliminar")
      .addEventListener("click", (e) => {
        fetch(`${baseUrl}/${e.currentTarget.dataset.cardid}`, {
          method: "DELETE",
        }).then((res) =>
          res
            .json()
            .then((data) => {
              getAlumnas(baseUrl);
              // console.log(data);
            })
            .catch((err) => console.log(err))
        );
      });

    //Cancelar eliminar alumna
    document
      .getElementById("cancelar-eliminar")
      .addEventListener("click", () =>
        modalEliminarAlumna.classList.add("hidden")
      );
  }, 2000);
};

//Crear una nueva alumna
const formCrearNuevaAlumna = document.getElementById("nueva-alumna-form");
const formContenedor = document.getElementById("form-container");
//const cargarNuevaAlumnaBtn
console.log(formCrearNuevaAlumna);

nuevaAlumnaBtn.addEventListener("click", () => {
  container.innerHTML = "";
  formContenedor.classList.remove("hidden");
  const newNameInput = document.getElementById("new-name-input");
  const newLocationInput = document.getElementById("new-location-input");
  const newDescriptionTextarea = document.getElementById(
    "new-description-textarea"
  );

  formCrearNuevaAlumna.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevaAlumna = {
      name: newNameInput.value,
      description: newLocationInput.value,
      location: newDescriptionTextarea.value,
    };

    fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaAlumna),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          formCrearNuevaAlumna.reset();
          formContenedor.classList.add("hidden");
          getAlumnas(baseUrl);
        } else {
          alert(
            "Lo sentimos, ocurrió un error. Vuelva a intentarlo más tarde."
          );
        }
      })
      .catch((err) => alert(err));

    console.log(nuevaAlumna);
  });
});

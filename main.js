//Función que hace el llamado a la api
const getRandomDrink = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => renderDrink(data.drinks[0])); //Acá llamamos a nuestra función declarada más abajo y le pasamos como parámetro directamente el objeto de la bebida aleatoria.
};

///////////////////////////////////////

//Función que utiliza la data obtenida por la api
const renderDrink = (drink) => {
  const { strDrinkThumb, strDrink } = drink;
  document.body.innerHTML = ` <div class="drink__card">
      <img src="${strDrinkThumb}" alt="" class="drink__img" />
      <h2 class="drink__name">${strDrink}</h2>
    </div>`;
};

getRandomDrink();

//Fetch a una página web
//fetch("https://blackmistbasset.github.io/AdaJOBS/")
//.then((res) => res.text())
// .then((html) => {
//console.log(html);
// const parser = new DOMParser();
// const doc = parser.parseFromString(html, "text/html");
//console.log(doc);
//console.log(doc.querySelector("nav"));

// document.body.innerHTML = doc.querySelector("nav").innerHTML;
//});

//Este fetch va a fallar por la política CORS.
// fetch("https://www.google.com").then((res) =>
//   console.log(res.text()).then((data) => console.log(data))
// );

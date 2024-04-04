//Función que hace el llamado a la api
// const getRandomDrink = () => {
//   fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
//     .then((res) => res.json())
//     .then((data) => renderDrink(data.drinks[0])) //Acá llamamos a nuestra función declarada más abajo y le pasamos como parámetro directamente el objeto de la bebida aleatoria.
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       console.log("terminé de ejecutarme");
//     });
// };

///////////////////////////////////////

// const api_key =
//   "live_MgDiArAkLZaSuSGDPrUVR6g8KKhpjoC1zC7nZvoaJW69pv1XrBxtZc93OuBVyTXL";
// const base_url = "https://api.thecatapi.com/v1/images/search";

// const getRandomMichi = () => {
//   fetch(`${base_url}/?limit=1?breed_ids=beng&api_key=${api_key}`)
//     // fetch("https://api.thecatapi.com/v1/images/0XYvRd7oD")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data[0]);
//       renderMichi(data[0]);
//     }) //Acá llamamos a nuestra función declarada más abajo y le pasamos como parámetro directamente el objeto de la bebida aleatoria.
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       console.log("terminé de ejecutarme");
//     });
// };

//Función que utiliza la data obtenida por la api
// const renderMichi = (michi) => {
//   if (michi.breeds[0]) {
//     const {
//       url,
//       breeds: [{ name: michiName }],
//     } = michi;

//     document.body.innerHTML = ` <div class="drink__card">
//       <img src="${url}" alt="" class="drink__img" />
//       <h2 class="drink__name">${michiName}</h2>
//     </div>`;
//   } else {
//     const { url } = michi;
//     document.body.innerHTML = ` <div class="drink__card">
//       <img src="${url}" alt="" class="drink__img" />
//       <h2 class="drink__name">Michi</h2>
//     </div>`;
//   }
// };

// const renderMichi = (michi) => {
//   if (michi.breeds && michi.breeds.length > 0) {
//     const {
//       url,
//       breeds: [{ name: michiName }],
//     } = michi;

//     document.body.innerHTML = `
//       <div class="drink_card">
//         <img src="${url}" alt="michi_img" />
//         <h2 class="drink_name">${michiName}</h2>
//       </div>
//     `;
//   } else {
//     const { url } = michi;

//     document.body.innerHTML = `
//       <div class="drink_card">
//         <img src="${url}" alt="michi_img" />
//       </div>
//     `;
//   }
// };

//getRandomMichi();

//Fetch a una página web
// fetch("https://blackmistbasset.github.io/AdaJOBS/")
// .then((res) => res.text())
// .then((html) => {
// console.log(html);
// const parser = new DOMParser();
// const doc = parser.parseFromString(html, "text/html");
// console.log(doc);
// console.log(doc.querySelector("nav"));

// document.body.innerHTML = doc.querySelector("nav").innerHTML;
// });

//Este fetch va a fallar por la política CORS.
// fetch("https://www.google.com").then((res) =>
//   console.log(res.text()).then((data) => console.log(data))
// );

//api key

var myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", "{{x-ebirdapitoken}}");

fetch("https://api.ebird.org/v2/data/obs/AR/recent/notable", {
  method: "GET",
  headers: { "X-eBirdApiToken": "tbgnsffjsqr0" },
  redirect: "follow",
})
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

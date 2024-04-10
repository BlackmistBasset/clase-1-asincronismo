// const baseURL = new URL(window.location.href);
// const queryParams = new URLSearchParams(baseURL);
// const testUrl = "http://127.0.0.1:5500/?test2=jerbito&test=asd#a";
// console.log(queryParams);
// console.log(baseURL);

// for (let element of queryParams.entries()) {
//   console.log(element);
// }

const baseURL = "https://661463082fc47b4cf27c3d2f.mockapi.io/api/alumnas";
fetch(baseURL)
  .then((res) => res.json())
  .then((data) => console.log(data));

const filtrarAlumnas = () => {
  //URL: Es un constructor que al invocarlo y pasarle como parámetro una url, nos retorna un objeto con diversas propiedades que podemos utilizar para obtener cada una de las partes que conforman a la URL (y modificarla de ser necesario).
  //Documentacón: https://developer.mozilla.org/es/docs/Web/API/URL

  const filterURL = new URL(baseURL); //BaseURL la definimos en la línea 11 y es nada más que un string con un link. Si hacen un console.log de filterURL, verán que es un objeto con varias propiedades conteniendo fragmentos de dicha URL, por el momento bastante sencilla.

  //Location: Nos retorna un objeto bastante similar a URL, pero con una diferencia clave: con URL podemos traer la información de cualquier URL (y hacer lo que querramos con ella, después de todo es un link), con location traeremos la información de la url de la página actual que está ejecutando el script de js desde el cual invocamos al objeto location. Recuerdan que con URL y sus métodos asociados no podíamos modificar la URL del navegador? Con Location y sus métodos podemos. Pero guarda porque podemos crear bucles infnitos (acabo de hacer uno jaja) porque se modifica la URL del explorador, por ende se recarga, se ejecuta nuevamente el script, vuelve a reasignar la URL, vuelve a cargar el documento, etc. Son métodos para usar cuidadosamente dentro de funciones que se ejecuten de forma controlada.
  //Documentación: https://developer.mozilla.org/es/docs/Web/API/Window/location
  console.log(window.location);
  console.log(filterURL); //Chusmeen la diferencia entre uno y otro.

  //searchParams: Retorna un objeto de tipo URLSearchParams que posee varios métodos que nos permiten leer, modificar y eliminar parte de los searchParams del queryString de una URL. Documentación: https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
  filterURL.searchParams.append("location", "BsAs"); //Con el método append sumamos un nuevo searchParam a la URL (noten que son métodos aplicados a filterURL, nuestra url inicial). Requiere dos parámetros, el primero será la clave del searchParam, y el segundo, el valor asignado.
  filterURL.searchParams.append("hasPets", "true");

  const urlParams = new URLSearchParams(filterURL.search); //Podemos acceder a las propiedades con el método anterior, o podemos crear una instancia del objeto URLSearchParams con su constructor (es lo mismo). Importante, y por qué nos estaba fallando ayer en clase: Lo que requiere no es la url completa, sino el queryString de la URL! Podemos acceder fácilmente a él con la propiedad search del objeto URL.
  //Documentación: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  //Como verán, tiene mil jajajaja. Vamos a ver algunos nomas:

  //Como urlSearchParams es un elemento iterable, podemos aplicarle el método forEach (o cualquier otro for) para conocer los VALORES de las propiedades que posea. (ojo, no retorna los pares clave-valor, solo los valores, por lo que es bastante limitado dependiendo lo que necesitemos)
  console.log(urlParams.forEach((param) => console.log(param)));

  //Si queremos conocer los pares clave-valor, podemos usar el método entries. Pero no podemos acceder a ellos directamente, ya que también retorna un iterable, en formato de una serie de arrays donde el primer valor será la clave y el segundo el valor de dicho queryParam.
  const queryParams = urlParams.entries();
  //Acá hacemos el forEach del iterable que retorna entries y vemos finalmente cada queryParam.
  queryParams.forEach((param) => console.log(param));

  //Get: Nos retorna el valor de un queryParam que le pasemos por parámetro. Si no existe, retorna null.
  console.log(filterURL.searchParams.get("hasPets"));

  //Has: Retorna un booleano en función de si existe o no el queryParam.
  console.log(filterURL.searchParams.has("hasPets"));

  //Delete: Elimina de la url el queryParam que le indiquemos. Si le pasamos solo la clave, borrará el queryParam cuya clave coincida. Si además le pasamos el valor, solo borrará el queryParam si coinciden tanto clave como valor. Si posee otro valor distinto al que le hayamos pasado, no se eliminará.
  //filterURL.searchParams.delete("hasPets", true);

  fetch(filterURL.href)
    .then((res) => {
      //podemos usar la propiedad status de la respuesta de la petción para validar que la petición se haya realizado correctamente antes de hacer nada con ella. Recuerden que el objeto que retorna el fetch tiene varias propiedades.
      //Documentación: https://developer.mozilla.org/en-US/docs/Web/API/Response
      if (res.status === 200) {
        //console.log("Petición exitosa");
        return res.json();
      } else {
        // console.log("Fallo la petición");
      }
    })
    //.then((data) => console.log(data)))
    .catch((err) => console.log(err));

  // console.log(filterURL.href);
};

filtrarAlumnas();

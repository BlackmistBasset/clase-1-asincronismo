// let promise = new Promise((resolve, reject) =>
//setTimeout(() => resolve("aaaa"), 3000);
//   setTimeout(() => reject(new Error("ocurrio un error")), 3000);
// });

// promise.then((res) => console.log(res));
// promise.catch((err) => console.log(err));
// console.log(promise);

// const getAlumnas = fetch(
//   "https://661463082fc47b4cf27c3d2f.mockapi.io/api/alumnas"
// );

// console.log(getAlumnas);

const miPrimeraFuncionConAsync = async () => {
  console.log("console.log asincronico");
  try {
    const respuesta = await promise;
    console.log(respuesta);
  } catch (err) {
    console.log(err);
  }

  // fetch("https://661463082fc47b4cf27c3d2f.mockapi.io/api/alumnas")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
};

// miPrimeraFuncionConAsync();

// console.log("console.log sinconico");

const getAlumnas = async () => {
  try {
    const res = await fetch(
      "https://661463082fc47b4cf27c3d2f.mockapi.io/api/alumnas"
    );

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

const renderAlumnas = async () => {
  const arrayAlumnas = await getAlumnas();
  console.log(arrayAlumnas);
};

renderAlumnas();

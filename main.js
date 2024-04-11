const alumnaNueva = {
  name: "POST HECHO DESDE JS",
  avatar:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/425.jpg",
  hasPets: true,
  petsName: {},
  location: "BsAs",
};

const cargarAlumna = (alumna) => {
  fetch("https://661463082fc47b4cf27c3d2f.mockapi.io/api/alumnas", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(alumna),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((task) => {
      console.log(task);
    });
};

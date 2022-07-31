async function getData() {
  return fetch("data/photographers.json")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (res) {
      return res.photographers;
    })
    .catch(function (err) {
      console.log("an error occurs", err);
    });
}

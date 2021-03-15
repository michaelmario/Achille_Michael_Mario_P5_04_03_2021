
// AJAX GET
async function getData(url) {
  const dataStream = await fetch(url);
  const data = await dataStream.json();
  return data;
}
/* afficher le button info du panier */
const afficheBage = (() => {
  let badgeCart = document.querySelector('#badge');
  let dataStore = localStorage.length;
  if (dataStore >= 1) {
    badgeCart.innerHTML = dataStore;
  }

})

/* affiché le titre et description de l'article */
const afficheTitle = ((data) => {
  let titile = document.querySelector('#title');
  titile.classList.add('animate__animated', 'animate__fadeInLeft');
  titile.innerHTML = `${data.name} <br><small class="text-muted smallText">Peluche fait main<small>`;
})
//bouton de navigation sur les petits écrans
let navbarSupportedContent = document.querySelector('#navbarSupportedContent');
let btnCollapse = document.querySelector('#btnCollapse');
btnCollapse.addEventListener('click', (e) => {
  e.preventDefault();
  navbarSupportedContent.classList.toggle('control');
})
//bouton de navigation vers le panier
let cartLink = document.querySelector('.cartLink');
cartLink.addEventListener('click', (e) => {
  let storedata = localStorage.length;
  if (storedata >= 1) {
    window.location.href = 'card.html';
  } else {
    window.location.href = '404.html';

  }
})
function spaceSupressor(string) {
  return string.replace(/\s/g, "");
}

// AJAX POST
async function postData(url, data, total) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-type': 'application/json'
    })
  }
  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      // Stocks data in localStorage
      localStorage.setItem("orderRecap", JSON.stringify(data));
      // Storing total price in localStorage
      localStorage.setItem("price", total.toString());
      // Redirecting to geetings page
      window.location.href = "confirm.html";
    })
    .catch(err => console.error(err))
}


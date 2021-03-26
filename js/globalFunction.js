const dataStore = localStorage.length;

// AJAX GET
async function getData(url) {
  const dataStream = await fetch(url);
  const data = await dataStream.json();
  return data;
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
  const postStream = await fetch(url, options);
  const postData = await postStream.json();
  return new Promise((resolve )=> {
    setTimeout(()=>{
    resolve(
    // Stocks data in localStorage key as orderRecap
    localStorage.setItem("orderRecap", JSON.stringify(postData)),
    // Storing total price in localStorage
    localStorage.setItem("price", total.toString()),
    // Redirecting to confirm page
    window.location.href = "confirm.html"
    );
    },1000);   
   
  }).catch(err => console.log(err));
  
}
 

/* afficher le button info du panier */
const afficheBadge = (() => {
  let badgeCart = document.querySelector('#badge');
  if (dataStore >= 1) {
    badgeCart.innerHTML = dataStore;
  }else{
    badgeCart.innerHTML = "0";
  }

})

//bouton de navigation vers le panier
let cartLink = document.querySelector('.cartLink');
cartLink.addEventListener('click', (e) => {
  if (dataStore >= 1) {    
      window.location.href = 'pages/card.html';

    }else if(window.location.pathname == '/index.html'){
      window.location.href = 'pages/404.html';
    } else{
      window.location.href = '404.html';
    }   

})



/* Pour l’affichage  du titre et la description du produit */
const afficheTitle = ((data) => {
  let titile = document.querySelector('#title');
  titile.classList.add('animate__animated', 'animate__fadeInLeft');
  titile.innerHTML += `${data.name} <br><small class="text-muted smallText">Peluche fait main<small>`;
})

//bouton de navigation sur les petits écrans
let navbarSupportedContent = document.querySelector('#navbarSupportedContent');
let btnCollapse = document.querySelector('#btnCollapse');
btnCollapse.addEventListener('click', (e) => {
  e.preventDefault();
  navbarSupportedContent.classList.toggle('control');
})


// fonction pour enlever l'espace entre le mots
function spaceSupressor(string) {
  return string.replace(/\s/g, "");
}




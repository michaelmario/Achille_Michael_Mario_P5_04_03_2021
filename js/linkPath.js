//bouton de navigation vers le panier
let cartLink = document.querySelector('.cartLink');
cartLink.addEventListener('click', (e) => {
  if (dataStore >= 1) {    
      window.location.href = 'card.html';
    }
    else{
    window.location.href = '404.html';
  }

})

window.addEventListener('DOMContentLoaded', (event) => {

  /** Récupération des produit*/ 
  const data = getData("http://localhost:3000/api/teddies/");

  if (!data) return;

  data.then(data => {
    data.forEach((teddie) => {
      displayCards(teddie);
    });
    /** Enlever le itme orders dans le localstorage */
    if(localStorage.length >=1){
      localStorage.removeItem('orderRecap');
      localStorage.removeItem('price');
      
    }
  })
  /**Afficher les erreurs si le serveur n'est pas disponible */
  .catch((error) => {
    document.getElementById('alert').style.display = "block";
    let errors = document.getElementById('pre');
    errors.classList.add('animate__animated', 'animate__fadeInLeft');
    errors.textContent = "Nous sommes désolés !!! revenez plus tard";
    console.error('Error:', error);
  }); 

  /** Affiche la quantité de produit dans le panier */
  afficheBadge(); 
});

/**Afficher les cart de index */
const displayCards = ((teddie) => {
  let cardtemp = document.getElementById('cardTemplate');
  let copyHtml = cardtemp.content.cloneNode(true);
  let teddiePrice = teddie.price;
  let ted = teddiePrice.toString();
  let regex = /[1-9][^0]/g;
  let truePrice = [...ted.match(regex)];
  teddiePrice = truePrice.join();
  copyHtml.querySelector(".card-img-top").src = teddie.imageUrl;
  copyHtml.querySelector(".card-title").textContent = teddie.name;
  copyHtml.querySelector("#price").textContent = `${teddiePrice}.00 € `;
  copyHtml.querySelector(".card-text").textContent = teddie.description;
  copyHtml.querySelector("a").href = `./pages/singleProduct.html?_id=${teddie._id}`;
  copyHtml.querySelector("a").textContent = teddie.name;
  let cards = document.getElementById("cards");
  cards.classList.add('animate__animated', 'animate__fadeInLeft');
  cards.appendChild(copyHtml);
})
 
/**Afficher les cart de index */
const displayCards = ((teddie)=> {
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
    copyHtml.querySelector("a").href = `singleProduct.html?_id=${teddie._id}`;
    copyHtml.querySelector("a").textContent = teddie.name;
    let cards = document.getElementById("cards");
    cards.classList.add('animate__animated', 'animate__fadeInLeft');
    cards.appendChild(copyHtml);
  })


/* afficher le button info du panier */
  const  afficheBage = (()=>{
    let badgeCart = document.querySelector('#badge');
     let dataStore = localStorage.length;
    if(dataStore >= 1){
      let bage = document.getElementById('bage');
      bage.textContent = `${dataStore} items dans le chariot`;
      badgeCart.innerHTML = dataStore;
      }else{
      bage.textContent = "0 items dans le chariot";
    }
  
  })

  /* affiché le titre et description de l'article */
  const afficheTitle =((data)=>{
  let titile = document.querySelector('.title');
    titile.classList.add('animate__animated', 'animate__fadeInLeft');
    titile.innerHTML = `${data.name} <br><small class="text-muted smallText">Peluche fait main<small>`;
  })

let navbarSupportedContent = document.querySelector('#navbarSupportedContent'); 
let btnCollapse = document.querySelector('#btnCollapse'); 
btnCollapse.addEventListener('click',(e)=>{
 e.preventDefault();
 navbarSupportedContent.classList.toggle('control');
})
 let cartLink = document.querySelector('.cartLink');
 cartLink.addEventListener('click',(e)=>{
  let storedata = localStorage.length;
  if(storedata >= 1){
     window.location.href = 'card.html';
   }else{
    window.location.href = '404.html';

   }
 })
function spaceSupressor(string) {
    return string.replace(/\s/g, "");
  }
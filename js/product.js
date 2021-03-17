// Vérifiez le chargement de la page complète avant de faire quoi que ce soit
window.addEventListener('DOMContentLoaded', (event) => {

  /** affiche la quantité de produit dans le panier */
  afficheBadge();

  /**Récupération du produit */ 
  const data = getData("http://localhost:3000/api/teddies/");

  if (!data) return;

  data.then(res => {
    res.forEach(el => {
      let product = el;
      checkUrl(product);
    })
  })

  /**Vérifier si l'URL correspond à l'ID*/
  function checkUrl(product) {
    let url = window.location.search.replace(/^.*?\=/, '');
    if (product._id === url) {
       createHtml(product);
      cartPage(product);
    } else{
     console.log('error');
    }
  }
  /**Afficher la cart Produit */
  function createHtml(product) {
    afficheTitle(product);
    let temp = document.getElementById('template');
    let copyHtml = temp.content.cloneNode(true);
     /** création l'option couleurs */
    let colors = product.colors;
    colors.forEach(color => {
      let option = document.createElement('option');
      option.textContent = color;
      option.value = color;
      copyHtml.querySelector("#options").appendChild(option);
    })

    let teddiePrice = product.price;
    let ted = teddiePrice.toString();
    let regex = /[1-9][^0]/g;
    let truePrice = [...ted.match(regex)];
    teddiePrice = truePrice.join();
   
    copyHtml.querySelector(".card-img-top").src = product.imageUrl;
    copyHtml.querySelector(".card-title").textContent = product.name;
    copyHtml.querySelector(".price").textContent = `${teddiePrice}.00 €`;
    document.querySelector(".description").textContent = product.description;


    let card = document.getElementById("card");
    card.appendChild(copyHtml);

  }

  /** sélectionnez les options et envoyez à localstorage */
  function cartPage(product) {
    let select = document.querySelector('#select');
    let priceString = document.querySelectorAll('.card-body');
    let priceRel;
    priceString.forEach(element => {
      priceRel = element.children[1].textContent;
    })
    priceRel.replace(priceRel, `${priceRel + .00}`);
    priceRel = parseFloat(priceRel);

    select.addEventListener('click', (e) => {
      e.preventDefault();
      let items = [];
      let item = {};
      let colors = product.colors
      colors.forEach(color => {
        let choose = document.querySelector('#options').value;
        let quantity = parseInt(document.querySelector('#quantity').value);
        let quantityPrice = parseFloat(priceRel).toFixed(2);
         if (choose === color) {
          item = {
            colors: choose,
            imageUrl: product.imageUrl,
            name: product.name,
            price: quantityPrice,
            _id: product._id,
            No: quantity
          }

          items.push(item);
          let chooseName = spaceSupressor(`${item.name}${choose}`);
          localStorage.setItem(chooseName, JSON.stringify(items));


        }

      })
      /** Aller à la page panier*/
      window.location.href = "card.html";
    })
  }

});
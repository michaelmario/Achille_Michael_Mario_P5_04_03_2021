// Check for full page load before doing anything
window.addEventListener('DOMContentLoaded', (event) => {
  // Fetching product
  const data = getData("http://localhost:3000/api/teddies/");

  if (!data) return;

  data.then(res => {
    res.forEach(el => {
      let product = el;
      checkUrl(product);
    })
  })


  function checkUrl(product) {
    let url = window.location.search.replace(/^.*?\=/, '');
    if (product._id === url) {
      createHtml(product);
      cartPage(product);
    } else if (!product._id === url) {
      return error;
    }
  }
  function createHtml(product) {
    afficheBage();
    afficheTitle(product);
    let temp = document.getElementById('template');
    let copyHtml = temp.content.cloneNode(true);

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
    console.log(teddiePrice);
    copyHtml.querySelector(".card-img-top").src = product.imageUrl;
    copyHtml.querySelector(".card-title").textContent = product.name;
    copyHtml.querySelector(".price").textContent = `${teddiePrice}.00 €`;
    document.querySelector(".description").textContent = product.description;


    let card = document.getElementById("card");
    card.appendChild(copyHtml);

  }


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
        console.log(quantityPrice);
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
      window.location.href = "card.html";
    })
  }

});
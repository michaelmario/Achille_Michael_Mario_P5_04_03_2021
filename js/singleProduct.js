class Produit {
    static getProducts() {
      fetch('http://localhost:3000/api/teddies/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
  
      })
        .then(response => response.json())
        .then(res => {
          res.forEach(el => {
            let data = el;
            Produit.checkUrl(data);
          });
          Produit.displayCart();
        })
        .catch((error) => {
         window.location.href = "404.html";
          console.error("Error:", error);
        })
    }
    static displayCart() {
      let dataStore = localStorage.length;
      if (dataStore >= 1) {
        let bage = document.getElementById('bage');
        bage.textContent = `${dataStore} items dans le panier`;
      } else {
        bage.textContent = "0 item in cart";
      }
  
    }
    static checkUrl(data) {
      let url = window.location.search.replace(/^.*?\=/, '');
        if (data._id === url) {      
          Produit.createHtml(data);
        Produit.cartPage(data);
      }else if(!data._id === url){
       return error;
      }
    }
    static createHtml(data) {
      afficheBage();
      afficheTitle(data);
      let temp = document.getElementById('template');
      let copyHtml = temp.content.cloneNode(true);
  
      let colors = data.colors;
      colors.forEach(color => {
        let option = document.createElement('option');
        option.textContent = color;
        option.value = color;
        copyHtml.querySelector("#options").appendChild(option);
      })
  
      let teddiePrice = data.price;
      let ted = teddiePrice.toString();
      let regex = /[1-9][^0]/g;
      let truePrice = [...ted.match(regex)];
      teddiePrice = truePrice.join();
      console.log(teddiePrice);
      copyHtml.querySelector(".card-img-top").src = data.imageUrl;
      copyHtml.querySelector(".card-title").textContent = data.name;
      copyHtml.querySelector(".price").textContent = `${teddiePrice}.00 €`;
      document.querySelector(".description").textContent = data.description;
  
  
      let card = document.getElementById("card");
       card.appendChild(copyHtml);
     
    }
  
  
    static cartPage(data) {
      let select = document.querySelector('#select'); 
       let priceString = document.querySelectorAll('.card-body');
       let priceRel ;
        priceString.forEach(element => {
          priceRel = element.children[1].textContent;          
      }) 
      priceRel.replace(priceRel, `${priceRel +.00}`);
      priceRel = parseFloat(priceRel);
       
      select.addEventListener('click', (e) => {
        e.preventDefault();
        let items = [];
        let item = {};
        let colors = data.colors
        colors.forEach(color => {
          let choose = document.querySelector('#options').value;
          let quantity = parseInt(document.querySelector('#quantity').value);   
          let quantityPrice = parseFloat(priceRel).toFixed(2);
          console.log(quantityPrice);
          if (choose === color) {
            item = {
              colors: choose,
              imageUrl: data.imageUrl,
              name: data.name,
              price: quantityPrice,
              _id: data._id,
              No:quantity
            }
  
            items.push(item);
            let chooseName = spaceSupressor(`${item.name}${choose}`);
            items = items.concat(JSON.parse(localStorage.getItem('checkItems')||'[]'));
  
            localStorage.setItem('checkItems', JSON.stringify(items))
          }
  
        })
        window.location.href = "card.html";
      })
    }
  
    
   
  
  }
  
  document.addEventListener('DOMContentLoaded', Produit.getProducts);
  
  
  
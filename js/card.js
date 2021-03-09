let dataStore = localStorage.length;
let changePrice = document.querySelector(".price"); 
function getDataStore() {
    let bage = document.getElementById('bage');
    bage.textContent = `${dataStore} items dans le chariot`;
    if (dataStore >= 1) {
        for (let i = 0; i < dataStore; i++) {
            const key = localStorage.key(i);
        }
            let itemsData = localStorage.getItem('checkItems');
            let items = JSON.parse(itemsData);
        
            console.log(items);
            items.forEach(el => {
                let teddiePrice = el.price * el.No;
                    teddiePrice = parseInt(teddiePrice);
                let tempCart = document.getElementById('tempCart');
                let keyName = spaceSupressor(el.name + el.colors);
                var copyTemp = tempCart.content.cloneNode(true);
                copyTemp.querySelector(".cardImg").src = el.imageUrl;
                copyTemp.querySelector(".card-title").innerHTML = `<strong>${el.name} </strong>`;
                copyTemp.querySelector(".price").textContent = `${teddiePrice} € `;
                copyTemp.querySelector(".color").innerHTML = `<strong>Couleur : </strong> ${el.colors}`;
                let option = document.createElement('option');
                option.innerHTML = `${el.No}`;
                option.value = `${el.quantity}`;
                let option1 = document.createElement('option');
                option1.innerHTML= ' <option value="1">1</option>';
                let option2 = document.createElement('option');
                option2.innerHTML= '<option value="2">2</option>';
                let option3 = document.createElement('option');
                option3.innerHTML= ' <option value="3">3</option>';
               
                copyTemp.querySelector(".cardQuantity").appendChild(option); 
                copyTemp.querySelector(".cardQuantity").appendChild(option1);
                copyTemp.querySelector(".cardQuantity").appendChild(option2);
                copyTemp.querySelector(".cardQuantity").appendChild(option3);
                copyTemp.querySelector(".btnRemove").id = keyName;
                copyTemp.querySelector(".selectQuantity").id = el._id;

                let output = document.getElementById("output");
                output.appendChild(copyTemp);

               let selectQuantity = document.querySelectorAll('.selectQuantity');
               let quantitybtn;
               selectQuantity.forEach((quantity)=>{
               return quantitybtn =  quantity;
            })
            quantitybtn.addEventListener('click',((e)=>{
                    let targetCart = e.target;
                    let floatprice = el.price;
                   // let trueValue = (floatprice * el.No) 
                  
                     let cardQuantity = document.querySelector('.cardQuantity').value;
                     if(cardQuantity){
                     let totalPrice = (floatprice * cardQuantity);
                     targetCart.parentNode.parentNode.firstElementChild.children[1].innerHTML = totalPrice; 
                     document.querySelector('.selectQuantity').classList.add('mystyle');
                      localStorage.setItem('totalPrice',totalPrice);
                      //  window.location.href="card.html";
                     }         
                                
                    }))
               
                
                let btnRemove = document.querySelector(`#${keyName}`);
                btnRemove.addEventListener('click', function (e) {                    
                    if(localStorage.length >= 1){ 
                        localStorage.removeItem(e.target.id);
                        console.log(e.target.id)

                    //window.location.href = "card.html";
                    }else{
                        window.location.href = "index.html";
  
                    }
                })
            });

        }
    
    getPrice();
    /* afficher le button info du panier */
    afficheBage(); 
    

}

document.addEventListener('DOMContentLoaded', getDataStore);

function getPrice() {
    prices = [];
    let priceString = document.querySelectorAll('.card-body');
    priceString.forEach(element => {
        let priceRel = element.firstElementChild.children[1].textContent;
            priceRel = spaceSupressor(priceRel);
            priceRel.slice(-1);
            prices.push(parseFloat(priceRel));

    })
    function myFunc(total, num) {
        return total += num;
    };
    if(dataStore >=1){
    document.getElementById("demo").innerHTML = `<strong> Vous avez un total de  ${prices.reduce(myFunc)}.00  € </strong>`;
    }else{
        let alert = document.getElementById('alert');
        let errors = document.getElementById('pre');
        alert.style.display = "block";
        alert.classList.add('animate__animated', 'animate__fadeInLeft');
        errors.textContent = "Vous avez  rien dans le panier";      
    }

}
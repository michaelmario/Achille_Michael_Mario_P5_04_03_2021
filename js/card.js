let dataStore = localStorage.length;
function getDataStore() {
    let bage = document.getElementById('bage');
    bage.textContent = `${dataStore} items dans le chariot`;
    if (dataStore >= 1) {
        for (let i = 0; i < dataStore; i++) {
            const key = localStorage.key(i);
            let itemsData = localStorage.getItem(key);
            let items = JSON.parse(itemsData);

            items.forEach(el => {
                let teddiePrice = el.price;
              /*  let ted = teddiePrice.toString();
                let regex = /[1-9][^0]/g;
                let truePrice = [...ted.match(regex)];
                teddiePrice = truePrice.join();*/
                let tempCart = document.getElementById('tempCart');
                let keyName = spaceSupressor(el.name + el.colors);
                var copyTemp = tempCart.content.cloneNode(true);
                copyTemp.querySelector(".cardImg").src = el.imageUrl;
                copyTemp.querySelector(".card-title").innerHTML = `<strong>${el.name} </strong>`;
                copyTemp.querySelector(".price").textContent = `${teddiePrice} € `;
                copyTemp.querySelector(".color").innerHTML = `<strong>Couleur : </strong> ${el.colors}`;
                copyTemp.querySelector(".quantity").innerHTML = `<strong>Quantités : </strong> ${el.quantity}`;
                copyTemp.querySelector(".btnRemove").id = keyName;

                let output = document.getElementById("output");
                output.appendChild(copyTemp);


                let btnRemove = document.querySelector(`#${keyName}`);
                btnRemove.addEventListener('click', function (e) {
                    localStorage.removeItem(e.target.id);
                    window.location.href = "card.html";
                })
            });

        }
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
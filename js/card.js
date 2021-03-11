let dataStore = localStorage.length;
const form = document.querySelector("#confirmform");
let demo = document.getElementById("demo");
const products = [];


function getDataStore() {
    let bage = document.getElementById('bage');
    bage.textContent = `${dataStore} items dans le chariot`;
    if (dataStore >= 1) {
        for (let i = 0; i < dataStore; i++) {
            let key = localStorage.key(i);

            let itemsData = JSON.parse(localStorage.getItem(key));
            /**creation les cartes du  panier  */
            itemsData.forEach(el => {
                let teddiePrice = el.price * el.No;
                teddiePrice = parseInt(teddiePrice);
                let tempCart = document.getElementById('tempCart');
                let keyName = spaceSupressor(el.name + el.colors);
                var copyTemp = tempCart.content.cloneNode(true);
                copyTemp.querySelector(".cardImg").src = el.imageUrl;
                copyTemp.querySelector(".card-title").innerHTML = `<strong>${el.name} </strong>`;
                copyTemp.querySelector(".price").textContent = `${teddiePrice + '.'} 00 € `;
                copyTemp.querySelector(".color").innerHTML = `<strong>Couleur : </strong> ${el.colors}`;
                let option = document.createElement('option');
                option.innerHTML = `${el.No}`;
                option.value = `${el.No}`;
                let option1 = document.createElement('option');
                option1.innerHTML = ' <option value="1">1</option>';
                let option2 = document.createElement('option');
                option2.innerHTML = '<option value="2">2</option>';
                let option3 = document.createElement('option');
                option3.innerHTML = ' <option value="3">3</option>';

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
                selectQuantity.forEach((quantity) => {
                    return quantitybtn = quantity;
                })
                /**button pour modifier la commande */
                quantitybtn.addEventListener('click', ((e) => {
                    let targetCart = e.target;
                    let value = targetCart.parentNode.children[2].value;

                    let cardQuantity = el.No;
                    let totalPrice;
                    let target = targetCart.parentNode.parentNode.firstElementChild.children[1];
                    if (cardQuantity) {
                        totalPrice = parseInt(el.price * value);
                        target.innerHTML = `${totalPrice + '.'}00 € `;
                        console.log(value);
                    } else {
                        totalPrice = parseInt(floatprice / value);
                        target.innerHTML = `${totalPrice + '.'}00 € `;
                    }
                    /* afficher le prix total après modification des commandes  */
                    getPrice();

                }))

                /**button pour retire la commande du panier */
                let btnRemove = document.querySelector(`#${keyName}`);
                btnRemove.addEventListener('click', function (e) {
                    if (localStorage.length >= 1) {
                        localStorage.removeItem(e.target.id);
                        window.location.reload();
                    }
                })

                /* afficher le button info du panier */
                afficheBage();
                /* afficher le prix total en arrivant sur la page */
                getPrice();
            })

        }
    } else {

        document.getElementById("priceLoader").style.display = "none";
        form.style.display = "none";
        let alert = document.getElementById('alert');
        alert.style.display = "block";
        alert.classList.add('animate__animated', 'animate__fadeInLeft');
        let errors = document.getElementById('pre');
        errors.textContent = "vous avez plus d'ours en peluche dans le panier";


    }
}





document.addEventListener('DOMContentLoaded', getDataStore);

function getPrice() {
    prices = [];
    let priceString = document.querySelectorAll('.card-body');
    priceString.forEach(element => {
        let priceRel = element.firstElementChild.children[1].textContent;
        priceRel = spaceSupressor(priceRel);
        priceRel.slice(-1);
        prices.push(parseInt(priceRel));

    })
    function totalPrice(total, num) {
        return total += num;
    };
    if (dataStore >= 1) {
        demo.innerHTML = `<strong class="textSize"> Vous avez un total de  ${prices.reduce(totalPrice)}.00  € </strong>`;
    }
}
const firstNamestatus = document.getElementById("firstNamestatus");
const lastNamestatus = document.getElementById("lastNamestatus");
const adressstatus = document.getElementById("adressstatus");
const citystatus = document.getElementById("citystatus");
const emailstatus = document.getElementById("emailstatus");

const textRegex = /^[_A-z]*((-|\s)*[_A-z])*$/;
const adressRegex = /[A-za-z0–9_]\w*$/gi;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const city = document.getElementById("city");
const address = document.getElementById("adress");
const email = document.getElementById("email");
const mainSubmit = document.querySelector('#mainSubmit');

/**check firstName */
function checkusername(firstName) {
    if (firstName.value != "") {
        let test = textRegex.test(firstName.value);

        if (!test) {
            firstNamestatus.innerHTML = "seul le texte avec l'alphabet est autorisé 🤬";
            mainSubmit.style.display = "none";
        } else {
            firstNamestatus.innerHTML = "Bonjour " + firstName.value + ' 👍';
            mainSubmit.style.display = "block";

        }

    }
}
/**check lastName */
function checklastName(lastName) {
    if (lastName.value != "") {
        let testlast = textRegex.test(lastName.value);
        if (!testlast) {
            lastNamestatus.innerHTML = "seul le texte avec l'alphabet est autorisé 🤬";
            mainSubmit.style.display = "none";
        } else {
            mainSubmit.style.display = "block";

        }
    }

}
/**check adress */
function checkadress(adress) {
    if (adress.value != "") {
        let testadress = adressRegex.test(adress.value);
        if (!testadress) {
            adressstatus.innerHTML = "seul le texte avec l'alphabet est autorisé 🤬";
            mainSubmit.style.display = "none";
        } else {
            mainSubmit.style.display = "block";

        }

    }

}
/**check city  */
function checkcity(city) {
    if (city.value != "") {
        let testcity = textRegex.test(city.value);
        if (!testcity) {
            citystatus.innerHTML = "seul le texte avec l'alphabet est autorisé 🤬";
            mainSubmit.style.display = "none";
        } else {
            mainSubmit.style.display = "block";

        }

    }

}
/**check email */
function checkEmail(email) {
    if (email.value != "") {
        let testemail = emailRegex.test(email.value);
        if (!testemail) {
            emailstatus.innerHTML = "l'adresse e-mail n'est pas formatée correctement  🤬";
            mainSubmit.style.display = "none";
        } else {
            mainSubmit.style.display = "block";

        }

    }

}
// Listening for submit to POST
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let orderPrice = demo.textContent;
    orderPrice = orderPrice.slice(22);
    let orders = [];
    for (let i = 0; i < dataStore; i++) {
        let keyorder = localStorage.key(i);
        keyorder = JSON.parse(localStorage.getItem(keyorder))
        orders.push(keyorder);
        localStorage.clear();
    }

    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: adress.value,
        city: city.value,
        email: email.value,
        orders: orders,
        orderprice: orderPrice
    };

    localStorage.setItem("orders", JSON.stringify(contact));

    const body = {
        contact
    };
    postData(
        "http://localhost:3000/api/teddies/order",
        body,
    );

    console.log(body);

})


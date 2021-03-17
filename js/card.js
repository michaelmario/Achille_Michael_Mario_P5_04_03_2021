let dataStore = localStorage.length;
const form = document.querySelector("#confirmform");
let demo = document.getElementById("demo");
const productsDestination = document.getElementById("destination");
let product__warning = document.querySelector(".product__warning");
const products = [];

function getDataStore() {
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
                let copyTemp = tempCart.content.cloneNode(true);
                copyTemp.querySelector(".cardImg").src = el.imageUrl;
                copyTemp.querySelector(".card-title").innerHTML = `<strong>${el.name} </strong>`;
                copyTemp.querySelector(".price").textContent = `${el.price}  € `;
                copyTemp.querySelector(".color").innerHTML = `<strong>Couleur : </strong> ${el.colors}`;
                copyTemp.querySelector(".cardTitle").innerHTML = "<strong>Total</strong>";
                copyTemp.querySelector(".totalPrice").textContent = `${teddiePrice + '.'} 00 € `;
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
                    let targetTotal = targetCart.parentNode.children[5].children[1];

                    if (cardQuantity) {
                        totalPrice = parseInt(el.price * value);
                        targetTotal.innerHTML = `${totalPrice + '.'}00 € `;

                    } else {
                        totalPrice = parseInt(floatprice / value);
                        targetTotal.innerHTML = `${totalPrice + '.'}00 € `;
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

                /* afficher le prix total en arrivant sur la page */
                getPrice();
                afficheBage();
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


//obtenir tous les prix du corps de la carte, convertir en entier, mettre dans un tableau, les additionnée
function getPrice() {
    prices = [];
    let priceString = document.querySelectorAll('.card-body');
    priceString.forEach(element => {       
        let priceRel = element.children[1].children[5].children[1].textContent;
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
const addresstatus = document.getElementById("addresstatus");
const citystatus = document.getElementById("citystatus");
const emailstatus = document.getElementById("emailstatus");


const adressRegex = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;


const mainSubmit = document.getElementById("mainSubmit");
let errors = [];
// Listening for submit to POST
mainSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let city = document.getElementById("city").value;
    let address = document.getElementById("adress").value;
    let email = document.getElementById("email").value;

    if (firstName == '' && lastName == '' && city == '' && address == '' && email == '') {
        product__warning.classList.add('animate__animated', 'animate__fadeInRight');
        product__warning.textContent =
            "Votre prénom, nom et ville ne doivent pas contenir de chiffres. Vos informations ne peuvent pas contenir de caractères spéciaux comme '=', '<>', '?'...";
    } else {
        if (errors.length === 0) {
            let orderPrice = demo.textContent;
            orderPrice = orderPrice.slice(22);
            let orders = [];
            for (let i = 0; i < dataStore; i++) {
                let keyorder = localStorage.key(i);
                keyorder = JSON.parse(localStorage.getItem(keyorder))
                products.push(keyorder);
                orders.push(keyorder);
            }

            const contact = {
                firstName,
                lastName,
                address,
                city,
                email,
                orders: orders,
            };
            
            const body = {
                contact,
                products
            };
            postData(
                "http://localhost:3000/api/teddies/order",
                body,
                orderPrice
            );

        }
        localStorage.clear();
    }
});



function checkusername(input) {
    let inputValue = input.value;
    let regex = new RegExp(/[a-zA-z]/gi);
    Regex = regex.test(inputValue);
    if (Regex) {
        mainSubmit.style.display = "block";
        return errors = [];
    } else {
        firstNamestatus.classList.add('animate__animated', 'animate__fadeInRight');
        mainSubmit.style.display = "none";
        firstNamestatus.textContent = "seul le texte avec l'alphabet est autorisé 🤬";
        let error = "texte  only";
        errors.push(error);

    }

}

function checkusermail(email) {
    let emailValue = email.value;
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let emailRegex = regex.test(emailValue);
    if (emailRegex) {
        mainSubmit.style.display = "block";
        return errors = [];
    } else {
        emailstatus.innerHTML = "l'adresse e-mail n'est pas formatée correctement  🤬";
        mainSubmit.style.display = "none";
        let error = "Email format only";
        errors.push(error);

    }
}

function checkaddress(address) {
    let addressValue = address.value;
    let regex = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
    let addressRegex = regex.test(addressValue);
    if (addressRegex) {
        mainSubmit.style.display = "block";
        return errors = [];
    } else {
        addresstatus.innerHTML = "l'adress ne peuvent pas contenir de caractères spéciaux comme '=', '<>', '?'...  🤬";
        mainSubmit.style.display = "none";
        let error = "texte and numerique only";
        errors.push(error);

    }
}
document.getElementById('Refresh').addEventListener('click', function (e) {
    e.preventDefault();
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let city = document.getElementById("city");
    let address = document.getElementById("adress");
    let email = document.getElementById("email");
    firstName.value = '';
    lastName.value = '';
    city.value = '';
    address.value = '';
    email.value = '';
    firstNamestatus.textContent = '';
    lastNamestatus.innerHTML = '';
    citystatus.innerHTML = '';
    emailstatus.innerHTML = '';
    addresstatus.innerHTML = '';
    product__warning.textContent = '';
    mainSubmit.style.display = "block";
})


























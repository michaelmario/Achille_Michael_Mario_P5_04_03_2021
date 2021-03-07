window.addEventListener('DOMContentLoaded', (event) => {

    fetch('http://localhost:3000/api/teddies/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            data.forEach((teddie) => {
                displayCards(teddie);
            });

        })
        .catch((error) => {
            let alert = document.getElementById('alert').style.display = "block";
            let errors = document.getElementById('pre');
            errors.textContent = "We are sorry !!! come back later";
            console.error('Error:', error);
        });

    function displayCards(teddie) {
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
    }


    afficheCart();



});
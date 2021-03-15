// Vérifiez le chargement de la page complète avant de faire quoi que ce soit
window.addEventListener('DOMContentLoaded', (event) => {
    let orderStore = localStorage.length;
    let username = document.querySelector('.username');
    let orderId = document.querySelector('.orderId');
    let useremail = document.querySelector('.useremail');
    let destination = document.querySelector('.destination');
    let summeryOrderId = document.querySelector('.SummeryorderId');
    let product = document.querySelector('#products');


    let mainContainer = document.querySelector('#mainContainer');
    cartLink.style.display = 'none';
    // Redirection vers la page d'accueil si localstorage == 0
    if (orderStore == 0) {
        mainContainer.innerHTML = "";
        window.location.replace("../../index.html");
    }
    if (orderStore >= 1) {
        let orderData = JSON.parse(localStorage.getItem('orderRecap'));
        let orderprice = localStorage.getItem('price');
        let contactData = orderData.contact;
        let ordersContact = orderData.contact.orders;
        let productData = orderData.products;
        let serialNo = orderData.orderId;
      
        ordersContact.map(el => {
            for (let i = 0; i < el.length; i++) {
                let cartel = el[i];
                let cartelPrice = cartel.No * cartel.price;
                let tr = document.createElement('tr');
                let noProducts = document.createElement('td');
                let nameProducts = document.createElement('td');
                let colorsProducts = document.createElement('td');
                let priceProducts = document.createElement('td');
                noProducts.textContent = cartel.No;
                nameProducts.textContent = cartel.name;
                colorsProducts.textContent = cartel.colors;
                priceProducts.innerHTML = `<strong>${cartelPrice +'.'}00 € </strong>`;
                tr.appendChild(noProducts);
                tr.appendChild(nameProducts);
                tr.appendChild(colorsProducts);
                tr.appendChild(priceProducts);
                product.appendChild(tr);
            }


        })
        let pricetr = document.createElement('tr');       
        let tdp1 = document.createElement('td');
        tdp1.innerHTML = "<strong>Total</strong>";
        let tdp2 = document.createElement('td');
        let tdp3 = document.createElement('td');
         let tdprice = document.createElement('td');
        tdprice.innerHTML = `<strong>${orderprice}</strong>`;
        pricetr.appendChild(tdp1);
        pricetr.appendChild(tdp2);
        pricetr.appendChild(tdp3);
        pricetr.appendChild(tdprice);
        product.appendChild(pricetr);

        
        username.innerHTML = `<strong>${contactData.firstName}</strong>`;
        orderId.innerHTML = `<strong>${serialNo}</strong>`;
        summeryOrderId.innerHTML = `<strong>${serialNo}</strong>`;
        useremail.innerHTML = `<strong>${contactData.email}</strong>`;
        destination.innerHTML = `<strong>${contactData.address}</strong>`;

        localStorage.clear();

    }


});

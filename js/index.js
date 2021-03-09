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
        document.getElementById('alert').style.display = "block";
        let errors = document.getElementById('pre');
        errors.classList.add('animate__animated', 'animate__fadeInLeft');
        errors.textContent = "Nous sommes désolés !!! revenez plus tard";
        console.error('Error:', error);
      });
  
      /* afficher le button info du panier */
      afficheBage();
  });
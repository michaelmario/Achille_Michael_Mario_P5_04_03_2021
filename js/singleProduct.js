function spaceSupressor(string) {
    return string.replace(/\s/g, "");
}

function afficheCart() {
    let badgeCart = document.querySelector('#badge');
    let dataStore = localStorage.length;
    if (dataStore >= 1) {
        let bage = document.getElementById('bage');
        bage.textContent = `${dataStore} items dans le chariot`;
        badgeCart.innerHTML = dataStore;
    } else {
        bage.textContent = "0 items dans le chariot";
    }

}
function afficheTitle(data) {
    let titile = document.querySelector('.title');
    titile.classList.add('animate__animated', 'animate__fadeInLeft');
    titile.innerHTML = `${data.name} <br><small class="text-muted smallText">Peluche fait main<small>`;

}
let navbarSupportedContent = document.querySelector('#navbarSupportedContent');
let btnCollapse = document.querySelector('#btnCollapse');
btnCollapse.addEventListener('click', (e) => {
    e.preventDefault();
    navbarSupportedContent.classList.toggle('control');
})
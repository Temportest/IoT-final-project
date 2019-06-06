/** Navigation bar */
function onMenu() {
  document.body.classList.add("with--sidebar");
  // add listener to disable scroll
  window.addEventListener('scroll', noscroll);
}
function offMenu() {
  document.body.classList.remove("with--sidebar");
  // Remove listener to disable scroll
  window.removeEventListener('scroll', noscroll);
}
// disable scroll window
function noscroll() {
  window.scrollTo(0, 0);
}



/** Nav Toggle(right) */
const toggle = document.getElementById('toggle');
const dropdown = document.getElementById('dropdown');
const toggleNavbar = document.getElementById('toggleNavbar');

document.body.addEventListener('click', function (evt) {
  if (toggle.getAttribute("expanded") == "false") {
    dropdown.classList.remove("show");
    toggle.setAttribute("expanded", "true");
  }

})

toggle.addEventListener('click', function (event) {
  if (toggle.getAttribute("expanded") == "true") {
    dropdown.classList.add("show");
    toggle.setAttribute("expanded", "false");
  } else {
    dropdown.classList.remove("show");
    toggle.setAttribute("expanded", "true");
  }
  event.stopPropagation();
})
// localstorage
const brainLocalStorage = (localStorage.getItem('brain-dashboard')) ? JSON.parse(localStorage.getItem('brain-dashboard')) : {
  port: 5000,
  ipAddress: '127.0.0.1'
};
localStorage.setItem('brain-dashboard', JSON.stringify(brainLocalStorage));
// Port PORT input
const portInput = document.getElementById('portInput');
// IP Address input
const ipInput = document.getElementById('ipInput');
// init input data value
portInput.value = brainLocalStorage.port;
ipInput.value = brainLocalStorage.ipAddress;

// Modal 
const call = () => {
  new Modal({ el: document.getElementById('static-modal') }).show();
}
const buttonOK = () => {
  portInput.value = portInput.value;
  ipInput.value = ipInput.value;
  localStorage.setItem('brain-dashboard', JSON.stringify({ port: portInput.value, ipAddress: ipInput.value }));
  setTimeout(() => { location.reload(); }, 300)
}




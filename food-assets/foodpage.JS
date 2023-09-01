const checkbtn = document.getElementById('check');
const navbar = document.getElementById('navbar')
checkbtn.onclick = function() {
    checkbtn.classList.toggle("active")
    navbar.classList.toggle("active")
}
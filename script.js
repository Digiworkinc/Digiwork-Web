
// Ambil elemen navbar dan burger line
const navbar = document.querySelector('.navbar');
const burgerLines = document.querySelectorAll('.bar');

// Atur posisi awal elemen navbar dan burger line
let isNavbarFixed = false;

// Fungsi untuk mengubah posisi elemen saat scroll
function handleScroll() {
    if (window.scrollY > 100 && !isNavbarFixed) {
        navbar.classList.add('fixed');
        burgerLines.forEach(line => line.classList.add('fixed'));
        isNavbarFixed = true;
    } else if (window.scrollY <= 100 && isNavbarFixed) {
        navbar.classList.remove('fixed');
        burgerLines.forEach(line => line.classList.remove('fixed'));
        isNavbarFixed = false;
    }
}

// Tambahkan event listener untuk scroll

window.addEventListener('scroll', handleScroll);

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('blurred');
    } else {
        navbar.classList.remove('blurred');
    }
});


// Fungsi untuk mengganti ikon hamburger menjadi tanda silang (X) dan sebaliknya
function toggleMenu() {
    const menu = document.getElementById("menu");
    const hamburgerMenu = document.getElementById("hamburgerMenu");

    menu.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
}

// Menggunakan event listener untuk menambahkan fungsi toggleMenu saat hamburger di klik
document.getElementById("hamburgerMenu").addEventListener("click", toggleMenu);




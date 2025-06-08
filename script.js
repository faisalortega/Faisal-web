// Pastikan DOMContentLoaded listener hanya ada satu di awal script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mengisi tahun saat ini secara otomatis di footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // --- Efek Ketik (Typing Effect) ---
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) { // Pastikan elemen ada sebelum menjalankan typing effect
        const texts = ["Pengembang Web", "Desainer Grafis", "Content Creator", "Freelancer"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100; // Kecepatan mengetik (ms)
        const deletingSpeed = 60; // Kecepatan menghapus (ms)
        const delayBetweenTexts = 1500; // Jeda antar teks (ms)

        function type() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                typingTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = delayBetweenTexts;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = typingSpeed;
            }

            setTimeout(type, speed);
        }
        // Mulai typing effect setelah jeda awal
        setTimeout(type, delayBetweenTexts);
    }


    // --- Efek Gulir Halus (Smooth Scroll) ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah perilaku default link

            const targetId = this.getAttribute('href'); // Dapatkan ID target (misal: #about)
            const targetElement = document.querySelector(targetId); // Dapatkan elemen target

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight; // Dapatkan tinggi header
                const offsetPosition = targetElement.offsetTop - headerOffset; // Hitung posisi akhir dengan offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Gulir dengan animasi halus
                });
            }
        });
    });

    // --- Animasi Scroll Reveal (Intersection Observer) ---
    // Pastikan Anda menambahkan class 'reveal' ke elemen HTML yang ingin dianimasikan
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, // Mengamati viewport
        rootMargin: '0px',
        threshold: 0.15 // Berapa persen elemen yang harus terlihat untuk memicu animasi (15%)
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); // Tambahkan class 'is-visible'
                observer.unobserve(entry.target); // Berhenti mengamati setelah muncul (agar animasi hanya sekali)
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el); // Mulai mengamati setiap elemen dengan class 'reveal'
    });

     // --- Fungsionalitas Tombol Hamburger ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul'); // Pilih elemen ul navigasi Anda

    if (menuToggle && navUl) { // Pastikan kedua elemen ada
        menuToggle.addEventListener('click', function() {
            // Toggle class 'open' pada tombol hamburger untuk animasinya
            menuToggle.classList.toggle('open');
            // Toggle class 'nav-open' pada ul navigasi untuk menampilkan/menyembunyikan menu
            navUl.classList.toggle('nav-open');
        });

        // Opsional: Tutup menu saat link navigasi diklik (berguna untuk mobile)
        navUl.querySelectorAll('li a').forEach(link => {
            link.addEventListener('click', function() {
                if (navUl.classList.contains('nav-open')) {
                    navUl.classList.remove('nav-open');
                    menuToggle.classList.remove('open');
                }
            });
        });
    }
}); // Akhir dari DOMContentLoaded

// --- Header Scroll Effect (change background on scroll) ---
// Ini tetap di luar DOMContentLoaded karena event 'scroll' terjadi secara berulang di window
// dan tidak bergantung pada seluruh DOM yang dimuat, hanya keberadaan elemen 'header'.
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Jika digulir lebih dari 50px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


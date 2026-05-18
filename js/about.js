document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".slider-wrapper");
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".btn-left");
    const btnRight = document.querySelector(".btn-right");

    if (!wrapper || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideDuration = 10000; // Waktu pergantian otomatis: 10 detik
    let autoSlideInterval;

    // Fungsi Utama menggeser Slider
    function updateSliderPosition() {
        // Menggeser posisi wrapper berdasarkan indeks sekarang (0% , -100%, -200%, -300%)
        const percentageToTranslate = -(currentIndex * 100 / totalSlides);
        wrapper.style.transform = `translateX(${percentageToTranslate}%)`;
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Kembali ke slide pertama jika sudah di akhir
        }
        updateSliderPosition();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Lompat ke slide terakhir jika menekan kiri di slide pertama
        }
        updateSliderPosition();
    }

    // Fungsi Reset Timer Otomatis agar tidak bentrok dengan klik manual pengguna
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    // Event Listener untuk Tombol Navigasi Manual
    btnRight.addEventListener("click", () => {
        nextSlide();
        startAutoSlide(); // Reset hitungan 10 detik dari awal lagi
    });

    btnLeft.addEventListener("click", () => {
        prevSlide();
        startAutoSlide(); // Reset hitungan 10 detik dari awal lagi
    });

    // Jalankan sistem geser otomatis pertama kali saat halaman terbuka
    startAutoSlide();
});
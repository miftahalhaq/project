/* HEADER & FOOTER INJECTOR */
function loadComponent(elementId, filePath, callback = null) {
    const container = document.getElementById(elementId);
    if (!container) return;

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load component: " + filePath);
            return response.text();
        })
        .then(htmlContent => {
            container.innerHTML = htmlContent;
            if (callback) callback(); 
        })
        .catch(error => console.error("Error component loading:", error));
}

function initNavbarLogic() {
    const hamburger = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");
    const allLinks = document.querySelectorAll(".nav-links a");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("nav-active");
            hamburger.classList.toggle("toggle-line");
        });
    }

    const currentPath = window.location.pathname.split("/").pop();
    allLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
            link.style.color = "var(--accent-color)";
            link.style.borderBottom = "2px solid var(--accent-color)";
            link.style.paddingBottom = "4px";
        }
    });
}

/* INTERACTIVE PAGE */

// AUTO IMAGE SLIDER
function initImageSlider() {
    const wrapper = document.querySelector(".slider-wrapper");
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".btn-left");
    const btnRight = document.querySelector(".btn-right");

    if (!wrapper || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideDuration = 10000;
    let autoSlideInterval;

    function updateSliderPosition() {
        const percentageToTranslate = -(currentIndex * 100 / totalSlides);
        wrapper.style.transform = `translateX(${percentageToTranslate}%)`;
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) currentIndex++;
        else currentIndex = 0;
        updateSliderPosition();
    }

    function prevSlide() {
        if (currentIndex > 0) currentIndex--;
        else currentIndex = totalSlides - 1;
        updateSliderPosition();
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    if (btnRight) {
        btnRight.addEventListener("click", () => { nextSlide(); startAutoSlide(); });
    }
    if (btnLeft) {
        btnLeft.addEventListener("click", () => { prevSlide(); startAutoSlide(); });
    }

    startAutoSlide();
}

// EXPAND BTN
function initEquipmentToggle() {
    var colls = document.getElementsByClassName('collapsible');

    for (var i = 0; i < colls.length; i++) {
        colls[i].addEventListener('click', function () {
            this.classList.toggle('active');
            
            var descriptionRow = this.nextElementSibling;
            if (!descriptionRow) return;

            var con = descriptionRow.querySelector('.content-wrapper');
            if (!con) return;

            if (descriptionRow.classList.contains('open')) {
                con.style.maxHeight = null;
                setTimeout(() => {
                    if (!this.classList.contains('active')) {
                        descriptionRow.classList.remove('open');
                    }
                }, 400);
            } else {
                descriptionRow.classList.add('open');
                requestAnimationFrame(() => {
                    con.style.maxHeight = (con.scrollHeight + 48) + 'px'; 
                });
            }
        });
    }
}

// FORM VALIDATION
function initSponsorshipForm() {
    const sponsorshipForm = document.getElementById("sponsorship-form");
    if (sponsorshipForm) {
        sponsorshipForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            window.location.href = "confirmation.html";
        });
    }
}

/* EVENT LISTENER INITIALIZATION */
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("global-header", "components/header.html", initNavbarLogic);
    loadComponent("global-footer", "components/footer.html");

    initImageSlider();
    initEquipmentToggle();
    initSponsorshipForm();
});
/* MAIN FUNCTION */

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

/* HAMBURGER */
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

/* SPECIFIC FUNCTIONS */

/* SLIDER */
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
        btnRight.addEventListener("click", () => {
            nextSlide();
            startAutoSlide();
        });
    }

    if (btnLeft) {
        btnLeft.addEventListener("click", () => {
            prevSlide();
            startAutoSlide();
        });
    }

    startAutoSlide();
}

/* EXPAND TABLE */
function initEquipmentToggle() {
    const expandButtons = document.querySelectorAll(".toggle-btn");
    
    if (expandButtons.length === 0) return;

    expandButtons.forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            const descriptionRow = document.getElementById(targetId);

            if (!descriptionRow) return;

            if (descriptionRow.style.display === "none" || descriptionRow.style.display === "") {
                descriptionRow.style.display = "table-row";
                this.textContent = "Collapse";
                this.classList.add("btn-active");
            } else {
                descriptionRow.style.display = "none";
                this.textContent = "Expand";
                this.classList.remove("btn-active");
            }
        });
    });
}

/* SPONSORSHIP TO CONFIRMATION */
function initSponsorshipForm() {
    const sponsorshipForm = document.getElementById("sponsorship-form");
    if (sponsorshipForm) {
        sponsorshipForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            window.location.href = "confirmation.html";
        });
    }
}

/* MAIN INIATITION */
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("global-header", "components/header.html", initNavbarLogic);
    loadComponent("global-footer", "components/footer.html");
    initImageSlider();
    initEquipmentToggle();
    initSponsorshipForm();
});
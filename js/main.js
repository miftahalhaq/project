document.addEventListener("DOMContentLoaded", () => {
    // Load global components automatically
    loadComponent("global-header", "components/header.html", initNavbarLogic);
    loadComponent("global-footer", "components/footer.html");
});

/**
 * Universal function to fetch and inject HTML components
 * @param {string} elementId - Target container ID
 * @param {string} filePath - Path to the HTML component file
 * @param {function} callback - Optional function to run after injection
 */
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

/**
 * Initializes mobile hamburger menu interactivity and highlights current active page
 */
function initNavbarLogic() {
    const hamburger = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");
    const allLinks = document.querySelectorAll(".nav-links a");

    // 1. Mobile Menu Toggle Interactivity
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            // Toggle active class to slide navbar in/out
            navLinks.classList.toggle("nav-active");
            
            // Toggle lines conversion animation into an 'X' shape
            hamburger.classList.toggle("toggle-line");
        });
    }

    // 2. Auto-Highlight Active Page Link (UX Enhancement)
    const currentPath = window.location.pathname.split("/").pop();
    allLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        // Check if current URL matches the href attribute
        if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
            link.style.color = "var(--accent-color)";
            link.style.borderBottom = "2px solid var(--accent-color)";
            link.style.paddingBottom = "4px";
        }
    });
}
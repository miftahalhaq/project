document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("form-registrasi");

    if (registrationForm) {
        registrationForm.addEventListener("submit", (event) => {
            // Block native automated server transmission attempts (Pure Frontend Execution)
            event.preventDefault();

            // Fetch input node field values securely and remove leading/trailing white spaces
            const clientName = document.getElementById("nama").value.trim();
            const emergencyContact = document.getElementById("kontak-darurat").value.trim();

            // Regular Expression (Regex) Validation: Accepts digits only, length between 10 to 15 characters
            const numericalPhoneRegex = /^[0-9]{10,15}$/;

            // Strict Validation checks
            if (clientName === "") {
                alert("Validation Failure: Please provide your full name.");
                return;
            }

            if (!numericalPhoneRegex.test(emergencyContact)) {
                alert("Validation Failure: Emergency contact number format is invalid. Please type numbers only (10 to 15 digits length).");
                return;
            }

            // Successful structural verification clearance: Route navigation directly into success screen
            window.location.href = "thank-you.html";
        });
    }
});
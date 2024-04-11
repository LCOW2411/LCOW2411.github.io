function displayGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) greeting = "Good morning!";
    else if (hour < 18) greeting = "Good afternoon!";
    else greeting = "Good evening!";

    document.getElementById("greeting").innerText = greeting;
}

function validateEmail(event) {
    const form = document.getElementById("contactForm");
    const email = form.elements["email"].value;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation pattern

    if (!pattern.test(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault(); // Prevent form submission
    }
}

window.onload = function() {
    displayGreeting();
    document.getElementById("contactForm").addEventListener("submit", validateEmail);
};

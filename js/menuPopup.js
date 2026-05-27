const params = new URLSearchParams(window.location.search);
const popup = document.getElementById("welcomePopup");

if (params.get("welcome") === "true") {
    popup.classList.add("show");
}

function closePopup() {
    popup.classList.remove("show");
}
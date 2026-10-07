console.log("dashboard.js loaded");

const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn !== "true") {
    window.location.href = "./login.html";
}

const userEmail = localStorage.getItem("userEmail");

const dashboardUser =
    document.getElementById("dashboardUser");

const profileEmail =
    document.getElementById("profileEmail");

if (dashboardUser && userEmail) {
    dashboardUser.textContent = userEmail;
}

if (profileEmail && userEmail) {
    profileEmail.textContent = userEmail;
}


const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userEmail");

        window.location.href = "./login.html";
    });
}
console.log("login.js loaded successfully");

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8081/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {
                alert("Invalid email or password.");
                return;
            }

            const result = await response.json();

            console.log("Login response:", result);

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(result)
            );

            localStorage.setItem(
                "loggedIn",
                "true"
            );

            alert("Login successful!");

            window.location.href =
                "./student-dashboard.html";

        } catch (error) {

            console.error("Login error:", error);

            alert(
                "Cannot connect to backend. " +
                "Make sure Spring Boot is running on port 8081."
            );
        }
    });
}
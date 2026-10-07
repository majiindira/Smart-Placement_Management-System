console.log("auth.js loaded successfully");

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        console.log("Register form submitted");

        const name =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const role =
            document.getElementById("role").value;

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const termsElement =
            document.getElementById("terms");


        if (!termsElement) {
            alert("Terms checkbox not found.");
            return;
        }

        const terms = termsElement.checked;


        // =========================
        // VALIDATION
        // =========================

        if (
            !name ||
            !email ||
            !phone ||
            !role ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill all fields.");
            return;
        }


        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }


        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }


        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }


        if (!terms) {
            alert("Please accept Terms & Conditions.");
            return;
        }


        // =========================
        // BACKEND REQUEST
        // =========================

        try {

            console.log("Sending data to backend...");

            const response = await fetch(
                "http://localhost:8081/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        password: password,
                        role: role
                    })
                }
            );


            const result = await response.text();

            console.log("Response status:", response.status);
            console.log("Backend response:", result);


            if (!response.ok) {

                alert(
                    result || "Registration failed."
                );

                return;
            }


            alert(
                result || "Registration successful!"
            );


            registerForm.reset();

            window.location.href = "login.html";


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert(
                "Cannot connect to backend.\n\n" +
                "Make sure Spring Boot is running on port 8081."
            );
        }

    });

}


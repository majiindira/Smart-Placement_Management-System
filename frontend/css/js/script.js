// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn) {

    menuBtn.addEventListener("click", function () {

        if (navMenu.style.display === "flex") {

            navMenu.style.display = "none";

        } else {

            navMenu.style.display = "flex";
            navMenu.style.flexDirection = "column";
            navMenu.style.position = "absolute";
            navMenu.style.top = "65px";
            navMenu.style.left = "0";
            navMenu.style.width = "100%";
            navMenu.style.background = "white";
            navMenu.style.padding = "20px";

        }

    });

}


// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please fill all the fields.");

            return;
        }

        alert(
            "Thank you " +
            name +
            "! Your message has been submitted."
        );

        contactForm.reset();

    });

}


// ================= SCROLL ANIMATION =================

const cards = document.querySelectorAll(
    ".feature-card, .company, .step"
);

const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


cards.forEach(function (card) {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(20px)";

    card.style.transition =
        "all .6s ease";

    observer.observe(card);

});


// ================= NAVBAR ACTIVE LINK =================

const navLinks = document.querySelectorAll(
    ".navbar nav a"
);

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


// ================= CONSOLE =================

console.log(
    "Smart Placement Management System loaded successfully."
);
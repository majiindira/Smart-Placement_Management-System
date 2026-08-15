// =====================================================
// SMART PLACEMENT MANAGEMENT SYSTEM
// DASHBOARD JAVASCRIPT
// =====================================================


// =====================================================
// GET CURRENT USER
// =====================================================

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


// =====================================================
// PROTECT DASHBOARD
// =====================================================

if (!loggedInUser) {

    window.location.href = "login.html";
}


// =====================================================
// DISPLAY USER INFORMATION
// =====================================================

if (loggedInUser) {

    const dashboardUser =
        document.getElementById("dashboardUser");

    const studentName =
        document.getElementById("studentName");

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const profilePhone =
        document.getElementById("profilePhone");

    const profileRole =
        document.getElementById("profileRole");


    if (dashboardUser) {
        dashboardUser.textContent =
            loggedInUser.name;
    }


    if (studentName) {
        studentName.textContent =
            loggedInUser.name;
    }


    if (profileName) {
        profileName.textContent =
            loggedInUser.name;
    }


    if (profileEmail) {
        profileEmail.textContent =
            loggedInUser.email;
    }


    if (profilePhone) {
        profilePhone.textContent =
            loggedInUser.phone;
    }


    if (profileRole) {
        profileRole.textContent =
            loggedInUser.role;
    }

}


// =====================================================
// APPLICATION DATA
// =====================================================

function getApplications() {

    return JSON.parse(
        localStorage.getItem("applications")
    ) || [];
}


function getMyApplications() {

    if (!loggedInUser) {
        return [];
    }


    const applications =
        getApplications();


    return applications.filter(
        application =>
            application.email ===
            loggedInUser.email
    );
}


// =====================================================
// UPDATE APPLICATION COUNT
// =====================================================

function updateApplicationCount() {

    const applicationCount =
        document.getElementById(
            "applicationCount"
        );


    if (!applicationCount) {
        return;
    }


    const myApplications =
        getMyApplications();


    applicationCount.textContent =
        myApplications.length;
}


updateApplicationCount();


// =====================================================
// LOGOUT
// =====================================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "loggedInUser"
            );


            alert(
                "You have been logged out successfully."
            );


            window.location.href =
                "login.html";
        }
    );
}


// =====================================================
// PROFILE EDIT DEMO
// =====================================================

function editProfile() {

    if (!loggedInUser) {
        return;
    }


    const newName =
        prompt(
            "Enter your new name:",
            loggedInUser.name
        );


    if (!newName || !newName.trim()) {
        return;
    }


    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const userIndex =
        users.findIndex(
            user =>
                user.id ===
                loggedInUser.id
        );


    if (userIndex !== -1) {

        users[userIndex].name =
            newName.trim();


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        const updatedUser =
            users[userIndex];


        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(updatedUser)
        );


        alert(
            "Profile updated successfully."
        );


        window.location.reload();
    }
}


// Make function available to HTML
window.editProfile = editProfile;


// =====================================================
// SHOW RECENT APPLICATIONS
// =====================================================

function showRecentApplications() {

    const container =
        document.getElementById(
            "recentApplications"
        );


    if (!container) {
        return;
    }


    const myApplications =
        getMyApplications();


    if (myApplications.length === 0) {

        container.innerHTML = `
            <p style="color:#6b7280;font-size:12px;">
                You haven't applied for any jobs yet.
            </p>
        `;

        return;
    }


    const recent =
        myApplications.slice(-3).reverse();


    container.innerHTML = "";


    recent.forEach(function (application) {

        const item =
            document.createElement("div");


        item.className =
            "job-item";


        item.innerHTML = `
            <div class="job-logo">💼</div>

            <div class="job-info">
                <h3>${application.job}</h3>
                <p>
                    Applied on ${application.appliedAt}
                </p>
            </div>

            <span class="job-status">
                ${application.status}
            </span>
        `;


        container.appendChild(item);

    });
}


showRecentApplications();


// =====================================================
// NAVIGATION HELPERS
// =====================================================

function goToJobs() {

    window.location.href =
        "jobs.html";
}


function goToApplications() {

    window.location.href =
        "applications.html";
}


window.goToJobs =
    goToJobs;


window.goToApplications =
    goToApplications;
// =====================================================
// SMART PLACEMENT MANAGEMENT SYSTEM
// JOBS PAGE
// =====================================================


// =============================
// ELEMENTS
// =============================

const searchInput =
    document.getElementById("jobSearch");

const locationFilter =
    document.getElementById("locationFilter");

const jobTypeFilter =
    document.getElementById("jobTypeFilter");

const searchButton =
    document.getElementById("searchJobs");

const jobCards =
    document.querySelectorAll(".job-card");

const noResult =
    document.getElementById("noResult");


// =============================
// FILTER JOBS
// =============================

function filterJobs() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedLocation =
        locationFilter.value;

    const selectedType =
        jobTypeFilter.value;


    let visibleJobs = 0;


    jobCards.forEach(function(card) {

        const jobName =
            card.dataset.job.toLowerCase();

        const companyName =
            card.dataset.company.toLowerCase();

        const jobLocation =
            card.dataset.location;

        const jobType =
            card.dataset.type;


        const matchesSearch =
            jobName.includes(searchText) ||
            companyName.includes(searchText);


        const matchesLocation =
            selectedLocation === "all" ||
            jobLocation === selectedLocation;


        const matchesType =
            selectedType === "all" ||
            jobType === selectedType;


        if (
            matchesSearch &&
            matchesLocation &&
            matchesType
        ) {

            card.style.display = "block";

            visibleJobs++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleJobs === 0) {

        noResult.style.display = "block";

    } else {

        noResult.style.display = "none";

    }
}


// =============================
// SEARCH EVENTS
// =============================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        filterJobs
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterJobs
    );

}


if (locationFilter) {

    locationFilter.addEventListener(
        "change",
        filterJobs
    );

}


if (jobTypeFilter) {

    jobTypeFilter.addEventListener(
        "change",
        filterJobs
    );

}


// =============================
// APPLY JOB
// =============================

function applyJob(jobName) {

    // Get logged-in user

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    // User must login

    if (!loggedInUser) {

        alert(
            "Please login before applying for a job."
        );

        window.location.href =
            "login.html";

        return;
    }


    // Only student can apply

    if (loggedInUser.role !== "student") {

        alert(
            "Only students can apply for jobs."
        );

        return;
    }


    // Get existing applications

    let applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];


    // Check duplicate application

    const alreadyApplied =
        applications.some(function(application) {

            return (
                application.email ===
                loggedInUser.email &&

                application.job ===
                jobName
            );

        });


    if (alreadyApplied) {

        alert(
            "You have already applied for this job."
        );

        return;
    }


    // Create application

    const application = {

        id: Date.now(),

        name:
            loggedInUser.name,

        email:
            loggedInUser.email,

        job:
            jobName,

        status:
            "APPLIED",

        appliedAt:
            new Date().toLocaleDateString("en-IN")

    };


    // Save application

    applications.push(application);

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    alert(
        "Application submitted successfully!"
    );

}


// =============================
// APPLY BUTTONS
// =============================

const applyButtons =
    document.querySelectorAll(".apply-btn");


applyButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const jobName =
                button.dataset.jobName;

            applyJob(jobName);

        }
    );

});
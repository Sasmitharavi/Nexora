console.log("ConnectHub JavaScript is connected!");

function showSuccessMessage(message, callback) {

    const messageBox = document.createElement("div");

    messageBox.textContent = message;

    messageBox.style.position = "fixed";
    messageBox.style.top = "25px";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translateX(-50%)";
    messageBox.style.background = "#7b1fa2";
    messageBox.style.color = "white";
    messageBox.style.padding = "14px 28px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.fontSize = "16px";
    messageBox.style.fontWeight = "bold";
    messageBox.style.zIndex = "9999";
    messageBox.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";

    document.body.appendChild(messageBox);

    setTimeout(function() {

        messageBox.remove();

        if (callback) {
            callback();
        }

    }, 2000);
}


let opportunities = [

            {
                id: 1,
                type: "paid",
                title: "Python Tutor Needed",
                description:
                    "Need a beginner Python tutor for a student.",
                skills:
                    "Python, Teaching",
                location:
                    "Erode",
                date:
                    "2026-08-22",
                time:
                    "2 PM - 5 PM",
                people:
                    1,
                payment:
                    800
                
            },

            {
                id: 2,
                type: "volunteer",
                title: "Tree Plantation Drive",
                description:
                    "Join our community tree plantation activity.",
                skills:
                    "No specific skill",
                location:
                    "Salem",
                date:
                    "2026-08-23",
                time:
                    "7 AM - 11 AM",
                people:
                    25,
                payment:
                    0
            },

            {
                id: 3,
                type: "emergency",
                title: "Flood Relief Assistance",
                description:
                    "Volunteers required for food distribution.",
                skills:
                    "Food Distribution",
                location:
                    "Bhavani",
                date:
                    "2026-08-18",
                time:
                    "8 AM onwards",
                people:
                    20,
                payment:
                    0
            },

            {
                id: 4,
                type: "volunteer",
                title:
                    "Teaching Underprivileged Children",
                description:
                    "Weekend teaching program for children.",
                skills:
                    "Teaching, English",
                location:
                    "Erode",
                date:
                    "2026-08-24",
                time:
                    "10 AM - 1 PM",
                people:
                    10,
                payment:
                    0
            }

        ];

        const savedOpportunities =
    localStorage.getItem("connectHubOpportunities");

if (savedOpportunities) {

    opportunities =
        JSON.parse(savedOpportunities);

}


     function login() {

    const email =
        document.getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("loginPassword").value;


    // Get all registered users
    let users =
        JSON.parse(
            localStorage.getItem("connectHubUsers")
        ) || [];


    // Check old single-account storage too
    const oldUser =
        localStorage.getItem("connectHubUser");

    if (oldUser && users.length === 0) {

        users.push(JSON.parse(oldUser));

        localStorage.setItem(
            "connectHubUsers",
            JSON.stringify(users)
        );
    }


    // Find matching account
    const user =
        users.find(function(account) {

            return (
                account.email.toLowerCase() === email &&
                account.password === password
            );

        });


    if (!user) {

        alert("Invalid email or password.");

        return;

    }


    // Save logged-in user
    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );


    showSuccessMessage("Login successful! 🎉", function() {

    document.getElementById("loginPage").style.display = "none";

    document.getElementById("app").style.display = "block";

    loadProfile();

});


    
}
function loadProfile() {

    const savedUser =
        localStorage.getItem("loggedInUser");

    if (!savedUser) {
        return;
    }

    const user = JSON.parse(savedUser);


    /* BASIC DETAILS */

    document.getElementById("profileName").textContent =
        user.name || "Your Name";

    document.getElementById("profileAddress").textContent =
        "📍 " + (user.address || "Not provided");

    document.getElementById("profileAddress2").textContent =
        user.address || "Not provided";

    document.getElementById("profileEmail").textContent =
        user.email || "Not provided";

    document.getElementById("profileContact").textContent =
        user.contact || "Not provided";

    document.getElementById("profileQualification").textContent =
        user.qualification || "Not provided";

    document.getElementById("profileHobby").textContent =
        user.hobby || "Not provided";


    /* AVAILABILITY */

    document.getElementById("profileAvailability").textContent =
        "📅 " + (user.availability || "Not provided");

    document.getElementById("availabilityText").textContent =
        user.availability || "Not provided";


    /* SKILLS */

    const skillsContainer =
        document.getElementById("profileSkills");

    skillsContainer.innerHTML = "";

    const skillList =
        (user.skills || "")
        .split(",")
        .map(function(skill) {
            return skill.trim();
        })
        .filter(function(skill) {
            return skill !== "";
        });


    skillList.forEach(function(skill) {

        const skillElement =
            document.createElement("span");

        skillElement.className =
            "skill-item";

        skillElement.textContent =
            skill;

        skillsContainer.appendChild(
            skillElement
        );

    });


    /* COINS */

    if (typeof getCoinBalance === "function") {

        document.getElementById(
            "profileCoinBalance"
        ).textContent =
            getCoinBalance();

    }


    /* USER STATISTICS */

    const userEmail = user.email;


    const myPosts =
        opportunities.filter(function(op) {

            return op.postedBy === userEmail;

        });


    const completedWorks =
    opportunities.filter(function(op) {

        return op.acceptedBy === userEmail
            && op.completed === true
            && op.review !== null;

    });


    const peopleHelped =
        completedWorks.length;


    const reviews =
        opportunities.filter(function(op) {

            return op.acceptedBy === userEmail
                && op.review;

        });


    let rating = 0;


    if (reviews.length > 0) {

        let total = 0;

        reviews.forEach(function(op) {

            total += Number(
                op.review.rating
            );

        });

        rating =
            (total / reviews.length)
            .toFixed(1);

    }


    document.getElementById(
        "profilePosts"
    ).textContent =
        myPosts.length;


    document.getElementById(
        "profileCompleted"
    ).textContent =
        completedWorks.length;


    document.getElementById(
        "profileHelped"
    ).textContent =
        peopleHelped;


    document.getElementById(
        "profileRating"
    ).textContent =
        rating;


    /* IMPACT */

    document.getElementById(
        "environmentalCount"
    ).textContent =
        opportunities.filter(function(op) {

            return op.acceptedBy === userEmail &&
                (
                    op.title.toLowerCase()
                    .includes("tree") ||
                    op.title.toLowerCase()
                    .includes("environment")
                );

        }).length;


    document.getElementById(
        "communityCount"
    ).textContent =
        completedWorks.length;


    document.getElementById(
        "volunteerCount"
    ).textContent =
        opportunities.filter(function(op) {

            return op.acceptedBy === userEmail;

        }).length;


    document.getElementById(
        "peopleHelpedCount"
    ).textContent =
        peopleHelped;

}
function saveProfileChanges() {

    const savedUser =
        localStorage.getItem("loggedInUser");

    if (!savedUser) {
        alert("Please login first.");
        return;
    }

    const user = JSON.parse(savedUser);

    // Get edited profile values
    user.name =
        document.getElementById("profileNameInput").value.trim();

    user.address =
        document.getElementById("profileAddressInput").value.trim();

    user.email =
        document.getElementById("profileEmailInput").value.trim();

    user.contact =
        document.getElementById("profileContactInput").value.trim();

    user.qualification =
        document.getElementById("profileQualificationInput").value.trim();

    user.hobby =
        document.getElementById("profileHobbyInput").value.trim();

    user.skills =
        document.getElementById("profileSkillsInput").value.trim();

    user.availability =
        document.getElementById("profileAvailabilityInput").value.trim();


    // Save updated user
    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );


    // Also update the main saved account
    localStorage.setItem(
        "connectHubUser",
        JSON.stringify(user)
    );


    showSuccessMessage("Profile updated successfully! 🎉", function() {

    loadProfile();

});

    loadProfile();
}

// ======================================
// EDIT PROFILE
// ======================================

function openEditProfile() {

    const savedUser =
        localStorage.getItem("loggedInUser");

    if (!savedUser) {

        alert("Please login first.");

        return;
    }

    const user =
        JSON.parse(savedUser);


    document.getElementById("editName").value =
        user.name || "";

    document.getElementById("editAddress").value =
        user.address || "";

    document.getElementById("editContact").value =
        user.contact || "";

    document.getElementById("editQualification").value =
        user.qualification || "";

    document.getElementById("editHobby").value =
        user.hobby || "";

    document.getElementById("editSkills").value =
        user.skills || "";

    document.getElementById("editAvailability").value =
        user.availability || "";


    document.getElementById(
        "editProfileModal"
    ).style.display = "flex";

}


function closeEditProfile() {

    document.getElementById(
        "editProfileModal"
    ).style.display = "none";

}


function saveEditedProfile() {

    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
        alert("Please login first.");
        return;
    }

    const user = JSON.parse(savedUser);

    user.name =
        document.getElementById("editName").value.trim();

    user.address =
        document.getElementById("editAddress").value.trim();

    user.contact =
        document.getElementById("editContact").value.trim();

    user.qualification =
        document.getElementById("editQualification").value.trim();

    user.hobby =
        document.getElementById("editHobby").value.trim();

    user.skills =
        document.getElementById("editSkills").value.trim();

    user.availability =
        document.getElementById("editAvailability").value.trim();


    // ==============================
    // SAVE CURRENT LOGIN
    // ==============================

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );


    // ==============================
    // UPDATE REGISTERED ACCOUNT
    // ==============================

    let users =
        JSON.parse(
            localStorage.getItem("connectHubUsers")
        ) || [];


    const index = users.findIndex(function(account) {

        return account.email === user.email;

    });


    if (index !== -1) {

        users[index] = user;

        localStorage.setItem(
            "connectHubUsers",
            JSON.stringify(users)
        );

    }


    // ==============================
    // CLOSE + REFRESH PROFILE
    // ==============================

    closeEditProfile();

    loadProfile();


    showSuccessMessage(
        "Profile updated successfully! 🎉",
        function() {
            loadProfile();
        }
    );
}


        function showSignup() {

         document.getElementById("loginPage").style.display = "none";
         document.getElementById("signupForm").style.display = "block";
        }

        function showLogin() {
         document.getElementById("signupForm").style.display = "none";
         document.getElementById("loginPage").style.display = "flex";
        }

       function createAccount() {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail")
        .value.trim()
        .toLowerCase();

    const password =
        document.getElementById("signupPassword").value;

    const hobby =
        document.getElementById("signupHobby").value.trim();

    const skills =
        document.getElementById("signupSkills").value.trim();

    const address =
        document.getElementById("signupAddress").value.trim();

    const contact =
        document.getElementById("signupContact").value.trim();

    const qualification =
        document.getElementById("signupQualification").value.trim();

    const availability =
        document.getElementById("signupAvailability").value.trim();


    // Check required fields
    if (
        !name ||
        !email ||
        !password ||
        !hobby ||
        !skills ||
        !address ||
        !contact ||
        !qualification ||
        !availability
    ) {

        alert("Please fill in all the fields.");

        return;
    }


    // Get all existing users
    let users =
        JSON.parse(
            localStorage.getItem("connectHubUsers")
        ) || [];


    // Check whether this email already exists
    const existingUser =
        users.find(function(user) {

            return user.email === email;

        });


    if (existingUser) {

        alert(
            "An account with this email already exists."
        );

        return;
    }


    // Create new user
    const user = {

        name: name,

        email: email,

        password: password,

        hobby: hobby,

        skills: skills,

        address: address,

        contact: contact,

        qualification: qualification,

        availability: availability

    };


    // Add the new user to the users list
    users.push(user);


    // Save ALL users
    localStorage.setItem(
        "connectHubUsers",
        JSON.stringify(users)
    );


    showSuccessMessage("Account created successfully! 🎉", function() {

    showLogin();

    document.getElementById("loginEmail").value = email;

    document.getElementById("loginPassword").value = "";

});


    // Go back to login
    showLogin();


    // Put registered email into login box
    document.getElementById("loginEmail").value =
        email;


    // Clear password
    document.getElementById("loginPassword").value =
        "";

}

        function showPage(page) {

    // Rewards are private
    if (page === "rewards") {

        const savedUser =
            localStorage.getItem("loggedInUser");

        if (!savedUser) {

            alert(
                "Please login to view your rewards."
            );

            return;
        }
    }

    document
        .querySelectorAll(".page")
        .forEach(function(section) {

            section.classList.remove("active");

        });


    document
        .getElementById(page)
        .classList.add("active");


    // Refresh rewards every time the page opens
    if (page === "rewards") {

        displayRewards();

    }

}

function displayOpportunities(data = opportunities) {

    const savedUser = localStorage.getItem("loggedInUser");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    const grid = document.getElementById("opportunityGrid");

    if (!grid) {
        console.error("opportunityGrid not found");
        return;
    }

    grid.innerHTML = "";

    data.forEach(function(op) {

        let badge = "";

        if (op.type === "paid") {
            badge = `
                <span class="badge paid">
                    💰 PAID
                </span>
            `;
        }
        else if (op.type === "volunteer") {
            badge = `
                <span class="badge volunteer">
                    ❤️ VOLUNTEER
                </span>
            `;
        }
        else {
            badge = `
                <span class="badge emergency">
                    🚨 EMERGENCY
                </span>
            `;
        }

        const buttonText =
            op.type === "paid" ? "Apply" : "Join";

        let actionButton = "";

        if (op.acceptedBy) {

            actionButton = `
                <button disabled style="opacity:0.6;">
                    ✓ Accepted
                </button>
            `;

        } else {

            actionButton = `
                <button onclick="joinOpportunity(${op.id})">
                    ${buttonText}
                </button>
            `;

        }

        /*
         * MARK WORK COMPLETED
         * Only the person who posted the opportunity
         * can see this button.
         */

        let completeButton = "";

        if (
            currentUser &&
            op.postedBy === currentUser.email &&
            op.acceptedBy &&
            !op.completed
        ) {

            completeButton = `
                <div style="margin-top:15px;">

                    <button
                        onclick="completeOpportunity(${op.id})"
                        style="width:100%;"
                    >
                        ✅ Mark Work Completed
                    </button>

                </div>
            `;

        }

        /*
         * REVIEW SECTION
         * Only the person who posted the opportunity
         * can see the review section.
         */

        let reviewSection = "";

        if (
            currentUser &&
            op.postedBy === currentUser.email &&
            op.completed &&
            !op.review
        ) {

            reviewSection = `
                <div style="
                    margin-top:15px;
                    padding:15px;
                    background:#f5f5f5;
                    border-radius:10px;
                ">

                    <h4>⭐ Review Volunteer</h4>

                    <p style="margin-top:10px;">
                        Did the volunteer reach the mentioned location?
                    </p>

                    <label>
                        <input
                            type="radio"
                            name="location_${op.id}"
                            value="Yes"
                            style="width:auto;margin:5px;"
                        >
                        Yes
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="location_${op.id}"
                            value="No"
                            style="width:auto;margin:5px;"
                        >
                        No
                    </label>

                    <p style="margin-top:15px;">
                        How was the volunteer's performance?
                    </p>

                    <div style="font-size:22px;">

                        <label>
                            <input
                                type="radio"
                                name="rating_${op.id}"
                                value="1"
                                style="width:auto;"
                            >
                            ⭐
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="rating_${op.id}"
                                value="2"
                                style="width:auto;"
                            >
                            ⭐⭐
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="rating_${op.id}"
                                value="3"
                                style="width:auto;"
                            >
                            ⭐⭐⭐
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="rating_${op.id}"
                                value="4"
                                style="width:auto;"
                            >
                            ⭐⭐⭐⭐
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="rating_${op.id}"
                                value="5"
                                style="width:auto;"
                            >
                            ⭐⭐⭐⭐⭐
                        </label>

                    </div>

                    <p style="font-size:13px;margin-top:8px;">
                        ⭐ Poor &nbsp;
                        ⭐⭐ Below Expectations &nbsp;
                        ⭐⭐⭐ Satisfied &nbsp;
                        ⭐⭐⭐⭐ Good &nbsp;
                        ⭐⭐⭐⭐⭐ Excellent
                    </p>

                    <button
                        onclick="submitReview(${op.id})"
                        style="margin-top:10px;width:100%;"
                    >
                        Submit Review
                    </button>

                </div>
            `;

        }

        /*
         * DISPLAY COMPLETED REVIEW
         */

        let reviewResult = "";

        if (op.review) {

            reviewResult = `
                <div style="
                    margin-top:15px;
                    padding:15px;
                    background:#eaf7ea;
                    border-radius:10px;
                ">

                    <h4>✅ Review Submitted</h4>

                    <p>
                        📍 Reached Location:
                        <strong>
                            ${op.review.reachedLocation}
                        </strong>
                    </p>

                    <p>
                        ⭐ Rating:
                        <strong>
                            ${"⭐".repeat(op.review.rating)}
                        </strong>
                    </p>

                    <p style="font-size:13px;">
                        Reviewed by:
                        ${op.review.reviewedByName}
                    </p>

                </div>
            `;

        }

        grid.innerHTML += `

            <div class="card">

                ${badge}

                <h3>
                    ${op.title}
                </h3>

                <p>
                    ${op.description}
                </p>

               ${
    op.location && op.location.trim()
    ?
    `
    <p>
        📍 ${op.location}
    </p>
    `
    :
    ""
}

${
    op.date && op.date.trim()
    ?
    `
    <p>
        📅 ${op.date}
    </p>
    `
    :
    ""
}

                ${
    op.time && op.time.trim()
    ?
    `
    <p>
        🕐 ${op.time}
    </p>
    `
    :
    ""
}

<p>
    👥 ${op.people} people needed
</p>

${
    op.skills && op.skills.trim()
    ?
    `
    <p>
        🛠 ${op.skills}
    </p>
    `
    :
    ""
}

                ${
                    op.type === "paid"
                    ?
                    `
                    <p>
                        💰 ₹${op.payment}
                    </p>
                    `
                    :
                    ""
                }

                <div class="card-footer">

                    ${actionButton}

                    <button
                        onclick="openChat()"
                        style="background:#eee;color:#333;"
                    >
                        💬 Chat
                    </button>

                </div>

                ${completeButton}

                ${reviewSection}

                ${reviewResult}

            </div>

        `;

    });

}


        function filterOpportunities(
            type,
            button
        ) {

            document
                .querySelectorAll(".filter")
                .forEach(function(btn) {

                    btn.classList.remove("active");

                });


            button.classList.add("active");


            if (type === "all") {

                displayOpportunities();

            }

            else {

                let filtered =
                    opportunities.filter(
                        function(op) {

                            return op.type === type;

                        }
                    );

                displayOpportunities(filtered);

            }

        }


        function searchOpportunities() {

            let query =
                document
                    .getElementById("search")
                    .value
                    .toLowerCase();


            let results =
                opportunities.filter(
                    function(op) {

                        return (

                            op.title
                                .toLowerCase()
                                .includes(query)

                            ||

                            op.description
                                .toLowerCase()
                                .includes(query)

                            ||

                            op.skills
                                .toLowerCase()
                                .includes(query)

                            ||

                            op.location
                                .toLowerCase()
                                .includes(query)

                        );

                    }
                );


            displayOpportunities(results);

        }


        function createOpportunity() {

            let type =
                document
                    .getElementById(
                        "opportunityType"
                    ).value;

            let title =
                document
                    .getElementById(
                        "title"
                    ).value;

            let description =
                document
                    .getElementById(
                        "description"
                    ).value;

            let skills =
                document
                    .getElementById(
                        "skills"
                    ).value;

            let location =
                document
                    .getElementById(
                        "location"
                    ).value;

            let date =
                document
                    .getElementById(
                        "date"
                    ).value;

            let time =
                document
                    .getElementById(
                        "time"
                    ).value;

            let people =
                document
                    .getElementById(
                        "people"
                    ).value;

            let payment =
                document
                    .getElementById(
                        "payment"
                    ).value;


            if (
                !title ||
                !description ||
                !location
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            const savedUser = localStorage.getItem("loggedInUser");
            // ==============================
// PAYMENT VALIDATION
// ==============================

if (type === "paid" && !payment) {

    alert("Payment amount is mandatory for Paid work.");

    return;
}

if (!savedUser) {
    alert("Please login before posting an opportunity.");
    return;
}

const user = JSON.parse(savedUser);

opportunities.unshift({

    id: Date.now(),

    postedBy: user.email,

    postedByName: user.name,

    type: type,

    title: title,

    description: description,

    skills: skills,

    location: location,

    date: date,

    time: time,

    people: people || 1,

    payment: payment || 0,

    acceptedBy: null,

    acceptedByName: null,

    completed: false,

    review: null

});
saveOpportunities();


            alert(
                "Opportunity published successfully!"
            );


            document
                .querySelectorAll(
                    "#create input, #create textarea"
                )
                .forEach(function(input) {

                    input.value = "";

                });


            showPage("home");

            displayOpportunities();
            loadProfile();

        }


        function joinOpportunity(id) {

    const opportunity = opportunities.find(function(op) {
        return op.id === id;
    });

    if (!opportunity) {
        alert("Opportunity not found.");
        return;
    }

    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
        alert("Please login first.");
        return;
    }

    const user = JSON.parse(savedUser);

    // Prevent the person who posted the work from accepting it
    if (opportunity.postedBy === user.email) {
        alert("You cannot accept your own opportunity.");
        return;
    }

    // Prevent another person from accepting an already accepted opportunity
    if (opportunity.acceptedBy) {
        alert("This opportunity has already been accepted.");
        return;
    }

    opportunity.acceptedBy = user.email;
    opportunity.acceptedByName = user.name;
    opportunity.completed = false;
    opportunity.review = null;

    saveOpportunities();

    showSuccessMessage("You have accepted this opportunity! 🎉", function() {

    displayOpportunities();

});

    displayOpportunities();
}

function saveOpportunities() {

    localStorage.setItem(
        "connectHubOpportunities",
        JSON.stringify(opportunities)
    );

}

function completeOpportunity(id) {

    const opportunity = opportunities.find(function(op) {
        return op.id === id;
    });

    if (!opportunity) {
        alert("Opportunity not found.");
        return;
    }

    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
        alert("Please login first.");
        return;
    }

    const user = JSON.parse(savedUser);

    // Only the person who posted the work can mark it completed
    if (opportunity.postedBy !== user.email) {
        alert("Only the person who posted this work can mark it as completed.");
        return;
    }

    if (!opportunity.acceptedBy) {
        alert("No volunteer has accepted this opportunity yet.");
        return;
    }

    opportunity.completed = true;

    saveOpportunities();

   showSuccessMessage(
    "Work marked as completed! You can now give a review.",
    function() {

        displayOpportunities();

    }
);
    displayOpportunities();
}

function submitReview(id) {

    const opportunity = opportunities.find(function(op) {
        return op.id === id;
    });

    if (!opportunity) {
        alert("Opportunity not found.");
        return;
    }

    if (opportunity.review) {
    alert("This opportunity has already been reviewed.");
    return;
}

    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
        alert("Please login first.");
        return;
    }

    const user = JSON.parse(savedUser);

    // Only the person who posted the work can review
    if (opportunity.postedBy !== user.email) {
        alert("Only the person who posted this work can give the review.");
        return;
    }

    if (!opportunity.completed) {
        alert("The work must be completed first.");
        return;
    }

    if (!opportunity.acceptedBy) {
        alert("No volunteer has accepted this opportunity.");
        return;
    }

    // Check whether volunteer reached the location
    const reachedLocation =
        document.querySelector(
            'input[name="location_' + id + '"]:checked'
        );

    if (!reachedLocation) {
        alert(
            "Please select whether the volunteer reached the mentioned location."
        );
        return;
    }

    /*
     * IF VOLUNTEER DID NOT REACH LOCATION
     *
     * No performance review is required.
     * Volunteer receives -100 coins.
     */

    if (reachedLocation.value === "No") {

    opportunity.review = {

        reachedLocation: "No",

        rating: 0,

        volunteerEmail: opportunity.acceptedBy,

        volunteerName: opportunity.acceptedByName,

        reviewedBy: user.email,

        reviewedByName: user.name,

        reviewedAt: new Date().toISOString(),

        reward: -100

    };


    let rewardAccounts =
        JSON.parse(
            localStorage.getItem("connectHubRewardAccounts")
        ) || {};


    if (!rewardAccounts[opportunity.acceptedBy]) {

        rewardAccounts[opportunity.acceptedBy] = {
            coins: 0,
            history: []
        };

    }


    rewardAccounts[opportunity.acceptedBy].coins -= 100;


    rewardAccounts[opportunity.acceptedBy].history.unshift({

        amount: -100,

        reason:
            "Did not reach venue for \"" +
            opportunity.title +
            "\"",

        date: new Date().toLocaleString()

    });


    localStorage.setItem(
        "connectHubRewardAccounts",
        JSON.stringify(rewardAccounts)
    );


   saveOpportunities();

showSuccessMessage(
    "Review submitted! Volunteer did not reach the venue. -100 🪙",
    function() {
        displayOpportunities();
        loadProfile();
    }
);

return;
}

    /*
     * IF VOLUNTEER REACHED LOCATION
     *
     * Give +100 coins first.
     */

    const rating =
        document.querySelector(
            'input[name="rating_' + id + '"]:checked'
        );

    if (!rating) {
        alert("Please select a performance rating.");
        return;
    }

    const ratingValue = Number(rating.value);

    // Rating rewards
    let ratingCoins = 0;

    if (ratingValue === 1) {
        ratingCoins = 50;
    }
    else if (ratingValue === 2) {
        ratingCoins = 100;
    }
    else if (ratingValue === 3) {
        ratingCoins = 200;
    }
    else if (ratingValue === 4) {
        ratingCoins = 300;
    }
    else if (ratingValue === 5) {
        ratingCoins = 400;
    }

    // Total reward
    const totalReward = 100 + ratingCoins;

    /*
     * Save review
     */

    opportunity.review = {

        reachedLocation: "Yes",

        rating: ratingValue,

        volunteerEmail: opportunity.acceptedBy,

        volunteerName: opportunity.acceptedByName,

        reviewedBy: user.email,

        reviewedByName: user.name,

        reviewedAt: new Date().toISOString(),

        reward: totalReward

    };

    saveOpportunities();


    /*
     * IMPORTANT
     *
     * Reward belongs to the VOLUNTEER,
     * not the person who posted the job.
     */

    let rewardAccounts =
        JSON.parse(
            localStorage.getItem("connectHubRewardAccounts")
        ) || {};

    if (!rewardAccounts[opportunity.acceptedBy]) {

        rewardAccounts[opportunity.acceptedBy] = {
            coins: 0,
            history: []
        };

    }

    rewardAccounts[opportunity.acceptedBy].coins += totalReward;

    rewardAccounts[opportunity.acceptedBy].history.unshift({

        amount: totalReward,

        reason:
            "Completed \"" +
            opportunity.title +
            "\" - " +
            ratingValue +
            " star review",

        date: new Date().toLocaleString()

    });

    localStorage.setItem(
        "connectHubRewardAccounts",
        JSON.stringify(rewardAccounts)
    );


    showSuccessMessage(
    "Review submitted successfully! ⭐ +" + totalReward + " 🪙",
    function() {
        displayOpportunities();
        loadProfile();
    }
);


}
displayOpportunities();

        // ===============================
// CONNECTHUB REWARD SYSTEM
// ===============================

// Get current coin balance
function getCoinBalance() {

    const savedUser =
        localStorage.getItem("loggedInUser");

    if (!savedUser) {
        return 0;
    }

    const user =
        JSON.parse(savedUser);

    const rewardAccounts =
        JSON.parse(
            localStorage.getItem("connectHubRewardAccounts")
        ) || {};

    if (!rewardAccounts[user.email]) {

        rewardAccounts[user.email] = {
            coins: 0,
            history: []
        };

        localStorage.setItem(
            "connectHubRewardAccounts",
            JSON.stringify(rewardAccounts)
        );
    }

    return Number(
        rewardAccounts[user.email].coins || 0
    );
}


// Add or subtract coins
function updateCoins(amount, reason) {

    const savedUser =
        localStorage.getItem("loggedInUser");

    if (!savedUser) {
        return;
    }

    const user =
        JSON.parse(savedUser);

    updateUserCoins(
        user.email,
        amount,
        reason
    );

    displayRewards();
    loadProfile();
}

// ======================================
// UPDATE COINS FOR A SPECIFIC USER
// ======================================

function updateUserCoins(email, amount, reason) {

    // Get all reward accounts
    let rewardAccounts =
        JSON.parse(
            localStorage.getItem("connectHubRewardAccounts")
        ) || {};


    // Create account if it doesn't exist
    if (!rewardAccounts[email]) {

        rewardAccounts[email] = {
            coins: 0,
            history: []
        };

    }


    // Update this user's coins
    rewardAccounts[email].coins += Number(amount);


    // Add reward history
    rewardAccounts[email].history.unshift({

        amount: Number(amount),

        reason: reason,

        date: new Date().toLocaleString()

    });


    // Save everything
    localStorage.setItem(
        "connectHubRewardAccounts",
        JSON.stringify(rewardAccounts)
    );
}


// Display coins and reward history
function displayRewards() {

    const coinElement =
        document.getElementById("coinBalance");

    const historyElement =
        document.getElementById("rewardHistory");


    if (!coinElement || !historyElement) {
        return;
    }


    // --------------------------------
    // GET CURRENT LOGGED-IN USER
    // --------------------------------

    const savedUser =
        localStorage.getItem("loggedInUser");


    if (!savedUser) {

        coinElement.textContent = "0";

        historyElement.innerHTML = `
            <p>
                Please login to view your rewards.
            </p>
        `;

        return;
    }


    const user =
        JSON.parse(savedUser);


    // --------------------------------
    // GET USER'S REWARD ACCOUNT
    // --------------------------------

    const rewardAccounts =
        JSON.parse(
            localStorage.getItem(
                "connectHubRewardAccounts"
            )
        ) || {};


    const account =
        rewardAccounts[user.email] || {

            coins: 0,

            history: []

        };


    // --------------------------------
    // DISPLAY COINS
    // --------------------------------

    coinElement.textContent =
        account.coins;


    // --------------------------------
    // DISPLAY HISTORY
    // --------------------------------

    if (
        !account.history ||
        account.history.length === 0
    ) {

        historyElement.innerHTML = `
            <p style="color:#777;">
                No rewards yet.
                Complete an opportunity to earn coins! 🪙
            </p>
        `;

        return;

    }


    historyElement.innerHTML =
        account.history.map(function(item) {


            const positive =
                item.amount >= 0;


            const sign =
                positive ? "+" : "";


            let icon = "🪙";


            if (
                item.reason
                    .toLowerCase()
                    .includes("venue")
            ) {

                icon = "📍";

            }

            else if (
                item.reason
                    .toLowerCase()
                    .includes("performance")
            ) {

                icon = "🏅";

            }

            else if (
                item.amount < 0
            ) {

                icon = "⚠️";

            }


            return `

                <div class="reward-history-item">

                    <div class="history-info">

                        <div class="history-icon">
                            ${icon}
                        </div>

                        <div>

                            <div class="history-reason">
                                ${item.reason}
                            </div>

                            <div class="history-date">
                                ${item.date}
                            </div>

                        </div>

                    </div>


                    <div
                        class="
                            history-amount
                            ${
                                positive
                                ? "reward-positive"
                                : "reward-negative"
                            }
                        "
                    >

                        ${sign}${item.amount} 🪙

                    </div>

                </div>

            `;

        }).join("");

}
displayRewards();
// ==========================================
// PAYMENT FIELD CONTROL
// ==========================================

function updatePaymentField() {

    const type =
        document.getElementById("opportunityType").value;

    const payment =
        document.getElementById("payment");

    const paymentMessage =
        document.getElementById("paymentMessage");


    // Paid or Emergency
    if (
        type === "paid" ||
        type === "emergency"
    ) {

        payment.disabled = false;

        payment.placeholder =
            "Enter payment amount";

        paymentMessage.textContent =
            "Payment is applicable for this opportunity.";

        paymentMessage.style.color =
            "#7042c4";

    }

    // Volunteer
    else {

        payment.disabled = true;

        payment.value = "";

        payment.placeholder =
            "Not applicable";

        paymentMessage.textContent =
            "Payment is not applicable for Volunteer opportunities.";

        paymentMessage.style.color =
            "#777";

    }

}

function logout() {

    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    // If user clicks Cancel
    if (!confirmLogout) {
        return;
    }

    // If user clicks OK
    localStorage.removeItem("loggedInUser");

    document.getElementById("app").style.display = "none";

    document.getElementById("loginPage").style.display = "flex";

    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";

    showSuccessMessage("Logged out successfully! 👋");

}
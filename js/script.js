/* =========================================================
   SAFE SCAN - COMPLETE JAVASCRIPT
   ORIGINAL PAGE NAVIGATION + SURVEY RESULTS DROPDOWN
   ========================================================= */

/* PAGE TRANSITIONS
   Header navigation is intentionally NOT intercepted.
   This keeps Home/About/Risks/Resources/Podcast/Contact/Get Help
   behaving like the original website.
*/
document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.querySelector("main");

    if (mainContent) {
        mainContent.classList.remove("fade-out");
    }

    const contentLinks = document.querySelectorAll(
        "main a[href], .hero-buttons a[href], footer a[href]"
    );

    contentLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = this.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("javascript:") ||
                this.target === "_blank"
            ) {
                return;
            }

            event.preventDefault();

            if (mainContent) {
                mainContent.classList.add("fade-out");
            }

            setTimeout(function () {
                window.location.href = href;
            }, 750);
        });
    });
});

window.addEventListener("pageshow", function (event) {
    const mainContent = document.querySelector("main");

    if (mainContent && (event.persisted || !mainContent.classList.contains("fade-out"))) {
        mainContent.classList.remove("fade-out");
    }
});

/* ================= MOBILE MENU ================= */
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const menuButton = document.querySelector(".menu-btn");

    if (!nav) return;

    const isOpen = !nav.classList.contains("show");
    nav.classList.toggle("show", isOpen);
    nav.setAttribute("aria-hidden", isOpen ? "false" : "true");

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        menuButton.setAttribute("type", "button");
    }
}

/* ================= SURVEY RESULTS DROPDOWN ================= */
function toggleSurveyDropdown(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const menu = document.getElementById("surveyDropdownMenu");
    const button = document.getElementById("surveyDropdownButton");

    if (!menu) return;

    const isOpen = menu.classList.toggle("show");

    if (button) {
        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
}

/* ================= SURVEY SECTION SWITCHING ================= */
function showSurveySection(sectionId) {
    const selectedSection = document.getElementById(sectionId);
    const menu = document.getElementById("surveyDropdownMenu");
    const button = document.getElementById("surveyDropdownButton");
    const nav = document.getElementById("mainNav");
    const menuButton = document.querySelector(".menu-btn");

    /* If this is another page, open Survey Results at the requested section. */
    if (!selectedSection) {
        const surveyUrl = new URL("survey.html", window.location.href);
        surveyUrl.hash = sectionId;
        window.location.href = surveyUrl.href;
        return;
    }

    const currentSection = document.querySelector(".survey-section.active-section");

    if (currentSection === selectedSection) {
        if (menu) menu.classList.remove("show");
        if (button) button.setAttribute("aria-expanded", "false");
        return;
    }

    if (currentSection) {
        currentSection.classList.remove("survey-fade-in");
        currentSection.classList.add("survey-fade-out");
    }

    setTimeout(function () {
        document.querySelectorAll(".survey-section").forEach(function (section) {
            section.classList.remove(
                "active-section",
                "survey-fade-in",
                "survey-fade-out"
            );
            section.style.display = "none";
        });

        selectedSection.style.display = "block";
        selectedSection.classList.add("active-section", "survey-fade-in");

        requestAnimationFrame(function () {
            selectedSection.classList.remove("survey-fade-in");
            requestAnimationFrame(function () {
                selectedSection.classList.add("survey-fade-in");
            });
        });

        setTimeout(function () {
            selectedSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 80);
    }, currentSection ? 350 : 0);

    if (menu) menu.classList.remove("show");
    if (button) button.setAttribute("aria-expanded", "false");

    if (nav && window.innerWidth <= 980) {
        nav.classList.remove("show");
    }

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
    }
}

document.addEventListener("click", function (event) {
    const wrapper = document.querySelector(".survey-dropdown");
    const menu = document.getElementById("surveyDropdownMenu");
    const button = document.getElementById("surveyDropdownButton");

    if (!wrapper || !menu) return;

    if (!wrapper.contains(event.target)) {
        menu.classList.remove("show");

        if (button) {
            button.setAttribute("aria-expanded", "false");
        }
    }
});

/* Escape closes the Survey Results dropdown. */
document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    const menu = document.getElementById("surveyDropdownMenu");
    const button = document.getElementById("surveyDropdownButton");

    if (menu) {
        menu.classList.remove("show");
    }

    if (button) {
        button.setAttribute("aria-expanded", "false");
    }
});

/* Close mobile nav after clicking a normal navigation link. */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav a.nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            const nav = document.getElementById("mainNav") || document.querySelector("nav");
            if (nav) nav.classList.remove("show");

            const menuButton = document.querySelector(".menu-btn");
            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    });
});

/* ================= CONTACT FORM ================= */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const success = document.getElementById("successMessage");

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert("Please complete all fields.");
            return;
        }

        success.style.display = "block";
        success.innerHTML =
            "Thank you, " + name + "! Your message has been received. 💚";

        contactForm.reset();
    });
}

/* ================= PODCAST ================= */
let podcastPlaying = false;
let podcastTimer;
let podcastProgress = 0;

function playPodcast() {
    const button = document.getElementById("playButton");
    const text = document.getElementById("playerText");
    const progress = document.getElementById("progressBar");

    if (!button || !text || !progress) return;

    podcastPlaying = !podcastPlaying;

    if (podcastPlaying) {
        button.innerHTML = "❚❚";
        text.innerHTML = " Playing podcast demo...";

        podcastTimer = setInterval(function () {
            podcastProgress += 2;
            progress.style.width = podcastProgress + "%";

            if (podcastProgress >= 100) {
                clearInterval(podcastTimer);
                podcastPlaying = false;
                button.innerHTML = "▶";
                text.innerHTML = " Podcast finished";
                podcastProgress = 0;

                setTimeout(function () {
                    progress.style.width = "0%";
                }, 1000);
            }
        }, 200);
    } else {
        clearInterval(podcastTimer);
        button.innerHTML = "▶";
        text.innerHTML = " Ready to play demo";
    }
}

/* ================= RESOURCES & EXTRA ================= */
function resourceMessage() {
    alert(
        "This resource section is ready. You can replace this button with your PDF, document, or resource page."
    );
}

function comingSoon() {
    alert("This podcast episode is coming soon! 🎙️");
}


/* Open a requested Survey Results section when arriving from another page. */
document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector(".survey-page")) return;

    const sectionId = window.location.hash.replace("#", "");
    if (!sectionId) return;

    const target = document.getElementById(sectionId);
    if (!target || !target.classList.contains("survey-section")) return;

    const overview = document.getElementById("surveyOverview");
    if (overview && overview !== target) {
        overview.style.display = "none";
        overview.classList.remove("active-section");
    }

    document.querySelectorAll(".survey-section").forEach(function (section) {
        section.style.display = section === target ? "block" : "none";
        section.classList.toggle("active-section", section === target);
    });

    target.classList.add("survey-fade-in");
    setTimeout(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
});

/* =========================================================
   SAFE-SCAN RESPONSIVE MENU JS
   Phone navigation: every tab remains a normal link and closes
   the hamburger menu after it is tapped. Survey Results keeps
   its separate dropdown behavior.
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("mainNav");
    const menuButton = document.querySelector(".menu-btn");

    if (!nav) return;

    function closeMobileMenu() {
        nav.classList.remove("show");
        nav.setAttribute("aria-hidden", "true");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }
    }

    if (menuButton) {
        menuButton.type = "button";
        menuButton.setAttribute(
            "aria-expanded",
            nav.classList.contains("show") ? "true" : "false"
        );
    }

    /*
       Use one delegated listener so Home, About, Know the Risks,
       Resources, Podcast, Contact Us and Get Help all work reliably
       with a phone tap. Survey Results is a button, not a normal link,
       so it is intentionally excluded here.
    */
    nav.addEventListener("click", function (event) {
        const link = event.target.closest("a.nav-link");

        if (!link || !nav.contains(link)) return;

        if (window.innerWidth <= 980) {
            closeMobileMenu();
        }
    });

    /* If the browser is resized back to desktop, reset mobile state. */
    window.addEventListener("resize", function () {
        if (window.innerWidth > 980) {
            closeMobileMenu();

            const surveyMenu = document.getElementById("surveyDropdownMenu");
            const surveyButton = document.getElementById("surveyDropdownButton");

            if (surveyMenu) surveyMenu.classList.remove("show");
            if (surveyButton) surveyButton.setAttribute("aria-expanded", "false");
        }
    });
});

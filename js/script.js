document.addEventListener("DOMContentLoaded", function () {
    // 1. Typed.js Typewriter Animation
    if (document.getElementById("typed-text")) {
        new Typed("#typed-text", {
            strings: [
                "Informatics Engineering Student",
                "Frontend Web Developer",
                "Backend Web Developer",
                "Mobile Developer",
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 1800,
            startDelay: 400,
        });
    }

    // 2. Navbar Scrolling Backdrop Blur & Border
    const navbar = document.querySelector("nav");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // 3. Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const closeIcon = document.getElementById("close-icon");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function () {
            const isExpanded =
                mobileMenuBtn.getAttribute("aria-expanded") === "true";
            mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
            mobileMenu.classList.toggle("hidden");
            hamburgerIcon.classList.toggle("hidden");
            closeIcon.classList.toggle("hidden");
        });

        // Close mobile menu on clicking links
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                hamburgerIcon.classList.remove("hidden");
                closeIcon.classList.add("hidden");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 4. Scrollspy active link highlighting (Text White / Text Zinc-400)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a:not(.btn-pill)");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPos = window.scrollY + 150; // trigger offset

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (
                scrollPos >= sectionTop &&
                scrollPos < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("text-white");
            link.classList.add("text-zinc-400");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("text-white");
                link.classList.remove("text-zinc-400");
            }
        });
    });
});

// 5. Contact Form Validations & Email Trigger
var form = document.getElementById("formEmail");

function sendEmail() {
    var name = form.querySelector("#senderName").value;
    var email = form.querySelector("#senderEmail").value;
    var title = form.querySelector("#titleMsg").value;
    var message = form.querySelector("#msg").value;

    var emailUrl =
        "mailto:spag.959@gmail.com" +
        "?subject=" +
        encodeURIComponent(title) +
        "&body=" +
        encodeURIComponent(
            "Halo Muhamad Fajri,\n\n" +
                "Nama saya " +
                name +
                "\n" +
                "Email : " +
                email +
                ".\n\n" +
                "Message:\n" +
                message,
        );

    window.location.href = emailUrl;
}

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendEmail();
    });

    form.addEventListener("input", function () {
        var name = form.querySelector("#senderName").value;
        var email = form.querySelector("#senderEmail").value;
        var title = form.querySelector("#titleMsg").value;
        var message = form.querySelector("#msg").value;
        var submitButton = document.getElementById("submitButton");
        var completionContainer = document.getElementById(
            "completionMessageContainer",
        );

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email.trim());

        if (
            name.trim() !== "" &&
            message.trim() !== "" &&
            title.trim() !== "" &&
            isValidEmail
        ) {
            submitButton.removeAttribute("disabled");
            submitButton.classList.remove(
                "bg-zinc-900",
                "text-zinc-500",
                "border-zinc-800",
                "cursor-not-allowed",
            );
            submitButton.classList.add(
                "bg-zinc-100",
                "text-zinc-950",
                "border-zinc-100",
                "cursor-pointer",
            );
            if (completionContainer)
                completionContainer.classList.add("hidden");
        } else {
            submitButton.setAttribute("disabled", "disabled");
            submitButton.classList.add(
                "bg-zinc-900",
                "text-zinc-500",
                "border-zinc-800",
                "cursor-not-allowed",
            );
            submitButton.classList.remove(
                "bg-zinc-100",
                "text-zinc-950",
                "border-zinc-100",
                "cursor-pointer",
            );
            if (completionContainer)
                completionContainer.classList.remove("hidden");
        }
    });
}

// 6. Interactive Mouse Spotlight Effect
const spotlight = document.querySelector(".mouse-spotlight");
if (spotlight) {
    window.addEventListener("mousemove", function (e) {
        spotlight.style.setProperty("--mouse-x", `${e.clientX}px`);
        spotlight.style.setProperty("--mouse-y", `${e.clientY}px`);
    });
}

// 7. Show More / Show Less Projects Toggle
const btnToggleProjects = document.getElementById("btn-toggle-projects");
const extraProjects = document.querySelectorAll(".project-card-extra");

if (btnToggleProjects && extraProjects.length > 0) {
    let isExpanded = false;
    btnToggleProjects.addEventListener("click", function () {
        isExpanded = !isExpanded;
        
        extraProjects.forEach((card) => {
            card.classList.toggle("hidden", !isExpanded);
            
            // Re-trigger AOS animations for newly displayed cards
            if (isExpanded && typeof AOS !== "undefined") {
                AOS.refresh();
            }
        });

        const span = btnToggleProjects.querySelector("span");
        const svg = btnToggleProjects.querySelector("svg");

        if (isExpanded) {
            span.textContent = "Show Less";
            svg.classList.add("rotate-180");
        } else {
            span.textContent = "Show More";
            svg.classList.remove("rotate-180");
            
            // Smoothly scroll back to projects section when folding
            const projectsSection = document.getElementById("projects");
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
}

// 8. Light/Dark Theme Toggle
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeToggleBtnMobile = document.getElementById("theme-toggle-btn-mobile");
const body = document.body;

function updateThemeUI(isLight) {
    const sunIcons = document.querySelectorAll(".theme-sun-icon");
    const moonIcons = document.querySelectorAll(".theme-moon-icon");
    
    if (isLight) {
        body.classList.add("light");
        sunIcons.forEach(icon => icon.classList.remove("hidden"));
        moonIcons.forEach(icon => icon.classList.add("hidden"));
    } else {
        body.classList.remove("light");
        sunIcons.forEach(icon => icon.classList.add("hidden"));
        moonIcons.forEach(icon => icon.classList.remove("hidden"));
    }
}

// Check local storage or system preference
const savedTheme = localStorage.getItem("portfolio-theme");
let isLightMode = savedTheme === "light";
updateThemeUI(isLightMode);

function toggleTheme() {
    isLightMode = !isLightMode;
    localStorage.setItem("portfolio-theme", isLightMode ? "light" : "dark");
    updateThemeUI(isLightMode);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
}
if (themeToggleBtnMobile) {
    themeToggleBtnMobile.addEventListener("click", toggleTheme);
}

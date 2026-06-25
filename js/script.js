// Layout metrics cache to optimize scroll performance and avoid layout thrashing
let sectionMetrics = [];
let homeHeight = 0;
let contactTop = 0;

function cacheSectionMetrics() {
    const sections = document.querySelectorAll("section");
    const homeSection = document.getElementById("home");
    const contactSection = document.getElementById("contact");

    sectionMetrics = [];
    sections.forEach((section) => {
        sectionMetrics.push({
            id: section.getAttribute("id"),
            top: section.offsetTop,
            height: section.offsetHeight
        });
    });
    if (homeSection) homeHeight = homeSection.offsetHeight;
    if (contactSection) contactTop = contactSection.offsetTop;
}

// Recalculate metrics on load and window resize
window.addEventListener("load", cacheSectionMetrics);
window.addEventListener("resize", cacheSectionMetrics);

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
    const navLinks = document.querySelectorAll("nav a:not(.btn-pill)");

    // Initialize metrics cache as soon as DOM is ready
    cacheSectionMetrics();

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPos = window.scrollY + 150; // trigger offset

        sectionMetrics.forEach((sec) => {
            if (
                scrollPos >= sec.top &&
                scrollPos < sec.top + sec.height
            ) {
                current = sec.id;
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

        // Recalculate layout metrics cache since heights changed
        cacheSectionMetrics();

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

// 9. Floating Social Media Dock & Copy Email
const btnCopyEmail = document.getElementById("btn-copy-email");
if (btnCopyEmail) {
    btnCopyEmail.addEventListener("click", function () {
        const email = this.getAttribute("data-email");
        navigator.clipboard.writeText(email).then(() => {
            const tooltip = this.querySelector(".copied-tooltip");
            if (tooltip) {
                tooltip.classList.add("show");
                setTimeout(() => {
                    tooltip.classList.remove("show");
                }, 2000);
            }
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    });
}

// Scroll Logic for Floating Social Dock
const floatDock = document.getElementById("floating-social-dock");
const mobileDockContainer = document.getElementById("mobile-social-fab-container");
const homeSection = document.getElementById("home");
const contactSection = document.getElementById("contact");

function handleScrollSocialDock() {
    const scrollY = window.scrollY;
    const triggerOffset = window.innerHeight * 0.75; // show a bit before leaving home, hide a bit before reaching contact

    // 1. Hide on Home Section
    const leftHome = scrollY > (homeHeight - 150);

    // 2. Hide when reaching Get in Touch Section
    const reachedContact = (scrollY + triggerOffset) > contactTop;

    const shouldShow = leftHome && !reachedContact;

    if (shouldShow) {
        if (floatDock) floatDock.classList.add("visible-dock");
        if (mobileDockContainer) mobileDockContainer.classList.add("visible-dock");
    } else {
        if (floatDock) floatDock.classList.remove("visible-dock");
        if (mobileDockContainer) mobileDockContainer.classList.remove("visible-dock");
        // Also collapse mobile menu if it was open
        if (mobileSocialMenu && mobileSocialMenu.classList.contains("expanded")) {
            toggleMobileSocialMenu();
        }
    }
}

// Mobile FAB Toggle Interaction
const mobileSocialFabToggle = document.getElementById("mobile-social-fab-toggle");
const mobileSocialMenu = document.getElementById("mobile-social-menu");
const shareIcon = document.getElementById("mobile-social-share-icon");
const closeIconFAB = document.getElementById("mobile-social-close-icon");

function toggleMobileSocialMenu() {
    if (!mobileSocialMenu) return;
    const isExpanded = mobileSocialMenu.classList.contains("expanded");
    if (isExpanded) {
        mobileSocialMenu.classList.remove("expanded");
        mobileSocialFabToggle.classList.remove("active");
        if (shareIcon) shareIcon.classList.remove("hidden");
        if (closeIconFAB) closeIconFAB.classList.add("hidden");
    } else {
        mobileSocialMenu.classList.add("expanded");
        mobileSocialFabToggle.classList.add("active");
        if (shareIcon) shareIcon.classList.add("hidden");
        if (closeIconFAB) closeIconFAB.classList.remove("hidden");
    }
}

if (mobileSocialFabToggle) {
    mobileSocialFabToggle.addEventListener("click", toggleMobileSocialMenu);
}

window.addEventListener("scroll", handleScrollSocialDock);
// Initial check on load
handleScrollSocialDock();

// 10. Tech Console Dashboard Tabs Toggle
const consoleTabs = document.querySelectorAll(".console-tab-btn");
const consolePanels = document.querySelectorAll(".console-panel-content");

if (consoleTabs.length > 0 && consolePanels.length > 0) {
    consoleTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            // Remove active state from all tabs
            consoleTabs.forEach(t => {
                t.classList.remove("active");
                t.classList.remove("border-zinc-800");
                t.classList.add("border-transparent");
                t.classList.remove("bg-zinc-950/20");
                const indicator = t.querySelector(".tab-indicator");
                if (indicator) indicator.classList.add("invisible");
            });

            // Set active state on clicked tab
            this.classList.add("active");
            this.classList.remove("border-transparent");
            this.classList.add("border-zinc-800");
            this.classList.add("bg-zinc-950/20");
            const indicator = this.querySelector(".tab-indicator");
            if (indicator) indicator.classList.remove("invisible");

            // Hide all panels
            const targetPanelId = this.getAttribute("data-tab");
            consolePanels.forEach(panel => {
                panel.classList.add("hidden");
            });

            // Show selected panel
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.remove("hidden");
            }
        });
    });
}



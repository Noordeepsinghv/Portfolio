const emailButton = document.querySelector("#email");
const themeToggle = document.querySelector("#theme-toggle");

const setTheme = (theme) => {
	document.body.dataset.theme = theme;
	themeToggle.setAttribute("aria-pressed", theme === "dark");
	themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
};

const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)");
const getDeviceTheme = () => deviceTheme.matches ? "dark" : "light";

setTheme(getDeviceTheme());

themeToggle.addEventListener("click", () => {
	const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
	setTheme(nextTheme);
});

deviceTheme.addEventListener("change", () => {
	setTheme(getDeviceTheme());
});

emailButton.addEventListener("click", async () => {
	const emailAddress = emailButton.textContent.trim();

	try {
		await navigator.clipboard.writeText(emailAddress);
		emailButton.textContent = "Copied!";
		window.setTimeout(() => {
			emailButton.textContent = emailAddress;
		}, 1400);
	} catch {
		emailButton.textContent = "Copy failed";
		window.setTimeout(() => {
			emailButton.textContent = emailAddress;
		}, 1400);
	}
});

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

contactForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(contactForm);
	const subject = `Portfolio message from ${formData.get("name")}`;
	const body = `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`;
	const mailto = `mailto:noordeep.tech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

	contactStatus.textContent = "Opening your email app...";
	window.location.href = mailto;
});

const gotoTopButton = document.querySelector("#goto-top-button");

window.addEventListener("scroll", () => {
    gotoTopButton.classList.toggle("is-scrolled", window.scrollY > 50);
});

gotoTopButton.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

const touchDevice = window.matchMedia("(hover: none) and (pointer: coarse)");

if (touchDevice.matches) {
	const introImageFrame = document.querySelector("#intro-image-frame");
	const scrollCards = document.querySelectorAll(".skill-group, .project-card");
	const cardObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			entry.target.classList.toggle("in-view", entry.isIntersecting);
		});
	}, { threshold: 1 });
	let tiltFramePending = false;

	scrollCards.forEach((card) => cardObserver.observe(card));

	const updateImageTilt = () => {
		const scrollRange = Math.max(1, window.innerHeight * 1.25);
		const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollRange));
		const tilt = Math.sin(scrollProgress * Math.PI) * 12;

		introImageFrame.style.setProperty("--scroll-tilt", `${tilt}deg`);
		introImageFrame.classList.add("is-scroll-active");
		tiltFramePending = false;
	};

	window.addEventListener("scroll", () => {
		if (!tiltFramePending) {
			window.requestAnimationFrame(updateImageTilt);
			tiltFramePending = true;
		}
	}, { passive: true });

	updateImageTilt();
}
const emailButton = document.querySelector("#email");
const themeToggle = document.querySelector("#theme-toggle");

const setTheme = (theme) => {
	document.body.dataset.theme = theme;
	themeToggle.setAttribute("aria-pressed", theme === "dark");
	themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
};

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
	const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
	setTheme(nextTheme);
	localStorage.setItem("portfolio-theme", nextTheme);
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

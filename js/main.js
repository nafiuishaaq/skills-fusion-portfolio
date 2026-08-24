import { initNavigation } from "./components/navigation.js";
import { initProjectsFilter } from "./components/projects-filter.js";

export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

export const prefersReducedMotion = () =>
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initGlobalListeners = () => {
	const header = $(".site-header");

	if (header) {
		const updateHeaderState = () => {
			header.classList.toggle("is-scrolled", window.scrollY > 16);
		};

		window.addEventListener("scroll", updateHeaderState, { passive: true });
		updateHeaderState();
	}

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			document.dispatchEvent(new CustomEvent("navigation:close"));
		}
	});
};

const init = () => {
	initGlobalListeners();
	initNavigation();
	initProjectsFilter();
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
	init();
}

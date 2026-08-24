export const initNavigation = () => {
	const toggle = document.querySelector(".site-navigation__toggle");
	const navigation = document.querySelector(".site-navigation");

	if (!toggle || !navigation) return;

	const closeMenu = () => {
		navigation.classList.remove("is-open");
		toggle.setAttribute("aria-expanded", "false");
	};

	toggle.addEventListener("click", () => {
		const isOpen = navigation.classList.toggle("is-open");
		toggle.setAttribute("aria-expanded", String(isOpen));
	});

	navigation.addEventListener("click", (event) => {
		if (event.target.closest("a")) closeMenu();
	});

	document.addEventListener("navigation:close", closeMenu);
};

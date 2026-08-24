import { projects } from "../data/projects.js";

const createProjectCard = ({ title, category, description, image }) => `
	<article class="project-card" data-category="${category}">
		<img class="project-card__image" src="${image}" alt="" loading="lazy" />
		<div class="project-card__content">
			<p class="project-card__category">${category}</p>
			<h3>${title}</h3>
			<p>${description}</p>
		</div>
	</article>
`;

export const initProjectsFilter = () => {
	const grid = document.querySelector("[data-projects-grid]");
	const filterGroup = document.querySelector(".projects-filter");
	const emptyMessage = document.querySelector("[data-projects-empty]");

	if (!grid || !filterGroup || !emptyMessage) return;

	const categories = ["all", ...new Set(projects.map(({ category }) => category))];
	filterGroup.insertAdjacentHTML(
		"beforeend",
		categories
			.slice(1)
			.map(
				(category) =>
					`<button class="projects-filter__button" type="button" data-filter="${category}" aria-pressed="false">${category}</button>`
			)
			.join("")
	);
	grid.innerHTML = projects.map(createProjectCard).join("");

	filterGroup.addEventListener("click", (event) => {
		const button = event.target.closest("[data-filter]");
		if (!button) return;

		const filter = button.dataset.filter;
		filterGroup.querySelectorAll("[data-filter]").forEach((filterButton) => {
			const isActive = filterButton === button;
			filterButton.classList.toggle("is-active", isActive);
			filterButton.setAttribute("aria-pressed", String(isActive));
		});

		const visibleProjects = projects.filter(
			({ category }) => filter === "all" || category === filter
		);
		grid.innerHTML = visibleProjects.map(createProjectCard).join("");
		emptyMessage.hidden = visibleProjects.length > 0;
	});
};

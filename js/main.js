"use strict";
const chart = document.querySelector(".chart");
const chartContents = document.querySelectorAll(".content");

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let date = new Date();
let today = daysOfWeek[date.getDay()];


chartContents.forEach((c, i) => {
	let bar = c.querySelector(".bar");
	let amount = c.querySelector(".amount");
	let days = c.querySelector(".days");
	let dayOfWeek = bar.dataset.dayofweek;
	if (dayOfWeek === today) {
		bar.classList.add("current__day");
	}

	fetch("../data.json")
		.then((res) => res.json())
		.then((data) => {

			amount.textContent = `$${data[i].amount}`;
			days.textContent = `${data[i].day}`;
			let barHeight = data[i].amount + 50;

			bar.style.height = `${barHeight}px`;
			gsap.fromTo(bar, {
				clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
			}, {
				clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
			})
		});

	bar.addEventListener("mouseenter", () => {
		bar.style.opacity = 0.75;
		amount.style.opacity = 1;
	});
	bar.addEventListener("mouseleave", () => {
		bar.style.opacity = 1;
		amount.style.opacity = 0;
	});
});


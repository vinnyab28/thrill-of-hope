$(document).ready(() => {
	// init ScrollMagic controller
	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: "onLeave",
		},
	});
	//Can run the snowfall by calling:
	$(document).on("click", ".enter-btn", function () {
		$("body").removeClass("overflow-hidden");
		$(".splash-screen").addClass("hidden");
		snowfall.start({
			bg: "transparent",
			primary: "#8d90b7",
			secondary: "#ffffff",
			density: 100,
			wave: {
				frequency: 0.1,
				amplitude: 1.61,
			},
			gravity: {
				angle: 90,
				strength: 0.2,
			},
			wind: {
				angle: 130,
				strength: 0.5,
			},
		});
		$("#backgroundMusic")[0].play();
	});

	$(".registration-link").click(() => {
		var pc_visitor_form = "https://wccbangalore.churchcenter.com/people/forms/467901";
		ChurchCenterModal.open(pc_visitor_form);
	});

	$(document).on("click", ".background-music-btn", function () {
		toggleMusic();
	});

	$(document).on("click", ".background-snow-btn", function () {
		$(this).hasClass("no") ? snowfall.setDensity(100) : snowfall.setDensity(0);
		$(".background-snow-btn").toggleClass("no");
	});

	// Opening section timeline
	var openingSectionTl = gsap.timeline();
	openingSectionTl.to(".background-img-wrapper", { opacity: 0.3, duration: 0.1 });
	openingSectionTl.to(".bottom-text", { opacity: 0, duration: 0.8 });
	openingSectionTl.to("#opening-section-img", {
		scale: 1.5,
		duration: 0.9,
		onComplete: () => {
			snowfall.setDensity(0);
		},
	});
	openingSectionTl.to("#opening-section-img", {
		y: -200,
		ease: "slow.out",
		duration: 0.2,
		onComplete: () => {
			$(".theme-section").get(0).scrollIntoView();
		},
	});
	openingSectionTl.to("#opening-section-img", { opacity: 0, duration: 0.1 });

	// Opening section scene
	new ScrollMagic.Scene({
		triggerElement: "#opening-section",
		duration: "45%",
	})
		.setPin("#opening-section")
		.setTween(openingSectionTl)
		.addTo(controller);

	// Start snow effect when the user scrolls to the top
	$(document).scroll(function () {
		if ($(document).scrollTop() === 0 && !$(".background-snow-btn").hasClass("no")) {
			snowfall.setDensity(100);
		}
	});

	// Theme section scene
	new ScrollMagic.Scene({
		triggerElement: ".theme-section",
		duration: "50%",
	})
		.setClassToggle(".theme-section img", "visible") // add class to reveal
		.setPin(".theme-section")
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller);

	const lg = document.getElementById("lightgallery");
	lg.addEventListener("lgBeforeOpen", () => {
		toggleMusic();
	});

	lg.addEventListener("lgAfterClose", () => {
		toggleMusic();
	});

	lightGallery(lg, {
		plugins: [lgVideo],
		// ... other settings
	});

	lightGallery(document.getElementById("open-google-map"), {
		selector: "this",
	});

	const toggleMusic = () => {
		$("#backgroundMusic").prop("muted", !$("#backgroundMusic").prop("muted"));
		$(".background-music-btn").toggleClass("no");
	};
});

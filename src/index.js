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
	openingSectionTl.to("#opening-section-img-wrapper", {
		opacity: 0,
		duration: 0.5,
	});
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
		duration: "150%",
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

	lightGallery(document.getElementById("open-google-map-1"), {
		selector: "this",
	});
	lightGallery(document.getElementById("open-google-map-2"), {
		selector: "this",
	});

	const toggleMusic = () => {
		$("#backgroundMusic").prop("muted", !$("#backgroundMusic").prop("muted"));
		$(".background-music-btn").toggleClass("no");
	};

	var santaSleigh = document.querySelector("#santaSleigh");
	var openGoogleMap = document.querySelector("#open-google-map-1");
	// var arrowLeft = document.querySelector("#arrowLeft");
	var arrowRight = document.querySelector("#arrowRight");

	var drawConnector = function () {
		var santaSleighLeft = {
			x: santaSleigh.offsetLeft - 8,
			y: santaSleigh.offsetTop + santaSleigh.offsetHeight / 2,
		};
		var santaSleighRight = {
			x: santaSleigh.offsetLeft + santaSleigh.offsetWidth + 8,
			y: santaSleigh.offsetTop + santaSleigh.offsetHeight / 2,
		};
		var locationLeft = {
			x: openGoogleMap.getBoundingClientRect().left - 8,
			y: openGoogleMap.parentNode.offsetTop + openGoogleMap.offsetHeight / 2,
		};
		var locationRight = {
			x: openGoogleMap.offsetLeft + openGoogleMap.offsetWidth + 8,
			y: openGoogleMap.offsetTop + openGoogleMap.offsetHeight / 2,
		};

		var dStrRight;
		if (window.innerWidth > 480) {
			dStrRight = `M ${santaSleighLeft.x}, ${santaSleighLeft.y} C ${santaSleighLeft.x - locationLeft.x}, ${santaSleighLeft.y} ${
				locationLeft.x - santaSleighLeft.x
			}, ${locationLeft.y} ${locationLeft.x},${locationLeft.y}`;
		} else {
			dStrRight = `M ${santaSleighLeft.x}, ${santaSleighLeft.y - santaSleighLeft.y - santaSleighLeft.y} C ${santaSleighLeft.x + locationLeft.x} ${
				santaSleighLeft.y - santaSleighLeft.y - santaSleighLeft.y
			}, ${santaSleighLeft.x - 100} 0, 20 ${santaSleighLeft.y - santaSleighLeft.y - santaSleighLeft.y} C 0 20, 0 20, 20 ${locationLeft.y + 20} C 20 ${
				locationLeft.y + 20
			}, 25 ${locationLeft.y + 60}, ${locationLeft.x + 40} ${locationLeft.y + 50}`;
		}

		console.log(dStrRight);
		// M 236, -8 C 230.88333129882812, -8 -230.88333129882812, 525.5 5.116668701171875,525.5
		// M 250, 8 C 250 8, 150 0, 20 8 C 0 20, 0 20, 20 570 C 30 580, 50 580, 60 570
		arrowRight.setAttribute("d", dStrRight);
	};

	setTimeout(drawConnector, 250);
});

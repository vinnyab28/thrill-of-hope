$(document).ready(() => {
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
		$("#backgroundMusic").prop("muted", !$("#backgroundMusic").prop("muted"));
		$(this).toggleClass("no");
	});

	$(document).on("click", ".background-snow-btn", function () {
		$(this).hasClass("no") ? snowfall.setDensity(100) : snowfall.setDensity(0);
		$(this).toggleClass("no");
	});

	// init ScrollMagic
	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: "onLeave",
			duration: "100%",
		},
	});
	var sections = document.querySelectorAll("section");

	for (var i = 0; i < sections.length; i++) {
		new ScrollMagic.Scene({
			triggerElement: sections[i],
		})
			.setPin(sections[i], { pushFollowers: false })
			.addTo(controller);
	}
});

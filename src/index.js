$(document).ready(() => {
	//Can run the snowfall by calling:
	setTimeout(() => {
		$(".splash-screen").addClass("hidden");
		snowfall.start({
			bg: "transparent",
			primary: "#8d90b7",
			secondary: "#ffffff",
			density: 106,
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
	}, 1500);

	$(".registration-link").click(() => {
		var pc_visitor_form = "https://wccbangalore.churchcenter.com/people/forms/467901";
		ChurchCenterModal.open(pc_visitor_form);
	});

	$(".background-music-btn").click(() => {
		$("#backgroundMusic").prop("muted", !$("#backgroundMusic").prop("muted"));
	});
});

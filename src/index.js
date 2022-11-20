$(document).ready(() => {
	setTimeout(() => {
		$(".splash-screen").addClass("hidden");
	}, 2000);

	$(".registration-link").click(() => {
		var pc_visitor_form = "https://wccbangalore.churchcenter.com/people/forms/467901";
		ChurchCenterModal.open(pc_visitor_form);
	});

	$(".background-music-btn").click(() => {
		$("#backgroundMusic").prop("muted", !$("#backgroundMusic").prop("muted"));
	});
});

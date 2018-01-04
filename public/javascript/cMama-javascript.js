
// Google map fuction  for the home page
function initMap() {
	var uluru = {lat: 35.24, lng: -82.08};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map,
		icon: "/image/location-pin.png"
	});
};

//Handlebars.registerHelper("message", function() {
//	var starter = '<div>Help</div>';
//		<div class="alert alert-info" role="alert">'
//		<img src="/image/question.png" alt="The Question" width="60px" height="60px">
//		<strong>It doesn't look like you've logged in yet.<br>What are you waiting for?</strong>
//		</div>';
//	return new Handlebars.SafeString(starter);
//	return "This did make it through";
//});







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

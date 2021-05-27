// INITIALIZE GOOGLE MAP
function initMap() {
  // MAP OPTIONS PASSED TO new Map instance
  let options = {
    center: { lat: 29.595837704849103, lng: -95.62139733746608 },
    zoom: 12,
  };

  const map = new google.maps.Map(document.getElementById("map"), options);

  fetch("http://127.0.0.1:8000/get_allsigns")
    .then((res) => res.json())
    .then((supports) => {
      // Create an info window to share between markers.
      // const infoWindow = new google.maps.InfoWindow();
      supports.forEach((support) => {
        let latlong = support["lat_lng"].split(",");
        console.log(new google.maps.LatLng(latlong[0], latlong[1]));

        var marker = new google.maps.Marker({
          // The google LatLng class helps create geopoint from string rather than passing floats from json data
          position: new google.maps.LatLng(latlong[0], latlong[1]),
          map: map,
          title: toString(support.id),
        });

        const infowindow = new google.maps.InfoWindow({
          content: "<p>Marker Location:" + marker.getPosition() + "</p>",
        });

        google.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker);
        });
      });
    });
}

// TEST FUNC TO PLACE NEW MARKERS
function placeMarkerAndPanTo(latLng, map) {
  const mark1 = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: true,
  });
  map.panTo(latLng);
  // console.log(mark1.getPosition());
}

// TEST FUNC FOR CONTEXT.HTML; ADD SUPPORT ONCLICK EVENT
function support_add() {
  alert("Support Added");

  await fetch("http://127.0.0.1:8000/get_allsigns")
    .then((res) => res.json())
    .then((data) => console.log(data));
}

// https://stackoverflow.com/questions/7168394/google-map-v3-context-menu/10957262
// TODO: SEE ABOVE TO IMPLEMENT CONTExT MENU INTO MAP

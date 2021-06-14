// INITIALIZE GOOGLE MAP
function initMap() {
  // MAP OPTIONS PASSED TO new Map instance
  let options = {
    center: { lat: 29.595837704849103, lng: -95.62139733746608 },
    zoom: 12,
  };

  const map = new google.maps.Map(document.getElementById("map"), options);

  /**========================================================================
   *                             Fetch Signs from Database
   *  Place markers on map
   *========================================================================**/
  // fetch("http://127.0.0.1:8000/get_allsigns")
  //   .then((res) => res.json())
  //   .then((supports) => {
  //     // Create an info window to share between markers.
  //     // const infoWindow = new google.maps.InfoWindow();
  //     supports.forEach((support) => {
  //       let latlong = support["lat_lng"].split(",");

  //       var marker = new google.maps.Marker({
  //         // The google LatLng class helps create geopoint from string rather than passing floats from json data
  //         position: new google.maps.LatLng(latlong[0], latlong[1]),
  //         map: map,
  //         title: toString(support.id),
  //       });

  //       const contentstring =
  //         "<p>Marker Location:" +
  //         marker.getPosition() +
  //         ", " +
  //         support.sign_code +
  //         "</p>";

  //       const infowindow = new google.maps.InfoWindow({
  //         content: contentstring,
  //       });

  //       marker.addListener("click", () => {
  //         infowindow.open(map, marker);
  //       });

  //       map.addListener("click", () => {
  //         infowindow.close();
  //       });
  //     });
  //   });

  /**========================================================================
   *                             Context Menu Code
   *
   *
   *
   *========================================================================**/
  map.addListener("contextmenu", (e) => {
    console.log(e.latLng.toJSON());
    show_cmenu();
  });

  /*==== END OF initMap() ====*/
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

  // fetch("http://127.0.0.1:8000/get_allsigns")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
}

// https://stackoverflow.com/questions/7168394/google-map-v3-context-menu/10957262
// TODO: SEE ABOVE TO IMPLEMENT CONTExT MENU INTO MAP

/**========================================================================
 **                           show_cmenu()
 *?  show context menu on right click
 *========================================================================**/
function show_cmenu() {
  const cm = document.querySelector(".custom-cm");
  cm.style.display = "block";

  // keep dm from edge of screen
  cm.style.top =
    e.y + cm.offsetHeight > window.innerHeight
      ? window.innerHeight - cm.offsetHeight
      : e.y + "px";
  cm.style.left =
    e.x + cm.offsetWidth > window.innerWidth
      ? window.innerWidth - cm.offsetWidth
      : e.x + "px";
}

/**========================================================================
 **                           show_addsup()
 *?  show panel to add support
 *========================================================================**/
function show_addsup() {
  const ap = document.querySelector(".addpanel");
  ap.classList.remove("is-hidden");

  // keep dm from edge of screen
  // cm.style.top =
  //   e.y + cm.offsetHeight > window.innerHeight
  //     ? window.innerHeight - cm.offsetHeight
  //     : e.y + "px";
  // cm.style.left =
  //   e.x + cm.offsetWidth > window.innerWidth
  //     ? window.innerWidth - cm.offsetWidth
  //     : e.x + "px";
}

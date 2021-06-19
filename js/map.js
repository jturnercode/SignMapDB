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
   *========================================================================**/
  map.addListener("contextmenu", (e) => {
    // SHOW CONTEXT MENU
    show_cmenu();

    // SELECT ADD SUPPORT FROM CMENU & SHOW MODAL FORM
    item = document.querySelector("#addsup_item");
    item.addEventListener("click", (event) => {
      // ACTIVATE ADD SUPPORT MODAL
      mod = document.getElementById("addsup_modal");
      mod.classList.add("is-active");

      // CLEAR FORM OF ANY PREVIOUS DATA
      document.getElementById("addsup_form").reset();

      // INSERT LAT&lONG INTO TEXT BOX
      latlng_json = e.latLng.toJSON();
      lltext = document.getElementById("latlng");
      lltext.value = `${latlng_json["lat"].toFixed(7)}, ${latlng_json[
        "lng"
      ].toFixed(7)}`;
    });
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
 *?  show modal to add support
 *========================================================================**/
function show_addsup() {
  const ap = document.querySelector("#addmodal");

  ap.style.display = "block";

  console.log(ap);

  // TODO: How do i pass the window coordinates so panel pops up above new marker; modal??
  //  do i just center

  // keep dm from edge of screen
  ap.style.top =
    e.y + ap.offsetHeight > window.innerHeight
      ? window.innerHeight - cm.offsetHeight
      : e.y + "px";
  ap.style.left =
    e.x + ap.offsetWidth > window.innerWidth
      ? window.innerWidth - cm.offsetWidth
      : e.x + "px";
}

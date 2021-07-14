// INITIALIZE GOOGLE MAP
function initMap() {
  // MAP OPTIONS PASSED TO new Map instance
  let options = {
    center: { lat: 29.595837704849103, lng: -95.62139733746608 },
    zoom: 12,
  };

  const map = new google.maps.Map(document.getElementById("map"), options);

  // TODO: Fetch Markers, Convert to axios function?
  /**========================================================================
   * *                            Fetch All Signs from Database
   * ? Place existing markers on map
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
   * *                            Context Menu Listener
   * ? Add map Listener to show context menu; also handle code when add support
   * ? option clicked. This code needs to happen here t
   *========================================================================**/
  map.addListener("contextmenu", (e) => {
    // SHOW CONTEXT MENU
    show_cmenu();

    // SELECT ADD SUPPORT FROM CMENU & SHOW MODAL FORM
    item = document.querySelector("#addsup_item");
    item.addEventListener("click", (event) => {
      // ACTIVATE ADD SUPPORT MODAL
      document.getElementById("addsup_modal").classList.add("is-active");

      // CLEAR FORMS OF ANY PREVIOUS DATA
      document.getElementById("addsup_form").reset();
      document.getElementById("addsign_form").reset();

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

/**========================================================================
 **                           addMarker()
 *?  Create new marker on map from add support form
 * ! Not used yet: trigger after close add support form
 *========================================================================**/

function addMarker(latLng, map) {
  const mark1 = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: true,
  });
  map.panTo(latLng);
  // console.log(mark1.getPosition());
}

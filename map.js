// function initMap() {
//   // MAP OPTIONS PASSED TO INIT FUNCTION
//   let options = {
//     center: { lat: 29.595837704849103, lng: -95.62139733746608 },
//     zoom: 12,
//   };

//   // CREATE INSTANCE OF MAP OBJECT; PLACE IN MAP DIV
//   const map = new google.maps.Map(document.getElementById("map"), options);

//   // FUNCTION TO ADDMARKER
//   function addMarker(info) {
//     const marker = new google.maps.Marker({
//       position: info.location,
//       map: map,
//     });

//     // IF CONTENT PROVIDED THEN ADD TO MARKER
//     if (info.content) {
//       const markerWindow = new google.maps.InfoWindow({
//         content: info.content,
//       });

//       marker.addListener("click", () => {
//         markerWindow.open(map, marker);
//       });
//     }
//   }

//   // CREATE INSTANCES OF MARKERS
//   addMarker({ location: { lat: 29.597, lng: -95.627 } });
//   addMarker({ location: { lat: 29.6, lng: -95.7 }, content: "<h2>hello</h2>" });

//   // CLOSE initMap func()
// }

// ADD MARKER ON CLICK CODE
function initMap() {
  // MAP OPTIONS PASSED TO INIT FUNCTION
  let options = {
    center: { lat: 29.595837704849103, lng: -95.62139733746608 },
    zoom: 12,
  };

  const map = new google.maps.Map(document.getElementById("map"), options);

  map.addListener("rightclick", (e) => {
    placeMarkerAndPanTo(e.latLng, map);

    // Close the current InfoWindow, IF OPEN.
    // infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: e.latLng,
    });
    infoWindow.setContent(JSON.stringify(e.latLng.toJSON(), null, 2));
    infoWindow.open(map);
  });

  // CLOSE INIT FUNC
}

function placeMarkerAndPanTo(latLng, map) {
  const mark1 = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: true,
  });
  map.panTo(latLng);
  // console.log(mark1.getPosition());
}

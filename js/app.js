/**========================================================================
 **                           toJsObj()
 *?  CONVERT FORMDATA OBJ TO JS OBJECT; Needed to send to FastAPI backend
 *========================================================================**/

function toJsObj(formData) {
  let jsObject = {};
  for (const [key, value] of formData) {
    jsObject[key] = value;
  }

  return jsObject;
}

/**========================================================================
 **                           validateForm()
 *?  Function to validate form fields are not empty
 *? qselector: element id or class using queryselector format
 *========================================================================**/

function validateForm(qselector) {
  // select form element to check data
  const formElement = document.querySelector(qselector);
  let formData = toJsObj(new FormData(formElement));

  notvalid = [];
  for (let name in formData) {
    if (formData[name] === "") {
      console.log(`Blank field: ${name}, ${formData[name]}`);
      document.querySelector(`#${name}`).classList.add("is-danger");
      notvalid.push(name);
    } else {
      document.querySelector(`#${name}`).classList.remove("is-danger");
    }
  }

  // console.log(notvalid);
  return notvalid;
}

/**========================================================================
 **                           closemodal()
 *?  Function to de-activate modal based on modal element id
 *========================================================================**/

function closemodal(modalid) {
  // ADD CLICK EVENT LISTENER TO 'closemodal' CLASS
  document.querySelectorAll(".closemodal").forEach((item) => {
    item.addEventListener("click", (event) => {
      // perform this code if click on element with class 'closemodal'
      mod = document.getElementById(modalid);
      mod.classList.remove("is-active");
    });
  });
}

/**========================================================================
 **                           show_cmenu()
 *?  Show context menu on right click
 *========================================================================**/
function show_cmenu() {
  // ! Not sure why the map.addeventlistener (contectmenu) event will not display cmenu?

  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const cm = document.querySelector(".custom-cm");
    cm.style.display = "block";

    // console.log(e.x);

    // TODO: Offset, not working correctly when put near right or bottom window edge
    cm.style.top =
      e.y + cm.offsetHeight > window.innerHeight
        ? window.innerHeight - cm.offsetHeight
        : e.y + "px";
    cm.style.left =
      e.x + cm.offsetWidth > window.innerWidth
        ? window.innerWidth - cm.offsetWidth
        : e.x + "px";
  });
}

/**========================================================================
 **                           close_cmenu()
 *?  Close context menu on click
 *========================================================================**/
function close_cmenu() {
  window.addEventListener("click", () => {
    const cm = document.querySelector(".custom-cm");
    cm.style.display = "none";
  });
}

/**========================================================================
 **                           showSignForm()
 *?  js to show sign form when back button or tab clicked
 *========================================================================**/

function showSignForm() {
  document.querySelector("[name=InstallType]").disabled = true;
  document.querySelector("[id=SupportDate]").disabled = true;
  document.querySelector("[name=SupportType]").disabled = true;

  document.querySelectorAll(".supportform").forEach((element) => {
    element.classList.add("is-hidden");
  });

  document.querySelectorAll(".addcancel").forEach((element) => {
    element.classList.add("is-hidden");
  });

  document.querySelectorAll(".signform").forEach((element) => {
    element.classList.remove("is-hidden");
  });

  // Set tabs
  document.getElementById("suptab").classList.remove("is-active");
  document.getElementById("signtab").classList.add("is-active");
}

/**========================================================================
 **                           tosigns()
 *?  js for next button on add support form; hide and un-hide elements
 *========================================================================**/

function tosigns() {
  // TODO: Tabs, Implement click event to trigger showSupForm or ShowsignForm func; create class for btn and tab
  supcontrol = document.getElementById("addsup_button");

  supcontrol.addEventListener("click", (e) => {
    // Validate Add Support Form
    const errors = validateForm("#addsup_form");
    if (errors.length > 0) {
      // Stop process with return if fields empty
      return;
    }

    // Send http request with data to add support
    addsupport();

    // Hide/un-hide elements for adding sign info
    showSignForm();
  });
}

/**========================================================================
 **                           showSupForm()
 *?  js to show support form when back button or tab clicked
 *========================================================================**/

function showSupForm() {
  document.querySelectorAll(".signform").forEach((element) => {
    element.classList.add("is-hidden");
  });

  document.querySelectorAll(".supportform").forEach((element) => {
    element.classList.remove("is-hidden");
  });

  // Reset tabs
  document.getElementById("signtab").classList.remove("is-active");
  document.getElementById("suptab").classList.add("is-active");
}

/**========================================================================
 **                           tosupport()
 *?  js for back button on add support form; hide and un-hide elements
 *========================================================================**/
function tosupport() {
  nextcontrol = document.getElementById("back_button");

  nextcontrol.addEventListener("click", (e) => {
    showSupForm();
  });
}

/**========================================================================
 **                           plussign()
 *?  js for plus sign icon to un-hide add sign form elements
 *========================================================================**/

//  TODO: Sign Form, more logic needed to process adding sign to sign table and hiding elements
function plussign() {
  plus = document.getElementById("plussign");

  plus.addEventListener("click", (e) => {
    document.querySelectorAll(".asignform").forEach((element) => {
      element.classList.remove("is-hidden");
    });

    document.querySelector("#back_button").classList.add("is-hidden");
    document.querySelector("#cancel_button").classList.add("is-hidden");
    document.querySelector("#finish_button").classList.add("is-hidden");
  });
}

/**========================================================================
 **                           closexcircle()
 *?  js for plus sign icon to un-hide add sign form elements
 *========================================================================**/

//  TODO: Table, more logic needed to process adding sign to sign table and hiding elements
function xcircle() {
  plus = document.getElementById("xcircle");

  plus.addEventListener("click", (e) => {
    document.querySelectorAll(".asignform").forEach((element) => {
      element.classList.add("is-hidden");
    });

    document.getElementById("addsign_form").reset();

    document.querySelector("#back_button").classList.remove("is-hidden");
    document.querySelector("#cancel_button").classList.remove("is-hidden");
    document.querySelector("#finish_button").classList.remove("is-hidden");
  });
}

/**========================================================================
 **                           addsupport()
 *?   Add new support to DB
 *========================================================================**/

function addsupport() {
  // remove disabled on latlng to get value
  document.getElementById("latlng").disabled = false;

  // get all formdata
  const formElement = document.querySelector("#addsup_form");
  let formData = toJsObj(new FormData(formElement));

  document.getElementById("latlng").disabled = true;
  console.log(formData);

  // *appends a js object (not json)
  axios
    .post("http://127.0.0.1:8000/CreateSupport", formData)
    .then((response) => {
      // *can add more than one function here; note {} syntax after =>
      // console.log(response.data["SupportID"]);
      document.getElementById("signid").value = response.data["SupportID"];
      document.getElementById("cost").value = response.data["Cost"];
    })
    .catch((err) => console.log(err, err.response));
}

/**========================================================================
 **                             Window.onload
 *
 *? ADD EVENT LISTENERS ONLOAD
 *?   window.onload with anonymous function is needed to add
 *?   event listensers to html file via external .js file
 *========================================================================**/

window.onload = function () {
  closemodal("addsup_modal");
  closemodal("modal1");
  close_cmenu();
  tosigns();
  tosupport();
  plussign();
  xcircle();
};

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

function validateForm(cSelectors) {
  // select form elements with class validate to check data
  const formEls = document.querySelectorAll(cSelectors);
  // console.log(formEls);

  notvalid = [];

  formEls.forEach((el) => {
    if ((el.value !== "") & (el.nodeName === "SELECT")) {
      el.parentElement.classList.remove("is-danger");
    } else if (el.value !== "") {
      el.classList.remove("is-danger");
    } else if ((el.value === "") & (el.nodeName === "INPUT")) {
      notvalid.push(el);
      el.classList.add("is-danger");
    } else if ((el.value === "") & (el.nodeName === "SELECT")) {
      notvalid.push(el);
      el.parentElement.classList.add("is-danger");
    }
  });

  // console.log(notvalid);
  return notvalid;
}

/**========================================================================
 **                           supportType()
 *?  Function to monitor install type (Sign Work Type) selected; if existing pole, default to 2000-10-01
 *========================================================================**/

function supportType() {
  // ADD CLICK EVENT LISTENER TO 'closemodal' CLASS
  instype = document.querySelector("#supinstall");

  instype.addEventListener("change", (event) => {
    // console.log("change", event.target.value);
    installDate = document.querySelector("[name=SupportDate]");
    if (event.target.value === "Existing") {
      installDate.value = "2000-10-01";
      installDate.disabled = true;
    } else {
      installDate.value = "";
      installDate.disabled = false;
    }
  });
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
  document.querySelectorAll(".supportform").forEach((element) => {
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
  nextBtn = document.getElementById("next_button");

  nextBtn.addEventListener("click", (e) => {
    // Validate Add Support Form
    const errors = validateForm("#addsup_form .validate");
    if (errors.length > 0) {
      // Stop process with return if fields empty
      return;
    }

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
  backBtn = document.getElementById("back_button");

  backBtn.addEventListener("click", (e) => {
    showSupForm();
  });
}

/**========================================================================
 **                           plussign()
 *?  js for plus sign icon to un-hide add sign form elements
 *========================================================================**/

function plussign() {
  plus = document.getElementById("plussign");

  plus.addEventListener("click", (e) => {
    document.querySelectorAll(".asignform").forEach((element) => {
      element.classList.remove("is-hidden");
    });

    document.querySelector("#back_button").classList.add("is-hidden");
    document.querySelector("#save_button").classList.add("is-hidden");
  });
}

/**========================================================================
 **                           xsign()
 *?  js for 'x' icon to hide add sign form elements
 *========================================================================**/

function xsign() {
  plus = document.getElementById("xcircle");

  plus.addEventListener("click", (e) => {
    document.querySelectorAll(".asignform").forEach((element) => {
      element.classList.add("is-hidden");
    });

    // RESET FORM FIELD TO NULL BEFORE CLOSING
    document.getElementById("addsign_form").reset();

    document.querySelector("#back_button").classList.remove("is-hidden");
    document.querySelector("#save_button").classList.remove("is-hidden");
  });
}

/**========================================================================
 **                           addsignrow()
 *?   Add sign row to table from form data in #addsign_form
 *========================================================================**/

function addsignrow() {
  addBtn = document.getElementById("addSignBtn");

  addBtn.addEventListener("click", (e) => {
    // Prevent Default needed to prevent add sign button from trying to submit form
    // this is default for last button in a html form element
    e.preventDefault();

    const errors = validateForm("#addsign_form .validate");
    if (errors.length > 0) {
      // Stop func if form field empty
      return;
    }

    const formElement = document.querySelector("#addsign_form");
    let formData = toJsObj(new FormData(formElement));
    console.log(formData);

    tbodyEl = document.querySelector("#sign_tbody");

    tbodyEl.innerHTML += `
    <tr>
    <td>-</td>
    <td>${formData["SignWork"]}</td>
    <td>${formData["SignClass"]}</td>
    <td>${formData["SignCode"]}</td>
    <td>${formData["Description"]}</td>
    <td>${formData["Size"]}</td>
    <td>${formData["SignDate"]}</td>
    <td>
    <i class="hovclass bi bi-pencil"></i>
    <i class="hovclass bi bi-trash"></i>
    </td>
    </tr>
    `;

    document.querySelectorAll(".asignform").forEach((element) => {
      element.classList.add("is-hidden");
    });

    // CLEAR FORM FOR NEXT USE
    document.getElementById("addsign_form").reset();

    // PLACE BACK AND SAVE BUTTONS BACK
    document.querySelector("#back_button").classList.remove("is-hidden");
    document.querySelector("#save_button").classList.remove("is-hidden");
    document.querySelector("#save_button").disabled = false;
  });
}

/**========================================================================
 **                           savedata()
 *?   Save all new support and sign data to db; used by save and close button
 *========================================================================**/

function savedata() {
  sb = document.querySelector("#save_button");

  sb.addEventListener("click", () => {
    // Remove enable disabled inputs on support form to get values via FormData method
    document.getElementById("latlng").disabled = false;
    document.querySelector("[name=SupportDate]").disabled = false;

    // Get all formdata with name attribute
    const formElement = document.querySelector("#addsup_form");
    let formData = toJsObj(new FormData(formElement));

    // Disable LatLng again
    document.getElementById("latlng").disabled = true;
    document.querySelector("[name=SupportDate]").disabled = true;
    console.log(formData);

    // Var to hold table data
    let signs = [];

    // TODO: Convert axios to async/await syntax for easier reading
    axios
      .post("http://127.0.0.1:8000/CreateSupport", formData)
      .then((response) => {
        // *can add more than one function here; note {} syntax after =>
        // console.log(response.data["SupportID"]);
        document.getElementById("suppid").value = response.data["SupportID"];
        document.getElementById("cost").value = response.data["Cost"];
        // const suppid = document.getElementById("suppid").value;
        const suppid = response.data["SupportID"];

        // Get table data to into js object to pass as json
        const trEls = document.querySelectorAll("#sign_tbody tr");

        trEls.forEach((tr) => {
          // *CERTAIN DOM ELEMENTS LIKE TABLES HAVE SPECIAL PROPERTIES FOR CONVIENENCE
          // *ROWS HAVE THE 'cells' PROPERTY TO ACCESS TD ELEMENT LIKE AN ARRAY
          // *https://javascript.info/dom-navigation#dom-navigation-tables
          // console.log(tr.cells[3].textContent)

          // *appends a js object (not json)
          signs.push({
            SupportFK: suppid,
            SignWork: tr.cells[1].textContent,
            SignClass: tr.cells[2].textContent,
            SignCode: tr.cells[3].textContent,
            Description: tr.cells[4].textContent,
            Size: tr.cells[5].textContent,
            SignDate: tr.cells[6].textContent,
          });
        }); // End of forEach
        console.log(`SIGNS: ${JSON.stringify(signs)}`);

        // SECOND REQUEST TO ADD SIGNS TO DB WITH ASSOCIATED SUPPORT ID
        axios
          .post("http://127.0.0.1:8000/AddSign", signs)
          .then((res) => {
            console.log(res);
            // IN CASE OF NETWORK ERR, FORM RESETS HAPPEN HERE
            document.getElementById("add_modal").classList.remove("is-active");
            showSupForm();
            resetSignTbl();
          })
          .catch((err) => {
            console.log(err, err.response);
            alert("Network issue(addsign), please try again");
          });
      })
      .catch((err) => {
        console.log(err, err.response);
        alert("Network issue(createsupport), please try again");
      });
  }); // END OF CLICK EVENT
} // END OF SAVEDATA FUNCTION

/**========================================================================
 **                           delTableRow()
 *?  js to delete row in signs table
 *========================================================================**/
// TODO: Add Confirm POPUP window, to avoid accidental deletes
function delTableRow() {
  tbodyEl = document.getElementById("sign_tbody");

  tbodyEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi-trash")) {
      e.target.closest("tr").remove();
    }
  });
}

/**========================================================================
 **                           editTableRow()
 *?  js to edit row in signs table
 *========================================================================**/

function editTableRow() {
  tbodyEl = document.getElementById("sign_tbody");

  tbodyEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi-pencil")) {
      tr = e.target.closest("tr");
      // console.log(tr.cells[2].textContent);

      // POPULATE FORM WITH TABLE DATA
      document.querySelector('[name="SignWork"]').value =
        tr.cells[1].textContent;
      document.querySelector('[name="SignClass"]').value =
        tr.cells[2].textContent;
      document.querySelector('[name="SignCode"]').value =
        tr.cells[3].textContent;
      document.querySelector('[name="Description"]').value =
        tr.cells[4].textContent;
      document.querySelector('[name="Size"]').value = tr.cells[5].textContent;
      document.querySelector('[name="SignDate"]').value =
        tr.cells[6].textContent;

      // SHOW FORM AND HIDE BUTTONS
      document.querySelectorAll(".asignform").forEach((element) => {
        element.classList.remove("is-hidden");
      });
      document.querySelector("#back_button").classList.add("is-hidden");
      document.querySelector("#save_button").classList.add("is-hidden");
      e.target.closest("tr").remove();
    }
  });
}

/**========================================================================
 **                           resetSignTbl()
 *?  js to show support form when back button or tab clicked
 *========================================================================**/

function resetSignTbl() {
  document.querySelectorAll("#sign_tbody tr").forEach((e) => {
    e.remove();
  });
}

/**========================================================================
 **                             Window.onload
 *
 *? ADD EVENT LISTENERS ONLOAD
 *?   window.onload with anonymous function is needed to add
 *?   event listensers to html file via external .js file
 *========================================================================**/

window.onload = function () {
  closemodal("add_modal");
  closemodal("modal1");
  close_cmenu();
  tosigns();
  tosupport();
  plussign();
  xsign();
  supportType();
  addsignrow();
  savedata();
  delTableRow();
  editTableRow();
};

// MAKE TEXT IN TEXTBOX UPPERCASE
function uppercase() {
  var txtbox = document.getElementById("sign_codes");
  txtbox.value = txtbox.value.toUpperCase();
}

// HIDE AN ELEMENT
function hide_el() {
  var hideli = document.getElementById("hidelist");

  if (hideli.style.display === "block") {
    hideli.style.display = "none";
  } else {
    hideli.style.display = "block";
  }
}

// POPULATE A SELECT BOX VIA MODAL
// function addoption(opt_value) {
//   let msel = document.getElementById("s2");
//   // go by: (<option value="volvo">Volvo</option>)

//   // CLEAR ANY EXISITNG OPTIONS FIRST
//   while (msel.firstChild) {
//     msel.removeChild(msel.firstChild);
//   }

//   //  More secure way to add html versus 'innerhtml'
//   // the below does not work becasue material css uses
//   const opt = document.createElement("option");
//   opt.innerText = opt_value;
//   opt.value = opt_value;
//   opt.selected = true;
//   // opt.className = "red-text";
//   msel.append(opt);

//   // Re-init FormSelect to show appened item
//   M.FormSelect.init(msel);

//   // let dd = M.FormSelect.getInstance(msel);

//   // console.log(dd.getSelectedValues());

//   let mod = document.getElementById("modal1");
//   M.Modal.getInstance(mod).close();
// }

/**========================================================================
 **                           filterfunction()
 *?  Filter modal panel via text search box
 *========================================================================**/

// FILTER SEARCH TEXT BOX
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchbox");
  filter = input.value.toUpperCase();
  div = document.getElementById("modalpanel");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// ADD EVENT LISTENERS TO LISTENER CLASS
// // **window.onload with anonymous func is needed to add
// // event listensers to html file via external .js file
// window.onload = function () {
//   // ADD CLICK EVENT LISTENER TO LISTEN CLASS
//   document.querySelectorAll(".listen").forEach((item) => {
//     item.addEventListener("click", (event) => {
//       // Note two ways to get the innerText
//       // first via the click event
//       console.log(event.target.innerText);

//       // second via the item that was clicked on
//       console.log(item.innerText);

//       addoption(item.innerText);
//     });

//     // item.addEventListener("click", add);
//   });
// };

/**========================================================================
 **                           showmodal()
 *?  Closes modals with class name modal1
 *========================================================================**/

function focus() {
  document.getElementById("searchbox").focus();
}

function showmodal(modalid) {
  mod = document.getElementById(modalid);
  mod.classList.add("is-active");

  focus();
}

/**========================================================================
 **                           closemodal()
 *?  Closes modals with class name modal1
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
 *?  show context menu on right click
 *========================================================================**/
function show_cmenu() {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const cm = document.querySelector(".custom-cm");
    cm.style.display = "block";

    console.log(e);

    // Template literal
    // alert(`${e.y}, ${e.x}`);

    cm.style.top =
      e.y + cm.offsetHeight > window.innerHeight
        ? window.innerHeight - cm.offsetHeight
        : e.y + "px";
    cm.style.left =
      e.x + cm.offsetWidth > window.innerWidth
        ? window.innerWidth - cm.offsetWidth
        : e.x + "px";
    console.log(cm);
  });
}

/**========================================================================
 **                           close_cmenu()
 *?  close context menu on click
 *========================================================================**/
function close_cmenu() {
  window.addEventListener("click", () => {
    const cm = document.querySelector(".custom-cm");
    cm.style.display = "none";
  });
}

/**========================================================================
 **                           tosigns()
 *?  js for next button on add support form; hide and un-hide elements
 *========================================================================**/
function tosigns() {
  nextcontrol = document.getElementById("next_button");

  nextcontrol.addEventListener("click", (e) => {
    document.querySelectorAll(".supportform").forEach((element) => {
      element.classList.add("is-hidden");
    });

    document.querySelectorAll(".signform").forEach((element) => {
      element.classList.remove("is-hidden");
    });

    document.getElementById("suptab").classList.remove("is-active");
    document.getElementById("signtab").classList.add("is-active");
  });
}

/**========================================================================
 **                           resetform()
 *?  js to reset add support form back; used in different cases
 *========================================================================**/

// TODO figure out how to export function to use in map.js
function resetform() {
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
    resetform();
  });
}

/**========================================================================
 **                           plussign()
 *?  js for plus sign icon to un-hide add sign form elements
 *========================================================================**/

//  TODO more logic needed to process adding sign to sign table and hiding elements
function plussign() {
  plus = document.getElementById("plussign");

  plus.addEventListener("click", (e) => {
    document.querySelectorAll(".asignform").forEach((element) => {
      element.classList.remove("is-hidden");
    });

    document.querySelector("#back_button").classList.add("is-hidden");
    document.querySelector("#cancel_button").classList.add("is-hidden");
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
  // show_cmenu();
  closemodal("addsup_modal");
  closemodal("modal1");
  close_cmenu();
  tosigns();
  tosupport();
  plussign();
};

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

function focus() {
  document.getElementById("searchbox").focus();
}

function showmodal(modalid) {
  mod = document.getElementById(modalid);
  mod.classList.add("is-active");

  focus();
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
 **                           closemodal()
 *?  Closes modals with class name modal1
 *========================================================================**/

function closemodal() {
  // ADD CLICK EVENT LISTENER TO 'closemodal' CLASS
  document.querySelectorAll(".closemodal").forEach((item) => {
    item.addEventListener("click", (event) => {
      // perform this code if click on element with class 'closemodal'
      mod = document.getElementById("modal1");
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
 **                           show_cmenu()
 *?  show context menu on right click
 *========================================================================**/
function close_cmenu() {
  window.addEventListener("click", () => {
    const cm = document.querySelector(".custom-cm");
    cm.style.display = "none";
  });
}

/**========================================================================
 *                             Window.onload
 *
 * ADD EVENT LISTENERS ONLOAD
 *  window.onload with anonymous function is needed to add
 *  event listensers to html file via external .js file
 *========================================================================**/

window.onload = function () {
  show_cmenu();
  closemodal();
  close_cmenu();
};

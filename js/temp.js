/* ================================ Temp Code Below ==============================*/
// Below code may be not used or used elsewhere in future; keep for now
// seperating to keep focus on relevant code and funtions

/**========================================================================
 **                           uppercase()
 *?  make textbox value uppercase
 * ! Not in Use now, use later?
 *========================================================================**/

// MAKE TEXT IN TEXTBOX UPPERCASE
function uppercase() {
  var txtbox = document.getElementById("sign_codes");
  txtbox.value = txtbox.value.toUpperCase();
}

/**========================================================================
 **                           filterfunction()
 *?  Filter modal panel via text search box
 * ! Not in Use now, use later?
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

/**========================================================================
 **                           showmodal()
 *?  Function to activate modals based on modal element id
 * ! --->  Delete later?; using only for Test modal for search box;
 *========================================================================**/

function showmodal(modalid) {
  mod = document.getElementById(modalid);
  mod.classList.add("is-active");

  document.getElementById("searchbox").focus();
}

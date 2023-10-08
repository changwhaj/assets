/*!
 * Dark Mode Switch & Font Mode Switch
 */

var darkSwitch = document.getElementById("darkSwitch");
var fontSwitch = document.getElementById("fontSwitch");
window.addEventListener("load", function () {
  if (darkSwitch) {
    initDarkTheme();
    darkSwitch.addEventListener("change", function () {
      resetDarkTheme();
    });
  }
  if (fontSwitch) {
    initFontTheme();
    fontSwitch.addEventListener("change", function () {
      resetFontTheme();
    });
  }
});

/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initDarkTheme() {
  var darkThemeSelected =
    localStorage.getItem("darkSwitch") !== null &&
    localStorage.getItem("darkSwitch") === "dark";
  darkSwitch.checked = darkThemeSelected;
  darkThemeSelected
    ? document.body.setAttribute("data-theme", "dark")
    : document.body.removeAttribute("data-theme");
}

function initFontTheme() {
  var fontThemeSelected =
    localStorage.getItem("fontSwitch") !== null &&
    localStorage.getItem("fontSwitch") === "big";
  fontSwitch.checked = fontThemeSelected;
  fontThemeSelected
    ? document.body.setAttribute("font-theme", "big")
    : document.body.removeAttribute("font-theme");
}

/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */
function resetDarkTheme() {
  if (darkSwitch.checked) {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkSwitch", "dark");
  } else {
    document.body.removeAttribute("data-theme");
    localStorage.removeItem("darkSwitch");
  }
}

function resetFontTheme() {
  if (fontSwitch.checked) {
    document.body.setAttribute("font-theme", "big");
    localStorage.setItem("fontSwitch", "big");
  } else {
    document.body.removeAttribute("font-theme");
    localStorage.removeItem("fontSwitch");
  }
}

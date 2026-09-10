var path = window.location.pathname.toLowerCase();
if (path.startsWith("/details")) {
  let displayHistory = function() {
    let remove = document.querySelector(".ext-not-installed");
    if (!remove) {
      return setTimeout(displayHistory, 500);
    }
    let add = document.querySelector(".ext-installed");
    if (!add) {
      return;
    }
    remove.style.display = "none";
    add.style.display = "";
  };
  displayHistory();
}

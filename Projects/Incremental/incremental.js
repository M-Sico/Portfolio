var version = 0.1

function showHide(ID) {
    var elem = document.getElementById(ID);
    if (elem.style.display != "none") {
        elem.style.display = "none";
    }
    else {
        elem.style.display = "";
    }
}

// Initialize player

var player = {
  name:"",
  job:"",
}

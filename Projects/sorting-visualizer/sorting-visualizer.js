var num_list;

function swapCol() {
  var temp = num_list.list[0];
  num_list.list[0] = num_list.list[1];
  num_list.list[1] = temp;
  var elem = document.getElementsByClassName("col-0");
  elem.style = ("height:" + (num_list.list[0] * .1) + "vh");
  elem = document.getElementsByClassName("col-1");
  elem.style = ("height:" + (num_list.list[1] * .1) + "vh");
  event.stopPropagation();
}

function convToJSON() {
  var text = document.getElementById("num-list").value;
  if (text == "") {
    text = new Array();
    for (var i = 0; i < 100; i++) {
      text.push(Math.ceil(Math.random() * 500));
    }
    num_list = {
      list:text
    }
  } else {
    num_list = {
      list:text.split(" ")
    }
  }
}

function createColumn() {
  var container = document.getElementById("vis-container"),
  elem, i;
  convToJSON();
  for (i = 0; i < num_list.list.length; i++) {
    elem = document.createElement("div");
    elem.id = "vis-column";
    elem.className = "col-"+i;
    elem.style = ("height:" + (num_list.list[i] * .1) + "vh");
    container.appendChild(elem);
  }
  event.stopPropagation();
}

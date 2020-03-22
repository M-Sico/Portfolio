var num_list;

function convToJSON() {
  const userDataInput = document.getElementById("num-list").value;
  if (userDataInput) {
    num_list = { list: userDataInput.split(" ") };
    return;
  }
  generateRandomData();
  function generateRandomData() {
    const data = [];
    let i = 0;
    fillArray();
    num_list = { list: data };
    function fillArray() {
      if (i < 100) {
        data.push(Math.ceil(Math.random() * 500));
        i = i + 1;
        fillArray();
      }
    }
  }
}

function createColumn() {
  const container = document.getElementById("vis-container");
  convToJSON();
  num_list.list.map((current, index) => {
    const elem = document.createElement("div");
    elem.id = "vis-column";
    elem.className = "col-" + index;
    elem.style = ("height:" + (current * .1) + "vh");
    container.appendChild(elem);
  });
  document.getElementById("populate").disabled = true;
  document.getElementById("swap").disabled = false;
}

function swapCol(index_1, index_2) {
  var temp = num_list.list[index_1];
  num_list.list[index_1] = num_list.list[index_2];
  num_list.list[index_2] = temp;
  elem1 = document.getElementsByClassName("col-" + index_1);
  // elem1.item(0).style.backgroundColor = "red";
  elem1.item(0).style.height = (num_list.list[index_1] * .1) + "vh";
  elem2 = document.getElementsByClassName("col-" + index_2)
  // elem2.item(0).style.backgroundColor = "red";
  elem2.item(0).style.height = (num_list.list[index_2] * .1) + "vh";
  // elem1.item(0).style.backgroundColor = "";
  // elem2.item(0).style.backgroundColor = "";
}

function transform() {
  function swap(param) {
    if (param.index >= history_JSON.history.length) {
      clearInterval(transform);
      document.getElementById("swap").disabled = false;
    } else {
      swapCol(history_JSON.history[param.index][0],history_JSON.history[param.index][1]);
      param.index++;
    }
  }

  const param = { index: 0 };
  document.getElementById("swap").disabled = true;
  //setInterval(swap, 0, param);
  setInterval(function(){swap(param)}, 0);
}

document.getElementById("info").onmouseover = function(){
  document.getElementById("info-dump").style.display = "inline-block";
}
document.getElementById("info").onmouseout = function(){
  document.getElementById("info-dump").style.display = "none";
}
document.getElementById("swap").disabled = true;

//array: array of all elements with ID column
//const bar_width = screen.availwidth / array.length;
//document.getElement

//Parallel processing

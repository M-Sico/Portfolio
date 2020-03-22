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

async function swapCol(index_1, index_2) {
  return await Promise.all([
    swapValues(),
    swapHeight()
  ]);
  async function swapValues() {
    const tempValue = num_list.list[index_1];
    num_list.list[index_1] = num_list.list[index_2];
    num_list.list[index_2] = tempValue;
  }
  async function swapHeight() {
    const tempHeight = getBar(index_1).style.height;
    let elem1 = getBar(index_1);
    let elem2 = getBar(index_2);
    elem1.style.height = elem2.style.height;
    elem2.style.height = tempHeight;
    function getBar(index) {
      return document.getElementsByClassName("col-" + index).item(0);
    }
  }
}

async function transform() {
  let fullLength = num_list.list.length < 0
    ? 0
    : num_list.list.length;
  async function swap() {
    console.log(num_list.list);
    if (fullLength !== 0) {
      let startPoint = 0;
      num_list.list.map(async (current, index) => {
        if (index !== 0) {
          if (num_list.list[index - 1] > num_list.list[index]) {
            await swapCol(index - 1, index);
            startPoint = index;
          }
        }
      });
      fullLength = startPoint;
      await swap();
    }
  }
  document.getElementById("swap").disabled = true;
  // this is just bubble sort logic
  swap();
  document.getElementById("populate").disabled = false;
  document.getElementById("swap").disabled = true;
  // setInterval(() => { swap(); }, 0);
  // I think I don't have the right idea about the data structure for history_JSON
  // why [[0,0], [1,1]...]
  // this sort of structure makes this especially hard to reason about
  // especially for the brython code
  /*
  // swapCol(history_JSON.history[param.index][0],history_JSON.history[param.index][1]);
  function swap(param) {
    if (param.index >= history_JSON.history.length) {
      clearInterval(transform);
      document.getElementById("swap").disabled = false;
    } else {
      swapCol(history_JSON.history[param.index][0],history_JSON.history[param.index][1]);
      param.index++;
    }
  }
  */
  // const param = { index: 0 };
  //setInterval(swap, 0, param);
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

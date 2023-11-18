const container = document.querySelector(".container");
const del = document.querySelector("#del");
const enter = document.querySelector("#enter");
var words= ['ASCII', 'ADAPT', 'INTEL','LOGIC','NOISE'];
var word = words[Math.floor(Math.random()*words.length)];
// const word = "ADAPT";
let arr = [];
// Creating Game board
for (let i = 1; i <= 30; i++) {
  let div = document.createElement("div");
  arr.push(i);
  div.setAttribute("id", "item-" + i);
  div.classList.add("div");
  container.appendChild(div);
}
console.log(arr);
let ptr = 1;
let max = 5;
let str = "";
let prior_max = 0;

for (let j = 65; j <= 90; j++) {
  const btn = document.querySelector("#item-btn-" + j);
  btn.addEventListener("click", (ev) => {
    const char = String.fromCharCode(j);
    const div = document.querySelector("#item-" + ptr);
    console.log(div);
    const span = document.createElement("span");
    span.style.fontSize = "30px";
    span.appendChild(document.createTextNode(char));
    console.log(ptr, max);
    if (ptr <= max) {
      ptr++;
      div.appendChild(span);
      str += char;
    }
  });
}
del.addEventListener("click", delete_ev);
function delete_ev() {
  if (prior_max+2<=ptr  && ptr<= max + 1) {
    console.log(prior_max+" "+ptr+" "+max);
    ptr--;
    const div = document.querySelector("#item-" + ptr);
    div.removeChild(div.firstElementChild);
    console.log(str);
    str = str.slice(0, -1);
    console.log(str);
  }
};

let x = 1;
enter.addEventListener("click", enter_ev);
function enter_ev(){
    if (ptr == max + 1) {
      prior_max = max;
      max += 5;
      for (let i = 1; i < 6; i++) {
        let f = 0;
        const div = document.querySelector("#item-" + x);
        if (str[i - 1] == word[i - 1]) {
          div.style.backgroundColor = "#6ca965";
        } else {
          for (let j = 1; j < 6; j++) {
            if (str[i - 1] == word[j - 1] && i != j) {
              div.style.backgroundColor = "#c8b653";
              f = 1;
            }
          }
          if (f == 0) {
            div.style.backgroundColor = "#787c7f";
          }
        }
        x++;
      }
      if (str == word) {
        alert("Congrats");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      }
      str = "";
    } else {
      alert("Not enough letters");
    }
    if (ptr == 31) {
      alert("Sorry you lost the game. Better luck next time!");
      location.reload();
    }
};
document.addEventListener("keydown",(ev)=>{
    let pressedKey = String(ev.key);
    if(pressedKey=="Backspace"){
        delete_ev();
        return;
    }
    if(pressedKey=="Enter"){
        enter_ev();
        return;
    }
    pressedKey = pressedKey.toUpperCase();
    let found = pressedKey.match(/[A-Z]/gi);
    if (!found || found.length > 1) {
        return;
    } 
    const div = document.querySelector("#item-" + ptr);
    console.log(div);
    const span = document.createElement("span");
    span.style.fontSize = "30px";
    span.appendChild(document.createTextNode(found));
    console.log(ptr, max);
    if (ptr <= max) {
      ptr++;
      div.appendChild(span);
      str += found;
    }
})

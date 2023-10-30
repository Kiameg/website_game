window.addEventListener("load", sidenVises);
// Undersøger om siden er loadet færdig og kalder functionen sidenVises, er altid det første vi har
let point = 0;
let liv = 3;
let ranTal;

const noed = document.querySelector("#noed_container");
const chipnuts = document.querySelector("#chipnuts_container");
const peanut = document.querySelector("#peanut_container");
const wallnut = document.querySelector("#wallnut_container");

function sidenVises() {
  console.log("sidenVises");
  //altid sæt volume af lyd foram selve lyden (ikke altid)
  document.querySelector("#background_sound").volume = 0.1;
  document.querySelector("#background_sound").play();
  window.addEventListener("resize", windowResize);
  windowResize();
  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  //Vis start skærm
  document.querySelector("#start_game").classList.remove("hide");
  //Klik på start_knap
  document.querySelector("#start_button").addEventListener("click", startGame);
}
function windowResize() {
  // Dette sørger for skærmen resizer
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProcent1 = 3;
  let myFont1 = (widthScreen / 100) * myFontInProcent1;
  document.querySelector("#point_board").style.fontSize = myFont1 + "px";
  document.querySelector("#life_board").style.fontSize = myFont1 + "px";
  document.querySelector("#level_complete").style.fontSize = myFont1 + "px";
  document.querySelector("#game_over").style.fontSize = myFont1 + "px";
  document.querySelector("#start_game").style.fontSize = myFont1 + "px";
}

// Start skærm
function startGame() {
  console.log("startGame");
  document.querySelector("#background_sound").volume = 0.1;
  document.querySelector("#background_sound").play();
  //afspiller/vælger lyden
  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start_game").classList.add("hide");

  //Nulstil point og liv
  point = 0;
  liv = 3;

  //Skriv point og liv ud
  document.querySelector("#point_board").textContent = point;
  document.querySelector("#life_board").textContent = liv;

  //Start timer -animation
  document.querySelector("#time_fill").classList.add("tid");

  //timer -animation færdig
  document.querySelector("#time_board").addEventListener("animationend", stoptheGame);

  // laver et nyt random tal mellem 1 og 4, så de forskellige elementer falder på 4 forskellige positioner
  ranTal = Math.floor(Math.random() * 4) + 1;
  noed.classList.add("drop", "pos" + ranTal);
  noed.addEventListener("animationiteration", goodReset);
  noed.addEventListener("click", noedClickHandler);
  // laver et nyt random tal mellem 1 og 4, så de forskellige elementer falder på 4 forskellige positioner
  ranTal = Math.floor(Math.random() * 4) + 1;
  chipnuts.classList.add("pos" + ranTal);
  chipnuts.classList.add("drop");
  chipnuts.addEventListener("animationiteration", chipnutsReset);
  chipnuts.addEventListener("click", chipnutsClickHandler);
  // laver et nyt random tal mellem 1 og 4, så de forskellige elementer falder på 4 forskellige positioner
  ranTal = Math.floor(Math.random() * 4) + 1;
  peanut.classList.add("drop", "pos" + ranTal);
  peanut.addEventListener("animationiteration", goodReset);
  peanut.addEventListener("click", peanutClickHandler);
  // laver et nyt random tal mellem 1 og 4, så de forskellige elementer falder på 4 forskellige positioner
  ranTal = Math.floor(Math.random() * 4) + 1;
  wallnut.classList.add("drop", "pos" + ranTal);
  wallnut.addEventListener("animationiteration", goodReset);
  wallnut.addEventListener("click", wallnutClickHandler);
}

//Klik på nød = pause og forsvind
function noedClickHandler() {
  console.log("noedClickHandler");
  //altid sæt volume af lyd foram selve lyden (ikke altid)
  document.querySelector("#klik1_sound").volume = 0.5;
  //sørger for at lyden repeater sig selv hver gang du klikker(uden animation er færdig)
  document.querySelector("#klik1_sound").volume.currentTime = 0;
  //afspiller/vælger lyden
  document.querySelector("#klik1_sound").play();
  //tilføjer pause efterfulgt af drej
  noed.classList.add("pause");
  noed.firstElementChild.classList.add("drej");
  point++;
  document.querySelector("#point_board").textContent = point;
  noed.addEventListener("animationend", goodReset);
}
//Klik på nød = pause og forsvind
function peanutClickHandler() {
  console.log("peanutClickHandler");
  //altid sæt volume af lyd foram selve lyden (ikke altid)
  document.querySelector("#wee_sound").volume = 0.5;
  //sørger for at lyden repeater sig selv hver gang du klikker(uden animation er færdig)
  document.querySelector("#wee_sound").volume.currentTime = 0;
  //afspiller/vælger lyden
  document.querySelector("#wee_sound").play();
  peanut.classList.add("pause");
  peanut.firstElementChild.classList.add("drej");
  point++;
  document.querySelector("#point_board").textContent = point;
  peanut.addEventListener("animationend", goodReset);
}
//Klik på nød = pause og forsvind
function wallnutClickHandler() {
  console.log("wallnutClickHandler");
  //altid sæt volume af lyd foram selve lyden (ikke altid)
  document.querySelector("#klik2_sound").volume = 0.5;
  //sørger for at lyden repeater sig selv hver gang du klikker(uden animation er færdig)
  document.querySelector("#klik2_sound").volume.currentTime = 0;
  //afspiller/vælger lyden
  document.querySelector("#klik2_sound").play();
  wallnut.classList.add("pause");
  wallnut.firstElementChild.classList.add("drej");
  point++;
  document.querySelector("#point_board").textContent = point;
  wallnut.addEventListener("animationend", goodReset);
}
//Klik på nød = pause og forsvind
function chipnutsClickHandler() {
  console.log("chipnutsClickHandler");
  //skifter mellem 2 lyde
  if (Math.random() < 0.5) {
    document.querySelector("#ouch_sound").play();
  } else {
    document.querySelector("#ow_sound").play();
  }
  chipnuts.classList.add("pause");
  chipnuts.firstElementChild.classList.add("forsvind");
  liv--;
  document.querySelector("#life_board").textContent = liv;
  chipnuts.addEventListener("animationend", chipnutsReset);
  //hvis liv er 0- så stopper spillet
  if (liv <= 0) {
    stoptheGame();
  }
}

function goodReset() {
  console.log("goodReset");
  //Genstart Noed efter klik
  noed.classList = "";
  document.querySelector("#noed_sprite").classList = "";
  noed.offsetLeft;
  //Vis Noed element igen
  ranTal = Math.floor(Math.random() * 4) + 1;
  noed.classList.add("pos" + ranTal);
  noed.classList.add("drop");
  noed.addEventListener("click", noedClickHandler);
  //Genstart Peanut efter klik
  peanut.classList = "";
  peanut.firstElementChild.classList = "";
  peanut.offsetLeft;
  //Vis Peanut element igen
  ranTal = Math.floor(Math.random() * 4) + 1;
  peanut.classList.add("pos" + ranTal);
  peanut.classList.add("drop");
  peanut.addEventListener("click", peanutClickHandler);
  //Genstart Wallnut efter klik
  wallnut.classList = "";
  wallnut.firstElementChild.classList = "";
  wallnut.offsetLeft;
  //Vis Wallnut element igen
  ranTal = Math.floor(Math.random() * 4) + 1;
  wallnut.classList.add("pos" + ranTal);
  wallnut.classList.add("drop");
  wallnut.addEventListener("click", wallnutClickHandler);
}

function chipnutsReset() {
  console.log("chipnutsReset");
  //Genstart efter klik
  chipnuts.classList = "";
  chipnuts.firstElementChild.classList = "";
  chipnuts.offsetLeft;
  //Vis element igen
  ranTal = Math.floor(Math.random() * 4) + 1;
  chipnuts.classList.add("pos" + ranTal);
  chipnuts.classList.add("drop");
  chipnuts.addEventListener("click", chipnutsClickHandler);
}
//stop spillet
function stoptheGame() {
  console.log("stoptheGame");

  //stop timer
  document.querySelector("#time_fill").classList.remove("tid");
  document.querySelector("#time_board").removeEventListener("animationend", stoptheGame);

  //fjern classes på Noed elements
  noed.classList = "";
  noed.firstElementChild.classList = "";
  noed.removeEventListener("animationiteration", goodReset);
  noed.removeEventListener("animationend", goodReset);
  noed.removeEventListener("click", noedClickHandler);
  //Fjern classes på Chipnuts elements
  chipnuts.classList = "";
  chipnuts.firstElementChild.classList = "";
  chipnuts.removeEventListener("animationiteration", chipnutsReset);
  chipnuts.removeEventListener("animationend", chipnutsReset);
  chipnuts.removeEventListener("click", chipnutsClickHandler);
  //Fjern classes på peanut elements
  peanut.classList = "";
  peanut.firstElementChild.classList = "";
  peanut.removeEventListener("animationiteration", goodReset);
  peanut.removeEventListener("animationend", goodReset);
  peanut.removeEventListener("click", peanutClickHandler);
  //Fjern classes på wallnut elements
  wallnut.classList = "";
  wallnut.firstElementChild.classList = "";
  wallnut.removeEventListener("animationiteration", goodReset);
  wallnut.removeEventListener("animationend", goodReset);
  wallnut.removeEventListener("click", wallnutClickHandler);

  //Skriver hvis liv er mindre end 0 så taber du, og hvis point er mere en 5 så vinder du
  if (liv <= 0) {
    gameOver();
  } else if (point >= 5) {
    levelComplete();
  } else {
    gameOver();
  }
}
//gameover
function gameOver() {
  console.log("You lose");
  if (liv <= 0) {
    document.querySelector("#game_over_points").textContent = "You squeezed Mr.Chip's nuts! Now he is dead!!";
  } else {
    document.querySelector("#game_over_points").textContent = "You only got " + point + " points, you suck!";
  }

  //altid sæt volume af lyd foram selve lyden (ikke altid)
  document.querySelector("#background_sound").volume = 0.1;
  document.querySelector("#background_sound").pause();
  //pauser baggrundslyd

  //altid sæt volume af lyd foram selve lyden (ikke altid)
  document.querySelector("#lose_sound").volume = 0.5;
  //sørger for at lyden repeater sig selv hver gang du klikker(uden animation er færdig)
  document.querySelector("#lose_sound").volume.currentTime = 0;
  //afspiller/vælger lyden
  document.querySelector("#lose_sound").play();

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");
  //Klik på tryagain
  document.querySelector("#try_again1").addEventListener("click", startGame);
}
//level complete
function levelComplete() {
  console.log("You won!");
  //altid sæt volume af lyd foram selve lyden (ikke altid)
  document.querySelector("#background_sound").volume = 0.1;
  document.querySelector("#background_sound").pause();
  //pauser baggrundslyd

  //altid sæt volume af lyd foram selve lyden (ikke altid)
  document.querySelector("#win_sound").volume = 0.5;
  //sørger for at lyden repeater sig selv hver gang du klikker(uden animation er færdig)
  document.querySelector("#win_sound").volume.currentTime = 0;
  //afspiller/vælger lyden
  document.querySelector("#win_sound").play();

  document.querySelector("#level_complete_points").textContent = "You got " + point + " points and collected enough nuts!";
  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");
  //Klik på tryagain
  document.querySelector("#try_again2").addEventListener("click", startGame);
}

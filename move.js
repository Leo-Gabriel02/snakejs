window.onload = function runGame() {
  var queue = [];     //stores moves thatll happen nxt. keypress: commands load in end. pace: leave through[0], remove[0] by .shift
  var points = 1;     //stores the amount of food player has collected
  var command = null; //stores current movement. set by keyboardevent and reset w/ queue[0]
  var blocks = [];    //stores all of the blocks on the stage, in order. filled by create.
  var head = 63;      //stores block location of head
  var history = [];   //stores the history of every block that snake head has been on
  var food = 123;     //stores the position of food in array blocks
  var gameState = 1;

/***Creates a score indicator which displays the number of foods collected***/
  var score = document.createElement('p');                       //create new paragraph named "score"
  document.body.appendChild(score);                              //add score to index.html
  score.style.font = "normal small-caps normal 30px/1.4 Georgia";//format the font of score
  score.style.color = 'blue';                                    //format color of score
  score.textContent = "score: " + points;                        //makes the content of score "score:" then points

/***Create the game board(all of the blocks)***/
  function create(){
    var a = 0;
    var b = 0;
    for(i=1; i<601; i++){
      if(i % 30 == 1 && i != 1){
        a++;
      }
      blocks.push(i);
      blocks[i] = document.createElement('div');
      document.body.appendChild(blocks[i]);
      blocks[i].style.width = 30 + 'px';
      blocks[i].style.height = 30 + 'px';
      blocks[i].style.backgroundColor = '#4d0000';
      blocks[i].style.position = 'absolute';
      blocks[i].style.left = 115 + (i * 32) - (a*960) + 'px';
      blocks[i].style.top = 30 + a * 32 + 'px';
    }
      blocks[1]  .style.borderRadius = "10px 0px 0px 0px";
      blocks[30] .style.borderRadius = "0px 10px 0px 0px";
      blocks[571].style.borderRadius = "0px 0px 0px 10px";
      blocks[600].style.borderRadius = "0px 0px 10px 0px";
  }


  addEventListener("keydown", function(event) {
    if(event.keyCode == 37){
      queue.push("L");
    }
    if(event.keyCode == 38){
      queue.push("U");
    }
    if(event.keyCode == 39){
      queue.push("R");
    }
    if(event.keyCode == 40){
      queue.push("D");
    }
    if(event.keyCode == 80){
      if(gameState == 2){
        gameState = 1;
      };
      if(gameState == 1){
        gameState = 2;
      }
    }
    if(event.keyCode == 13){
      gameState = 1;
    }
  });
  create();

  function placeFood(){
    food = Math.floor(Math.random() * 600) + 1;  
    for (var i = points; i < history.length; i++) {
      if(i >= history.length-points){
        var j = history[i];
        if(food == j){
          placeFood();
        }
      }
    }
    blocks[food].style.backgroundColor = 'green';
  }
  placeFood();

  function getFood(){
    points += 1;
    placeFood();
    score.textContent = "score: " + points;
  }

  function bodyMove() {
    history.push(head);
    console.log(history);
    for (var i = points; i < history.length; i++) {
      var l = history.length - points - 1;
      var k = history[l]
      blocks[k].style.backgroundColor = "#4d0000";
      var j = history[i];
      if(i >= history.length-points){
        blocks[j].style.backgroundColor = "red";
      }
    }
  }

  function checkbounds(){
    if(head % 30 == 0 && command == "R"){
      alert("Game Over");
    }
    if(head % 30 == 1 && command == "L"){
      alert("Game Over");
    }
    if(head < 30 && command == "U"){
      alert("Game Over");
    }
    if(head > 571 && command == "D"){
      alert("Game Over")
    }
  }
  function checkBody(){
    for (var i = points; i < history.length; i++) {
      if(i >= history.length-points){
        var j = history[i];
        if(head == j){
          alert("Game Over")
        }
      }
    }
  }

  function pace(){
    if(gameState == 0){
      /***opening screen, ***/
    }
    if(gameState == 1){
      checkbounds();
      checkBody();
      if(command != null){bodyMove()};
      if(command == "L"){
        window.clearInterval();
        head -= 1;
        blocks[head].style.backgroundColor = "red";
      }
      if(command == 'U'){
        window.clearInterval();
        head -= 30;
        blocks[head].style.backgroundColor = "red";
      }
      if(command == "R"){
        window.clearInterval();
        head += 1;
        blocks[head].style.backgroundColor = "red";
      }
      if(command == "D"){
        window.clearInterval();
        head += 30;
        blocks[head].style.backgroundColor = "red";
      }

      if(food == head) {
        getFood();
      }
      if(queue.length != 0){
        command = queue[0];
        queue.shift();
      }
    }
    if(gameState == 2){
      pause = document.createElement('div');
      document.body.appendChild(pause);
      pause.style.width = 30 + 'vw';
      pause.style.height = 20 + 'vw';
      pause.style.backgroundColor = 'green';
      pause.style.position = 'absolute';
      pause.style.left = 35 + 'vw';
      pause.style.top = 20 + 'vw';
      pauseText = document.createTextNode("press p to continue");
      pause.appendChild(pauseText);
      pauseText.style.colo r= 'red';
    }
  }
  setInterval(pace, 100);
};
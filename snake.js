window.onload =  function runGame() {
  "use strict";
  var screenW = 80;
  var screenH = 40;

  function NewSquare(x, y, bodyon, headon) {
    this.x = x;
    this.y = y;
    this.bodyon = false;
    this.headon = false;
    this.foodon = false;
  }
  var jblocks = [];
  var blocks = [];
  var create = function() {
    var i=0;
    var n=0;
    for(var w = 0; w<60; w++) {
      for(var h = 0; h<40; h++) {
        jblocks.push(new NewSquare(w,h,false,false));
        jblocks[i].x = w*12;
        jblocks[i].y = h*12;
        i=i+1;
        blocks[n] = document.createElement('div'); //doesnt add div
        //console.log(blocks);
        blocks[n].style.width = 10 + 'px';
        blocks[n].style.height = 10 + 'px';
        blocks[n].style.color = 'red';
        blocks[n].style.backgroundColor = 'red';
        blocks[n].style.left = (w*12 + 10)+'px';
        blocks[n].style.top = (h*12 + 10)+'px';
        blocks[n].style.position = 'absolute';
        var z = blocks[n];
        console.log(z);
        document.body.appendChild(z); //this does
        n=n+1;
      };
    };
    jblocks[164].headon=true; //makes head appear
    jblocks[495].foodon=true;
    //console.log(jblocks)
    //console.log(document.body.children);
  };
function placeFood() {
    var num = Math.floor(Math.random() * (3199)) + 1;
    if(jblocks[num].bodyon = true){
      placeFood();
    }
    else if(jblocks[num].headon = true){
      placeFood();
    }
    else{
      jblocks[num].foodon=true;
    }
  }

  function checkBlocks() {
    var n=0;
    for(var n=0; n<3200; n++){
      if (jblocks[n].bodyon==true){
        console.log("body is on square:"+n)
        blocks[n].style.backgroundColor = 'yellow';
      };
      if(jblocks[n].foodon==true){
        blocks[n].style.backgroundColor = 'green';
      };
      if(jblocks[n].headon==true){
        blocks[n].style.backgroundColor = 'orange';
      }
      else{
        blocks[n].style.backgroundColor = 'red';
      }
    };
  };

  // function getKey(e) {
  //   var keynum;
  //   if(window.event) {                  
  //     keynum = e.keyCode;
  //   }
  //   else if(e.which){                  
  //     keynum = e.which;
  //   }
  //   alert(String.fromCharCode(keynum));
  // }
  create();
  placeFood();
  checkBlocks();
};
while(1==1){
  runGame();
}
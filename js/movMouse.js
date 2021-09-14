"use strict";

// var canvas=document.getElementById("canvasPaint");
// var ctx = canvas.getContext("2d");

// var width=canvas.width;
// var height=canvas.height;
// var imageData = ctx.createImageData(width,height);
var mousePosXFin;
var mousePosYFin;
var mousePos;
var mousePosNew;
var pointerX = 0;
var pointerY = 0;
let style = "#000000";
let lWidth= 2;
var isMouseDown=false;

let btnEraser = document.getElementById("eraser");

btnEraser.addEventListener("click", function(){
    style = "#FFFFFF";
})

let btnColor=document.getElementById("lineColor");

btnColor.addEventListener("input", function() {
  style = btnColor.value;
  console.log(style);
});


function getMousePos(canvas,evt){
    return {
       /*  x:evt.clientX,
        y:evt.clientY */
        x:evt.layerX,
        y:evt.layerY

    }
}

canvas.addEventListener("mousemove",function(evt){
     mousePos=getMousePos(canvas,evt);
     setTimeout(() => {
      mousePosNew=getMousePos(canvas,evt);
      if (isMouseDown){
            console.log( width, height,mousePos.x ,mousePos.y , "mdown",isMouseDown);
        drawLine()}
    }, 15);
  });


function drawLine(){
ctx.beginPath();
ctx.moveTo(mousePos.x, mousePos.y);
ctx.lineTo(mousePosNew.x, mousePosNew.y);
ctx.lineWidth= lWidth;
ctx.strokeStyle= style;
ctx.stroke();
};


function onMouseDown(e){
  isMouseDown=true;
}

function onMouseUp(e){
  isMouseDown=false;
}

 

canvas.addEventListener("mousedown",onMouseDown,false);
canvas.addEventListener("mouseup",onMouseUp,false);
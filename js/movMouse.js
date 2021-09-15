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

let btnPen = document.getElementById("pen")
let btnEraser = document.getElementById("eraser");
let inputThick = document.getElementById("thick");

inputThick.addEventListener("change", function(){    // setea el ancho del trazo.
  lWidth=inputThick.value;
})

btnPen.addEventListener("click", function(){   // lee el color de trazo seleccionado.
  style = btnColor.value;  
})

btnEraser.addEventListener("click", function(){   // Borrar: cambia a blanco el color del trazo
    style = "#FFFFFF";
})

let btnColor=document.getElementById("lineColor");

btnColor.addEventListener("change", function() {    //  setea el color del trazo.
  style = btnColor.value;
  //console.log(style);
});


function getMousePos(canvas,evt){ // nos devuelve la posición actual en los ejes x e y, del mouse
    return {
        x:evt.layerX,
        y:evt.layerY

    }
}

canvas.addEventListener("mousemove",function(evt){ // calculamos la posición inicial, después de un intervalo de  
     mousePos=getMousePos(canvas,evt);             // 30 milisegundos, volvemos a calcular la posición, y luego
     setTimeout(() => {                            // dibujamos una linea entre dichos puntos.
      mousePosNew=getMousePos(canvas,evt);
      if (isMouseDown){
        drawLine()}
    }, 30);
  });


function drawLine(){              // obtenemos la posición de inicio, y trazamos una linea entre 2 posiciones.
ctx.beginPath();                  // con un tipo y ancho definido.
ctx.moveTo(mousePos.x, mousePos.y);
ctx.lineTo(mousePosNew.x, mousePosNew.y);
ctx.lineWidth= lWidth;
ctx.strokeStyle= style;
ctx.stroke();
};


function onMouseDown(e){  
  isMouseDown=true;
}
//                               nos devuelven un boolean que nos dice si el boton del mouse está presionado.
function onMouseUp(e){    
  isMouseDown=false;
}

 

canvas.addEventListener("mousedown",onMouseDown,false);
canvas.addEventListener("mouseup",onMouseUp,false);
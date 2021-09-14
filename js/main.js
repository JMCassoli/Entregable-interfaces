let canvas = document.getElementById('canvasPaint');
let ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;
let initImage;
let isImage = false;
let inputImage = document.getElementById("inputImage");
let btnGrey = document.getElementById("greyscale"); 
let btnBack = document.getElementById("back");
let btnDelete = document.getElementById("delete");
let btnInvert = document.getElementById("invert");
let btnBW = document.getElementById("blackWhite"); 
let btnBright = document.getElementById("bright");
let btnBlur = document.getElementById("blur");
let btnSat = document.getElementById("saturation");
let btnDownload = document.getElementById("download");


inputImage.addEventListener("change", function() {

    let reader = new FileReader();
    reader.readAsDataURL(inputImage.files[0]);
    reader.onload = () => {
        let img = new Image();
        img.src = reader.result;
        img.onload = () => {
            
            drawImageScaled(img, ctx);
            // let wRatio = canvas.width / img.width    ;
            // let hRatio = canvas.height / img.height  ;
            // let ratio  = Math.min ( wRatio, hRatio );
            // ctx.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio);

           // ctx.drawImage(img, 0, 0, width, height);
            ctx.putImageData(ctx.getImageData(0, 0, width, height),width,height)
            initImage = ctx.getImageData(0, 0, width, height);
            isImage = true;
        }
    };
});

function drawImageScaled(img, ctx) {
    let canvas = ctx.canvas ;
    let hRatio = canvas.width  / img.width    ;
    let vRatio =  canvas.height / img.height  ;
    let ratio  = Math.min ( hRatio, vRatio );
    let centerShift_x = ( canvas.width - img.width*ratio ) / 2;
    let centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img, 0,0, img.width, img.height, centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
 }

btnSat.addEventListener("click", function () {
    let imageData =ctx.getImageData(0,0,width,height);
        for (let x=1; x<width-1; x++){
            for(let y=1; y<height-1; y++){
                setSaturation(imageData,x,y);
            }
        }
        ctx.putImageData(imageData, 0, 0)  ;  
});


function setSaturation(imageData,x,y) {
    let r = getRed(imageData,x,y);
    let g = getGreen(imageData,x,y);
    let b = getBlue(imageData,x,y);
    let colorATransf=transformRGBtoHSV(r, g, b);
    let colortransf=transformHSVtoRGB(colorATransf.h, colorATransf.s*1.3, colorATransf.v);
    setPixel(imageData,x,y,colortransf.r,colortransf.g,colortransf.b, 255);
    };


    btnDownload.addEventListener("click", function() {
    {
            let link = document.createElement('a');
            link.download = 'index.jpg';
            link.href = canvas.toDataURL()
            link.click();
        }
    })


// -------------------------  BLUR   -----------------------------------------------


let imageCopia =ctx.getImageData(0,0,width,height);



btnBlur.addEventListener("click", function () {
    let imageData =ctx.getImageData(0,0,width,height);
        for (let x=1; x<width-1; x++){
            for(let y=1; y<height-1; y++){
                setBlur(imageData,x,y);
            }
        }
        ctx.putImageData(imageCopia, 0, 0)  
});


function setBlur(imageData,x,y) {
   let fina=x+2;
   let finb=y+2;
  var rr=0;
  var gg=0;
  var bb=0;
    for (let i=x-1; i<fina; i++){
        for(let j=y-1; j<finb; j++){
           
            let r = getRed(imageData,i,j);
            let g = getGreen(imageData,i,j);
            let b = getBlue(imageData,i,j);
            rr+=r;
            gg+=g;
            bb+=b;
        }        

    }
    rr=rr/9;
    gg=gg/9;
    bb=bb/9;
    setPixel(imageCopia,x,y,rr,gg,bb,255);
 
   
};







// ----------------------------------------   hsb  --------------------------------

/*                          variacion de brillo                                */


/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
 * 
*/



btnBright.addEventListener("click", function () {
    let imageData =ctx.getImageData(0,0,width,height);
        for (let x=0; x<width; x++){
            for(let y=0; y<height; y++){
                setBright(imageData,x,y);
            }
        }
        ctx.putImageData(imageData, 0, 0)  
});

function setBright(imageData,x,y) {
    let r = getRed(imageData,x,y);
    let g = getGreen(imageData,x,y);
    let b = getBlue(imageData,x,y);
    let colorATransf=transformRGBtoHSV(r, g, b);
    let colortransf=transformHSVtoRGB(colorATransf.h, colorATransf.s, colorATransf.v*1.05);
    setPixel(imageData,x,y,colortransf.r,colortransf.g,colortransf.b, 255);
    };




function transformHSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

/* accepts parameters
 * r  Object = {r:x, g:y, b:z}
 * OR 
 * r, g, b
*/
function transformRGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}












btnBW.addEventListener("click", function () {
    let imageData =ctx.getImageData(0,0,width,height);
        for (let x=0; x<width; x++){
            for(let y=0; y<height; y++){
                setBW(imageData,x,y);
            }
        }
        ctx.putImageData(imageData, 0, 0)  
});

function setBW(imageData,x,y) {
    let r = getRed(imageData,x,y);
    let g = getGreen(imageData,x,y);
    let b = getBlue(imageData,x,y);
    let grey = (r+g+b)/3;
    if (grey > (255/4)){

        setPixel(imageData,x,y,0,0,0,255);
    
    }
    else{
        setPixel(imageData,x,y,255,255,255,255);

    };
}


btnInvert.addEventListener("click", function() {
    imageData =ctx.getImageData(0,0,width,height);
    for (let x=0; x<width; x++){
        for(let y=0; y<height; y++){
            setOpposite(imageData,x,y);
        }
    }
    ctx.putImageData(imageData, 0, 0)  ;
});

btnGrey.addEventListener("click", function () {
    let imageData =ctx.getImageData(0,0,width,height);
        for (let x=0; x<width; x++){
            for(let y=0; y<height; y++){
                setGrey(imageData,x,y);
            }
        }
        ctx.putImageData(imageData, 0, 0)  
});

btnDelete.addEventListener("click", function(){
    let imageData =ctx.getImageData(0,0,width,height);
        for (let x=0; x<width; x++){
            for(let y=0; y<height; y++){
                setPixel(imageData,x,y,255,255,255,255);
            }
        }
        ctx.putImageData(imageData, 0, 0)  
        inputImage.value="";
        isImage=false;
});

btnBack.addEventListener("click", function () {
    if (isImage) {
        ctx.putImageData(initImage, 0, 0);
    }
});

function setOpposite(imageData,x,y) {
    let r = getRed(imageData,x,y);
    let g = getGreen(imageData,x,y);
    let b = getBlue(imageData,x,y);
    setPixel(imageData,x,y,255-r,255-g,255-b,255);

}

function setGrey(imageData,x,y) {
    let r = getRed(imageData,x,y);
    let g = getGreen(imageData,x,y);
    let b = getBlue(imageData,x,y);
    let grey = (r+g+b)/3;

    setPixel(imageData,x,y,grey,grey,grey,255);

};

function setPixel(imageData,x,y,r,g,b,a) {
    let index= (x + y * imageData.width)*4;
    imageData.data[index] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;    
    imageData.data[index+3] = a;
    
}

function getRed(imageData,x,y) {
    let index = (x + y * imageData.width)*4;
    return imageData.data[index+0];
};

function getGreen(imageData,x,y) {
    let index = (x + y * imageData.width)*4;
    return imageData.data[index+1];
};

function getBlue(imageData,x,y) {
    let index = (x + y * imageData.width)*4;
    return imageData.data[index+2];
};


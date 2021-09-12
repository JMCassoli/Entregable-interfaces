let canvas = document.getElementById('canvasPaint');
let ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;
let initImage;
let isImage = false;
let inputImage = document.getElementById("inputImage");
let btnGrey = document.getElementById("grey"); 
let btnBack = document.getElementById("back");
let btnDelete = document.getElementById("delete");
let btnInvert = document.getElementById("invert");
let btnBW = document.getElementById("blackWhite"); 

inputImage.addEventListener("change", function() {
    let reader = new FileReader();
    reader.readAsDataURL(inputImage.files[0]);
    reader.onload = () => {
        let img = new Image();
        img.src = reader.result;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            ctx.putImageData(ctx.getImageData(0, 0, width, height),width,height)
            initImage = ctx.getImageData(0, 0, width, height);
            isImage = true;
        }
    };
});

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

btnDelete.addEventListener("click", function () {
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


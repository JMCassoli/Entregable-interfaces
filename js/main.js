let canvas = document.getElementById('canvasPaint');
let ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;
let initImage;
let isImage = false;
let inputImage = document.getElementById("inputImage");
let btnBW = document.getElementById("blackWhite"); 
let btnBack = document.getElementById("back");


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
                setGrey(imageData,x,y);
            }
        }
        ctx.putImageData(imageData, 0, 0)  
})

btnBack.addEventListener("click", goBack);

function goBack() {
    if (isImage) {
        ctx.putImageData(initImage, 0, 0);
    }
}

function setGrey(imageData,x,y) {
    let r = getRed(imageData,x,y);
    let g = getGreen(imageData,x,y);
    let b = getBlue(imageData,x,y);
    let grey = (r+g+b)/3;

    setPixel(imageData,x,y,grey,grey,grey,255);

}

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
}

function getGreen(imageData,x,y) {
    let index = (x + y * imageData.width)*4;
    return imageData.data[index+1];
}

function getBlue(imageData,x,y) {
    let index = (x + y * imageData.width)*4;
    return imageData.data[index+1];
}


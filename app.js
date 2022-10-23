const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#width");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const colorPresenter = document.querySelector("#color-presenter");
const eraseBtn = document.getElementById("erase-btn");
const file = document.getElementById("file");
const label = document.querySelector("label");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

canvas.height = 800;
canvas.width = 800;
let isPainting = false;
ctx.lineCap = "round"

function onMove(event){
    if (isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMousedown(){
    isPainting = true;
}

function onMouseup(){
    isPainting = false;
}

function onWidthChange(event){
    ctx.beginPath()
    ctx.lineWidth = event.target.value;
    label.innerHTML = "THICKNESS " + event.target.value;
}

function onColorClick(event){
    ctx.beginPath();
    let colorValue = event.target.dataset.color
    ctx.strokeStyle = colorValue;
    colorPresenter.style.backgroundColor = colorValue;
    
}

function onBtn(){
    ctx.beginPath()
    ctx.clearRect(0, 0, 800, 800);
}

function onFileChange(event){
    const chosenFile = event.target.files[0];
    const url = URL.createObjectURL(chosenFile);
    const img = new Image();
    img.src = url;
    img.onload = function(){
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 800, 800);
        file.value = null;
    }
}

function onDoubleClick(event){
    ctx.save();
    const text = textInput.value;
    ctx.lineWidth = 1;
    ctx.font = "45px serif"
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore()
    
}

function onSave(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url
    a.download = "MyDrawing.png";
    a.click();
}

saveBtn.addEventListener("click", onSave);
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMousedown);
canvas.addEventListener("mouseup", onMouseup);
range.addEventListener("change", onWidthChange);
colorOptions.forEach((element) => element.addEventListener("click", onColorClick));
eraseBtn.addEventListener("click", onBtn);
file.addEventListener("change", onFileChange);
const container = document.getElementById("container");
const gridDiv = document.getElementById("gridDiv");
const editGrid = document.getElementById("editGrid");

let rainbow = document.getElementById('rainbow');
let rainbowPaint = false;
let eraserPaint = false;
let shadingPaint = false;

rainbow.addEventListener('click', function () {
    rainbowPaint = true;
    eraserPaint = false;
    shadingPaint = false;
});

let black = document.getElementById('black');
black.addEventListener('click', function () {
    rainbowPaint = false;
    eraserPaint = false;
    shadingPaint = false;
}); 

let eraser = document.getElementById('eraser');
eraser.addEventListener('click', function () {
    rainbowPaint = false;
    eraserPaint = true;
    shadingPaint = false;
}); 

let shading = document.getElementById("shading");
shading.addEventListener('click', function () {
    rainbowPaint = false;
    eraserPaint = false;
    shadingPaint = true;
});


function clicked () {
    if (rainbowPaint == true)
    {
    this.style.backgroundColor = "rgb(" + (Math.floor(Math.random() * 254) + 1) + "," + (Math.floor(Math.random() * 254) + 1) + "," + (Math.floor(Math.random() * 254) + 1) + ")";
    }
    else if (eraserPaint == true)
    {
    this.style.backgroundColor = "white";
    }
    else if (shadingPaint == true)
    {
        let currentColor = this.style.backgroundColor;
        console.log(currentColor);
        console.log(currentColor[0]);
        console.log(currentColor[1]);

    }
    else
    {
    this.style.backgroundColor = "black";
    }
}

function dragged () {
    if (mouseEngage == true) {
        if (rainbowPaint == true)
        {
        this.style.backgroundColor = "rgb(" + (Math.floor(Math.random() * 254) + 1) + "," + (Math.floor(Math.random() * 254) + 1) + "," + (Math.floor(Math.random() * 254) + 1) + ")";
        }
        else if (eraserPaint == true)
        {
        this.style.backgroundColor = "white";
        }
        /*else if (shadingPaint == true)
        {
            let currentColor = this.style.backgroundColor;
            console.log(currentColor - 10);
        }*/
        else
        {
        this.style.backgroundColor = "black";
        }
    }
}


//creating the default grid
function createGrid () {
    gridDiv.style.gridTemplateColumns = "repeat(16, 1fr)";
    gridDiv.style.gridTemplateRows = "repeat(16, 1fr)";
    for (let i = 0; i < 16; i++)
    {
        for (let j = 0; j < 16; j++)
        {
            const box = document.createElement('div');
            box.classList.add('box');
            //Assigning the unclicked class to the boxes to make sure they have no color
            box.classList.add('unclicked');
            box.addEventListener("mouseover", dragged);
            box.addEventListener("click", clicked);
            gridDiv.appendChild(box);
        }
    }
};

createGrid();

let mouseEngage = false;
gridDiv.addEventListener("mousedown", function(){
    mouseEngage = true;
});
gridDiv.addEventListener("mouseup", function(){
    mouseEngage = false;
});

//clearing the grid by assigning the unclicked class to all the grid boxes
const clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", function () {
    const boxes = document.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i++)
    {
        boxes[i].style.backgroundColor = "white";
    }
});

let gridSlider = document.getElementById("gridSlider");
let gridSizeValue = document.getElementById("gridSizeValue");
gridSizeValue.textContent = gridSlider.value + " x " + gridSlider.value;
gridSlider.oninput = function () {
    gridSizeValue.textContent = this.value + " x " + this.value;

    //deleting the original grid
    const boxes = document.querySelectorAll('.box');
    for (let k = 0; k < boxes.length; k++)
    {
        gridDiv.removeChild(boxes[k]);
    }   

    //adjusting the arrangement of the grid boxes by editing the css thru JS for better flexibility
    gridDiv.style.gridTemplateColumns = `repeat(${gridSlider.value}, 1fr)`;
    gridDiv.style.gridTemplateRows = `repeat(${gridSlider.value}, 1fr)`;

    //creating the custom grid from user's input
    for (let i = 0; i < gridSlider.value; i++)
    {
        for (let j = 0; j < gridSlider.value; j++)
        {
            const box = document.createElement('div');
            box.classList.add('box');
            box.addEventListener("mouseover", dragged);
            box.addEventListener("click", clicked);
            gridDiv.appendChild(box);
        }
    }
    
};
const canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d')
const coordsDisplay = document.getElementById('coords');
const showZoom = document.getElementById('showZoom');

let centerX = -0.75; // Initial center x-coordinate
let centerY = 0; // Initial center y-coordinate
let rangeX = 2.8; // Initial range for x
let rangeY = 2.5; // Initial range for y
let zoom = 0


function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function convertToNewRange(value, oldMin, oldMax, newMin, newMax) {
    return newMin + ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin);
}

function convertToOldRange(value, newMin, newMax, oldMin, oldMax) {
    return oldMin + ((value - newMin) * (oldMax - oldMin)) / (newMax - newMin);
}

// Event listener for mouse move
canvas.addEventListener('mousemove', function(evt) {
    const mousePos = getMousePos(canvas, evt);
    const newX = convertToNewRange(mousePos.x, 0, 500, centerX - rangeX / 2, centerX + rangeX / 2);
    const newY = convertToNewRange(mousePos.y, 0, 500, centerY + rangeY / 2, centerY - rangeY / 2);
    const message = 'Mouse Coordinates: (' + newX + ', ' + newY + ')';
    coordsDisplay.textContent = message;
    // console.log(message);  // Optionally log to console
});

canvas.addEventListener('click', function(evt) {
    clearCanvas()
    zoom++
    showZoom.textContent = zoom
    const mousePos = getMousePos(canvas, evt);
    const newX = convertToNewRange(mousePos.x, 0, 500, centerX - rangeX / 2, centerX + rangeX / 2);
    const newY = convertToNewRange(mousePos.y, 0, 500, centerY + rangeY / 2, centerY - rangeY / 2);
    const message = 'Mouse Coordinates: (' + newX + ', ' + newY + ')';
    coordsDisplay.textContent = message;
    console.log(message);  // Optionally log to console

    // Update center and ranges for zoom
    centerX = newX;
    centerY = newY;
    rangeX /= 2; // Halve the range for x after each zoom
    rangeY /= 2; // Halve the range for y after each zoom

    if (evt.button === 0) {
        console.log('Left mouse button clicked');
        console.log('Zoom level updated');
    }
    else if (evt.button === 2) {
        console.log('Right mouse button clicked');
        console.log('Zoom level updated');
    }
    loopOverCanvas()
});

// Event listener for right click to zoom out
canvas.addEventListener('contextmenu', function(evt) {
    evt.preventDefault(); // Prevent the context menu from appearing
    zoom--
    showZoom.textContent = zoom
    if (evt.button === 2) { // Right button
        console.log('hele')
    }
    
    zoomOut(evt);
});


// Function to loop over each xy value
function loopOverCanvas() {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const newX = convertToNewRange(x, 0, canvas.width, centerX - rangeX / 2, centerX + rangeX / 2);
            const newY = convertToNewRange(y, 0, canvas.height, centerY + rangeY / 2, centerY - rangeY / 2);
            const canvasX = convertToOldRange(newX, centerX - rangeX / 2, centerX + rangeX / 2, 0, canvas.width);
            const canvasY = convertToOldRange(newY, centerY + rangeY / 2, centerY - rangeY / 2, 0, canvas.height);
            // Perform any operation with newX and newY
            // console.log(`Converted Coordinates: (${newX}, ${newY})`);
                drawDot(canvasX, canvasY, 1.25, divTest(newX, newY));
            
        }
    }
}

// let coloursToDraw = [(66, 30, 15), (25, 7, 26), (9, 1, 47), (4, 4, 73), (0, 7, 100), (12, 44, 138), (24, 82, 177), (57, 125, 209), (134, 181, 229), (211, 236, 248), (241, 233, 191), (248, 201, 95), (255, 170, 0), (204, 128, 0), (153, 87, 0), (106, 52, 3)]
// let coloursToDraw = [[66, 30, 15], [25, 7, 26], [9, 1, 47], [4, 4, 73], [0, 7, 100], [12, 44, 138], [24, 82, 177], [57, 125, 209], [134, 181, 229], [211, 236, 248], [241, 233, 191], [248, 201, 95], [255, 170, 0], [204, 128, 0], [153, 87, 0], [106, 52, 3]]
let coloursToDraw = ['rgb(66, 30, 15)', 'rgb(25, 7, 26)', 'rgb(9, 1, 47)', 'rgb(4, 4, 73)', 'rgb(0, 7, 100)', 'rgb(12, 44, 138)', 'rgb(24, 82, 177)', 'rgb(57, 125, 209)', 'rgb(134, 181, 229)', 'rgb(211, 236, 248)', 'rgb(241, 233, 191)', 'rgb(248, 201, 95)', 'rgb(255, 170, 0)', 'rgb(204, 128, 0)', 'rgb(153, 87, 0)', 'rgb(106, 52, 3)']
console.log(coloursToDraw[0])

// Test of divergence
function divTest(real, imaginary) {
    // let coloursToDraw = [[66, 30, 15], [25, 7, 26], [9, 1, 47], [4, 4, 73], [0, 7, 100], [12, 44, 138], [24, 82, 177], [57, 125, 209], [134, 181, 229], [211, 236, 248], [241, 233, 191], [248, 201, 95], [255, 170, 0], [204, 128, 0], [153, 87, 0], [106, 52, 3]]
    let coloursToDraw = ['rgb(66, 30, 15)', 'rgb(25, 7, 26)', 'rgb(9, 1, 47)', 'rgb(4, 4, 73)', 'rgb(0, 7, 100)', 'rgb(12, 44, 138)', 'rgb(24, 82, 177)', 'rgb(57, 125, 209)', 'rgb(134, 181, 229)', 'rgb(211, 236, 248)', 'rgb(241, 233, 191)', 'rgb(248, 201, 95)', 'rgb(255, 170, 0)', 'rgb(204, 128, 0)', 'rgb(153, 87, 0)', 'rgb(106, 52, 3)']

    if ((real**2 + imaginary**2) > 4) {
        return 0
    }
    let z = new Complex(real, imaginary)
    let z_it = new Complex(0, 0)
    for (var i = 0; i < 1000; i++) {
        z_it = z_it.multiply(z_it)
        z_it = z_it.add(z)
        if (z_it.re**2 + z_it.im**2 > 4) {
            return coloursToDraw[i % 16]
        } 
    }
    return 'rgb(0, 0, 0)'
}

// Define a Complex class
class Complex {
    constructor(re, im) {
    this.re = re
    this.im = im
    }

    add(other) {
    return new Complex(this.re + other.re, this.im + other.im);
    }

    multiply(other) {
    return new Complex(
        this.re * other.re - this.im * other.im,
        this.re * other.im + this.im * other.re
    );
    }

    toString() {
    return `${this.re} + ${this.im}i`;
    }
}

// Drawing points in canvas
function drawDot(x, y, r, color) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
}

// Clear canvas
function clearCanvas() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to zoom out
function zoomOut(evt) {
    const mousePos = getMousePos(canvas, evt);
    const newX = convertToNewRange(mousePos.x, 0, 500, centerX - rangeX / 2, centerX + rangeX / 2);
    const newY = convertToNewRange(mousePos.y, 0, 500, centerY + rangeY / 2, centerY - rangeY / 2);
    const message = 'Mouse Coordinates: (' + newX + ', ' + newY + ')';
    coordsDisplay.textContent = message;
    console.log(message);  // Optionally log to console

    // Update center and ranges for zoom
    centerX = newX;
    centerY = newY;
    rangeX *= 2; // Double the range for x after each zoom out
    rangeY *= 2; // Double the range for y after each zoom out

    loopOverCanvas();
}
loopOverCanvas()
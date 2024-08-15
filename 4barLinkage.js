function setup() {
    createCanvas(400, 400).parent('canvasContainer');
}

function draw() {
    background(255);
    // Assuming linkage solution is done in solveLinkage()
    if (linkagePoints) {
        strokeWeight(2);
        line(linkagePoints.A.x, linkagePoints.A.y, linkagePoints.B.x, linkagePoints.B.y);
        line(linkagePoints.B.x, linkagePoints.B.y, linkagePoints.C.x, linkagePoints.C.y);
        line(linkagePoints.C.x, linkagePoints.C.y, linkagePoints.D.x, linkagePoints.D.y);
        line(linkagePoints.D.x, linkagePoints.D.y, linkagePoints.A.x, linkagePoints.A.y);
    }
}

let linkagePoints = null;

function solveLinkage() {
    let length1 = parseFloat(document.getElementById('length1').value);
    let length2 = parseFloat(document.getElementById('length2').value);
    let length3 = parseFloat(document.getElementById('length3').value);
    let length4 = parseFloat(document.getElementById('length4').value);
    let inputAngle = parseFloat(document.getElementById('angle').value) * (Math.PI / 180);

    // Example calculation
    let A = createVector(200, 200);
    let B = createVector(A.x + length1 * cos(inputAngle), A.y + length1 * sin(inputAngle));
    let C = createVector(B.x + length2, B.y);
    let D = createVector(A.x + length4, A.y);

    linkagePoints = { A, B, C, D };

    draw();  // Update the display
}

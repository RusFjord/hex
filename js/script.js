
const size = 30;
const hexParameters = getHexParameters();
const hexOrigin = Point(300, 300);
drawGrid();

function drawGrid() {
    let canvas = document.getElementById('canvasHex');
    canvas.width = 800;
    canvas.height = 600;
    //console.log(hexParameters);
    let cLeftSide = Math.round(hexOrigin.x/hexParameters.hexWidth)*4;
    let cRightSide = Math.round(canvas.width - hexOrigin.x / hexParameters.hexWidth )*2;
    let rTopSide = Math.round(hexOrigin.y / (hexParameters.hexHeight / 2));
    let rBottomSide = Math.round((canvas.height - hexOrigin.y) / (hexParameters.hexHeight / 2));

    for (let r = -rTopSide; r <= rBottomSide; r++) {
        for (let c = -cLeftSide; c <= cRightSide; c++) {
            let hex = this.Hex(r, c);
            let center = this.hexToPixel(hex, 500);
            if ((center.x > hexParameters.hexWidth / 2 && center.x < canvas.width - hexParameters.hexWidth / 2)
            && (center.y > hexParameters.hexHeight / 2 && center.y < canvas.height - hexParameters.hexHeight / 2)) {
                this.drawHex(canvas, center);
                drawHexCoordinates(canvas, center, hex);
            }
        }
    }
}

function drawHexCoordinates(canvas, center, hex) {
    const ctx = canvas.getContext('2d');
    ctx.fillText(hex.c, center.x - 15, center.y);
    ctx.fillText(hex.r, center.x + 12, center.y);
}

function drawHex(canvas, center) {
    for (let i = 0; i < 6; i++) {
        let start = this.getHexCoordinate(center, i);
        let end = this.getHexCoordinate(center, i+1);
        drawLine(canvas, start, end);
    }
}

function getHexCoordinate(center, i) {
    let angle_deg = 60 * i - 30;
    let angle_rad = Math.PI / 180 * angle_deg;
    let x = center.x + size * Math.cos(angle_rad);
    let y = center.y + size * Math.sin(angle_rad);
    return this.Point(x, y);
}

function Point(x, y) {
    return {x: x, y: y};
}

function Hex(r, c) {
    return {r: r, c: c};
}

function getHexParameters() {
    let hexHeight = size * 2;
    let hexWidth = Math.sqrt(3) / 2 * hexHeight;
    let vertDist = hexHeight * 3 / 4;
    let horizDist = hexWidth;
    return {hexWidth, hexHeight, vertDist, horizDist};
}

function drawLine(canvas, start, end) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
}


function hexToPixel(hex, offset) {
    let x = offset + (size * (Math.sqrt(3) * hex.c + Math.sqrt(3) / 2 * hex.r));
    let y = offset + (size * 3. / 2 * hex.r);
    return Point(x, y);
}

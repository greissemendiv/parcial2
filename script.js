const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function plotPixel(ctx, x, y, color = "#0FF") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

function bresenhamLine(x0, y0, x1, y1, color="#0FF") {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    let err = dx - dy;

    while (true) {
        plotPixel(ctx, x0, y0, color);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function midpointCircle(cx, cy, r, color="#0FF") {
    let x = 0;
    let y = r;
    let p = 1 - r;

    while (x < y) {
        drawCirclePoints(cx, cy, x, y, color);

        x++;

        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
    }
}

function drawCirclePoints(cx, cy, x, y, color) {
    plotPixel(ctx, cx + x, cy + y, color);
    plotPixel(ctx, cx - x, cy + y, color);
    plotPixel(ctx, cx + x, cy - y, color);
    plotPixel(ctx, cx - x, cy - y, color);

    plotPixel(ctx, cx + y, cy + x, color);
    plotPixel(ctx, cx - y, cy + x, color);
    plotPixel(ctx, cx + y, cy - x, color);
    plotPixel(ctx, cx - y, cy - x, color);
}
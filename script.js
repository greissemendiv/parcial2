/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Greisse Yuliana Mendivelso Peña
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Única función autorizada para dibujar
function plotPixel(ctx, x, y, color = "#0FF") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Algoritmo de Bresenham para líneas
 */
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

/**
 * Algoritmo de Punto Medio para circunferencias
 */
function midpointCircle(cx, cy, r, color="#0FF") {
    let x = 0;
    let y = r;
    let p = 1 - r;

    while (x <= y) {
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

/**
 * Posiciones orbitales
 *
 * Retorna los centros donde se ubicarán los polígonos
 * @param {number} cx - Centro X
 * @param {number} cy - Centro Y
 * @param {number} r - Radio de la órbita
 * @param {number} n - Cantidad de polígonos
 * @returns {Array} [{x, y}, ...]
 */
function getOrbitalPositions(cx, cy, r, n) {
    let points = [];

    for (let i = 0; i < n; i++) {
        let angle = (2 * Math.PI * i) / n;

        let x = cx + r * Math.cos(angle);
        let y = cy + r * Math.sin(angle);

        points.push({ x, y });
    }

    return points;
}

/**
 * Generación de polígonos
 *
 * Retorna los vértices de un polígono regular
 * @param {number} cx
 * @param {number} cy
 * @param {number} radius
 * @param {number} sides
 * @returns {Array} [{x, y}, ...]
 */
function getPolygonVertices(cx, cy, radius, sides) {
    let vertices = [];

    for (let i = 0; i < sides; i++) {
        let angle = (2 * Math.PI * i) / sides;

        let x = cx + radius * Math.cos(angle);
        let y = cy + radius * Math.sin(angle);

        vertices.push({ x, y });
    }

    return vertices;
}

//Función dibujar polígono sin borde de línea (v. anterior)
/*/
function drawPolygon(vertices, color="#F00") {
    for (let i = 0; i < vertices.length; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % vertices.length];

        bresenhamLine(
            Math.round(v1.x),
            Math.round(v1.y),
            Math.round(v2.x),
            Math.round(v2.y),
            color
        );
    }
}
/*/

/**
 * Dibuja un polígono usando Bresenham
 */
function drawPolygon(vertices, color = "#F00", borderColor = "#F00", lineWidth = 2) {
    for (let i = 0; i < vertices.length; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % vertices.length];

        drawThickLine(
            Math.round(v1.x),
            Math.round(v1.y),
            Math.round(v2.x),
            Math.round(v2.y),
            borderColor,
            lineWidth
        );
    }
}
/**
 * Función linea gruesa
 */
function drawThickLine(x1, y1, x2, y2, color, thickness) {
    for (let i = -Math.floor(thickness / 2); i <= Math.floor(thickness / 2); i++) {
        // Desplazamiento en perpendicular (aproximado)
        bresenhamLine(x1 + i, y1, x2 + i, y2, color);
        bresenhamLine(x1, y1 + i, x2, y2 + i, color);
    }
}

/**
 * Función principal
 */
function main() {
    let cx = 300;
    let cy = 300;

    let R = Math.floor(Math.random() * 100) + 150;
    let N = Math.floor(Math.random() * 7) + 4;   // 4 a 10
    let K = Math.floor(Math.random() * 5) + 3;   // lados

    midpointCircle(cx, cy, R, "#000000");

    let centers = getOrbitalPositions(cx, cy, R, N);

    centers.forEach(p => {
        let vertices = getPolygonVertices(p.x, p.y, 20, K);
        drawPolygon(vertices);
    });
}

main();
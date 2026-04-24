/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * * Estudiante: Miguel Angel Garnica Triviño
 * * Tarea: Implementar los algoritmos de rasterización manual.
 */

let canvas;
let ctx;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    inicio();
}

// Función de apoyo para dibujar un píxel individual
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Implementación del algoritmo de Bresenham para líneas.
 * @param {number} x0, y0 - Coordenadas iniciales
 * @param {number} x1, y1 - Coordenadas finales
 * @returns {void}
 */
function bresenhamLine(x0, y0, x1, y1, color = "#000000") {
    // Desarrollo del estudiante
    let dx = Math.abs(x1 - x0)
    let dy = Math.abs(y1 - y0)
    let sx = (x0 < x1) ? 1 : -1
    let sy = (y0 < y1) ? 1 : -1
    let err = dx - dy
    // Dibujar el punto actual
    drawPixel(ctx, x0, y0, color)

     while (true) {

            // Condición de finalización
            if (x0 === x1 && y0 === y1) break;

            let e2 = 2 * err

            // Ajuste en el eje X
            if (e2 > -dy) {
                err -= dy
                x0 += sx
            }

            // Ajuste en el eje Y
            if (e2 < dx) {
                err += dx
                y0 += sy
            }
            drawPixel(ctx, x0, y0, color)
        }
    }


/**
 * Calcula los vértices de un polígono regular.
 * @param {number} centerX - Centro en x
 * @param {number} centerY - Centro en y
 * @param {number} sides - Número de lados
 * @param {number} radius - Radio
 * @returns {Array} Arreglo de objetos {x, y}
 */
function getPolygonVertices(centerX, centerY, sides, radius) {
    // Desarrollo del estudiante (Uso de Math.sin/Math.cos y retorno de datos)
    let vertices = []
    for (let i = 0; i < sides; i++) {
        let angle = (2 * Math.PI * i) / sides - Math.PI / 2 // Comienza en (0,-r)
        vertices.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        })
    }
    return vertices

}

function inicio() {
    const centerX = 250
    const centerY = 250
    const sides = Math.floor(Math.random() * 6) + 5
    const radius = 150
    const circleRadius = radius / 4
    console.log(sides)
    const vertices = getPolygonVertices(centerX, centerY, sides, radius);
    vertices.forEach(vertex => {  
        midpointCircle(vertex.x, vertex.y, circleRadius);
    })
    
    // Dibuja lineas del polígono (negro)
    for (let i = 0; i < sides; i++) {
        const j = (i + 1) % sides
        bresenhamLine(vertices[i].x, vertices[i].y, vertices[j].x, vertices[j].y);
    }
}

function midpointCircle(cx, cy, r, color = "#FF0000") {
    let x = 0;
    let y = r;
    let p = 5/4 - r; // p0: f(0.5, r-0.5) ≈ 5/4 - r para x^2 + y^2 = r^2

    function plotSym(x, y) {
        drawPixel(ctx, cx + x, cy + y, color);
        drawPixel(ctx, cx - x, cy + y, color);
        drawPixel(ctx, cx + x, cy - y, color);
        drawPixel(ctx, cx - x, cy - y, color);
        drawPixel(ctx, cx + y, cy + x, color);
        drawPixel(ctx, cx - y, cy + x, color);
        drawPixel(ctx, cx + y, cy - x, color);
        drawPixel(ctx, cx - y, cy - x, color);
    }
    plotSym(x, y);

    while (x < y) {
        x++;
        if (p < 0) {
            p += 2 * x + 1; // Caso E: punto medio dentro del círculo
        } else {
            y--;
            p += 2 * (x - y) + 1; // Caso SE: punto medio fuera
        }
        plotSym(x, y);
    }
}
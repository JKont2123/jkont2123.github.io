// Add your SVG drawing logic here
const svg = document.getElementById('vis');

const circleCount = 1000;

function createCircle(cx, cy, r) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    
    // Set attributes
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    
    // Append line to SVG
    return circle
}

// Function to generate random coordinates within the SVG canvas
function getRandomPosition(width, height, padding = 10) {
    const x = Math.random() * (width - padding) + padding;
    const y = Math.random() * (height - padding) + padding;
    return { x, y };
}

for (let i = 0; i < circleCount; i++){
    const {x: cx, y: cy } = getRandomPosition(svg.clientWidth, svg.clientHeight);
    const r = Math.random() * (12- 1) + 1;

    let circle = createCircle(cx, cy, r);
    svg.appendChild(circle);
}


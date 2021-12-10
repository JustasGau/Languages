const P = [
    151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
];

function noise(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const u = fade(x);
    const v = fade(y);
    const w = fade(z);

    const A = P[X] + Y;
    const AA = P[A] + Z;
    const AB = P[A + 1] + Z;
    const B = P[X + 1] + Y;
    const BA = P[B] + Z;
    const BB = P[B + 1] + Z;

    return lerp(w, lerp(v, lerp(u,   grad(P[AA  ], x  , y  , z   ), 
                                     grad(P[BA  ], x-1, y  , z   )), 
                             lerp(u, grad(P[AB  ], x  , y-1, z   ),  
                                     grad(P[BB  ], x-1, y-1, z   ))),
                     lerp(v, lerp(u, grad(P[AA+1], x  , y  , z-1 ), 
                                     grad(P[BA+1], x-1, y  , z-1 )), 
                             lerp(u, grad(P[AB+1], x  , y-1, z-1 ),
                                     grad(P[BB+1], x-1, y-1, z-1 ))));
}

function fade(val) {
    return val * val * val * (val * (val * 6 - 15) + 10);
}

function lerp(t, a, b) {
    return a + t * (b - a);
}

function grad(hash, x, y, z) {
    const h = hash & 15;
    const u = h < 8 ? x : y
    const v = h < 4 ? y : (h == 12 || h == 14) ? x : z
    return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v)
}

const valuePerlin = document.getElementById("outputPerlin");

function setPerlinValue(x, y, z) {
    const perlin = noise(x, y, z)
    valuePerlin.innerHTML = perlin
}

const perlinRange = Math.sqrt(3/4); // 3 is dimensions
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rectSize = 1;
const mapWidth = 400;
const mapHeigh = 400;
const freq = 2


function normalise(x) {
    return (x - (-perlinRange)) / (perlinRange - (-perlinRange))
}

function perlinToColor(perlin) {
    return 255 * normalise(perlin)
}

const sliderX = document.getElementById("inputX");
const sliderY = document.getElementById("inputY");
const sliderZ = document.getElementById("inputZ");

const valueX = document.getElementById("outputX");
const valueY = document.getElementById("outputY");
const valueZ = document.getElementById("outputZ");

sliderX.oninput = function() {
    valueX.innerHTML = this.value;
    setPerlinValue(Number(valueX.innerText), Number(valueY.innerText), Number(valueZ.innerText))
}
sliderY.oninput = function() {
    valueY.innerHTML = this.value;
    setPerlinValue(Number(valueX.innerText), Number(valueY.innerText), Number(valueZ.innerText))
}
sliderZ.oninput = function() {
    valueZ.innerHTML = this.value;
    setPerlinValue(Number(valueX.innerText), Number(valueY.innerText), Number(valueZ.innerText))
}

function drawPixel(c, x, y, color) {
    c.beginPath();
    c.fillStyle = `rgb(${color}, ${color}, ${color})`;
    c.fillRect(x, y, rectSize, rectSize);
}

function drawMap() {
    for (let x = 0; x <= mapWidth; x++){
        for (let y = 0; y <= mapHeigh; y++){
            const nx = (x / mapWidth + 0.5) * 10
            const ny = (y / mapHeigh + 0.5) * 10
            const color = perlinToColor(noise(1 * nx, 1 * ny, 7.0) +  0.5 * noise(2 * nx, 2 * ny, 7.0) +  0.25 * noise(4 * nx, 4 * ny, 7.0))
            drawPixel(ctx, x, y, color)
        }
    }
}

drawMap()
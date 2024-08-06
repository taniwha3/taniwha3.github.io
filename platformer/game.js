const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let playlist = [];
let currentTrackIndex = 0;
const audioPlayer = new Audio();

let gameStarted = false;
let onWinScreen = false;
let gradientAnimation = 0;

function enumerateMusicFiles() {
    // This function should be implemented on the server-side
    // For now, we'll use a placeholder array
    return [
        'music/track1.mp3',
        'music/track2.mp3',
        'music/track3.mp3',
        'music/track4.mp3',
        'music/track5.mp3',
        'music/track6.mp3',
        'music/track7.mp3',
        'music/track8.mp3',
        'music/track9.mp3',
        'music/track10.mp3'
    ];
}

function initializePlaylist() {
    playlist = enumerateMusicFiles();
    currentTrackIndex = 0;
    audioPlayer.src = playlist[currentTrackIndex];
    audioPlayer.addEventListener('ended', playNextTrack);
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    audioPlayer.src = playlist[currentTrackIndex];
    audioPlayer.play().catch(error => {
        console.log("Audio play failed:", error);
    });
}

// Synthwave grid
const grid = {
    spacing: 60,
    color: 'rgba(255, 0, 255, 0.3)'
};

// Synthwave mountains
const mountains = {
    color1: '#ff00ff',
    color2: '#00ffff',
    peaks: []
};

// Generate peaks for the entire level width
for (let x = 0; x <= canvas.width * 3; x += 200) {
    mountains.peaks.push({
        x: x,
        y: Math.random() * 200 + 200 // Random height between 200 and 400
    });
}

// Synthwave airplanes
const airplanes = [];
const numAirplanes = 10; // Increased from 3 to 10

// Celestial objects
const stars = [];
const planets = [];
const galaxies = [];
const meteors = [];
const numStars = 200;
const numPlanets = 5;
const numGalaxies = 10; // Increased from 3 to 10
const numMeteors = 15;

class Star {
    constructor() {
        this.x = Math.random() * (canvas.width * 3);
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, ${Math.random() * 20 + 80}%)`;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x - camera.x * 0.1, this.y - camera.y * 0.1, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Planet {
    constructor() {
        this.x = Math.random() * (canvas.width * 3);
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 10;
        this.color = `hsl(${Math.random() * 360}, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 20}%)`;
        this.rings = Math.random() < 0.3;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x - camera.x * 0.2, this.y - camera.y * 0.2, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (this.rings) {
            ctx.strokeStyle = `hsla(${Math.random() * 360}, 100%, 70%, 0.5)`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(this.x - camera.x * 0.2, this.y - camera.y * 0.2, this.size * 1.5, this.size * 0.5, Math.PI / 4, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}

class Galaxy {
    constructor() {
        this.x = Math.random() * (canvas.width * 3);
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
        this.rotation = Math.random() * Math.PI * 2;
        this.isSpiral = Math.random() < 0.5; // 50% chance of being a spiral galaxy
        this.arms = Math.floor(Math.random() * 3) + 2; // 2 to 4 arms
        this.armTightness = Math.random() * 0.05 + 0.1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x - camera.x * 0.15, this.y - camera.y * 0.15);
        ctx.rotate(this.rotation);

        if (this.isSpiral) {
            this.drawSpiralGalaxy();
        } else {
            this.drawEllipticalGalaxy();
        }

        ctx.restore();
    }

    drawEllipticalGalaxy() {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    drawSpiralGalaxy() {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        for (let arm = 0; arm < this.arms; arm++) {
            for (let i = 0; i < 200; i++) {
                const t = i / 30;
                const angle = (arm * 2 * Math.PI / this.arms) + (t * this.armTightness);
                const x = t * Math.cos(angle) * (this.size / 10);
                const y = t * Math.sin(angle) * (this.size / 10);
                const size = Math.max(0.5, (this.size - t) / 20);

                ctx.moveTo(x, y);
                ctx.arc(x, y, size, 0, Math.PI * 2);
            }
        }

        ctx.fill();
    }
}

class Meteor {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * (canvas.width * 3);
        this.y = -50;
        this.speed = Math.random() * 3 + 2;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 60 + 300}, 100%, 70%)`;
    }

    update() {
        this.y += this.speed;
        this.x -= this.speed * 0.5; // Slight diagonal movement

        if (this.y > canvas.height || this.x < -50) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x - camera.x * 0.9, this.y - camera.y * 0.9);
        ctx.rotate(Math.PI / 4); // 45-degree rotation

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 4);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size * 4);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

class Contrail {
    constructor(x, y, color) {
        this.points = [{x, y, createdAt: Date.now()}];
        this.color = color;
        this.maxLength = 100;
        this.lifetime = 3000; // 3 seconds
    }

    addPoint(x, y) {
        this.points.push({x, y, createdAt: Date.now()});
        if (this.points.length > this.maxLength) {
            this.points.shift();
        }
    }

    draw(ctx, cameraX, cameraY) {
        const currentTime = Date.now();
        ctx.lineWidth = 2;
        
        for (let i = 1; i < this.points.length; i++) {
            const startPoint = this.points[i - 1];
            const endPoint = this.points[i];
            
            const tailProgress = 1-(i / this.points.length);
            const startAlpha = Math.max(0, 1 - tailProgress);
            const endAlpha = Math.max(0, (i + 1) / this.points.length);
            
            const gradient = ctx.createLinearGradient(
                startPoint.x - cameraX, startPoint.y - cameraY,
                endPoint.x - cameraX, endPoint.y - cameraY
            );
            gradient.addColorStop(0, `rgba(${this.color.join(',')},${startAlpha})`);
            gradient.addColorStop(1, `rgba(${this.color.join(',')},${endAlpha})`);
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(startPoint.x - cameraX, startPoint.y - cameraY);
            ctx.lineTo(endPoint.x - cameraX, endPoint.y - cameraY);
            ctx.stroke();
        }
    }

    isExpired() {
        if (this.points.length === 0) return true;
        const oldestPoint = this.points[0];
        return Date.now() - oldestPoint.createdAt > this.lifetime;
    }
}

class Airplane {
    constructor() {
        this.x = Math.random() * canvas.width * 3;
        this.y = Math.random() * 200 + 50; // Increased height range
        this.speed = (Math.random() * 3 + 1) * (Math.random() < 0.5 ? 1 : -1); // Randomize direction
        this.size = Math.random() * 30 + 10; // Increased size range
        this.color = Math.random() < 0.5 ? [255, 0, 255] : [0, 255, 255];
        this.contrail = new Contrail(this.x, this.y, this.color);
    }

    update() {
        this.x += this.speed;
        if (this.speed > 0 && this.x > canvas.width * 3) {
            this.x = -this.size;
            this.y = Math.random() * 200 + 50; // Randomize height when resetting
            this.contrail = new Contrail(this.x, this.y, this.color);
        } else if (this.speed < 0 && this.x < -this.size) {
            this.x = canvas.width * 3;
            this.y = Math.random() * 200 + 50; // Randomize height when resetting
            this.contrail = new Contrail(this.x, this.y, this.color);
        }
        this.contrail.addPoint(this.x, this.y);
    }

    draw() {
        this.contrail.draw(ctx, camera.x * 0.7, camera.y * 0.7);
        
        ctx.save();
        ctx.translate(this.x - camera.x * 0.7, this.y - camera.y * 0.7);
        ctx.fillStyle = `rgb(${this.color.join(',')})`;
        
        // Flip the airplane if moving left
        if (this.speed < 0) {
            ctx.scale(-1, 1);
            ctx.translate(-this.size, 0);
        }
        
        // Draw airplane body
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(this.size * 0.8, this.size * 0.3);
        ctx.lineTo(0, this.size * 0.3);
        ctx.closePath();
        ctx.fill();

        // Draw wings
        ctx.beginPath();
        ctx.moveTo(this.size * 0.3, this.size * 0.1);
        ctx.lineTo(this.size * 0.5, -this.size * 0.2);
        ctx.lineTo(this.size * 0.7, this.size * 0.1);
        ctx.closePath();
        ctx.fill();

        // Draw tail
        ctx.beginPath();
        ctx.moveTo(this.size * 0.7, this.size * 0.2);
        ctx.lineTo(this.size * 0.9, -this.size * 0.1);
        ctx.lineTo(this.size, this.size * 0.2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

// Initialize airplanes
for (let i = 0; i < numAirplanes; i++) {
    airplanes.push(new Airplane());
}

// Initialize celestial objects
for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

for (let i = 0; i < numPlanets; i++) {
    planets.push(new Planet());
}

for (let i = 0; i < numGalaxies; i++) {
    galaxies.push(new Galaxy());
}

for (let i = 0; i < numMeteors; i++) {
    meteors.push(new Meteor());
}

// Fireworks system
const fireworks = [];
const fireworkGravity = 0.2;
const playerGravity = 0.5; // Adjust this value to control player's jump height

class Firework {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * (canvas.width * 3); // Span the whole level width
        this.y = canvas.height + Math.random() * 200; // Start below the visible area
        this.sx = Math.random() * 3 - 1.5;
        this.sy = -Math.random() * 4 - 4;
        this.size = 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            this.x += this.sx;
            this.y += this.sy;
            this.sy += fireworkGravity;

            if (this.sy >= -1) {
                this.explode();
            }
        } else {
            this.particles.forEach((p, index) => {
                p.x += p.sx;
                p.y += p.sy;
                p.sy += fireworkGravity * 0.5;
                p.life -= 0.02;
                if (p.life <= 0) {
                    this.particles.splice(index, 1);
                }
            });

            if (this.particles.length === 0) {
                this.reset();
            }
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;
            this.particles.push({
                x: this.x,
                y: this.y,
                sx: Math.cos(angle) * speed,
                sy: Math.sin(angle) * speed,
                size: Math.random() * 2 + 1,
                color: this.color,
                life: 1
            });
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x - camera.x, this.y - camera.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            this.particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.beginPath();
                ctx.arc(p.x - camera.x, p.y - camera.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }
    }
}

// Initialize fireworks
for (let i = 0; i < 15; i++) { // Increase the number of fireworks
    fireworks.push(new Firework());
}

const player = {
    x: 50,
    y: 200,
    width: 20,
    height: 40,
    speed: 7,
    jumpForce: 20,
    maxJumpForce: 20,
    velocityY: 0,
    velocityX: 0,
    isJumping: false,
    jumpHoldTime: 0,
    frame: 0,
    color: '#00ffff',  // Cyan color for the player
    starTrail: []
};

class StarParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
        this.lifetime = 60;
    }

    update() {
        this.lifetime--;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.lifetime / 60;
        ctx.beginPath();
        ctx.arc(this.x - camera.x, this.y - camera.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

import { level1 } from 'levels/level1.js';
import { level2 } from 'levels/level2.js';
import { level3 } from 'levels/level3.js';
import { level4 } from 'levels/level4.js';
import { level5 } from 'levels/level5.js';
import { level6 } from 'levels/level6.js';
import { level7 } from 'levels/level7.js';

const levels = [level1, level2, level3, level4, level5, level6, level7];

let currentLevel = 0;
let totalDiscs = levels[currentLevel].totalDiscs;
let collectedDiscs = 0;
let discs = [...levels[currentLevel].discs];
let ground = levels[currentLevel].ground;
let platforms = [...levels[currentLevel].platforms];

let gradientOffset = 0;

function getPlatformColor(x) {
    const totalWidth = 2400; // Total width of the game world
    const position = (x + gradientOffset) % totalWidth / totalWidth;
    
    const r = Math.sin(position * Math.PI * 2) * 127 + 128;
    const g = Math.sin((position + 1/3) * Math.PI * 2) * 127 + 128;
    const b = Math.sin((position + 2/3) * Math.PI * 2) * 127 + 128;
    
    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
}

// Camera
const camera = {
    x: 0,
    y: 0
};

let spinningDiscParticles = [];

const keys = {
    left: false,
    right: false,
    up: false,
    a: false,
    d: false,
    w: false
};

function drawPlayer() {
    ctx.save();
    ctx.translate(player.x - camera.x, player.y - camera.y);

    // Body
    ctx.fillStyle = player.color;
    ctx.fillRect(0, 0, player.width, player.height - 10);

    // Head
    ctx.fillRect(2, -10, 16, 12);

    // Eyes
    ctx.fillStyle = '#ff00ff';  // Magenta eyes
    ctx.fillRect(5, -7, 2, 2);
    ctx.fillRect(13, -7, 2, 2);

    // Legs
    const legOffset = Math.sin(player.frame * 0.5) * 3;
    ctx.fillRect(2, player.height - 10, 5, 10 + legOffset);
    ctx.fillRect(13, player.height - 10, 5, 10 - legOffset);

    // Arms
    ctx.fillRect(-2, 7, 5, 15);
    ctx.fillRect(player.width - 3, 7, 5, 15);

    ctx.restore();

    player.frame += 0.2;
}

function drawDiscs() {
    discs.forEach(disc => {
        ctx.fillStyle = disc.color;
        ctx.beginPath();
        ctx.arc(disc.x - camera.x, disc.y - camera.y, disc.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#00ffff';  // Cyan grooves
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(disc.x - camera.x, disc.y - camera.y, disc.radius * i / 6, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.fillStyle = '#00ffff';  // Cyan label
        ctx.beginPath();
        ctx.arc(disc.x - camera.x, disc.y - camera.y, disc.radius / 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff00ff';  // Magenta center hole
        ctx.beginPath();
        ctx.arc(disc.x - camera.x, disc.y - camera.y, disc.radius / 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawDiscCount() {
    ctx.fillStyle = '#00ffff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Level: ${currentLevel + 1} / ${levels.length}`, 10, 30);
    ctx.fillText(`Discs: ${collectedDiscs}/${totalDiscs}`, 10, 60);
}

function drawGround() {
    ctx.fillStyle = '#ff00ff';  // Magenta ground
    ctx.fillRect(0 - camera.x, ground - camera.y, canvas.width * 3, 2000); // Increased height to 2000 pixels
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = getPlatformColor(platform.x);
        ctx.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
    });
}

function drawGrid() {
    ctx.strokeStyle = grid.color;
    ctx.lineWidth = 1;

    const startX = Math.floor(camera.x / grid.spacing) * grid.spacing - camera.x;
    const startY = Math.floor(camera.y / grid.spacing) * grid.spacing - camera.y;

    // Vertical lines
    for (let x = startX; x < startX + canvas.width + grid.spacing; x += grid.spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Horizontal lines
    for (let y = startY; y < startY + canvas.height + grid.spacing; y += grid.spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawMountains() {
    ctx.save();
    ctx.translate(-camera.x * 0.5, -camera.y * 0.5); // Parallax effect

    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    gradient.addColorStop(0, mountains.color1);
    gradient.addColorStop(1, mountains.color2);
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(0, canvas.height + 300); // Start 300 pixels below the canvas
    mountains.peaks.forEach(peak => {
        ctx.lineTo(peak.x, peak.y);
    });
    ctx.lineTo(canvas.width * 3, canvas.height + 300); // End 300 pixels below the canvas
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function update(deltaTime) {
    // Handle horizontal movement
    player.velocityX = 0;
    if (keys.left || keys.a) {
        player.velocityX = -player.speed;
        player.frame += 0.2 * deltaTime * 60;
    }
    if (keys.right || keys.d) {
        player.velocityX = player.speed;
        player.frame += 0.2 * deltaTime * 60;
    }

    // Update airplanes and remove expired contrails
    airplanes.forEach(airplane => {
        airplane.update();
        if (airplane.contrail.isExpired()) {
            airplane.contrail = new Contrail(airplane.x, airplane.y, airplane.color);
        }
    });

    // Update meteors
    meteors.forEach(meteor => meteor.update());

    // Store the previous x position
    const previousX = player.x;

    // Apply horizontal movement
    player.x += player.velocityX * deltaTime * 60;

    // Handle jumping
    if (keys.up && !player.isJumping) {
        player.velocityY = -player.jumpForce;
        player.isJumping = true;
    }

    // Continue applying jump force while the button is held
    if (keys.up && player.isJumping) {
        player.jumpHoldTime += deltaTime;
        if (player.jumpHoldTime < 0.3) { // Maximum jump hold time of 0.3 seconds
            player.velocityY = -player.maxJumpForce * (1 - player.jumpHoldTime / 0.3);
        }
    }

    // Apply gravity
    player.velocityY += playerGravity * deltaTime * 60;
    player.y += player.velocityY * deltaTime * 60;

    // Reset jump hold time when landing
    if (!player.isJumping) {
        player.jumpHoldTime = 0;
    }

    // Add star particles to the player's trail
    if (player.velocityX !== 0 || player.velocityY !== 0) {
        player.starTrail.push(new StarParticle(
            player.x + player.width / 2,
            player.y + player.height / 2
        ));
    }

    // Update and remove expired star particles
    player.starTrail = player.starTrail.filter(star => {
        star.update();
        return star.lifetime > 0;
    });

    // Platform collision
    let onPlatform = false;
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            
            // Vertical collision from above
            if (player.velocityY > 0 && player.y + player.height - player.velocityY * deltaTime * 60 <= platform.y) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isJumping = false;
                onPlatform = true;
            }
            // Vertical collision from below
            else if (player.velocityY < 0 && player.y - player.velocityY * deltaTime * 60 >= platform.y + platform.height) {
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            }
            // Horizontal collision
            else {
                // Collision from left
                if (previousX + player.width <= platform.x) {
                    player.x = platform.x - player.width;
                }
                // Collision from right
                else if (previousX >= platform.x + platform.width) {
                    player.x = platform.x + platform.width;
                }
            }
        }
    });

    // Ground collision
    if (player.y + player.height > ground) {
        player.y = ground - player.height;
        player.velocityY = 0;
        player.isJumping = false;
    }

    // Spinning disc particles
    class SpinningDiscParticle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.radius = 5;
            this.color = color;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 2;
            this.rotationRadius = 30;
            this.rotationSpeed = 0.1;
            this.lifetime = 60;
        }

        update() {
            this.angle += this.rotationSpeed;
            this.lifetime--;
        }

        draw(ctx) {
            const drawX = this.x + Math.cos(this.angle) * this.rotationRadius - camera.x;
            const drawY = this.y + Math.sin(this.angle) * this.rotationRadius - camera.y;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(drawX, drawY, this.radius, 0, Math.PI * 2);
            ctx.fill();

            // Add cyan grooves
            ctx.strokeStyle = '#00ffff';
            ctx.beginPath();
            ctx.arc(drawX, drawY, this.radius * 0.6, 0, Math.PI * 2);
            ctx.stroke();

            // Add magenta center
            ctx.fillStyle = '#ff00ff';
            ctx.beginPath();
            ctx.arc(drawX, drawY, this.radius * 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Check for disc collection
    for (let i = discs.length - 1; i >= 0; i--) {
        const disc = discs[i];
        if (
            player.x < disc.x + disc.radius &&
            player.x + player.width > disc.x - disc.radius &&
            player.y - 10 < disc.y + disc.radius && // Account for player's head
            player.y + player.height > disc.y - disc.radius
        ) {
            discs.splice(i, 1); // Remove the collected disc
            collectedDiscs++; // Increment the collected discs counter

            // Create spinning disc particles
            for (let j = 0; j < 5; j++) {
                spinningDiscParticles.push(new SpinningDiscParticle(player.x + player.width / 2, player.y + player.height / 2, disc.color));
            }
        }
    }

    // Update and remove spinning disc particles
    spinningDiscParticles = spinningDiscParticles.filter(particle => {
        particle.update();
        return particle.lifetime > 0;
    });

    // Check if all discs are collected
    if (collectedDiscs === totalDiscs) {
        winGame();
    }

    // Keep player within world bounds
    player.x = Math.max(0, Math.min(player.x, canvas.width * 3 - player.width));

    // Update camera position
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;

    // Keep camera within world bounds
    camera.x = Math.max(0, Math.min(camera.x, 2400 - canvas.width));
    camera.y = Math.max(0, Math.min(camera.y, 1200 - canvas.height));
}

function resetGame() {
    currentLevel = getLevelFromURL();
    if (currentLevel < 0 || currentLevel >= levels.length) {
        currentLevel = 0; // Default to first level if invalid
    }
    resetLevel();
    
    // Reset key states
    keys.left = false;
    keys.right = false;
    keys.up = false;
}

function winGame() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        resetLevel();
    } else {
        resetGame();
        drawStartScreen(true);
    }
}

function resetLevel() {
    player.x = 50;
    player.y = 200;
    player.velocityY = 0;
    player.velocityX = 0;
    player.isJumping = false;

    totalDiscs = levels[currentLevel].totalDiscs;
    collectedDiscs = 0;
    discs = [...levels[currentLevel].discs];
    ground = levels[currentLevel].ground;
    platforms = [...levels[currentLevel].platforms];

    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
}

function getLevelFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const levelParam = urlParams.get('level');
    return levelParam ? parseInt(levelParam) - 1 : 0; // Subtract 1 because levels are 0-indexed
}

function playMusic() {
    audioPlayer.play().catch(error => {
        console.log("Audio play failed:", error);
    });
}

function pauseMusic() {
    audioPlayer.pause();
}

function toggleMusic() {
    if (audioPlayer.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

let lastTime = 0;
const FPS = 60;
const frameTime = 1000 / FPS;

function gameLoop(timestamp) {
    if (gameStarted) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;

        if (deltaTime >= frameTime) {
            ctx.fillStyle = '#2b213a';  // Dark purple background
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            drawGrid();
            
            // Draw celestial objects
            stars.forEach(star => star.draw());
            galaxies.forEach(galaxy => galaxy.draw());
            planets.forEach(planet => planet.draw());
            meteors.forEach(meteor => meteor.draw());

            drawMountains(); // Draw mountains after celestial objects

            // Draw airplanes
            airplanes.forEach(airplane => airplane.draw());
            
            update(deltaTime / 1000);  // Pass deltaTime in seconds
            
            // Update and draw fireworks
            fireworks.forEach(fw => {
                fw.update();
                fw.draw();
            });
            
            drawGround();
            drawPlatforms();
            
            // Draw star trail
            player.starTrail.forEach(star => star.draw(ctx));
            
            drawPlayer();
            drawDiscs();
            drawDiscCount();  // Add this line to draw the disc count

            // Draw spinning disc particles
            spinningDiscParticles.forEach(particle => particle.draw(ctx));

            // Update gradient offset (faster animation)
            gradientOffset -= 4; // Increased from 0.5 to 4
            if (gradientOffset < -2400) gradientOffset += 2400;

            lastTime = timestamp - (deltaTime % frameTime);
        }
        
        requestAnimationFrame(gameLoop);
    } else {
        drawStartScreen(onWinScreen);
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
            keys.left = true;
            break;
        case 'arrowright':
        case 'd':
            keys.right = true;
            break;
        case 'arrowup':
        case 'w':
        case ' ':
            if (!keys.up) {
                keys.up = true;
                player.jumpHoldTime = 0;
            }
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
            keys.left = false;
            break;
        case 'arrowright':
        case 'd':
            keys.right = false;
            break;
        case 'arrowup':
        case 'w':
        case ' ':
            keys.up = false;
            player.jumpHoldTime = 0;
            break;
    }
});

// Add event listener for 'm' key to toggle music
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm') {
        toggleMusic();
    }
});

// Reset the game to initialize player and camera position
resetGame();

function drawStartScreen(hasWon = false) {
    ctx.fillStyle = '#2b213a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!gameStarted) {
        ctx.fillStyle = '#ff00ff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Synthwave Platformer', canvas.width / 2, canvas.height / 2 - 50);

        ctx.fillStyle = '#00ffff';
        ctx.font = '24px Arial';
        ctx.fillText(`${levels.length} Levels`, canvas.width / 2, canvas.height / 2 + 50);
        ctx.fillText('Click to Play', canvas.width / 2, canvas.height / 2 + 80);

        if (hasWon) {
            // Animate gradient (slower)
            gradientAnimation += 0.005;
            if (gradientAnimation > 1) gradientAnimation -= 1;

            // Create animated gradient with synthwave colors
            let gradient = ctx.createLinearGradient(0, canvas.height / 2 - 30, 0, canvas.height / 2 + 30);
            gradient.addColorStop(0, `rgb(${Math.sin(gradientAnimation * Math.PI * 2) * 127 + 128}, 0, 255)`);
            gradient.addColorStop(0.5, `rgb(255, 0, ${Math.sin((gradientAnimation + 0.33) * Math.PI * 2) * 127 + 128})`);
            gradient.addColorStop(1, `rgb(0, ${Math.sin((gradientAnimation + 0.66) * Math.PI * 2) * 127 + 128}, 255)`);

            ctx.fillStyle = gradient;
            ctx.font = '72px Arial';
            ctx.fillText('You Won!', canvas.width / 2, canvas.height / 2 + 20);

            // Add glow effect
            ctx.shadowColor = `rgb(${Math.sin(gradientAnimation * Math.PI * 2) * 127 + 128}, 0, 255)`;
            ctx.shadowBlur = 20;
            ctx.fillText('You Won!', canvas.width / 2, canvas.height / 2 + 20);
            ctx.shadowBlur = 0;

            // Request next animation frame only if the game hasn't started
            if (!gameStarted) {
                requestAnimationFrame(() => drawStartScreen(true));
            }
        }
    }

    onWinScreen = hasWon && !gameStarted;
}

function startGame() {
    gameStarted = true;
    onWinScreen = false;
    currentLevel = getLevelFromURL();
    if (currentLevel < 0 || currentLevel >= levels.length) {
        currentLevel = 0; // Default to first level if invalid
    }
    resetGame();
    initializePlaylist();
    playMusic();
    lastTime = 0; // Reset lastTime
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
    if (!gameStarted) {
        startGame();
    }
});

// Initial draw of start screen
drawStartScreen(false);

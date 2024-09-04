const player = document.getElementById('player');
const gun = document.getElementById('gun');
const bulletContainer = document.getElementById('bullet-container');
const playerSize = 50;
const bulletSize = 10;
const gunSize = 20;
const playerSpeed = 5;
const bulletSpeed = 5;
let bullets = [];
let playerX = window.innerWidth / 2;
let playerY = window.innerHeight / 2;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
        shootBullet();
    } else {
        handleMovement(e.key);
    }
});

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function handleMovement(key) {
    switch(key) {
        case 'w':
        case 'W':
            movePlayer(0, -playerSpeed);
            break;
        case 'a':
        case 'A':
            movePlayer(-playerSpeed, 0);
            break;
        case 's':
        case 'S':
            movePlayer(0, playerSpeed);
            break;
        case 'd':
        case 'D':
            movePlayer(playerSpeed, 0);
            break;
    }
}

function shootBullet() {
    const gunRect = gun.getBoundingClientRect();
    const gunX = gunRect.left + gunSize / 2;
    const gunY = gunRect.top + gunSize / 2;
    const angle = Math.atan2(mouseY - gunY, mouseX - gunX);
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${gunX - bulletSize / 2}px`;
    bullet.style.top = `${gunY - bulletSize / 2}px`;
    bulletContainer.appendChild(bullet);

    bullets.push({
        element: bullet,
        angle: angle,
        x: gunX,
        y: gunY
    });
}

function movePlayer(dx, dy) {
    playerX = Math.max(Math.min(playerX + dx, window.innerWidth - playerSize), 0);
    playerY = Math.max(Math.min(playerY + dy, window.innerHeight - playerSize), 0);
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
    updateGunPosition();
}

function updateGunPosition() {
    const angle = Math.atan2(mouseY - (playerY + playerSize / 2), mouseX - (playerX + playerSize / 2));
    gun.style.transform = `rotate(${angle}rad)`;
    gun.style.left = `${playerSize / 2 - gunSize / 2}px`;
    gun.style.top = `${-gunSize / 2}px`;
}

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.x += Math.cos(bullet.angle) * bulletSpeed;
        bullet.y += Math.sin(bullet.angle) * bulletSpeed;

        bullet.element.style.left = `${bullet.x - bulletSize / 2}px`;
        bullet.element.style.top = `${bullet.y - bulletSize / 2}px`;

        if (bullet.x < 0 || bullet.x > window.innerWidth || bullet.y < 0 || bullet.y > window.innerHeight) {
            bulletContainer.removeChild(bullet.element);
            bullets.splice(index, 1);
        }
    });
}

function gameLoop() {
    updateBullets();
    requestAnimationFrame(gameLoop);
}

gameLoop();

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.querySelector('.score');
const gameover = document.querySelector('.game-over');
const rec = document.querySelector('.rec');

let isGameOver = false;
let isJumping = false;

const jump = () => {
    if (isGameOver || isJumping) return;

    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        score.textContent = +score.textContent + 1;
        isJumping = false;
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        isGameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        gameover.style.opacity = 1;

        rec.classList.add('visible');
        rec.addEventListener("click", () => location.reload());

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && isGameOver) {
        location.reload();
    } else {
        jump();
    }
});

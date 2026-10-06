// screen/game settings
const canvas = document.getElementById("c");
const ctx = canvas.getContext('2d');
const console = document.getElementById('console');
canvas.width = 480;
canvas.height = 360;
const startbtn = document.getElementById('start');
let offswitch = 0;
const scoretext = document.getElementById('scorenum');
let score = 0;

// collision
function collision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );j
}

// player settings
const cat_img = new Image();
cat_img.src = 'assets/cat.png';
let catx = 80;
let caty = 100;
const speed = 2;

// bg settings
const bg_img = new Image();
bg_img.src = 'assets/bg.png';
const cloud_img = new Image();
cloud_img.src = 'assets/cloud.png';
const ground_img = new Image();
ground_img.src = 'assets/ground.png';

// buildings settings
function randomy() {
    return ((Math.random() * 190) - 200);
    //return -10;
    //return -180;
}
const bt_img = new Image();
bt_img.src = 'assets/buildingtop.png';
const bb_img = new Image();
bb_img.src = 'assets/buildingbottom.png';
const bspeed = 2;
let bx = 480;
let bty = randomy();

// keys = key.get_pressed() but javascript
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// killswitch
function end() {
    offswitch = 1;
};

function gameLoop() {
    // rect
    let catr = {
        x: catx,      
        y: caty,      
        width: 70,  
        height: 50
    };
    let btr = {
        x: bx,      
        y: bty,      
        width: 80,  
        height: 250
    };
    let bbr = {
        x: bx,      
        y: (bty + 350),      
        width: 80,  
        height: 250
    };

    
    // drawing
    ctx.drawImage(bg_img, 0, 0, 480, 360)
    ctx.drawImage(cat_img, catx, caty, 70, 50);
    ctx.drawImage(bt_img, bx, bty, 80, 250);
    ctx.drawImage(bb_img, bx, (bty + 350), 80, 250);
    ctx.drawImage(cloud_img, 0, 0, 480, 60);
    ctx.drawImage(ground_img, 0, 330, 480, 60);

    //game movement
    bx -= bspeed;
    if (bx < -200) bty = randomy();
    if (bx < -200) score += 1; scoretext.textContent = score;
    if (bx < -200) bx = 480;
    if (caty < 310) caty += 2.5;
    if ((keys['Space']) && (caty > 0)) caty -= 5;
    if (caty <= 30) end();
    if (caty >= 300) end();
    if (collision(btr, catr)) end();
    if (collision(bbr, catr)) end();
    if (offswitch != 1) {
    requestAnimationFrame(gameLoop);
    };
};

let btnclicked = 0;
startbtn.addEventListener('click', () => {
    if (btnclicked == 0) {
        gameLoop();
        btnclicked += 1;
    } else if (btnclicked == 1) {
        console.log('a');
    }
});

//  199 bars of code, W :)
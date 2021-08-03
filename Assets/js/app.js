//player chooses state of the dog
let playerState = 'idle';

//calling the dropdown menu
const dropdown = document.getElementById("animations");

dropdown.addEventListener("change", function(event){
    playerState = event.target.value;
})

const spriteAnimations = [];
const animationStates =[
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "gitHit",
        frames: 4,
    },
   
];


const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_W = canvas.width = 600;
const CANVAS_H = canvas.height = 600;

const playerImage = new Image();
playerImage.src = './Assets/img/shadow_dog.png';

//total width of the canvas is 6876 and we have 12 cols
// if we divide 6876/12 we get the width of each pic
const spriteWidth = 575;
//total height of the canvas is 5230 and we ahve 10 rows
//if we divide 5230/10 we get the height of the pic
const spriteHeight = 523;



//game frame to control the speed of the img/ looping
let gameFrame = 0;
//const value to divid by to check the remainder if the remainder === 0 
//then loop will switch to a different frame
//other words the frames loops will slows 5 times the spped
//every time the remaider hits 0
const staggerFrames = 5;


animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j < state.frames; ++j){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({
            x: positionX,
            y: positionY,
        });
    }
    spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations);


function anitmate(){
    ctx.clearRect(0,0,CANVAS_W, CANVAS_H);
    //ctx.fillRect(50, 50 , 100, 100);
    //ctx.drawImage(img, sx(sourcex), sy(sourcey), sw(source-width), sh(source-height), dx(destination/canvasx), dy(destination/canvasy), dw(destination/canvas width), dh(destination/canvas heigth))
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX , frameY , spriteWidth, spriteHeight,
        0,0, spriteWidth, spriteHeight);
    
    gameFrame++;
    requestAnimationFrame(anitmate);
}
anitmate();
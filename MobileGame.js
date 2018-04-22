document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);

    alert("device ready");
}

function onPause()
{
    alert("pause");
}


function onResume()
{
    alert("resume");
}

$(document).on("pagecreate", "#container", begin);

//Set variables
var canvas;
var gc;
var sliderHeight = 10;
var sliderWidth; // set in screen_size
var sliderX = 150;
var sliderY;
var ballX;
var ballY;
var ballRadius; //set in screen_size
var ballDX = 2;
var ballDY = 2;
var level = 3;
var blocks = []
var blockDX = 2;
var blockDY = 2;
var score = 0;
var stop = false;
var bombLoc;
var bombLocWidth;
var bombVelo;
var ranNum;
var bombRestart;
var starLoc;
var starLocWidth;
var starVelo;
var starRestart;
var skullLoc;
var skullLocWidth;
var skullVelo;
var skullRestart;
var flowerLoc;
var flowerLocWidth;
var flowerVelo;
var flowerRestart;
var negativeLoc;
var negativeLocWidth;
var negativeVelo;
var negativeRestart;
var positiveLoc;
var positiveLocWidth;
var positiveVelo;
var positiveRestart;
var gameStart=false;
var lives = 3;
var stopLife = false;
var extraY = 0;
var scrWid;
var scrHt;
var colourArray=[];

function begin() {
    // Getting content from the html file
    canvas = document.getElementById("myCanvas");
    gc = canvas.getContext("2d");
    bomb = document.getElementById("bomb");
    star = document.getElementById("star");
    skull = document.getElementById("skull");
    flower = document.getElementById("flower");
    negative = document.getElementById("negative");
    positive = document.getElementById("positive");

    // Screen sizes
    screenSize();
    // Level designs
    getLevelDesigns();

    // Setting variables
    flowerLoc = -26;
    flowerVelo = 0.1;
    flowerLocWidth = widPer * 45;
    flowerLoc = widPer * 45;
    skullLoc = -26;
    skullVelo = 0.1;
    skullLocWidth = widPer * 45;
    skullLoc = heiPer * 45;
    starLoc = -26;
    starVelo = 0.1;
    starLocWidth = widPer * 45;
    starLoc = heiPer * 45;
    bombLoc = -26;
    bombVelo = 0.1;
    bombLocWidth = widPer * 45;
    bombLoc = heiPer * 45;
    negativeLoc = -26;
    negativeVelo = 0.1;
    negativeLocWidth = widPer * 45;
    negativeLoc = heiPer * 45;
    positiveLoc = -26;
    positiveVelo = 0.1;
    positiveLocWidth = widPer * 45;
    positiveLoc = heiPer * 45;
    spriteWidth = widPer * 10;
    spriteHeight = heiPer * 10;
    ballX = widPer * 48;
    ballY = heiPer * 75;
    sliderY = scHeAd - sliderHeight;

    render();
};

function getLevelDesigns()
{
    blocks=[ /*x and y are the starting position for the block, w is width, h is height and c is colour from colourArray.  The sizes are percentages */
        /*level 1*/		{x:[2,12,22,32,42,52,62,72,82,92],y:[20,20,20,20,20,20,20,20,20,20],w:[8,8,8,8,8,8,8,8,8,8],h:[3,3,3,3,3,3,3,3,3,3],c:[0,1,0,1,0,1,0,1,0,1]},
        /*level 2*/		{x:[2,12,22,32,42,52,62,72,82,92,2,12,22,32,42,52,62,72,82,92],y:[20,20,20,20,20,20,20,20,20,20,25,25,25,25,25,25,25,25,25,25],w:[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],h:[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],c:[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1]},
        /*level 3*/		{x:[28,73,23,33,68,78,19,29,39,64,74,84,50,46,56],y:[15,15,20,20,20,20,25,25,25,25,25,25,45,50,50],w:[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],h:[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],c:[3,3,3,3,3,3,3,3,3,3,3,3,1,2,3]},
        /*level 4*/		{},
        /*etc*/		{}
    ];
    colourArray=["#008B8B","#FFDF00","#9DD885","#FF0000"];
}

function render();
{
    // Clear the canvas
    gc.clearRect (0, 0, canvas.width, canvas.height);
    // Draw images
    gc.drawImage (skull, skullLocWidth, skullLoc, spriteWidth, spriteHeight);
    gc.drawImage (star, starLocWidth, starLoc, spriteWidth, spriteHeight);
    gc.drawImage (flower, flowerLocWidth, flowerLoc, spriteWidth, spriteHeight);
    gc.drawImage (bomb, bombLocWidth, bombLoc, spriteWidth, spriteHeight);
    gc.drawImage (negative, negativeLocWidth, negativeLoc, spriteWidth, spriteHeight);
    gc.drawImage (positive, positiveLocWidth, positiveLoc, spriteWidth, spriteHeight);
    // Draw slider
    drawSlider();
    // Draw ball
    drawBall();
    // Draw blocks
    drawBlock();
}

function drawSlider()
{
    // Draw slider
    gc.beginPath();
    gc.rect (sliderX, sliderY, sliderWidth, sliderHeight);
    gc.fillStyle = "#0095DD";
    gc.fill();
    gc.closePath();
}

function drawBall()
{
    // Draw ball
    gc.beginPath();
    gc.arc (ballX, ballY, ballRadius, 0, 2 * Math.PI);
    gc.fillStyle = '#808080';
    gc.fill();
    gc.closePath();
}

function drawBlock()
{
    // Draw blocks
    for(i=0;i<blocks[level-1].x.length;i++)
    {
        gc.beginPath();
        gc.rect (widPer*blocks[level-1].x[i], heiPer*blocks[level-1].y[i], widPer*blocks[level-1].w[i], heiPer*blocks[level-1].h[i]);
        gc.fillStyle=colourArray[blocks[level-1].c[i]];
        gc.fill();
    }
}

function screenSize()
{
    screenWidth=window.innerWidth;
    screenHeight=window.innerHeight;
    scWiAd=screenWidth-50;
    scHeAd=screenHeight-50;
    canvas.width=scWiAd;
    canvas.height=scHeAd;
    widPer=scWiAd/100;
    heiPer=scHeAd/100;
    sliderWidth=widPer*20;
    ballRadius=widPer*2;
}

/*$(document).on("pagecreate","#nameScreen", onPageCreated);

function onPageCreated() {
    var ractive = new Ractive({
        template: '#username',
    });
}*/
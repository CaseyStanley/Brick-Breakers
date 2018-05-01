var wd, ht;

//document.addEventListener("deviceready", onDeviceReady, false); /* use this on mobile */
$(window).ready(function(){onDeviceReady()});/* use this on desktop */
    

function onDeviceReady()
{
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);
}

function screensize()
{
    wd = window.innerWidth-10;
    ht = window.innerHeight-30;
    $("#myCanvas").width(wd);
    $("#myCanvas").height(ht);
}

function onPause()
{
    alert("pause");
}


function onResume()
{
    alert("resume");
}

$(document).on("pagecreate", "#gamescreen", begin);

//Set variables
var canvas;
var gc;
var sliderHeight = 10;
var sliderWidth;
var sliderX = 150;
var sliderY;
var ballX;
var ballY;
var ballRadius;
var ballDX = 2;
var ballDY = 2;
var level = 1;
var blocks = [];
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
var up_down = "down";
var pew = new Audio();
pew.src = "Pew.wav"
var beam = new Audio();
beam.src = "Transporter.wav"
var end = new Audio();
end.src = "bridge.mp3"
var start = new Audio();
start.src = "redalert.mp3"
var theme = new Audio();
theme.src = "Theme.mp3"
var pop = new Audio();
pop.src = "pop.wav"
var colourArray=[];
var divWidth;
var clickX;

function reset()
{
    // Resetting variables when the restart button is pressed
    sliderX = 150,
        sliderWidth = 75;
    ballDX = 2,
        ballDY = 2,
        level = 1,
        blocks = [],
        blockDX = 2,
        blockDY = 2,
        score = 0,
        gameStart = true,
        stop = false,
        lives = 3,
        stopLife = false;
    extraY=0;
}

function resetfromloss()
{
    // Resetting variables when the ball goes below the canvas
    sliderX = 150;
    ballDX = 2;
    ballDY = 2;
    ballX = widPer * 48;
    ballY = heiPer * 75;
    blocks = [],
        blockDX = 2,
        blockDY = 2,
        stop = false,
        stopLife = false;
    extraY=0;
}

function begin()
{
    // Shows the life and score on the screen before hand
    life();
    scorer();

    // If the game hasn't started then show the start panel
    if(!gameStart)
    {
        startGame();
    }

    // Getting content from the html file
    canvas = document.getElementById("myCanvas");
    gc = canvas.getContext("2d");
    screensize();
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

    // Starts the animation frame loop
    requestAnimationFrame(computeAndRender)
};

function startGame()
{
    $("#leveltwo").hide();
    $(document.body).ready(function()
    {
        start.play();
        $("#myCanvas").show();
        gameStart = true;
    });
}

function getLevelDesigns()
{
    blocks = [
        // X and Y are the starting position for the block. W is width, H is height and C is the colour from the colourArray.  The sizes are percentages.
        // Level 1
        {x:[1,12,23,34,45,56,67,78,89,100,111],y:[10,10,10,10,10,10,10,10,10,10,10],w:[10,10,10,10,10,10,10,10,10,10,10],h:[10,10,10,10,10,10,10,10,10,10,10],c:[0,0,0,0,0,0,0,0,0,0,0]},
        // Level 2
        {x:[12.5,55,97.5,140,182.5,225,257.5,310,352.5,395,437.5,55,97.5,140,182.5,225,267.5,310,352.5,395],y:[10,10,10,10,10,10,10,10,10,10,10,50,50,50,50,50,50,50,50,50],w:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],h:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],c:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        // Level 3
        {x:[12.5,55,97.5,140,182.5,225,257.5,310,352.5,395,437.5,55,97.5,140,182.5,225,267.5,310,352.5,395,97.5,140,182.5,225,257.5,310,352.5],y:[10,10,10,10,10,10,10,10,10,10,10,50,50,50,50,50,50,50,50,50,90,90,90,90,90,90,90],w:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],h:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],c:[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]},
        // Level 4
        {x:[12.5,55,97.5,140,182.5,225,257.5,310,352.5,395,437.5,55,97.5,140,182.5,225,267.5,310,352.5,395,55,97.5,140,182.5,225,267.5,310,352.5,395,97.5,140,182.5,225,257.5,310,352.5],y:[10,10,10,10,10,10,10,10,10,10,10,50,50,50,50,50,50,50,50,50,90,90,90,90,90,90,90,90,90,130,130,130,130,130,130,130],w:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],h:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],c:[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]},
        // Level 5
        {x:[12.5,55,97.5,140,182.5,225,257.5,310,352.5,395,437.5,55,97.5,140,182.5,225,267.5,310,352.5,395,55,97.5,140,182.5,225,267.5,310,352.5,395,97.5,140,182.5,225,257.5,310,352.5,140,182.5,225,257.5,310],y:[10,10,10,10,10,10,10,10,10,10,10,50,50,50,50,50,50,50,50,50,90,90,90,90,90,90,90,90,90,130,130,130,130,130,130,130,170,170,170,170,170],w:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],h:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],c:[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        // Level 6
        {x:[12.5,55,97.5,140,182.5,225,257.5,310,352.5,395,437.5,55,97.5,140,182.5,225,267.5,310,352.5,395,55,97.5,140,182.5,225,267.5,310,352.5,395,97.5,140,182.5,225,257.5,310,352.5,140,182.5,225,257.5,310,12.5,55,97.5,140,182.5,225,257.5,310,352.5,395,437.5],y:[10,10,10,10,10,10,10,10,10,10,10,50,50,50,50,50,50,50,50,50,90,90,90,90,90,90,90,90,90,130,130,130,130,130,130,130,170,170,170,170,170,210,210,210,210,210,210,210,210,210,210,210],w:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],h:[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],c:[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]}
    ];
    colourArray=["#008B8B","#FFDF00","#9DD885"];
}

function computeAndRender()
{
    // When the lives hit 0 then the game ends
    if (lives == 0)
    {
        gameOver();
    }
    // If the game has started then start the compute function
    if (gameStart)
    {
        compute();
    }
    // Start the render function
    render();
    // If the flag is true then take off a life
    if (stopLife)
    {
        lives -= 1;
        life();
        stopLife == false;
    }
    // If the flag is true then clear the canvas
    if (stop)
    {
        gc.clearRect(0, 0, canvas.width, canvas.height);
    }
    // If the flag isn't true then start the animation frame loop
    else if (!stop)
    {
        requestAnimationFrame(computeAndRender)
    }
}

function render()
{
    $("#gamescreen").click(function(e)
    {
       divWidth = $("#gamescreen").width();
       clickX = e.clientX;
       if (clickX > divWidth/2 && sliderX < canvas.width - sliderWidth)
       {
           sliderX += 1;
       }
       else if (clickX < divWidth/2 && sliderX > 0)
       {
           sliderX -= 1;
       }
    });

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

    // If the game level is higher than 4 move the blocks
    if (level > 4)
    {
        // Adds on Y when the blocks are less than 0
        if (extraY <= 0.0)
        {
            up_down = "down";
        }
        // Takes away Y when the blocks are greater than 120
        if (extraY >= 120.0)
        {
            up_down = "up";
        }
        // Keeps adding on 0.05 while it is in down mode
        if (up_down == "down")
        {
            extraY += 0.05;
        }
        // Keeps taking away 0.05 while it is in up mode
        if (up_down == "up")
        {
            extraY -= 0.05;
        }
    }

    // Draws each block for the level and checks for collisions
    for (var i = 0; i < blocks.length; i++)
    {
        drawBlock();
        collisionBlock(i);
    }
}

function randomNumber()
{
    // Sets a random Y position above the canvas up to 1000
    ranNum = Math.floor(Math.random() * 1000);
    return ranNum;
}

function compute()
{
    // Making the variables move
    ballX += ballDX
    ballY += ballDY
    bombLoc += 1
    starLoc += 1
    skullLoc += 1
    flowerLoc += 1
    negativeLoc += 1
    positiveLoc += 1

    // If the image is greater than 1000 below the canvas send the image to the top of the canvas with a random X and random Y above the canvas
    if (negativeLoc > 1000)
    {
        negativeRestart = randomNumber();
        negativeLoc = -50 - negativeRestart;
        negativeLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (positiveLoc > 1000)
    {
        positiveRestart = randomNumber();
        positiveLoc = -50 - positiveRestart;
        positiveLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (skullLoc > 1000)
    {
        skullRestart = randomNumber();
        skullLoc = -50 - skullRestart;
        skullLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (flowerLoc > 1000)
    {
        flowerRestart = randomNumber();
        flowerLoc = -50 - flowerRestart;
        flowerLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (starLoc > 1000)
    {
        starRestart = randomNumber();
        starLoc = -50 - starRestart;
        starLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (bombLoc > 1000)
    {
        bombRestart = randomNumber();
        bombLoc = -50 - bombRestart;
        bombLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }

    // If the slider hits the negative image then take 10 off the slider width
    if (sliderX < negativeLocWidth + 20 && sliderX + sliderWidth > negativeLocWidth && sliderY == negativeLoc + 26)
    {
        sliderWidth -= 10;
    }
    // If the slider hits the positive image then add 10 onto the slider width
    if (sliderX < positiveLocWidth + 20 && sliderX + sliderWidth > positiveLocWidth && sliderY == positiveLoc +26)
    {
        sliderWidth += 10;
    }
    // If the slider hits the skull image then take off a life
    if (sliderX < skullLocWidth + 20 && sliderX + sliderWidth > skullLocWidth && sliderY == skullLoc + 26)
    {
        lives -= 1;
        life();
    }
    // If the slider hits the flower image then add on a life
    if (sliderX < flowerLocWidth + 20 && sliderX + sliderWidth > flowerLocWidth && sliderY == flowerLoc + 26)
    {
        lives += 1;
        life();
    }
    // If the slider hits the star image then add on 70 points
    if (sliderX < starLocWidth + 20 && sliderX + sliderWidth > starLocWidth && sliderY == starLoc + 26)
    {
        score += 70;
        scorer();
    }
    // If the slider hits the bomb image then take off 70 points
    if (sliderX < bombLocWidth + 20 && sliderX + sliderWidth > bombLocWidth && sliderY == bombLoc + 26)
    {
        score -= 70;
        scorer();
    }

    // If the ball is less than 0 then bounce the ball off of the left of the canvas
    if (ballX - ballRadius < 0 )
    {
        ballDX = -ballDX;
    }
    // If the ball is greater than the canvas width then bounce the ball of the right of the canvas
    if (ballX + ballRadius > canvas.width)
    {
        ballDX = -ballDX;
    }
    // If the ball is less than 0 then bounce the ball off of the top of the canvas
    else if (ballY < 0)
    {
        ballDY = -ballDY;
    }
    // If the ball hits the slider at a certain angle from a certain direction it alters the angle of the rebound
    else if (sliderX < ballX + ballRadius && sliderX + sliderWidth > ballX && sliderY < ballY + ballRadius && sliderHeight + sliderY > ballY)
    {
        // Plays shooting sound
        pew.play();
        if (ballX <= sliderX + (sliderWidth / 2) && ballDX <= 0)
        {
            ballDX += 0.5;
        }
        else if (ballX <= sliderX + (sliderWidth / 2) && ballDX > 0)
        {
            ballDX -= 0.5;
        }
        else if (ballX > sliderX + (sliderWidth / 2) && ballDX <= 0)
        {
            ballDX -= 0.5;
        }
        else if (ballX > sliderX + (sliderWidth / 2) && ballDX > 0)
        {
            ballDX += 0.5;
        }
        // Bounces the ball
        ballDY = -ballDY;
        if (ballDX == 0)
        {
            ballDX += 0.5;
        }
    }
    // If the ball goes below the canvas and the flag is false the take off a life and resets the game
    else if (ballY > canvas.height && stopLife == false)
    {
        stopLife = true;
        lives -= 1;
        life();
        resetfromloss();
        getLevelDesigns();
    }
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
    for(i = 0; i < blocks[level-1].x.length; i++)
    {
        gc.beginPath();
        gc.rect (widPer*blocks[level-1].x[i],
                heiPer*blocks[level-1].y[i],
                widPer*blocks[level-1].w[i],
                heiPer*blocks[level-1].h[i]);
        gc.fillStyle = colourArray[blocks[level-1].c[i]];
        gc.fill();
    }
}

function collisionBlock(i)
{
    // If the block collides with the ball, play the pop sound and get rid of the block, bounce the ball off and check what colour the block was to add on a certain score
    if (blocks[i].X < ballX + ballRadius && blocks[i].X + blocks[i].Width > ballX && (blocks[i].Y+extraY) < ballY + ballRadius && blocks[i].Height + (blocks[i].Y + extraY) > ballY)
    {
        if (gameStart)
        {
            pop.play();
            blocks[level].x.splice(i,1);
            blocks[level].y.splice(i,1);
            blocks[level].w.splice(i,1);
            blocks[level].h.splice(i,1);
            blocks[level].c.splice(i,1);
            ballDY = -ballDY;
            collisionColor();
        }
    }
}

function collisionColor()
{
    // If the block is blue then add on 10 points
    if (block.Color == "#008B8B")
    {
        score += 10;
        scorer();
    }
    // If the block is gold then add on 50 points
    if (block.Color == "#FFDF00")
    {
        score += 50;
        scorer();
    }
    // If the block is green then add on 20 points
    if (block.Color == "#9DD885")
    {
        score += 20;
        scorer();
    }
    // Determines what to do at each level
    whatLevel();
}

function whatLevel(block)
{
    // If the all the blocks have been hit, increase the level by 1, bounce the ball off, show which level you are on and draw the next set of blocks
    if (blocks.length == 0)
    {
        level += 1;
        ballDY = -ballDY;
        nextLevel();
        restart();
    }
    // When it hits level 7 it clears the canvas, plays the theme tune, hides the element saying what level you are on, produces the fireworks and sound effects, and shows complete and restart button
    if (level == 7)
    {
        gc.clearRect(0, 0, canvas.width, canvas.height);
        theme.play();
        stop = true;
        $("#leveltwo").hide();
        $('.demo').fireworks({
            sound: true,
            opacity: 0.9,
            width: '100%',
            height: '100%'
        });
        $("#complete").show().animate({top:"-30%"});
    }
}

function nextLevel()
{
    stop = true;
    document.getElementById("leveltwo").innerHTML = "Level " + level;
    $("#leveltwo").css({left:"46%"}).show().animate({top:"20%"}).fadeOut(3000);
    beam.play();
    stop = false;
    extraY = 0;
}

// Clears the canvas once you die, plays the end phrase and shows the over
function gameOver()
{
    gc.clearRect (0, 0, canvas.width, canvas.height);
    end.play();
    stop = true;
    $("#over").show();
}

// When the restart button is clicked if you die then it hides the over, resets the score and then resets the game back to the beginning
$(document).on("click","#restartButton",function()
{
    $("#over").hide().animate({top:"30%"});
    document.getElementById("score").innerText = "";
    reset();
    begin();
})

// When the restart game at the end is clicked then it hides the complete, resets the score and then reloads the page
$(document).on("click","#restartGame",function()
{
    $("#complete").hide().animate({top:"30%"});
    document.getElementById("score").innerText="";
    window.location.reload(true);
})

function life ()
{
    // Life taken from the html element
    document.getElementById("lives").innerText = lives
}

function scorer ()
{
    // Score taken from the html element
    document.getElementById("score").innerText = score
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
//Event listener for on device ready
document.addEventListener("deviceready", onDeviceReady, false); /*Mobile*/
$(window).ready(function(){onDeviceReady()});/*Desktop*/

//Variables
var highscores={};
var isThereASaveFile=false;
var data;

//On device ready
function onDeviceReady()
{
    /* document.addEventListener("resume", onResume, true);
    document.addEventListener("pause", onPause, true); */
    loadScores();
}

//Loading any scores already stored
function loadScores()
{
  if("highscores" in localStorage)
  {
    isThereASaveFile=true;
    data=localStorage.getItem("highscores"); /*Retrieve from storage*/
    highscores=JSON.parse(data); /*Parse object into highscores variable*/
  }
}

//Screen size for the mobile device being used
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

//Pauses the game when in the background
/* function onPause()
{
    alert("Pause");
}

//Resumes the play of the game when in the bought to the foreground
function onResume()
{
    alert("Resume");
} */

$(document).on("pagecreate", "#gamescreen", begin);

//Set variables
var canvas, scWiAd;
var gc;
var sliderHeight = 10;
var sliderWidth;
var sliderX = 350;
var sliderY;
var ballX;
var ballY;
var ballRadius;
var ballDX;
var ballDY;
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
/* var extraY = 0; */
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
var checks;
var clickHandled = true;
var thisName;
var newSave;
var i;
var len;
var colour_of_blocks;

function reset()
{
    // Resetting variables when the restart button is pressed
    sliderX = 350,
        sliderWidth = 75;
        level = 1,
        blocks = [],
            blockDX = 2,
            blockDY = 2,
        score = 0,
        gameStart = true,
        stop = false,
        lives = 3,
        stopLife = false;
    /* extraY=0; */
    if (radio1.checked === true)
    {
        ballDX = 2;
        ballDY = 2;
    }
    else if (radio2.checked === true)
    {
        ballDX = 4;
        ballDY = 4;
    }
    else if (radio3.checked === true)
    {
        ballDX = 6;
        ballDY = 6;
    }
}

function resetfromloss()
{
    // Resetting variables when the ball goes below the canvas
    sliderX = 350;
    ballX = widPer * 48;
    ballY = heiPer * 50;
    blocks = [],
        blockDX = 2,
        blockDY = 2,
        stop = false,
        stopLife = false;
    /* extraY=0; */
    if (radio1.checked === true)
    {
        ballDX = 2;
        ballDY = 2;
    }
    else if (radio2.checked === true)
    {
        ballDX = 4;
        ballDY = 4;
    }
    else if (radio3.checked === true)
    {
        ballDX = 6;
        ballDY = 6;
    }
}

function begin()
{
	//Checks where the settings
    checks = document.getElementById("check");
    radio1 = document.getElementById("Radio1");
    radio2 = document.getElementById("Radio2");
    radio3 = document.getElementById("Radio3");
    if (radio1.checked === true)
    {
        ballDX = 2;
        ballDY = 2;
    }
    else if (radio2.checked === true)
    {
        ballDX = 3;
        ballDY = 3;
    }
    else if (radio3.checked === true)
    {
        ballDX = 4;
        ballDY = 4;
    }
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
    flowerVelo = 0.1;
    flowerLocWidth = randomWidth();
    flowerLoc = widPer * 45;
    skullVelo = 0.1;
    skullLocWidth = randomWidth();
    skullLoc = heiPer * 45;
    starVelo = 0.1;
    starLocWidth = randomWidth();
    starLoc = heiPer * 45;
    bombVelo = 0.1;
    bombLocWidth = randomWidth();
    bombLoc = heiPer * 45;
    negativeVelo = 0.1;
    negativeLocWidth = randomWidth();
    negativeLoc = heiPer * 45;
    positiveVelo = 0.1;
    positiveLocWidth = randomWidth();
    positiveLoc = heiPer * 45;
    spriteWidth = widPer * 5;
    spriteHeight = heiPer * 5;
    ballX = widPer * 48;
    ballY = heiPer * 50;
    sliderY = scHeAd - sliderHeight;

    // Starts the animation frame loop
    requestAnimationFrame(computeAndRender)
};

function startGame()
{
	//Hides the level
    $("#leveltwo").hide();
    $(document.body).ready(function()
    {
		//Checks whether to play the start music
        if (checks.checked === false)
        {
            start.pause();
        }
        else
        {
            start.play();
        }
		//Shows the canvas
        $("#myCanvas").show();
        gameStart = true;
    });
	//Touching the canvas to then move the paddle
    $("#gamescreen").on('click touchstart', function(e)
    {
        clickHandled = false;
        divWidth = $("#gamescreen").width();
        clickX = e.clientX;
    });

}

//Drawing the blocks
function getLevelDesigns()
{
    blocks = [
        // X and Y are the starting position for the block. W is width, H is height and C is the colour from the colourArray.  The sizes are percentages.
        // Level 1
        {x:[2,11,20,29,38,47,56,65,74,83,92],y:[1,1,1,1,1,1,1,1,1,1,1],w:[6,6,6,6,6,6,6,6,6,6,6],h:[8,8,8,8,8,8,8,8,8,8,8],c:[0,0,0,0,0,0,0,0,0,0,0]},
        // Level 2
        {x:[2,11,20,29,38,47,56,65,74,83,92,11,20,29,38,47,56,65,74,83],y:[1,1,1,1,1,1,1,1,1,1,1,10,10,10,10,10,10,10,10,10],w:[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],h:[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],c:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        // Level 3
        {x:[2,11,20,29,38,47,56,65,74,83,92,11,20,29,38,47,56,65,74,83,20,29,38,47,56,65,74],y:[1,1,1,1,1,1,1,1,1,1,1,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19],w:[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],h:[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],c:[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]},
        // Level 4
        {x:[2,11,20,29,38,47,56,65,74,83,92,11,20,29,38,47,56,65,74,83,11,20,29,38,47,56,65,74,83,20,29,38,47,56,65,74],y:[1,1,1,1,1,1,1,1,1,1,1,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19,19,19,28,28,28,28,28,28,28],w:[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],h:[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],c:[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]},
        // Level 5
        {x:[2,11,20,29,38,47,56,65,74,83,92,11,20,29,38,47,56,65,74,83,11,20,29,38,47,56,65,74,83,20,29,38,47,56,65,74,140,29,38,47,56,65],y:[1,1,1,1,1,1,1,1,1,1,1,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19,19,19,28,28,28,28,28,28,28,37,37,37,37,37],w:[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],h:[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],c:[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        // Level 6
        {x:[2,11,20,29,38,47,56,65,74,83,92,11,20,29,38,47,56,65,74,83,11,20,29,38,47,56,65,74,83,20,29,38,47,56,65,74,29,38,47,56,65,2,11,20,29,38,47,56,65,74,83,92],y:[1,1,1,1,1,1,1,1,1,1,1,10,10,10,10,10,10,10,10,10,19,19,19,19,19,19,19,19,19,28,28,28,28,28,28,28,37,37,37,37,37,46,46,46,46,46,46,46,46,46,46,46],w:[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],h:[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],c:[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]}
    ];
	//Colours
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
    /* if (level > 4)
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
    } */

    // Draws each block for the level and checks for collisions
    for (var i = 0; i < blocks.length; i++)
    {
        drawBlock();
    }
}

//Creates a random width for falling objects
function randomWidth()
{
   ranWid=Math.floor(Math.random()*scWiAd-50);
   if(ranWid<50)
   {
     ranWid+=50;
   }
   return ranWid;
}

// Sets a random Y position above the canvas up to 1000
function randomNumber()
{
    ranNum = Math.floor(Math.random() * 1000);
    return ranNum;
}

function compute()
{
	//Moving the slider depending on where on the screen the user pressed
    if(!clickHandled) {
        if (clickX > divWidth/2 && sliderX < canvas.width - sliderWidth)
        {
            sliderX += 100;
        }
        else if (clickX < divWidth/2 && sliderX > 0)
        {
            sliderX -= 100;
        }
        clickHandled = true;

    }

	// Making the variables move
    ballX += ballDX
    ballY += ballDY
    bombLoc += 1
    starLoc += 1
    skullLoc += 1
    flowerLoc += 1
    negativeLoc += 1
    positiveLoc += 1
	
	//Collision of blocks with ball
    collisionBlock();

    // If the image is greater than 1000 below the canvas send the image to the top of the canvas with a random X and random Y above the canvas
    if (negativeLoc > scHeAd)
    {
        negativeRestart = randomNumber();
        negativeLoc = -50 - negativeRestart;
        negativeLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (positiveLoc > scHeAd)
    {
        positiveRestart = randomNumber();
        positiveLoc = -50 - positiveRestart;
        positiveLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (skullLoc > scHeAd)
    {
        skullRestart = randomNumber();
        skullLoc = -50 - skullRestart;
        skullLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (flowerLoc > scHeAd)
    {
        flowerRestart = randomNumber();
        flowerLoc = -50 - flowerRestart;
        flowerLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (starLoc > scHeAd)
    {
        starRestart = randomNumber();
        starLoc = -50 - starRestart;
        starLocWidth = Math.floor((Math.random() * canvas.width) + 1);
    }
    if (bombLoc > scHeAd)
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
        // Plays shooting sound depending on the settings
        if (checks.checked === false)
        {
            pew.pause();
        }
        else
        {
            pew.play();
        }
		// Bounces the ball
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

function collisionBlock()
{
    // If the block collides with the ball, play the pop sound and get rid of the block, bounce the ball off and check what colour the block was to add on a certain score
    for(i=0;i<blocks[level-1].x.length;i++)
    {
        if(ballX+ballRadius>widPer*blocks[level-1].x[i]&&
          ballX<widPer*blocks[level-1].x[i]+widPer*blocks[level-1].w[i]&&
          ballY+ballRadius>heiPer*blocks[level-1].y[i]&&
          ballY<heiPer*blocks[level-1].y[i]+heiPer*blocks[level-1].h[i])
            {
              if (gameStart)
              {
                  blocks[level-1].x.splice(i,1);
                  blocks[level-1].y.splice(i,1);
                  blocks[level-1].w.splice(i,1);
                  blocks[level-1].h.splice(i,1);
                  blocks[level-1].c.splice(i,1);
                  ballDY = -ballDY;
                  collisionColor(i);
                  if (checks.checked === false)
                  {
                      pop.pause();
                  }
                  else
                  {
                      pop.play();
                  }
              }
            }
    }

}

//Collision and colour depends on the score
function collisionColor(i)
{
	//Colour of the blocks
	colour_of_blocks = blocks[level-1].c[i];
    // If the block is blue then add on 10 points
    if (colourArray[colour_of_blocks] == "#008B8B")
    {
        score += 10;
        scorer();
    }
    // If the block is gold then add on 50 points
    if (colourArray[colour_of_blocks] == "#FFDF00")
    {
        score += 50;
        scorer();
    }
    // If the block is green then add on 20 points
    if (colourArray[colour_of_blocks] == "#9DD885")
    {
        score += 20;
        scorer();
    }
    // Determines what to do at each level
    whatLevel();
}

function whatLevel()
{
    // If the all the blocks have been hit, increase the level by 1, bounce the ball off, show which level you are on and draw the next set of blocks
    if (blocks[level-1].x.length == 0)
    {
        level += 1;
        ballDY = -ballDY;
        nextLevel();
        getLevelDesigns();
    }
    // When it hits level 7 it clears the canvas, plays the theme tune, hides the element saying what level you are on, produces the fireworks and sound effects, and shows complete and restart button
    if (level === 7)
    {
        gc.clearRect(0, 0, canvas.width, canvas.height);
        if (checks.checked === false)
        {
            theme.pause();
        }
        else
        {
            theme.play();
        }
        stop = true;
        $("#leveltwo").hide();
        $('.demo').fireworks({
            sound: true,
            opacity: 0.9,
            width: '100%',
            height: '100%'
        });
        $("#complete").show();
		//Shows the score
		$("#scoreArea").text(score);
    }
}

function nextLevel()
{
	//Clears the canvas and shows the level 
    stop = true;
    document.getElementById("leveltwo").innerHTML = "Level " + level;
    $("#leveltwo").show().animate({top:"20%"}).fadeOut(3000);
    //Beam sound effects
	if (checks.checked === false)
    {
        beam.pause();
    }
    else
    {
        beam.play();
    }
	//Shows the canvas
    stop = false;
    /* extraY = 0; */
}

// Clears the canvas once you die, plays the end phrase and shows the over
function gameOver()
{
    gc.clearRect (0, 0, canvas.width, canvas.height);
    if (checks.checked === false)
    {
        end.pause();
    }
    else
    {
        end.play();
    }
    stop = true;
    $("#over").show();
	//Shows the score
	$("#scoreArea2").text(score);
}

// When the restart button is clicked if you die then it hides the over, resets the score and then resets the game back to the beginning
$(document).on("click","#restartButton",function()
{
    $("#over").hide().animate({top:"30%"});
    document.getElementById("score").innerText = "";
    reset();
    begin();
});

// When the restart game at the end is clicked then it hides the complete, resets the score and then reloads the page
$(document).on("click","#restartGame",function()
{
    $("#complete").hide().animate({top:"30%"});
    document.getElementById("score").innerText="";
    window.location.reload(true);
});

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

function subScore()   
	//Structure of high scores is highscores = {"name":[],"score":[]}
    {
      flag=false;
      console.log("subscore button");
	  /*Get the name that is entered*/
      thisName = $("#getName").val(); 
	  /* If there is no save file */
      if(!isThereASaveFile) 
      {
        highscores={"name":[thisName],"score":[score]};
        flag=true;
        isThereASaveFile=true;
      }
      else
      {
		/* Put length of highscores object into variable */
        len = highscores.name.length;
		/* Iterate through score list */
        for (i=0; i<len; i++) 
        {
			/* If this name is found in save file */
			if(thisName === highscores.name[i]) 
			{
				highscores.score[i]=score; /* overwrite the score for that name */
				flag=true;
			}
        }
        if(!flag) /* If flag is still false, nothing has been done yet */
        {
          highscores.name[len]=thisName; /* Put new name at end of array */
          highscores.score[len]=score; /* Put new score at end of array */
        }
      }
      newSave = JSON.stringify(highscores); /* Set the object to a string */
      localStorage.setItem("highscores", newSave); /* Save the highscore file */
      highscoring();
    };	
	
function highscoring()
{
	//Print the highscores
    for(i=0; i<highscores.name.length; i++)
    {
        $("#getHighScoring").append("<p>"+highscores.name[i]+":"+highscores.score[i]+"</p>");
    }
}

/* function pause()
{
    ballDX = 0;
    ballDY = 0;
	sliderX += 0;
	sliderX -= 0;
	bombRestart = 0;
	starRestart = 0;
	flowerRestart = 0;
	negativeRestart = 0;
	positiveRestart = 0;
}

function play()
{
	begin();
} */

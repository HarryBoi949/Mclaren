var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  mclarenImg = loadImage("Mclaren.png")
  
  bgImage = loadImage("Background.png");
  
  fuelImg = loadImage("Fuel.png");
  
  tyreImg = loadImage("Tyre.png");
 
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  mclaren = createSprite(50,180,20,50);
  
  mclaren.addImage(mclarenImg)
  mclaren.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",bgImage);
  ground.scale=0.5
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  fuelGroup = new Group();
  tyreGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(25);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the trex animation
    
    
    if(keyDown("space") && mclaren.y >= 159) {
      mclaren.velocityY = -12;
    }
  
    mclaren.velocityY = mclaren.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    mclaren.collide(invisibleGround);
    spawnFuel();
    spawnTyre();
  
    if(tyreGroup.isTouching(mclaren)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    mclaren.velocityY = 0;
    tyreGroup.setVelocityXEach(0);
    fuelGroup.setVelocityXEach(0);
    
    //change the trex animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    tyreGroup.setLifetimeEach(-1);
    fuelGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnFuel() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var fuel = createSprite(600,120,40,10);
    fuel.y = Math.round(random(80,120));
    fuel.addImage(fuelImg);
    fuel.scale = 0.2;
    fuel.velocityX = -3;
    
     //assign lifetime to the variable
     fuel.lifetime = 200;
    
    //adjust the depth
    fuel.depth = mclaren.depth;
    mclaren.depth = mclaren.depth + 1;
    
    //add each cloud to the group
    fuelGroup.add(fuel);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  tyreGroup.destroyEach();
  fuelGroup.destroyEach();
  score = 0;
}

function spawnTyre() {
  if(frameCount % 60 === 0) {
    var tyre = createSprite(600,165,10,40);
    //obstacle.debug = true;
    tyre.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    
    
     tyre.addImage(tyreImg);
              
      
    
    //assign scale and lifetime to the obstacle           
    tyre.scale = 0.2;
    tyre.lifetime = 300;
    //add each obstacle to the group
    tyreGroup.add(tyre);
  }
}


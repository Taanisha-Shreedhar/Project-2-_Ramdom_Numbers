var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cloudImage;

var score, cloud;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png")
  groundImage = loadImage("ground2.png");
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
}

function draw() {
  //set background color
  background(180);
  
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 135) {
    trex.velocityY = -10;
  }
  
  // add gravity to the trex 
  trex.velocityY = trex.velocityY + 0.8
  //reset the ground when it goes off the screen
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  spawnClouds()
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 //create a cloud for every 60 frames
 if (frameCount % 60 === 0){
  cloud = createSprite(605, 100, 40, 10);
  cloud.velocityX = -3;
  cloud.addImage("clouds", cloudImage);
  cloud.scale = 0.4;
 //assining random y positons to cloud
  cloud.y = Math.round(random(10, 60));

 //to make the trex appear on the cloud
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
 }
}




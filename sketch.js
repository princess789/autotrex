var PLAY=1
var END=0;
var gamestate= PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var score;
var ob1,ob2,ob3,ob4,ob5,ob6;
var scoresound ;
var newImage;
var obstaclegroup;
var gameover;
var gamerestart,restartimage,over;
var jumpsound,endsound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
   ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameover = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  jumpsound = loadSound("jump.wav");
  endsound = loadSound("collided.wav")
  scoresound = loadSound("scoresound.wav");
}


function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  cloudsGroup=new Group();
  obstaclegroup=new Group();
  
  over=createSprite(200,20);
  over.addImage(gameover);
  over.scale=0.5;
  gamerestart=createSprite(200,50);
  gamerestart.addImage(restartimage);
  gamerestart.scale=0.5;
  console.log("Hello"+ 5)
  score=0;
  textSize(18);
textFont("Georgia");
//scoring
 // trex.debug = true;
  trex.setCollider ("rectangle",0,0,300,80)
}

function draw() {
  background(180);
  
  if(gamestate===PLAY){
    over.visible=false;
    gamerestart.visible=false;
   score  =score+ Math.round(getFrameRate()/60); 
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
      jumpsound.play();
     
    
      
  }
    //Adding the gravity to bring trex down //
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -(4 + (score / 100));
   
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    //spawn the clouds
  spawnClouds();
  spawnObstacls();
    
   if (obstaclegroup.isTouching(trex)) {
   //gamestate=END
      //endsound.play();
     trex.velocityY =-15
   }
    if(score % 100 === 0 && score > 0 ){
      scoresound.play();
    }
  }
  else if(gamestate===END){
    over.visible=true;
    gamerestart.visible=true;
  ground.velocityX=0;  
  cloudsGroup.setVelocityEach(0, 0);
  obstaclegroup.setVelocityEach(0, 0);
  trex.changeAnimation("collided",trex_collided)  
   cloudsGroup.setLifetimeEach(-1); 
  obstaclegroup.setLifetimeEach(-1);
    if (mousePressedOver(gamerestart)){
      reset();
    }
   
  }
  
  
   
  text("Score: "+ score, 250, 50);

  
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}
function spawnObstacls(){
  if (World.frameCount % 100 === 0){
    var obstacles = createSprite(600,180,20,20);
    obstacles.velocityX = -(4 + (score / 100));
    var r=Math.round(random(1,6));
    switch(r){
      case 1:obstacles.addImage(ob1);
        break;
      case 2:obstacles.addImage(ob2);
        break;
        case 3:obstacles.addImage(ob3);
        break;
        case 4:obstacles.addImage(ob4);
        break;
        case 5:obstacles.addImage(ob5);
        break;
        case 6:obstacles.addImage(ob6);
        break;
        default:break ;
    }
    obstacles.scale=0.75;
    obstacles.lifetime=200
    obstaclegroup.add(obstacles)
    
}
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
    }
}
function reset(){
  gamestate=PLAY;
  cloudsGroup.destroyEach();
  obstaclegroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score=0;
  
}


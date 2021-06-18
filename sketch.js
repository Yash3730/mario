var back;
var mario;
var imagemario;
var ground;
var invibleground;
var cloud,cloudimage;
var pipe,pipeimage;
var coin,coinimage;
var score=5;
var mariohead
var coincount=0;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var mariodead

function preload() {

//back=loadImage("mario back.png") 
imagemario=loadAnimation("1.png","2.png","3.png")
imageground=loadImage("ground2.png")
cloudimage=loadImage("cloud.png")
pipeimage=loadImage("pipeorg.png")
coinimage=loadImage("coin.png")
enemyimage=loadImage("enemy1.png")
bulletImage=loadImage("bullet.png")
marioheadimage=loadImage("mario-head.png")
mariodeadImage=loadAnimation("mario_dead.png")

}

function setup() {
  createCanvas(1500, 400);

  mariohead=createSprite(50,50)
  mariohead.addImage(marioheadimage)

  edges=createEdgeSprites()
  mario=createSprite(60,365)
  mario.addAnimation("running",imagemario)
  mario.addAnimation("mariodead",mariodeadImage)

  mario.scale=0.7;

  ground=createSprite(750,380,1500,10)
  ground.addImage(imageground)

  invisibleground=createSprite(750,390,1500,10)
  invisibleground.visible=false;

pipesgroup=new Group();
cloudsgroup=new Group();
bulletgroup=new Group();
enemygroup=new Group();
coingroup=new Group();





}
function draw() {
  background("skyblue");

  textSize(35);
  text("x",80,60)
  text(score,120,60)

  text("coins "+coincount,200,60)

  console.log(mario.y);

if (gamestate===PLAY){





  if (keyDown("space")&&mario.y>288){
    mario.velocityY=-20;
    
  }
ground.velocityX=-5
if(ground.x<0){
  ground.x=ground.width/2
}

  mario.velocityY=mario.velocityY+1
  

if (enemygroup.isTouching(mario)){
  score=score-1
  gamestate=END;
}


if (bulletgroup.isTouching(enemygroup)){
enemygroup.destroyEach();
bulletgroup.destroyEach();
}



for(var i=0;i<coingroup.length;i++){
  if(coingroup.isTouching(mario)){
    coingroup.get(i).destroy()
    coincount=coincount+1

  }
}



if (keyWentDown("UP_ARROW")){
  bullet=createSprite(mario.x,mario.y)
  bullet.addImage(bulletImage)
  bullet.velocityX=4;
  bulletgroup.add(bullet);
}






spawnclouds();
spawnpipe();
spawncoin();
spawnenemy();
}
else if(gamestate===END){
  ground.velocityX=0;
  enemygroup.destroyEach();
  mario.velocityY=0;
  mario.changeAnimation("mariodead",mariodeadImage)
}
mario.collide(invisibleground);
  drawSprites();
}

function spawnclouds(){
if(frameCount%60===0){
  cloud=createSprite(1500,random(100,200));
  cloud.addImage(cloudimage);
  cloud.scale=1.4;
  cloud.velocityX=-3;
  cloud.lifetime=600;
  cloudsgroup.add(cloud);
}
}
function spawnpipe(){
if (frameCount%200===0){
  pipe=createSprite(1500,300)
  pipe.addImage(pipeimage);
  pipe.scale=0.3;
  pipe.velocityX=-5;
  pipe.lifetime=600;
  pipesgroup.add(pipe);
}
}


function spawncoin(){

if(frameCount%200===0){
  for (i=0;i<5;i++){
  coin=createSprite(1500+i*30,200)
  coin.addImage(coinimage);
  coin.scale=0.1;
  coin.velocityX=-5;
  coin.lifetime=600;
  coingroup.add(coin);
  }
}
}
function spawnenemy(){
  if (frameCount%400===0){
    enemy=createSprite(1200,330)
    enemy.addImage(enemyimage);
    enemy.scale=0.15;
    enemy.velocityX=-5;
    enemy.lifetime=600;
    enemygroup.add(enemy);
  }



}

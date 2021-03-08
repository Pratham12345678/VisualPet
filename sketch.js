//Create variables here
var dog, happyDog;
var dogImage, happyDogImage;
var datbase;
var foodS, foodStock;
var gameState = 0;
var game;
var player, playerCount;
var r;
var groundImage;
var ground;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png");
  groundImage = loadImage("images/background.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  foodStock = database.ref();
  foodStock.on("value", readStock);
  dog = createSprite(200, 100, 50, 50);
  
  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the food");
  feed.position(800, 95);
  feed.mousePressed(addFoods);


  
}


function draw() {
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  textSize = 25;
  text(foodStock, 200, 200);

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed: "+lastFed%12 + "PM" +350, 30);
  }else if(lastFed === 0){
    text("Last Fed : 12AM", 350, 30);
  }
  else(){
    text("Last Fed : "+ lastFed + "AM", 350, 30);
  }
  if(gameState==2){
    game.end();  
  }
  drawSprites();

}
function readStock(data){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  foodS = data.val();
}

function writeStock(x){
  database.ref('l').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage("sprites/happydog.png");

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



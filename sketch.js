var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles;
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var count = 0;
var gamestate = "start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }
    
}

function draw() {
  background("black");
  
  Engine.update(engine);

  ground.display();
 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
  
  for(var q = 20; q < 300; q = q+80){
    text("500",q,530);
  }

  for(var d = 340; d < 550; d = d+80){
    text("100",d,530);
  }

  for(var f = 590; f < 850; f = f+80){
    text("200",f,530);
  }

  if(particles!=null){
    particles.display();
    if(particles.body.position.y>760){
      if (particles.body.position.x < 300){
        score=score+500;
        particles=null;
      }
      else if(particles.body.position.x > 300 && particles.body.position.x <550){
        score = score + 100;
        particles = null;
      }
      else if (particles.body.position.x >550 && particles.body.position.x < 850){
        score = score+200;
        particles = null;
      }
    }
  }
  if (count >= 5){
    gamestate ="end";
  }
  if(gamestate === "end"){
    textSize(100);
    //textMode(CENTER);
    text("Game Over", 200, 300);
  }

  textSize(20);
  text("Score : "+score,20,30);

}
  

function mousePressed(){
  if(gamestate!== "end"){
    particles = new Particle(mouseX,10,10);
    count = count+1;
  }
}
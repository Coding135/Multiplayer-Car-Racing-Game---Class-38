class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form()
      form.display();

    }

    car1 = createSprite(100, 200);
    car2 = createSprite(300, 200);
    car3 = createSprite(500, 200);
    car4 = createSprite(700, 200);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    // textSize(30);
    // text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      // index represents the index number of the cars array  
        var index = 0;
        // car1 = 0
        // car2 = 1
        // car3 = 2
        // car4 = 3
        var x = 0;
        var y;
// it loops through the properties of the allPlayers
// this loop runs for 4 times
      for(var plr in allPlayers) {
        index = index + 1;
        // car1 = 1
        // car2 = 2
        // car3 = 3
        // car4 = 4
        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data from the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance; // distance yet to be travelled on the canvas by the car
        // car1 = 0
        // car2 = 1
        // car3 = 2
        // car4 = 3
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if(index === player.index) {
          cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth / 2;
            camera.position.y = cars[index - 1].y; 
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 50
      player.update();
    }
    drawSprites();
  }
}
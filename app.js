var context;
var currentDisplayedDiv="#welcome";
var shape = new Object();
var clock = new Image();
var shape1 = null;
var shape2 = null;
var shape3 = null;
var shape4 = null;
var shapeCandy=null;
var shapeFish=new Object();;
var numCandy=2;
var board;
var board1;
var board2;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval1;
var color_5="red";
var color_15="green";
var color_25="yellow";
var game_time;
var input_monsters;
var input_bolls;
var key_up;
var key_down;
var key_left;
var key_right;
var face="down";
var change=false;
var lives;
var numOfMonsters;
var inGame=false;
var myAudio;
var u_name;
var flag;



$(document).ready(function() {
$(document).ready(function() {
	context = canvas.getContext("2d");
});


function Start() {

	myAudio = new Audio('resource\\pac-man-intro.mp3');
	myAudio.loop = true;
	myAudio.play();

	inGame=true;
	lives=5;
	numOfMonsters=input_monsters;
	board = new Array();
	board1 =new Array();
	board2=new Array();
	score = 0;
	flag=1;

	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	init_side_setting()
	var ball_5 = Math.round(food_remain*0.6);
	var ball_15 = Math.round(food_remain*0.3);
	var ball_25 = Math.round(food_remain*0.1);
	var pacman_remain = 1;

	start_time = new Date();

	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		board1[i]=new Array();
		board2[i]=new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == 7 && j == 8) ||
				(i == 7 && j == 9) 
			) {
				board[i][j] = 4;
				board1[i][j] = 4;
				board2[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * ball_5) / cnt) {
					ball_5--;
					board[i][j] = 1;
					board1[i][j] = 0;
					board2[i][j] = 0;

					food_remain--;
				}
				else if (randomNum < (1.0 * (ball_5 + ball_15)) / cnt) {
					ball_15--;
					food_remain--;
					board[i][j] = 10;
					board1[i][j] = 0;
					board2[i][j] = 0;
				}

				else if (randomNum < (1.0 * (ball_5 + ball_15+ball_25)) / cnt) {
					ball_25--;
					food_remain--;
					board[i][j] = 20;
					board1[i][j] = 0;
					board2[i][j] = 0;
				}
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
					board1[i][j] = 0;
					board2[i][j] = 0;
				}
				 else {
					board[i][j] = 0;
					board1[i][j] = 0;
					board2[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	numMonsters=numOfMonsters
	mon_num=0;
	while (numMonsters>0){
		mon_num++;
		board1[0][0] = 50;
		if (mon_num==1){
			shape1=new Object();
			shape1.i=0;
			shape1.j=0;

		}
		else if (mon_num==2){
			shape2=new Object();
			shape2.i=0;
			shape2.j=board.length-1;
		}
		else if  (mon_num==3){
			shape3=new Object();
			shape3.i=board.length-1;
			shape3.j=0;
		}
		else if  (mon_num==4){
			shape4=new Object();
			shape4.i=board.length-1;
			shape4.j=board.length-1;
		}			
		numMonsters--;
	}
	numCandy1=numCandy;
	while (numCandy1>0){
		numCandy1--;
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 55;
		var emptyCell_clock = findRandomEmptyCell(board);
		board[emptyCell_clock[0]][emptyCell_clock[1]] = 60;
		var emptyCell_fish = findRandomEmptyCell(board2);

	}
	board2[emptyCell_fish[0]][emptyCell_fish[1]] =100;
	shapeFish.i=emptyCell_fish[0];
	shapeFish.j=emptyCell_fish[1];

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);

	interval = setInterval(UpdatePosition, 120);
	interval1= setInterval(UpdateMonsterPlace, 300);

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[key_up]) {
		return 1;
	}
	if (keysDown[key_down]) {
		return 2;
	}
	if (keysDown[key_left]) {
		return 3;
	}
	if (keysDown[key_right]) {
		return 4;
	}
}

function Draw(face) {
	canvas.width = canvas.width; //clean board
	balls_left=0;
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLive.value=lives;
	lbluser.value=u_name;
	var CellHeight = canvas.height/10;
    var CellWidth = canvas.width/10;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 55) 
			{//Candy
				var candy = new Image(10,10);
				candy.src = "resource\\candy.png";
				context.drawImage(candy,center.x-15, center.y-15, 0.75*CellHeight, 0.75*CellWidth);
		   }

		   if (board[i][j] == 60) 
		   {//clock
			   var clock = new Image(10,10);
			   clock.src = "resource\\clock.png";
			   context.drawImage(clock,center.x-15, center.y-15, 0.75*CellHeight, 0.75*CellWidth);
		  }

		  if (board2[i][j] ==100 && flag>0)  
		  {//clock
			  var fish = new Image(10,10);
			  fish.src = "resource\\fish.png";
			  context.drawImage(fish,center.x-15, center.y-15, 0.75*CellHeight, 0.75*CellWidth);
		 }

			if (board1[i][j] == 50)  
			{//Monster
				var enemy_img = new Image(10,10);
				enemy_img.src = "resource\\enemy_1.png";
				context.drawImage(enemy_img,center.x-15, center.y-15, 0.75*CellHeight, 0.75*CellWidth);

		   }

			if (board[i][j] == 2 && face=="down") {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle =pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			if (board[i][j] == 2 && face=="up") {
				context.beginPath();
				context.arc(center.x, center.y, 30,  1.15 * Math.PI,0.85* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			if (board[i][j] == 2 && face=="left") {
				context.beginPath();
				context.arc(center.x, center.y, 30,   1.65 * Math.PI,1.35* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			if (board[i][j] == 2 && face=="right") {
				context.beginPath();
				context.arc(center.x, center.y, 30,  0.65 * Math.PI,2.35* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
			else if (board[i][j] == 1) 
			{//food 5
			   balls_left+=1;
			   context.beginPath();
			   context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
			   context.fillStyle = color_5; //color
			   context.fill();
		   }
		   else if (board[i][j] == 10) 
		   {//food 15
			balls_left+=1;
			  context.beginPath();
			  context.arc(center.x, center.y, 13, 0, 2 * Math.PI); // circle
			  context.fillStyle = color_15; //color
			  context.fill();
		  }

		  else if (board[i][j] == 20) 
		  {//food 25
		     balls_left+=1;
			 context.beginPath();
			 context.arc(center.x, center.y, 17, 0, 2 * Math.PI); // circle
			 context.fillStyle = color_25; //color
			 context.fill();
		  }
			 else if (board[i][j] == 4) {
				var wall = new Image(10,10);
				wall.src = "resource\\wall.png";
				context.drawImage(wall,center.x-15, center.y-15, 0.75*CellHeight, 0.75*CellWidth);
	


		  }
		 
		 

		}
	}
	if (balls_left == 0){
		myAudio.pause();
		window.clearInterval(interval);
		window.clearInterval(interval1);
		var answer = window.confirm("Winner!!!\n"+"do you want rematch?");
		if (answer){
			$(currentDisplayedDiv).hide();
			currentDisplayedDiv="#Game_setting";
			$("#Game_setting").show();
		}
		else {
		$("#packmen").hide();
		$("#welcome").show();  
		currentDisplayedDiv="#welcome";
		changeBackground("black")
		}
	}
}



function bestMove(shapeY){
	if (shapeY==null){return null}
	let x_monster=shapeY.i;
	let y_monster=shapeY.j;
	let x_pacmen=shape.i;
	let y_pacmen=shape.j;

	min_dis=100000;
	direction=null;
	alt_directions=[0,0,0,0] // left,right,up,down
	if (y_monster-1>=0 && board1[x_monster][y_monster - 1] != 4){
		distanceleft=Math.abs(x_monster-x_pacmen) + Math.abs((y_monster-1)-y_pacmen);
		distanceleft=Math.sqrt( distanceleft );
		if (distanceleft<min_dis){
			min_dis=distanceleft;
			direction="left";
			alt_directions[0]="left";
		}
		
	}
	if (y_monster+1<board[0].length && board1[x_monster][y_monster + 1] != 4){
		distanceright=Math.abs(x_monster-x_pacmen) + Math.abs((y_monster+1)-y_pacmen);
		distanceright=Math.sqrt( distanceright );
		if (distanceright<min_dis){
			min_dis=distanceright;
			direction="right";
			alt_directions[1]="right";
		}
	}
	if (x_monster-1>=0 && board1[x_monster-1][y_monster] != 4){
		distanceup=Math.abs((x_monster-1)-x_pacmen) + Math.abs(y_monster-y_pacmen);
		distanceup=Math.sqrt( distanceup );
		if (distanceup<min_dis){
			min_dis=distanceup;
			direction="up";
			alt_directions[2]="up";
		}
	}
	if (x_monster+1<board.length && board1[x_monster+1][y_monster] != 4){
		distancedown=Math.abs((x_monster+1)-x_pacmen) + Math.abs(y_monster-y_pacmen);
		distancedown=Math.sqrt( distancedown );
		if (distancedown<min_dis){
			min_dis=distancedown;
			direction="down";
			alt_directions[3]="down";
		}
	}
	if (direction!=null){
		return direction
	} // in case that min direction is found

	let random = Math.floor(Math.random() * alt_directions.length);
	while (alt_directions[random]==0){
		random = Math.floor(Math.random() * alt_directions.length);
	}
	return alt_directions[random];
}

function updateShape1(shapeXY,dir){
	board1[shapeXY.i][shapeXY.j]=0;
	if (dir=="left" && shapeXY.j-1>=0 && board1[shapeXY.i][shapeXY.j-1]==0  ){
		shapeXY.j=shapeXY.j-1;
	}
	else if (dir=="right" && shapeXY.j+1>=0 && board1[shapeXY.i][shapeXY.j+1]==0){
		shapeXY.j=shapeXY.j+1;
	}
	else if (dir=="up" && shapeXY.i-1>=0 && board1[shapeXY.i-1][shapeXY.j]==0){
		shapeXY.i=shapeXY.i-1;
	}
	else if (dir=="down" && shapeXY.i+1>=0 && board1[shapeXY.i+1][shapeXY.j]==0){
		shapeXY.i=shapeXY.i+1;
	}

	board1[shapeXY.i][shapeXY.j]=50;


}

function updateShape_fish(shapeXY,dir){
	board2[shapeXY.i][shapeXY.j]=0;
	if (dir=="left" && shapeXY.j-1>=0 && board2[shapeXY.i][shapeXY.j-1]==0  ){
		shapeXY.j=shapeXY.j-1;
	}
	else if (dir=="right" && shapeXY.j+1>=0 && board2[shapeXY.i][shapeXY.j+1]==0){
		shapeXY.j=shapeXY.j+1;
	}
	else if (dir=="up" && shapeXY.i-1>=0 && board2[shapeXY.i-1][shapeXY.j]==0){
		shapeXY.i=shapeXY.i-1;
	}
	else if (dir=="down" && shapeXY.i+1>=0 && board2[shapeXY.i+1][shapeXY.j]==0){
		shapeXY.i=shapeXY.i+1;
	}

	board2[shapeXY.i][shapeXY.j]=100;


}

function finishAlert(num){
	if (num==1){
		var answer = window.confirm("You are better then "+score+" points!\n"+"do you want rematch?");
	}
	if (num==2){
		myAudio.pause();
		var answer=window.confirm("Loser! "+"\n"+"do you want rematch?");

	}

	if (answer){
		$(currentDisplayedDiv).hide();
		currentDisplayedDiv="#Game_setting";
		$("#Game_setting").show();
	}
	else {
	$("#packmen").hide();
	$("#welcome").show();  
	currentDisplayedDiv="#welcome";
	changeBackground("black")

	}

}

function UpdateMonsterPlace(){
	if (numOfMonsters==1){
		var dir1=bestMove(shape1);
		updateShape1(shape1,dir1);
	}
	else if (numOfMonsters==2){
		var dir1=bestMove(shape1);
		var dir2=bestMove(shape2);
		updateShape1(shape1,dir1);
		updateShape1(shape2,dir2);
	}

	else if (numOfMonsters==3){
		var dir1=bestMove(shape1);
		var dir2=bestMove(shape2);
		var dir3=bestMove(shape3);
		updateShape1(shape1,dir1);
		updateShape1(shape2,dir2);
		updateShape1(shape3,dir3);
	}
	else if (numOfMonsters==4){
		var dir1=bestMove(shape1);
		var dir2=bestMove(shape2);
		var dir3=bestMove(shape3);
		var dir4=bestMove(shape4);
		updateShape1(shape1,dir1);
		updateShape1(shape2,dir2);
		updateShape1(shape3,dir3);
		updateShape1(shape4,dir4);

	}
	var best_fish=bestMove(shapeFish);
	updateShape_fish(shapeFish,best_fish);

	Draw(face);
	
}


function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	var clock_time=0
	if (x == 1) {
		face="left"
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		face="right"
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		face="up"
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		face="down"
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score+=5;
	}
	else if (board[shape.i][shape.j] == 10) {
		score+=15;
	}
	else if (board[shape.i][shape.j] == 20) {
		score+=25;
	}
	else if (board[shape.i][shape.j] == 55) {
		score+=50;
	}
	else if (board[shape.i][shape.j] ==60) {
		clock_time-=5000;
	}
	if ((shape1!=null && shape.i==shape1.i && shape.j==shape1.j) || 
	 (shape2!=null && shape.i==shape2.i && shape.j==shape2.j) ||
	 (shape3!=null && shape.i==shape3.i && shape.j==shape3.j) ||
	 (shape4!=null && shape.i==shape4.i && shape.j==shape4.j) ) {

		score-=10;
		var emptyCell = findRandomEmptyCell(board);
		while (emptyCell[0]==0 && emptyCell[1]==0){
			emptyCell = findRandomEmptyCell(board);
		}
		if (shape1!=null && shape.i==shape1.i && shape.j==shape1.j){
			board1[shape1.i][shape1.j]=0
			shape1.i=0;
			shape1.j=0;
		}
		if (shape2!=null &&  shape.i==shape2.i && shape.j==shape2.j){
			board1[shape2.i][shape2.j]=0
			shape2.i=0;
			shape2.j=0;
		}
		if (shape3!=null &&  shape.i==shape3.i && shape.j==shape3.j){
			board1[shape3.i][shape3.j]=0
			shape3.i=0;
			shape3.j=0;
		}
		if (shape4!=null &&  shape.i==shape4.i && shape.j==shape4.j){
			board1[shape4.i][shape4.j]=0
			shape4.i=0;
			shape4.j=0;
		}

		
		board1[0][0]=50;
		lives--;
		if (lives<=0){
			myAudio.pause();
			window.clearInterval(interval);
			window.clearInterval(interval1);
			finishAlert(2);
		}
		board[shape.i][shape.j]=0;
		shape.i=emptyCell[0];
		shape.j=emptyCell[1];
	}
	if (shapeFish!=null &&  shape.i==shapeFish.i && shape.j==shapeFish.j &&flag==1){
		board2[shapeFish.i][shapeFish.j]=0
		lives+=1;
		flag=0;

	}

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000+clock_time;
	if (time_elapsed>=game_time){
		myAudio.pause();
		window.clearInterval(interval);
		window.clearInterval(interval1);
		finishAlert(1);
	}

	 else {
		Draw(face);
	}
}

function scrollWin(x, y) {
			  window.scrollBy(x, y);
			  window.top=0;
		}



function randomInteger(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
		}


	$('#input_up').keypress(function (e) {
				var keyCode = (window.event) ? e.which : e.keyCode;

			$('#input_up').val('')


		});

	$('#input_down').keydown(function (e) {
		  		var keyCode = (window.event) ? e.which : e.keyCode;

	  		$('#input_down').val('')

			});

	  $('#input_left').keydown(function (e) {
		  		var keyCode = (window.event) ? e.which : e.keyCode;

	  		$('#input_left').val('')

			});

	  $('#input_right').keydown(function (e) {
		  		var keyCode = (window.event) ? e.which : e.keyCode;

	  		$('#input_right').val('')


			});

	  $('#input_bolls').keydown(function (e) {
		  		var keyCode = (window.event) ? e.which : e.keyCode;

	  		$('#input_bolls').val('')

			});

	  $('#input_length').keydown(function (e) {
		  		var keyCode = (window.event) ? e.which : e.keyCode;


	});

			 $('#input_monsters').keydown(function (e) {
		  		var keyCode = (window.event) ? e.which : e.keyCode;

	  		$('#input_monsters').val('')

			});

function setMyKeyDownListener() {
		window.addEventListener(
		   	"keydown",
function(event) {MyFunction(event.key)}
	 	)}

function MyFunction (the_Key) {
	alert("Key pressed is: "+the_Key);
}



function changeBackground(color) {
   document.body.style.background = color;
}	
function changeBackgroundPhoto() {
	$('body').css('background-image', 'url(setting.jpg)');
}	
$(document).ready(function ()
{
	$("#ShowModal").click(function ()
	{
	   $("#welcome").hide();
	   $("#body_loggin").show();
	   currentDisplayedDiv="#body_loggin";
	});
	$("#closeButton").click(function ()
	{
	   $(currentDisplayedDiv).hide();
	   $("#welcome").show();
	   currentDisplayedDiv="#welcome";
	});

	$("#menu_welcome").click(function ()
	{
		
		if (inGame){
			myAudio.pause();
			window.clearInterval(interval);
			window.clearInterval(interval1);
			inGame=false;
			$("#packmen").hide();
			changeBackground("black");
		}
	   $(currentDisplayedDiv).hide();
	   $("#welcome").show();
	   currentDisplayedDiv="#welcome";
	   

	});

	$("#menu_register").click(function ()
	{
		if (inGame){
			myAudio.pause();
			window.clearInterval(interval);
			window.clearInterval(interval1);
			inGame=false;
			$("#packmen").hide();
			changeBackground("black");
		}
	   $(currentDisplayedDiv).hide();
	   $("#register").show();
	   currentDisplayedDiv="#register";
	});
	$("#menu_loggin").click(function ()
	{
		if (inGame){
			myAudio.pause();
			window.clearInterval(interval);
			window.clearInterval(interval1);
			inGame=false;
			$("#packmen").hide();
			changeBackground("black");
		}
		
	   $(currentDisplayedDiv).hide();
	   $("#body_loggin").show();
	   currentDisplayedDiv="#body_loggin";
	});


   $("#menu_about").click(function ()
   {
	if (inGame){
		myAudio.pause();
		window.clearInterval(interval);
		window.clearInterval(interval1);
		inGame=false;
		$("#packmen").hide();
		changeBackground("black");
	}
	  $(currentDisplayedDiv).hide();
	  $("#about").show();
	  currentDisplayedDiv="#about";
   });

   $("#ShowRegister").click(function ()
   {
	  $(currentDisplayedDiv).hide();
	  $("#register").show();
	  currentDisplayedDiv="#register";
   });

   $("#submit_loggin").click(function ()
   {
	if (validateform2()){
	$(currentDisplayedDiv).hide();
	currentDisplayedDiv="#Game_setting";
	$("#Game_setting").show();
	}});

});
$(document).ready(function ()
{

   $("#ShowLogin").click(function ()
   {
	  $("#welcome").hide();
	  $("#body_loggin").show();
	  currentDisplayedDiv="#body_loggin";
	  
	  
   });

});
$("#set").click(function ()
{
   game_time= $('#input_length').val();
   if(game_time<60) game_time=60;
   game_time=parseFloat(game_time);
   input_monsters=$('#input_monsters').val();
   input_bolls=$('#input_bolls').val();
   color_5=$('#5_colorpicker').val();
   color_15=$('#15_colorpicker').val();
   color_25=$('#25_colorpicker').val();

   if(game_time==null || input_monsters=='' || input_bolls==''  || color_5==null || color_15==null ||color_25==null){
	alert( "one or more attribute is empty")
   }

	else{  
    $("#Game_setting").hide();
	$("#packmen").show();
	currentDisplayedDiv="#packmen";	
	Start()
}





   //startgame();
});
$(document).ready(function ()
{

   $("#random").click(function ()
   {

	$('#input_up').val(38)
	$('#input_down').val(40)
	$('#input_right').val(39)
	$('#input_left').val(37)
	game_time= $('#input_length').val(randomInteger(60, 60*10))
	if(game_time<60) game_time=60;
	game_time=parseFloat(game_time);
	input_monsters=	$('#input_monsters').val(randomInteger(1, 4))
	input_bolls=	$('#input_bolls').val(randomInteger(50, 90))
	color_5=$('#5_colorpicker').val(getRandomColor());
	color_15=$('#15_colorpicker').val(getRandomColor());
	color_25=$('#25_colorpicker').val(getRandomColor());
	key_up=38;
	key_down=40;
	key_left=37;
	key_right=39;


   });

});
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	color += letters[Math.floor(Math.random() * 16)];
}
	return color;
}
	 
});

function passwordValidates( pass ) {
	let count = 0;
 
	var hasNumber = /\d/;   
	var hasChars= /[a-zA-Z]/;
 
	if( 7 <= pass.length )
	{
	   if( hasNumber.test(pass) )
		  count ++;
	   if( hasChars.test(pass) )
		  count ++;
	}
 
	return count >= 1;
 }
	 function saveUser(u_name,f_name,l_name,password,email,Day,Month,Year){
	   const user={
	   username: u_name,
	   firstName: f_name,
	   lastName: l_name,
	   password: password,
	   email: email,
	   day: Day,
	   month: Month,
	   year: Year,
	   }
	   window.localStorage.setItem(u_name,JSON.stringify(user));
 
	 }
 
	 function validateform(){
	   var u_name=document.validateForm.username.value;
	   var f_name=document.validateForm.firstname.value;
	   var l_name=document.validateForm.lastname.value;
	   var password=document.validateForm.password.value;
	   var email=document.validateForm.email.value;
	   var Day=document.getElementById("dob-day").value;
	   var Month=document.getElementById("dob-month").value;
	   var Year=document.getElementById("dob-year").value;
	   bool=false;     
	   user=window.localStorage.getItem(u_name);
	   console.log(user);
	   if (user!=null){
		 bool=true;
		 alert ("user name is allready exist, please choose another name")
	   }
 
	   if (u_name==null || u_name=="" ){
		 bool=true;
		 alert("user name supposed to be at least 1 characters")
	   }
	   if (f_name==null || f_name=="" || /\d/.test(f_name)){
		 bool=true;
		 alert("first name supposed to be at least 1 characters without numbers")
	   }
	   if (l_name==null || l_name=="" || /\d/.test(l_name)){
		 bool=true;
		 alert("last name supposed to be at least 1 characters without numbers")
	   }
	   if (email==null || email=="" || l_name.length<3 || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
		 bool=true;
		 alert("invalid email address!")
	   }
	   if (Day=="" || Month=="" || Year==""){
		 bool=true;
		 alert("Birthdate is not complete!")
	   } 
	   if (!(passwordValidates(password))){
		 bool=true;
		 alert("invalid password!")
	   }
	   if (!bool){
		 saveUser(u_name,f_name,l_name,password,email,Day,Month,Year);
	   }
	}


	function validateform2(){
		u_name=document.getElementById("u_id").value;
		var passwo=document.getElementById("p_id").value;
		if (u_name=="k" && passwo=="k"){
			return true;
			
		}
		if (u_name==null || u_name==""  ){
			bool=true;
			alert("user name supposed to be at least 1 characters")
		  }
		if (passwo==null || passwo=="" || passwo.length<6 ){
			bool=true;
			alert("invalid password");
		}
		let c=JSON.parse(window.localStorage.getItem(u_name));
		if (c==null){
			alert("user name or password doesn't correct!");
		}
		else{
			if (c.password!=passwo){
				alert("user name or password doesn't correct!");
			}
			else{
				return true
			}
		}
	
		console.log(c);
		
	}

	function init_side_setting() {

		$('#Move_up').val("Move_up: "+CharCode(key_up));
		$('#Move_down').val("Move down: "+CharCode(key_down));
		$('#Move_right').val("Move right: "+CharCode(key_right));
		$('#Move_left').val("Move_left: "+CharCode(key_left));
		$('#food_ball').val("balls: "+input_bolls);
		$('#side_5_colorpicker').val(color_5);
		$('#side_15_colorpicker').val(color_15);
		$('#side_25_colorpicker').val(color_25);
		$('#side_Game_length').val("total time: "+game_time);
		$('#side_monsters').val("monsters: "+input_monsters);
	
	}
	function CharCode(code) {
		code= parseInt(code, 10);
		if(code==38)
			return "arrow up";
		else if(code==40)
			return "arrow down";
		else if(code==37)
		   return "arrow left";
		else if (code==39)
		   return "arrow right";
		else
			return String.fromCharCode(code);
		
	}

	window.addEventListener("keydown", function(e) {
		// space and arrow keys
		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	}, false);

	function updateUp(event, element) {
		key_up = event.keyCode;

	}

	function updateDown(event, element) {
		key_down = event.keyCode;

	}
	function updateRight(event, element) {
		key_right = event.keyCode;

	}
	function updateLeft(event, element) {
		key_left = event.keyCode;

	}

	function closeAbout(){
		window.addEventListener("click", function(event) {
			if(event.target ==document.getElementById("about")){
				$(currentDisplayedDiv).hide();
				$("#welcome").show();
				currentDisplayedDiv="#welcome";
			}
		});

	
		$(document).keydown(function(e) {
		var code = e.keyCode || e.which;
		if (code == 27){
			$(currentDisplayedDiv).hide();
			$("#welcome").show();
			currentDisplayedDiv="#welcome";

		}

		});
	
	}




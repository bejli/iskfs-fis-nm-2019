var http = require("http"); //knjiznica za komuniciranje s Rasberry PI
var firmata = require("firmata"); //za komuniciranje s Arduinom

var board = new firmata.Board ("/dev/ttyACM0", function(){//objekt za dostopanje do pinov, 
                                                            //1.parameter kateri device smo uporabili,
                                                            //2. parameter funkcija za inicial. plosce (boarda)
    board.pinMode(13,board.MODES.OUTPUT); //pin 13 je output
    board.pinMode(10,board.MODES.OUTPUT); //pin 13 je output
    board.pinMode(8,board.MODES.OUTPUT);
    console.log("Priklop na Arduino");
        
});

http.createServer(function(req, res){   //funkcija s parametroma request (kaj pride notri), response
    
    var parts = req.url.split("/"); // delamo z request: http://192.168.1.133:8080/1 - splita po /
    var operator = parseInt(parts[1],10); // parseInt pretvori iz String v Int, [1] pomeni da parsa drugi del besedila
    
    if (operator == 0){ // ce je operator = 0
        console.log("Izključevanje LED1");
        board.digitalWrite(13, board.LOW); // ugasni tok na portu 13
    }
     else if (operator == 1){
        console.log("Vključevanje LED1");
        board.digitalWrite(13, board.HIGH);
    }
    else if (operator == 2){
        console.log("Izključevanje LED2");
        board.digitalWrite(8, board.LOW);
    }
    else if (operator == 3){
        console.log("Izključevanje LED2");
        board.digitalWrite(8, board.HIGH);
    }
        res.writeHead(200,{"Content-Type":"text/plain"}); //delamo z response
        res.end("The value of operator: "+operator);
    }).listen(8080,"192.168.1.133"); // vpisemo ip naprave6
   
var http = require("http"); //knjiznica za komuniciranje s Rasberry PI
var firmata = require("firmata"); //za komuniciranje s Arduinom

var board = new firmata.Board ("/dev/ttyACM0", function(){//objekt za dostopanje do pinov, 
                                                            //1.parameter kateri device smo uporabili,
                                                            //2. parameter funkcija za inicial. plosce (boarda)
    board.pinMode(13,board.MODES.OUTPUT); //pin 13 je output
    board.pinMode(10,board.MODES.OUTPUT); //pin 13 je output
        
});
var status = 0;
function blink(){
    if (status == 0) {
        board.digitalWrite(13, board.HIGH); // ugasni tok na portu 13
        board.digitalWrite(10, board.LOW); // ugasni tok na portu 13
        status = 1;
    }
    else {
        
        board.digitalWrite(13, board.LOW);
        board.digitalWrite(10, board.HIGH);
        status = 0;
    }
}

http.createServer(function(req, res){   //funkcija s parametroma request (kaj pride notri), response
    
    var parts = req.url.split("/"); // delamo z request: http://192.168.1.133:8080/1 - splita po /
    var operator = parseInt(parts[1],10); // parseInt pretvori iz String v Int, [1] pomeni da parsa drugi del besedila
    setInterval(blink,1000);
    /*
    if (operator == 0){ // ce je operator = 0
        board.digitalWrite(13, board.LOW); // ugasni tok na portu 13
        board.digitalWrite(10, board.LOW); // ugasni tok na portu 13
    }
     else if (operator == 1){
        board.digitalWrite(13, board.HIGH);
        board.digitalWrite(10, board.HIGH);
    }
    */
        res.writeHead(200,{"Content-Type":"text/plain"}); //delamo z response
        res.end("The value of operator: "+operator);
    }).listen(8080,"192.168.1.133"); // vpisemo ip naprave6
   
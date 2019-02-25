var http = require("http"); //knjiznica za komuniciranje s Rasberry PI
var firmata = require("firmata"); //za komuniciranje s Arduinom

var board = new firmata.Board ("/dev/ttyACM0", function(){//objekt za dostopanje do pinov, 
                                                            //1.parameter kateri device smo uporabili,
                                                            //2. parameter funkcija za inicial. plosce (boarda)
    board.pinMode(13,board.MODES.OUTPUT); //pin 13 je output
    board.pinMode(8,board.MODES.OUTPUT);
    console.log("Priklop na Arduino");
        
});

http.createServer(function(req, res){   //funkcija s parametroma request (kaj pride notri), response
    
    var deli = req.url.split("/"); // delamo z request: http://192.168.1.133:8080/1 - splita po /
    var operator1 = parseInt(deli[1],10);
    var operator2 = parseInt(deli[2],10);
    
    if (operator1 == 0){ // ce je operator = 0
        console.log("Izključevanje LED1");
        board.digitalWrite(13, board.LOW); // ugasni tok na portu 13
    }
    if (operator1 == 1){
        console.log("Vključevanje LED1");
        board.digitalWrite(13, board.HIGH);
    }
    if (operator2 == 0){
        console.log("Izključevanje LED2");
        board.digitalWrite(8, board.LOW);
    }
    if (operator2 == 1){
        console.log("Vključevanje LED2");
        board.digitalWrite(8, board.HIGH);
    }
        res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"}); //delamo z response
        res.write("Za test vpišite v brskalnikovo vrstico z naslovom: http://192.168.1.133:8080/1/1 <br>");
        res.write("ali: http://192.168.1.133:8080/0/0 <br>");
        
        res.end("Vrednost operatorja1:"+operator1 + "<br>"+"Vrednost operatorja2:"+operator2);
    }).listen(8080,"192.168.1.133"); // vpisemo ip naprave6
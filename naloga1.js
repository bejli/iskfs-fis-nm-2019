var http = require("http").createServer(handler);
var io = require("socket.io").listen(http);
var fs = require("fs"); 
var firmata = require("firmata"); 

console.log("startamo JS kodo"); 

var board = new firmata.Board("/dev/ttyACM0",function() {
    console.log("Povezovanje na Arduino..."); 
    board.pinMode(13, board.MODES.OUTPUT);
    board.pinMode(12, board.MODES.OUTPUT);
    board.pinMode(11, board.MODES.OUTPUT);
    board.pinMode(10, board.MODES.OUTPUT);
});

function handler(req,res) {
    fs.readFile(__dirname + "/naloga1.html", function (err,data) {
        if (err) {
           res.writeHead(500,{"content-type": "text/plain"});
           return res.end("Napaka pri nalaganju strani"); 
        }
        res.writeHead(200);
        res.end(data);
    });
}
http.listen(8080); 

io.sockets.on("connection",function(socket) {
    socket.on("ukazArduinu", function(stUkaza) {    // tukaj obravnavamo socket
        if(stUkaza == "0") {
            board.digitalWrite(10, board.LOW);
        }
        if(stUkaza == "1") {
            board.digitalWrite(10, board.HIGH);
        }
        if(stUkaza == "2") {
            board.digitalWrite(11, board.LOW);
        }
        if(stUkaza == "3") {
            board.digitalWrite(11, board.HIGH);
        }
        if(stUkaza == "4") {
            board.digitalWrite(12, board.LOW);
        }
        if(stUkaza == "5") {
            board.digitalWrite(12, board.HIGH);
        }
        if(stUkaza == "6") {
            board.digitalWrite(13, board.LOW);
        }
        if(stUkaza == "7") {
            board.digitalWrite(13, board.HIGH);
        }
    }); 
}); 
    
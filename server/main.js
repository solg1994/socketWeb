// para crear un servidor hacemos esto:
var express = require ('express');
var app = express ();
// creamos la variable de ervidor
var server = require ('http').Server(app);
var io = require ('socket.io')(server);

var messages = [{
  id: 1,
  text:"Programaciòn Distribuida I",
  author: "Bienvenid@ a..."
}];

app.use(express.static('public'));

//cuando reciba un get en la ruta raiz, active la otra funcion
//¿Que hace una API REST?: escucha las rutas que colocamos en el navegador
app.get('/',function(req,res){
  res.status(200).send("Hello chiquis");
});

//servidor de sockets = io
io.on('connection',function (socket){
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages',messages);
  socket.on('new_message',function(data){
    messages.push(data);
    io.sockets.emit('messages',messages);
  });
});

//siempre se deja a lo ultimo del programa
server.listen(8080,function(){
  console.log("Servidor corriendo en http://localhost:8080");
});

//Lo podriamos tomar como el cliente, ya que cuando nosotros ingresemos a esta pag
//nos va a enviar una soliciud al servidor 8080
var socket = io.connect('http://localhost:8080',{'forceNew':true});
//esta parte serian los eventos =>
//si escucha mensajes
socket.on('messages',function(data){
  console.log(data);
  render(data);
})

function render(data){

  var html = data.map (function(data,index){
      return(`<div>
            <strong>${data.author}</strong>
            <em>${data.text}</em>
            </div>`);
  }).join(" ");
  document.getElementById('messages').innerHTML = html;
}

function addMessage(m){
  var payload = {
    author : document.getElementById('username').value,
    text : document.getElementById('texto').value
  };

  socket.emit('new_message',payload);
  return (false);
}

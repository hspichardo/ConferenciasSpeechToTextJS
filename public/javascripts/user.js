const domain = 'meet.jit.si';
const options = {
    roomName: 'ConferenciaTestT2S',
    width: 700,
    height: 700,
    userInfo: {
        email: 'user1@user1.com',
        displayName: 'Usuario1'
    },
    parentNode: document.querySelector('#meet')
};
const api = new JitsiMeetExternalAPI(domain, options);


window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");
    const result = document.getElementById("result");
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (typeof SpeechRecognition === "undefined") {
      button.remove();
      const message = document.getElementById("message");
      message.removeAttribute("hidden");
      message.setAttribute("aria-hidden", "false");
    } else {
        button.setAttribute('class','btn btn-info');
        var listening = false;
        const recognition = new SpeechRecognition();
       // console.log(recognition);
        recognition.lang = "es-ES";
        var start = () => {
            recognition.start();
            button.setAttribute('class','btn btn-danger');
      button.textContent = "Stop listening";
        };
        var stop = () => {
            recognition.stop();
            button.setAttribute('class','btn btn-info');

            

               $.ajax({
                    url: "http://localhost:3000/users/addTranscript",
                    data: {"transcript": document.getElementsByClassName("final")[0].textContent},
                    type: "POST",
                    dataType: "json",
                    success: function(data){
                     alert('guardado los datos');
                    },
                    complete: function(){
                   // $('#result').css('visibility','hidden');
                    }
                    }); //de $.ajax
           
      button.textContent = "Start listening";
        };
        const onResult = event => {
            result.innerHTML = "";
      for (const res of event.results) {
        const text = document.createTextNode(res[0].transcript);
        const p = document.createElement("p");
        if (res.isFinal) {
          p.classList.add("final");
        }
        p.appendChild(text);
        result.appendChild(p);
        
      }
        };
        recognition.continuous = true;
          recognition.interimResults = true;
          recognition.addEventListener("result", onResult);
          button.addEventListener("click", () => {
            listening ? stop() : start();
            listening = !listening;
          });
    }
   
  });

  function muestraReloj() {
    var fechaHora = new Date();
    var horas = fechaHora.getHours();
    var minutos = fechaHora.getMinutes();
    var segundos = fechaHora.getSeconds();
  
    if(horas < 10) { horas = '0' + horas; }
    if(minutos < 10) { minutos = '0' + minutos; }
    if(segundos < 10) { segundos = '0' + segundos; }
  
    document.getElementById("reloj").innerHTML = horas+':'+minutos+':'+segundos;
  }
  
  window.onload = function() {
    setInterval(muestraReloj, 1000);
  }
  
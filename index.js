function init() {

  var getAudioContext = function() {
    var context = ( window.AudioContext    || window.webkitAudioContext ||
                    window.mozAudioContext || window.msAudioContext );
    return new context();
  }

  navigator.getMedia = (
      navigator.getUserMedia    || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia );


  var context = getAudioContext();
  var options = {'audio': true, 'video': false};

  navigator.getMedia(options,
    function streamOk(stream) {
      var mic = context.createMediaStreamSource(stream);
      var filter = context.createDelay(5.0);

      mic.connect(filter);
      filter.connect(context.destination);

      // Handle slider
      var delay  = document.getElementById('delay');
      var slider = document.getElementById('slider');
      
      slider.onchange = function(e) {
        filter.delayTime.value = slider.value;
        delay.innerHTML = slider.value;
      };

      // Dispatch one change to set the current delay:
      slider.onchange(slider);
    },

    function errorHandler(err) {
      console.log('> ERROR ', err.stack || String(err));
    }
  );
}

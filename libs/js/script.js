 
$(document).ready(function(){
      $('#submitbtn').click(function() {
        $.ajax({
          url:'libs/php/findNearByWeather.php',
          type:'POST',
          dataType:'json',
          data: {
            lat: $('#lat').val(),
            lng: $('#lng').val(),
        },
        success: function(result) {
            console.log(result);
          $('#stationname').html(result['data']['stationName']);
          $('#temperature').html(result['data']['temperature']);
          $('#humidity').html(result['data']['humidity']);
        },
        error: function (err) {
            console.log(err);
        },
    });
  }); 
    
  $('#earthquakesBtn').click(function() {
    
    $.ajax({
      url:'libs/php/earthquakesInfo.php',
      type:'POST',
      dataType:'json',
      data: {
        north: $('#earthnorth').val(),
        south: $('#earthsouth').val(),
        east: $('#eartheast').val(),
        west: $('#earthwest').val(),
      },
      success: function(result) {
          console.log(result);
        $('#datetime').html(result['data'][0]['datetime']);
        $('#depth').html(result['data'][0]['depth']);
        $('#magnitude').html(result['data'][0]['magnitude']);
        $('#latitude').html(result['data'][0]['lat']);
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  $('#weatherBtn').click(function() {
    $.ajax({
      url:'libs/php/weatherInfo.php',
      type:'POST',
      dataType:'json',
      data: {
        north: $('#north').val(),
        south: $('#south').val(),
        east: $('#east').val(),
        west: $('#west').val(),
      },
      success: function(result) {
          console.log(result);
        $('#stationname').html(result['data'][0]['stationName']);
        $('#temperature').html(result['data'][0]['temperature']);
        $('#humidity').html(result['data'][0]['humidity']);
        $('#clouds').html(result['data'][0]['clouds']);
        $('#weathercondition').html(result['data'][0]['weatherCondition']);
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});



$(function() {
// COLOR GENERATOR
  function randomColor(){
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var color = `rgb(${red}, ${green}, ${blue})`;
    return color;
  }

  var colors = [];

  function randomColors(num){
    for (var i=1; i<=num; i++){
      var color = randomColor();
      colors.push(color);
    }
    return colors;
  }

  $('#start').on('click', function(){
    $(this).parent().hide();
    $('#generator').css('display', 'block');
    $('#color1').css()
  });

  $('h1').on('click', function(){
    $('#generator').css('display', 'none');
    $('#landing').show();
  });

//  FONTS GENERATOR

});

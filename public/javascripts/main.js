$(function() {

// COLOR GENERATOR functions
  function randomColor(){
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var color = `rgb(${red}, ${green}, ${blue})`;
    return color;
  }
  var colors = [];

  var num = $('#color-number').val();

  function randomColors(val){
    for (var i=1; i<=val; i++){
      var color = randomColor();
      colors.push(color);
    }
    return colors;
  }

  // COLOR Generator jQuery

  $('#start').on('click', function(){
    $(this).parent().hide();
    randomColors(num);
    $('#generator').css('display', 'block');
    $('#color1').css('background-color', `${colors[0]}`);
    $('#color2').css('background-color', `${colors[1]}`);
    $('#color3').css('background-color', `${colors[2]}`);
    $('#color4').css('background-color', `${colors[3]}`);
    $('#color5').css('background-color', `${colors[4]}`);
    $('#color6').css('background-color', `${colors[5]}`);
  });

  $('h1').on('click', function(){
    $('#generator').css('display', 'none');
    $('#landing').show();
  });

  // SET COLOR SWATCH HEIGHT
  //Runs on document load & on resize
  $(window).resize(function() {
    var swatchQuantity = $('.color-swatch').length;
    //50 is padding on #generator
    var totalSwatchHeight = $(window).height() - $('header').height() - 50;
    var singleSwatchHeight = totalSwatchHeight / swatchQuantity;
    $('.color-swatch').css('height', singleSwatchHeight+'px');
  }).resize();


  // FONTS GENERATOR

});

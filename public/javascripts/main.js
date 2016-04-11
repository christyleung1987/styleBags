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

  var num = $('#color-number').val() || 6;


  function randomColors(val){
    for (var i=1; i<=val; i++){
      var color = randomColor();
      colors.push(color);
    }
    return colors;
  }

  function colorsGenerator(){
    randomColors(num);
    $('#color1').css('background-color', `${colors[0]}`);
    $('#color2').css('background-color', `${colors[1]}`);
    $('#color3').css('background-color', `${colors[2]}`);
    $('#color4').css('background-color', `${colors[3]}`);
    $('#color5').css('background-color', `${colors[4]}`);
    $('#color6').css('background-color', `${colors[5]}`);
  }

  // COLOR Generator jQuery

  $('#start').on('click', function(){
    $(this).parent().hide();
    $('#generator').css('display', 'block');
    colors=[];
    colorsGenerator();
  });

  $('h1').on('click', function(){
    $('#generator').css('display', 'none');
    $('#landing').show();
  });

  // //C & DOWN, F & DOWN KEYPRESSES
  var keys = {67: false, 70: false, 40: false};
  $(document).keydown(function(e) {
    if (e.keyCode in keys) {
      keys[e.keyCode] = true;
      if (keys[40] && keys[67]) {
        console.log("c and down arrow pressed");
        colors = [];
        colorsGenerator();
      } else if (keys[40] && keys[70]) {
        console.log("f and down arrow pressed");
      }
    }
  }).keyup(function(e) {
    if (e.keyCode in keys) {
      keys[e.keyCode] = false;
    }
  });

  // change ammount of color divs shown based on user input
  $('#color-ammt').on('click', function(){
    console.log($('#color-number').val());
    colors = [];
    colorsGenerator();
    if ($('#color-number').val() < 4) {
      $('#color6').hide();
      $('#color5').hide();
      $('#color4').hide();
      colors.pop();
      colors.pop();
      colors.pop();
      console.log(colors);
    } else if ($('#color-number').val() < 5) {
      $('#color6').hide();
      $('#color5').hide();
      $('#color4').show();
      colors.pop();
      colors.pop();
      console.log(colors);
    } else if ($('#color-number').val() < 6) {
      $('#color6').hide();
      $('#color5').show();
      $('#color4').show();
      colors.pop();
      console.log(colors);
    } else {
      $('#color6').show();
      $('#color5').show();
      $('#color4').show();
      console.log(colors);
    }
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

$(function() {
// MY BAGS DROPDOWN
$('#bags').on('click', function(){
  $('aside').toggleClass('hidden');
  $('#color-generator').toggleClass('col-md-6 col-md-5');
  $('#gallery').toggleClass('col-md-6 col-md-5');
  $('#fonts').toggleClass('col-md-6 col-md-5');
});

var color;

// COLOR GENERATOR functions
  function randomColor(){
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    color = `rgb(${red}, ${green}, ${blue})`;
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
    $('#bags').removeClass('hidden');

    colors=[];
    colorsGenerator();
    $('#rgbs').val(colors);
  });

  $('#logo').on('click', function(){
    $('#generator').css('display', 'none');
    $('#bags').addClass('hidden');
    $('#landing').show();
  });



//  FONTS GENERATOR
  function fontGenerator(){
    var fonts = [];
    fonts.push($('#fontsArray').val());
    console.log(fonts);
    var fonts = fonts[0].toString();
    var fontsArray = fonts.split(",");
    console.log(fontsArray);
    var fontFamily1 = fontsArray[Math.floor(Math.random()*fontsArray.length)];
    var fontFamily2 = fontsArray[Math.floor(Math.random()*fontsArray.length)];
    var fontFamily3 = fontsArray[Math.floor(Math.random()*fontsArray.length)];

    var fontFamily1Plus = fontFamily1.replace(/ /g, "+");
    var fontFamily2Plus = fontFamily2.replace(/ /g, "+");
    var fontFamily3Plus = fontFamily3.replace(/ /g, "+");

    $('#fontsLink').html(`<link href='https://fonts.googleapis.com/css?family=${fontFamily2Plus}:400,400italic,700|${fontFamily1Plus}:400,400italic,700|${fontFamily3Plus}:400,400italic,700' rel='stylesheet' type='text/css'>`);
    $('article:nth-of-type(1)').css('font-family', `${fontFamily1}`);
    $('article:nth-of-type(2)').css('font-family', `${fontFamily2}`);
    $('article:nth-of-type(3)').css('font-family', `${fontFamily3}`);
    $('article:nth-of-type(1) h1').html(`${fontFamily1}`);
    $('article:nth-of-type(2) h1').html(`${fontFamily2}`);
    $('article:nth-of-type(3) h1').html(`${fontFamily3}`);
  }

  // console.log(fontTypes);

  // //C & DOWN, F & DOWN KEYPRESSES
  var keys = {67: false, 70: false, 39: false};
  $(document).keydown(function(e) {
    if (e.keyCode in keys) {
      keys[e.keyCode] = true;
      if (keys[39] && keys[67]) {
        colors = [];
        colorsGenerator();
        $('#rgbs').val(colors);
      } else if (keys[39] && keys[70]) {
        fontGenerator();
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
      $('#rgbs').val(colors);
    } else if ($('#color-number').val() < 5) {
      $('#color6').hide();
      $('#color5').hide();
      $('#color4').show();
      colors.pop();
      colors.pop();
      console.log(colors);
      $('#rgbs').val(colors);
    } else if ($('#color-number').val() < 6) {
      $('#color6').hide();
      $('#color5').show();
      $('#color4').show();
      colors.pop();
      console.log(colors);
      $('#rgbs').val(colors);
    } else {
      $('#color6').show();
      $('#color5').show();
      $('#color4').show();
      console.log(colors);
      $('#rgbs').val(colors);
    }
  });

  // Locking and unlocking color divs
  $('.fa-unlock').on('click', function(){
    $(this).parent().parent().toggleClass('locked');
    $(this).toggleClass('fa-lock fa-unlock');
  });

  $('.fa-lock').on('click', function(){
    console.log("lock clicked");
    $(this).parent().parent().toggleClass('locked');
    $(this).toggleClass('fa-lock fa-unlock');
  });



  // SET COLOR SWATCH & ASIDE HEIGHT
  //Runs on document load & on resize
  $(window).resize(function() {
    var swatchQuantity = $('.color-swatch').length;
    //50 is padding on #generator
    var totalSwatchHeight = $(window).height() - $('header').height() - 50;
    var singleSwatchHeight = totalSwatchHeight / swatchQuantity;
    $('.color-swatch').css('height', singleSwatchHeight+'px');

    var asideHeight = $(window).height() - $('header').height();
    $('aside').css('height', asideHeight+'px');
  }).resize();


});

$(function() {
// MY BAGS DROPDOWN
$('#bags').on('click', function(){
  $('aside').toggleClass('hidden');
  $('#color-generator').toggleClass('col-md-6 col-md-5');
  $('#gallery').toggleClass('col-md-6 col-md-5');
  $('#fonts').toggleClass('col-md-6 col-md-5');
});
$('#bags').one('click', function() {
  savedBags();
});

function savedBags(){
  $.ajax({
    url: '/colorBags',
    method: 'GET',
    data: {},
    dataType: 'json'
  })
  .done(function(colorbags) {
    displayColorBags(colorbags);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('Uhh oh');
    console.log(jqXHR, textStatus, errorThrown);
  })
}

function displayColorBags(colorbags) {
  if (!colorbags) {
    return;
  } else {
    //loop through colorbags
    for (var i = 0; i <= colorbags.length; i++) {
      var name = colorbags[i].name;
      var rgbTotal = colorbags[i].rgbs.length;
      $('aside').append(`<div class="colorbag"><h4>${name}</h4><div class="colorbag-rgb" id="colorbag${i}"></div></div>`);
      //loop through rgb array
      for (var j = 0; j <= rgbTotal; j++) {
        //-20 is left & right padding on aside
        var width = 100 / rgbTotal;
        $(`#colorbag${i}`).append(`<div class="rgb${j}" style="background-color:${colorbags[i].rgbs[j]};width:${width}%"></div>`);
      }
    }
  }
}

var colors = [];

// GENERATOR / GALLERY SWITCH
$('.switch').on('click', function() {
  $('#color-generator').toggleClass('hidden');
  $('#gallery').toggleClass('hidden');
})

var color;


// COLOR GENERATOR functions
  function randomColor(){
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    color = `rgb(${red}, ${green}, ${blue})`;
    return color;
    colors.push(color);
  }

  console.log(colors);

  var hexCodes = [];

  function rgb2hex(arr){
    var hexCodes=[];
      arr.forEach(function(color){
          var sepColorHexCodes=[];
          color = color.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            color.forEach(function(sepColor){
                var hexColor = ("0" + parseInt(sepColor,10).toString(16)).slice(-2);
                sepColorHexCodes.push(hexColor);
            })
          sepColorHexCodes.splice([0], 1);
          // sepColorHexCodes.toString();
          var hexColor = ("#" + ("0" + parseInt(sepColorHexCodes[0],16).toString(16)).slice(-2) + ("0" + parseInt(sepColorHexCodes[1],16).toString(16)).slice(-2) + ("0" + parseInt(sepColorHexCodes[2],16).toString(16)).slice(-2));
          hexCodes.push(hexColor);
      })
    $('#hexCodes').val(hexCodes);
  }


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

  //To check whether the color generator is locked. First if THIS div has both .color-swatch and .locked, do nothing, else run the color generator.
  // if ($(".color-swatch").siblings().hasClass("locked")) {
  // // logic here
  //   return false;
  // }


  // COLOR Generator jQuery

  $('#start').on('click', function(){
    $(this).parent().hide();
    $('#generator').css('display', 'block');
    $('#bags').removeClass('hidden');

    colors=[];
    colorsGenerator();

    rgb2hex(colors);
    $('#save-colors').val(colors);

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
    $('article:nth-of-type(1) #fontName').val(`${fontFamily1}`);
    $('article:nth-of-type(2) #fontName').val(`${fontFamily2}`);
    $('article:nth-of-type(3) #fontName').val(`${fontFamily3}`);
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

        rgb2hex(colors);
        $('#save-colors').val(colors);
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
    if ($('.color-swatch').siblings().hasClass('.color-swatch .locked')){
      console.log("I'm working!");
    }
      console.log($('#color-number').val());
      colors = [];
      colorsGenerator();
      rgb2hex(colors);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////
  var clickedDiv = []
  function clickDiv(){
    divNames.forEach(function(){
      if ($(".color-swatch").siblings().hasClass("locked")) {
        clickedDiv.push('#color[i]')
      }
    })
  }
  console.log(clickedDiv);
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


  // Setting font colors to gen colors
  $('.fontHeader').on('click', function() {

  });


});

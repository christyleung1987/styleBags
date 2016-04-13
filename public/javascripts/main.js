$(function() {

var fontPluses = [];

// MY BAGS DROPDOWN
$('#bags').one('click', function() {
  savedColorBags();
  savedFonts();
});
$('#bags').on('click', function(){
  $('aside').toggleClass('hidden');
  $('#color-generator').toggleClass('col-md-6 col-md-5');
  $('#gallery').toggleClass('col-md-6 col-md-5');
  $('#fonts').toggleClass('col-md-6 col-md-5');
});

// SHOW ALL
$('#userColorBags h4 span').on('click', function() {
  $('div[id^="colorbag"]:not(.always-visible)').toggleClass('hidden');
  if ($('div[id^="colorbag"]:nth-of-type(5)').hasClass('hidden')) {
    $('#userColorBags h4 span').html('show all▼');
  } else {
    $('#userColorBags h4 span').html('show less▲');
  }
});

$('#userFonts h4 span').on('click', function() {
  $('div[id^="savedFont"]:not(.always-visible)').toggleClass('hidden');
  if ($('div[id^="savedFont"]:nth-of-type(5)').hasClass('hidden')) {
    $('#userFonts h4 span').html('show all▼');
  } else {
    $('#userFonts h4 span').html('show less▲');
  }
})

// GET & DISPLAY SAVED COLORBAGS
function savedColorBags(){
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
    console.log(jqXHR, textStatus, errorThrown);
      $('#userColorBags').html("<p>You haven't saved any ColorBags.</p>")
  })
}

function displayColorBags(colorbags) {
  if (!colorbags) {
    return;
  } else {
    //loop through colorbags
    for (var i = colorbags.length; i--;) {
      var colorbag = colorbags[i];
      var name = colorbags[i].name;
      var rgbTotal = colorbags[i].rgbs.length;
      $('#userColorBags p').remove();
      $('#userColorBags').append(`<div id="colorbag${i}" class="savedColorbags" data-colorbag-id="${colorbag._id}"> <h5>${name}</h5><button class="btn" id="editSavedColorbag">Edit</button><button class="btn" id="deleteSavedColorbag">x</button><div id="bag-rgb${i}"></div> </div> `);
      if (i >= colorbags.length - 4) {
        $(`#colorbag${i}`).addClass('always-visible');
      } else {
        $(`#colorbag${i}`).addClass('hidden');
      }
      //loop through rgb array
      for (var j = 0; j <= rgbTotal; j++) {
        //-20 is left & right padding on aside
        var width = 100 / rgbTotal;
        $(`#bag-rgb${i}`).append(`<div id="rgb${j}" style="background-color:${colorbags[i].rgbs[j]};width:${width}%"></div>` );
      }
    }
  }
}

// DELETE colorbag from saved bags
  $('#userColorBags').on('click', '#deleteSavedColorbag', function(){
    var deleteColorbagId = $(this).parent().data('colorbag-id');
    console.log($(this).parent().data('colorbag-id'));
    $(this).parent().remove();
    deleteTodo(deleteColorbagId);
  })

  var deleteTodo = function(deleteColorbagId){
    $.ajax({
      url: '/colorbags/' + deleteColorbagId,
      method: 'DELETE',
      data: {}
    })
    .done(function(data) {
      console.log('Deleted colorbag: ', data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Uh oh');
      console.log(jqXHR, textStatus, errorThrown);
    })
    .always(function() {
    });
  }

function displaySixBags(colorbags) {
  if (!colorbags) {
    return;
  } else {
    // loop through colorbags
    var sixColor = [];
    for (var i = 1; i < 7; i++) {
      var colorData = Math.floor(Math.random()*colorbags.length);
      var name = colorbags[colorData].name;
      var rgbTotal = colorbags[colorData].rgbs.length;
      $(`#gallery .row .randcolor:nth-of-type(${i}) p`).remove();
      $(`#gallery .row .randcolor:nth-of-type(${i})`).append(`<div id="colorbag${colorData}"><h5>${name}</h5><div id="bag-rgb${colorData}"></div></div>`);

      //loop through rgb array
      for (var j = 0; j <= rgbTotal; j++) {
        //-20 is left & right padding on aside
        var width = 100 / rgbTotal;
        //$(`#bag-rgb${colorData}`).append(`<div id="rgb${j}" style="background-color:${colorbags[colorData].rgbs[j]};width:${width}%"></div>`);
      }
      sixColor.push(colorbags[colorData]);
    }
    // return(sixColor);
    console.log('107', sixColor);
  }
}

function sixBags(){
  $.ajax({
    url: '/colorBags/all',
    method: 'GET',
    data: {},
    dataType: 'json'
  })
  .done(function(colorbags) {
    displaySixBags(colorbags);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
      $('#userColorBags').html("<p>You haven't saved any ColorBags.</p>")
  })
}



// function displaySixBags(Colorbag){
//   console.log(Colorbag);
// }

// function displaySixBags(colorbags) {
//   console.log('49', colorbags);
//   colorbags.forEach(function(colorbag){
//     if (!colorbag) {
//       return;
//     } else {
//       var colorData = Math.floor(Math.random()*256);
//       for (var i = 0; i <= 6; i++) {
//         var name = colorbags[i].name;
//         $('aside').append(`<div class="colorbag"><h4>${name}</h4><div class="colorbag-rgb" id="colorbag${i}"></div></div>`);
//         for (var j = 0; j <= colorbags[i].rgbs.length; j++) {
//           console.log(`#colorbag${i}`)
//           $(`#colorbag${i}`).append(`<div class="rgb${j}" style="background-color:${colorbags[i].rgbs[j]};"></div>`);
//           console.log('61', colorData[i]);
//         }
//       }
//     }
//   })
// }
// displaySixBags();

// GET & DISPLAY FONTBAG
function savedFonts(){
  $.ajax({
    url: '/fonts',
    method: 'GET',
    data: {},
    dataType: 'json'
  })
  .done(function(fonts) {
    displayFontBag(fonts);
    var fontsForGoogle = fontPluses.join('|');
    $('#fontsLink').append(`<link href="https://fonts.googleapis.com/css?family=${fontsForGoogle}" rel="stylesheet" type="text/css">`);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
      $('#userFonts').html("<p>You haven't saved any fonts.</p>")
  })
}

function displayFontBag(fonts) {
  if (!fonts) {
    return;
  } else {
    for (var i = fonts.length; i--;) {
      var name = fonts[i].fontName;
      //for Google stylesheet
      var fontPlus = name.replace(/ /g, "+");
      fontPluses.push(fontPlus);
      $('#userFonts p').remove();
      $('#userFonts').append(`<div id="savedFont${i}"><h3 style="font-family:${name};">${name}</h3><button>x</button></div>`);
      if (i >= fonts.length - 4) {
        $(`#savedFont${i}`).addClass('always-visible');
      } else {
        $(`#savedFont${i}`).addClass('hidden');
      }
    }
  }
}

var colors = [];

// GENERATOR / GALLERY SWITCH
$('.switch').on('click', function() {
  $('#color-generator').toggleClass('hidden');
  $('#gallery').toggleClass('hidden');
  sixBags();
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

  console.log("colors",colors);

  var hexCodes = [];

  function rgb2hex(arr){
    hexCodes=[];
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
    $('#hexCode1').empty().append(`${hexCodes[0]}`);
    $('#hexCode2').empty().append(`${hexCodes[1]}`);
    $('#hexCode3').empty().append(`${hexCodes[2]}`);
    $('#hexCode4').empty().append(`${hexCodes[3]}`);
    $('#hexCode5').empty().append(`${hexCodes[4]}`);
    $('#hexCode6').empty().append(`${hexCodes[5]}`);
  }


  var num = 6 || $('#color-number').val();

  function randomColors(val){
    colors = [];
    for (var i=1; i<=val; i++){
      var color = randomColor();
      colors.push(color);
    }
    return colors;
  }

  function colorsGenerator(){
    randomColors(num);
      $('#color1').css('background-color', `${colors[0]}`)
      $('#rgbCode1').empty().append(`${colors[0]}`);
      $('#color2').css('background-color', `${colors[1]}`)
      $('#rgbCode2').empty().append(`${colors[1]}`);
      $('#color3').css('background-color', `${colors[2]}`)
      $('#rgbCode3').empty().append(`${colors[2]}`);
      $('#color4').css('background-color', `${colors[3]}`)
      $('#rgbCode4').empty().append(`${colors[3]}`);
      $('#color5').css('background-color', `${colors[4]}`)
      $('#rgbCode5').empty().append(`${colors[4]}`);
      $('#color6').css('background-color', `${colors[5]}`)
      $('#rgbCode6').empty().append(`${colors[5]}`);
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
    console.log("fonts",fonts);
    var fonts = fonts[0].toString();
    var fontsArray = fonts.split(",");
    console.log("fontsArray",fontsArray);
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
        if ($('#color-number').val() < 4) {
          $('#color6').hide();
          $('#color5').hide();
          $('#color4').hide();
          colors.pop();
          colors.pop();
          colors.pop();
          $('#rgbs').val(colors);
        } else if ($('#color-number').val() < 5) {
          $('#color6').hide();
          $('#color5').hide();
          $('#color4').show();
          colors.pop();
          colors.pop();
          $('#rgbs').val(colors);
        } else if ($('#color-number').val() < 6) {
          $('#color6').hide();
          $('#color5').show();
          $('#color4').show();
          colors.pop();
          $('#rgbs').val(colors);
        } else {
          $('#color6').show();
          $('#color5').show();
          $('#color4').show();
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

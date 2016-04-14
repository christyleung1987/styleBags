$(function() {

var fontPluses = [];

// MY BAGS DROPDOWN
$('#bags').on('click', function(){
  $('aside').toggleClass('hidden');
  asideHeight();
  $('#color-generator').toggleClass('col-md-6 col-md-5');
  $('#gallery').toggleClass('col-md-6 col-md-5');
  $('#fonts').toggleClass('col-md-6 col-md-5');
  if ($('aside').hasClass('hidden')) {
    $('#bags span').html('▼');
  } else {
    $('#bags span').html('▲');
  }
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

var userColorBagsCount;
// GET & DISPLAY SAVED COLORBAGS
function savedColorBags(){
  $.ajax({
    url: '/colorBags',
    method: 'GET',
    data: {},
    dataType: 'json'
  })
  .done(function(colorbags) {
    //we use this variable somewhere else
    userColorBagsCount = colorbags.length;
    if (userColorBagsCount == 0) {
      $('#userColorBags').html("<p>You haven't saved any ColorBags.</p>");
    } else {
      $('#appendSavedColorBags').empty();
      displayColorBags(colorbags);
    }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
      console.log('error');
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
      $('#appendSavedColorBags').append(`<div id="colorbag${i}" class="savedColorbags ${colorbag._id}" data-colorbag-id="${colorbag._id}" data-colorbag-name="${name}"> <h5>${name}</h5><button class="btn" id="editSavedColorbag" data-toggle="modal" data-target="#editColorbagModal">Edit</button><button class="btn" id="deleteSavedColorbag">x</button><div id="bag-rgb${i}"></div> </div> `);
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
  $('#appendSavedColorBags').on('click', '#deleteSavedColorbag', function(){
    var deleteColorbagId = $(this).parent().data('colorbag-id');
    $(this).parent().remove();
    deleteColorbag(deleteColorbagId);
  })

  var deleteColorbag = function(deleteColorbagId){
    $.ajax({
      url: '/colorbags/' + deleteColorbagId,
      method: 'DELETE',
      data: {}
    })
    .done(function(data) {
      console.log('Deleted colorbag: ', data);
      $('div[id^="colorbag"]:nth-of-type(5)').addClass('always-visible');
      $('div[id^="colorbag"]:nth-of-type(5)').removeClass('hidden');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Uh oh');
      console.log(jqXHR, textStatus, errorThrown);
    })
    .always(function() {
    });
  }

// Passing colorbag name to edit modal
$('#appendSavedColorBags').on('click', '#editSavedColorbag', function() {
  var colorbagName = $(this).parent().data('colorbag-name');
  console.log(colorbagName);
  var colorbagId = $(this).parent().data('colorbag-id');
  console.log(colorbagId);
  $(".editColorbagName #colorbagName").val(colorbagName);
  $(".colorbagId #colorbagId").val(colorbagId);
});

// Edit a colorbag name
$('.editColorbag').on('click', function(){
  var updateColorbagId = $('#colorbagId').val();
  var updateColorbagName = $('#colorbagName').val();
  editColorbag(updateColorbagId, updateColorbagName);
  })

function editColorbag(updateColorbagId, updateColorbagName){
  $.ajax({
    url: '/colorbags/edit',
    method: 'POST',
    data: {
      id: updateColorbagId,
      name: updateColorbagName,
      _method: 'PUT'
    }
  })
  .done(function(data) {
    console.log(data.name);
    $(`.${updateColorbagId}`).children('h5').text(`${updateColorbagName}`);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('Uh oh');
    console.log(jqXHR, textStatus, errorThrown);
  })
  .always(function() {

  });
}

$('.fontHeader').on('click', function() {
  var color = $(this).siblings('.rgbCode').text();
  console.log($(this));
  $('h1').css('color', color);
});

$('.fontPara').on('click', function() {
  var color = $(this).siblings('.rgbCode').text();
  console.log($(this));
  $('article p').css('color', color);
});

$('.fontBack').on('click', function() {
  var color = $(this).siblings('.rgbCode').text();
  console.log($(this));
  $('article').css('background-color', color);
});

function displaySixBags(colorbags) {
  console.log(colorbags);
  if (!colorbags) {
    return;
  } else {
    // loop through colorbags
    var usedColorDataIndexes = [];
    var sixColor = [];
    function getRandomColorbag(){
      var colorData = Math.floor(Math.random()*colorbags.length);
      console.log('colorData', colorData);
      console.log('found', usedColorDataIndexes.indexOf(colorData));

      while (usedColorDataIndexes.indexOf(colorData) > -1) {
        return getRandomColorbag();
      }

      usedColorDataIndexes.push(colorData);

      return {
        index: colorData,
        colorbag: colorbags[colorData]
      };
    }
    for (var i = 1; i < 7; i++) {
      var colorObject = getRandomColorbag();

      console.log(usedColorDataIndexes);

      var name = colorObject.colorbag.name;
      var rgbTotal = colorObject.colorbag.rgbs.length;

      $(`.randcolor:nth-of-type(${i})`).empty().prepend(`<div id="colorbag${colorObject.index}"><h5>${name}</h5><div id="bag-rgb${colorObject.index}"></div></div><input type="submit" name="saveColorBag" class="saveColorBag" value="Save" />`);

      //loop through rgb array
      for (var j = 0; j < rgbTotal; j++) {
        //-20 is left & right padding on aside
        var width = 100 / rgbTotal;
        $(`#bag-rgb${colorObject.index}`).append(`<div id="rgb${j}" style="background-color:${colorObject.colorbag.rgbs[j]};width:${width}%"></div>`);
      }
      sixColor.push(color);
    }

    console.log('102', sixColor);
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

// DISPLAY NEWLY SAVED COLORBAGS IN ASIDE
var savefirstcolor = 0;
$('.saveColorBag').click(function(e){
  e.preventDefault();
  e.stopPropagation();

  var userId = $('#userId').val();
  var name = $('#colorBagName').val();
  var rgbsString = $('#rgbs').val();
  var rgbsStringSplit = rgbsString.replace(/,r/g, 'splitr');
  var rgbs = rgbsStringSplit.split('split');
  var rgbTotal = rgbs.length;

  $.ajax({
    url: '/colorbags',
    method: 'POST',
    data: {
      name: name,
      rgbsString: rgbsString,
      userId: userId
    }
  })
  .done(function(colorbag) {
    console.log("New colorbag: ", colorbag);
    $('#colorBagName').val('');
    userColorBagsCount++;
    $('#appendNewColorBag').prepend(`<div id="colorbag${userColorBagsCount}" class="savedColorBags always-visible" data-colorbag-id="${colorbag._id}"> <h5>${name}</h5><button class="btn" id="editSavedColorbag">Edit</button><button class="btn" id="deleteSavedColorbag">x</button><div id="bag-rgb${userColorBagsCount}"></div> </div> `);
    for (var j = 0; j <= rgbTotal; j++) {
      //-20 is left & right padding on aside
      var width = 100 / rgbTotal;
      console.log(colorbag);
      $(`#bag-rgb${userColorBagsCount}`).append(`<div id="rgb${j}" style="background-color:${colorbag.rgbs[j]};width:${width}%"></div>` );
    }

    if (savefirstcolor == 0) {
      $('#userColorBags div div.always-visible:nth-of-type(4)').addClass('hidden');
      $('#userColorBags div div.always-visible:nth-of-type(4)').removeClass('always-visible');
    } else if (savefirstcolor == 1) {
      $('#userColorBags div div.always-visible:nth-of-type(3)').addClass('hidden');
      $('#userColorBags div div.always-visible:nth-of-type(3)').removeClass('always-visible');
    }
    savefirstcolor++;
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('uh oh');
    console.log(jqXHR, textStatus, errorThrown);
  })
  .always(function() {

  });
});

var userFontsCount;
// GET & DISPLAY FONTBAG
function savedFonts(){
  $.ajax({
    url: '/fonts',
    method: 'GET',
    data: {},
    dataType: 'json'
  })
  .done(function(fonts) {
    //variable is used more than once
    userFontsCount = fonts.length;
    if (userFontsCount == 0) {
      $('#userFonts').html("<p>You haven't saved any fonts.</p>");
    } else {
      $('#appendSavedFonts').empty();
      displayFontBag(fonts);
      var fontsForGoogle = fontPluses.join('|');
      $('#fontsLink').append(`<link href="https://fonts.googleapis.com/css?family=${fontsForGoogle}" rel="stylesheet" type="text/css">`);
    }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
  })
}

function displayFontBag(fonts) {
  if (!fonts) {
    return;
  } else {
    for (var i = fonts.length; i--;) {
      var font = fonts[i];
      var name = fonts[i].fontName;
      //for Google stylesheet
      var fontPlus = name.replace(/ /g, "+");
      fontPluses.push(fontPlus);
      $('#userFonts p').remove();
      $('#appendSavedFonts').append(`<div id="savedFont${i}" data-font-id="${font._id}"><h3 style="font-family:${name};">${name}</h3><button class="btn" id="deleteSavedFont">x</button></div>`);
      if (i >= fonts.length - 4) {
        $(`#savedFont${i}`).addClass('always-visible');
      } else {
        $(`#savedFont${i}`).addClass('hidden');
      }
    }
  }
}

// DISPLAY NEWLY SAVED FONTS IN ASIDE
var savefirstfont = 0;
$('.saveFont').click(function(e){
  e.preventDefault();
  e.stopPropagation();

  var userId = $('#userId').val();
  var fontName = $(this).prev().val();

  $.ajax({
    url: '/fonts',
    method: 'POST',
    data: {
      fontName: fontName,
      userId: userId
    }
  })
  .done(function(font) {
    userFontsCount++;
    $('#appendNewFont').prepend(`<div id="savedFont${userFontsCount}" class="always-visible" data-font-id="${font._id}"><h3 style="font-family:${fontName};">${fontName}</h3><button class="btn" id="deleteSavedFont">x</button></div>`);
    if (savefirstfont == 0) {
      $('#userFonts div div.always-visible:nth-of-type(4)').addClass('hidden');
      $('#userFonts div div.always-visible:nth-of-type(4)').removeClass('always-visible');
    } else if (savefirstfont == 1) {
      //doesn't work
      $('#userFonts div div.always-visible:nth-of-type(3)').addClass('hidden');
      $('#userFonts div div.always-visible:nth-of-type(3)').removeClass('always-visible');
    }
    savefirstfont++;
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('uh oh');
    console.log(jqXHR, textStatus, errorThrown);
  })
  .always(function() {

  });
});

// DELETE FONTS
  $('#userFonts').on('click', '#deleteSavedFont', function(){
    var deleteFontId = $(this).parent().data('font-id');
    $(this).parent().remove();
    deleteFont(deleteFontId);
  })

  var deleteFont = function(deleteFontId){
    $.ajax({
      url: '/fonts/' + deleteFontId,
      method: 'DELETE',
      data: {}
    })
    .done(function(data) {
      console.log('Deleted font: ', data);
      $('div[id^="savedFont"]:nth-of-type(5)').addClass('always-visible');
      $('div[id^="savedFont"]:nth-of-type(5)').removeClass('hidden');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Uh oh');
      console.log(jqXHR, textStatus, errorThrown);
    })
    .always(function() {
    });
  }

var colors = [];

// GENERATOR / GALLERY SWITCH
$('.switch').on('click', function() {
  $('#color-generator').toggleClass('hidden');
  $('#gallery').toggleClass('hidden');
  sixBags();
})

var color;

$('#randomize').on('click', function() {
  // $('#color-generator').toggleClass('hidden');
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
    swatchHeight();
    if ($('#userId').val()) {
      savedColorBags();
      savedFonts();
    }
    $('body').css('background-color', '#1e1e1e');

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
        asideHeight();
      }
    }
  }).keyup(function(e) {
    if (e.keyCode in keys) {
      keys[e.keyCode] = false;
    }
  });

  // change ammount of color divs shown based on user input
    $('#color-ammt').on('click', function(){
      colors = [];
        if ($('#color-number').val() < 4) {
          $('#color6').hide();
          $('#color5').hide();
          $('#color4').hide();
          colors.push($('#rgbCode1').text());
          colors.push($('#rgbCode2').text());
          colors.push($('#rgbCode3').text());
          console.log(colors);
          $('#rgbs').val(colors);
        } else if ($('#color-number').val() < 5) {
          $('#color6').hide();
          $('#color5').hide();
          $('#color4').show();
          colors.push($('#rgbCode1').text());
          colors.push($('#rgbCode2').text());
          colors.push($('#rgbCode3').text());
          colors.push($('#rgbCode4').text());
          console.log(colors);
          $('#rgbs').val(colors);
        } else if ($('#color-number').val() < 6) {
          $('#color6').hide();
          $('#color5').show();
          $('#color4').show();
          colors.push($('#rgbCode1').text());
          colors.push($('#rgbCode2').text());
          colors.push($('#rgbCode3').text());
          colors.push($('#rgbCode4').text());
          colors.push($('#rgbCode5').text());
          console.log(colors);
          $('#rgbs').val(colors);
        } else {
          $('#color6').show();
          $('#color5').show();
          $('#color4').show();
          colors.push($('#rgbCode1').text());
          colors.push($('#rgbCode2').text());
          colors.push($('#rgbCode3').text());
          colors.push($('#rgbCode4').text());
          colors.push($('#rgbCode5').text());
          colors.push($('#rgbCode6').text());
          console.log(colors);
          $('#rgbs').val(colors);
        }
          swatchHeight();
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
    swatchHeight();
    asideHeight();
  }).resize();

  function swatchHeight() {
    var countSwatches = 0;
    for (var i = 1; i <= 6; i++ ) {
      if ($(`#color${i}`).css('display') !== 'none') {
        countSwatches++;
      }
    }
    var swatchQuantity = $('.color-swatch').length;
    //80 accounts for the difference for gallery button and save colorbag form
    var totalSwatchHeight = $('#fonts').height() - 80;
    var singleSwatchHeight = totalSwatchHeight / countSwatches;
    $('.color-swatch').css('height', singleSwatchHeight+'px');
  };

  function asideHeight() {
    var asideHeight;

    var minAsideHeight = $(window).height() - $('#border').height() - 10;

    var colorGenHeight = $('#color-generator').height();
    var fontsHeight = $('#fonts').height();

    if (colorGenHeight >= fontsHeight) {
      asideHeight = colorGenHeight + 30;
    } else {
      asideHeight = fontsHeight + 30;
    }
    $('aside').css('height', asideHeight+'px');
    $('aside').css('min-height', minAsideHeight+'px');
  };


  // Setting font colors to gen colors
  $('.fontHeader').on('click', function() {

  });


});

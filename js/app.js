$(function() {
  var $scrollable = $("#makeMeScrollable");
  $scrollable.smoothDivScroll({visibleHotSpotBackgrounds: ""});

  $scrollable.find(".scrollingHotSpot").bind('mouseover', function(){
    $scrollable.smoothDivScroll("showHotSpotBackgrounds");
  });

  $scrollable.find(".scrollingHotSpot").bind('mouseleave', function(){
    $scrollable.smoothDivScroll("hideHotSpotBackgrounds");
  });

  if($("#gallery-info").length > 0){
    $("#slider").on( "slide slidechange", function( event, ui ) {
      console.log(ui.handle);
      leftOffset = ui.handle.offsetLeft;
      $("#year").css('left', leftOffset);
    });
    var $galleryInfo = $("#gallery-info");
    $( "#slider" ).slider({
    value: $galleryInfo.data("start-year"),
    min: $galleryInfo.data("start-year"),
    max: $galleryInfo.data("end-year"),
    step: 1,
    slide: function(event, ui) {
      $("#year").html(ui.value);
      if($("#y_" + ui.value).length > 0){
        $("#makeMeScrollable").smoothDivScroll("scrollToElement", "id", "y_" + ui.value);
      }
    }
  });
  $("#year").html($("#slider").slider("value"));
  }
});
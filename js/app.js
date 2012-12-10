$(function() {
  var $scrollable = $("#makeMeScrollable");
  $scrollable.smoothDivScroll({visibleHotSpotBackgrounds: ""});
  
  $scrollable.find(".scrollingHotSpot").bind('mouseover', function(){
    $scrollable.smoothDivScroll("showHotSpotBackgrounds");
  });

  $scrollable.find(".scrollingHotSpot").bind('mouseleave', function(){
    $scrollable.smoothDivScroll("hideHotSpotBackgrounds");
  });
});
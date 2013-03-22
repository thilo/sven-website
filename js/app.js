$(function() {
  var $scrollable = $("#makeMeScrollable");
  $scrollable.smoothDivScroll({visibleHotSpotBackgrounds: ""});

  $scrollable.find(".scrollingHotSpot").bind('mouseover', function(){
    $scrollable.smoothDivScroll("showHotSpotBackgrounds");
  });

  $scrollable.find(".scrollingHotSpot").bind('mouseleave', function(){
    $scrollable.smoothDivScroll("hideHotSpotBackgrounds");
  });

  $("a.phase").bind("click", function(){
    $("#makeMeScrollable").smoothDivScroll("scrollToElement", "id", "y_" + this.target);
    return(false);
  });
  
  $(window).load(function () {
    $scrollable.smoothDivScroll("getAjaxContent", "part2.html", "addLast");
  });
});

$(function(){
  $("#mainholder").css("max-width","100%");
  $("#mainindex").css("width","100%");
  $("#mainholder #holder div.singleitem").css({"margin-left":0});
  $("#mainholder #holder div.singleitem").last().addClass("last").css({"border-right":"0px"});
  $("#mainindex #imagediv img").css({"margin-left":0});
  $("#mainindex #imagediv img").last().css({"margin-right":0});
  totalwidth = $("#holder").width(); // Total large image width
  totalimages = $("#holder .singleitem").size();
  totalwidth = totalwidth+(0)*(totalimages+1);
  $("#holder").css({"width":totalwidth});
  sliderwidth = 0;
  $("#imagediv img").each(function(){
    sliderwidth = sliderwidth+parseInt($(this).attr("width"))+0;
  });

  $(".end").css("right","0");
  if(totalimages<=1){
    $("#mainholder").addClass("fixwidth");
    $("#mainholder").css("width","960px");
    $("a.leftnav,a.rightnav").hide();
  }
  variablechange(); //for initialization before window resize is called
  function variablechange(){
    tempslidedist = new Array();
    slidedist = new Array();
    screenwidth = $(window).width(); // Visible screen width
    handlewidth = ((screenwidth/10)-6); // width of the slider handle according to the width of the screen
    screenmid = (screenwidth)/2; // Middle of visible screen
    sliderparts = 1000; // slider length divided into 1000 sections
    tempval = (screenmid*sliderparts*10)/(totalwidth); // The total distance the slider has moved when it reaches the middle of the screen.
    mval = totalwidth*((1/sliderparts)/10); // multiplying factor for the slider handle
    holdermulti = (totalwidth-screenwidth+10)/sliderparts; // Multiple value with which the main images move
    halfhandlewidth = handlewidth/2;
    $("#imagediv").css("width",(sliderwidth)+"px");
    indexwidth = (sliderwidth-handlewidth-5);
    $("#index").css("width",indexwidth+"px");
    divratio = (indexwidth)/sliderparts;
    if(sliderwidth > screenwidth){
      $("#index").css("margin-left","71px");
    }else{
      $("#index").css("margin-left","");
    }
    slidespeed = (sliderparts/(sliderwidth))*95;
    if(sliderwidth<(handlewidth+10) || totalimages == 0){ //+10 is added to make the difference larger so when they are almost same, the error doesnot takeplace
      $("#mainindex").hide();
      $(".slider-navigation a.leftnav, .slider-navigation a.rightnav").hide();
    } else{
      $("#mainindex").show();
      $(".slider-navigation a.leftnav, .slider-navigation a.rightnav").show();
    }

    for(var i=0;i<totalimages;i++){
      if(i==0){
        tempslidedist[i] = (($("#imagediv img:eq("+(i)+")").width()-((handlewidth+3)/2))+($("#imagediv img:eq("+(i+1)+")").width()/2) + 0);
      }else{
        tempslidedist[i] = (tempslidedist[i-1] + $("#imagediv img:eq("+(i)+")").width()/2 + $("#imagediv img:eq("+(i+1)+")").width()/2 + 0);
      }
      slidedist[i] = Math.round(((tempslidedist[i]))/divratio);
    }
  }

    $(".imgexcerpt").hide();
    $(".imglink").mouseover(function(){
      $("#mainholder").addClass("disablemove");
    });
    $(".imglink").mouseout(function(){
      $("#mainholder").removeClass("disablemove");
    });
    $(".imgexcerpt").mouseover(function(){
      $("#mainholder").addClass("disablemove");
    });
    $(".imgexcerpt").mouseout(function(){
      $("#mainholder").removeClass("disablemove");
    });

    $(".imglink").click(function(e){ //Toggling the show/hide the img excerpt link

      thisimgwidth = $(this).parent().find("img").width();

      if(thisimgwidth<355){
        exceptwidth = (0.85*thisimgwidth);
      }else{
        exceptwidth = 340;
      }
      $(this).parent().siblings().find(".imgexcerpt").fadeOut("fast")
        .end()
        .find("img").fadeTo("fast", 1)
        .end()
        .find(".imglink").addClass("show");

      if($(this).hasClass("show")){
        $(this).parent().find(".imgexcerpt").css({"width":exceptwidth}).fadeIn("fast");
        $(this).parent().find("img").fadeTo("fast", 0.3);
        $(this).removeClass("show");
      }else{
        $(this).parent().find(".imgexcerpt").css({"width":exceptwidth}).fadeOut("fast");
        $(this).parent().find("img").fadeTo("fast", 1);
        $(this).addClass("show");
      }

    });

    $("#index").slider({
      max   : sliderparts,
      animate : true,
      step  : 1,
      change  : ifSliderChange,
      slide : ifSliderSlide
    });
    $("#index").slider("value",(0));
    $("#index").css("z-index","99");
    mainfunctions(); //for initialization before window resize
    function mainfunctions(){
      $("#index .ui-slider-handle").css("width",(handlewidth)+"px");
      if(sliderwidth < screenwidth){
        $("#index .ui-slider-handle").css("margin","0 -" + (handlewidth/2 + 3) + "px");
      }

    }

    animating = false;
    click = -1;

    $("body").on("click", ".leftnav", function(){
      if(!animating && !$("#mainholder").hasClass("disablemove")){
        if(click>=0){click--;}
        var sliderpos = $("#index").slider("value");
        var flag=0;
        for(var j=totalimages;j>=0;j--){
          if((sliderpos>slidedist[(j)]) && flag==0){
            click=j;
            flag=1;
          }
        }
        if(click<0){
          $("#index").slider("value",(0));
        }else{
          $("#index").slider("value",(slidedist[click]));
        }
        animating = true;
      }
    });

    $("body").on("click", ".rightnav", function(){
      if(!animating && !$("#mainholder").hasClass("disablemove")){
        click++;
        var sliderpos = $("#index").slider("value");
        var flag=0;
        for(var j=0;j<totalimages;j++){
          if((slidedist[(j)]>sliderpos) && flag==0){
            click=j;
            flag=1;
          }
        }
        if(sliderpos >= sliderparts){
          $("#index").slider("value",(0));
          click = -1;
        }else{
          $("#index").slider("value",(slidedist[click]));
        }
        animating = true;
      }
    });
    $(".end").css("z-index","99");
    $(".start").css("z-index","99");
    $(".end").click(function(){
      $("#index").slider("value",(sliderparts));
    });
    $(".start").click(function(){
      $("#index").slider("value",(0));
    });

    $(window).resize(function() {
      variablechange();
      mainfunctions();
    });

  function ifSliderChange(e, ui) {
    $("#mainindex").animate({scrollLeft: (((ui.value-tempval)*mval)) }, 500);
    $("#mainholder").animate({scrollLeft: (ui.value * holdermulti) }, 500,function(){animating = false;});
  }

  function ifSliderSlide(e, ui) {
    $("#mainholder").prop({scrollLeft: (ui.value * holdermulti) });
  }
});

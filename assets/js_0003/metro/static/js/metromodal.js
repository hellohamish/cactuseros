// =======================================================================================
// 
// Metro Modal v1
//
// Author: Klerith
// Page: http://codecanyon.net/user/klerith
// Email: fernando.herrera85@gmail.com BUT, first send me a message through codecanyon page.
//        That's because some people stole the code and ask me support when they are not a customer :(
//
// =======================================================================================

var destruirElBenditoModal;

(function ($) 
{

(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
var isMobile = jQuery.browser.mobile;

var mmBoxes = 0;
var mmBackBoxes = 0;
var doit;

$(window).resize(function(){

	clearTimeout(doit);
    doit = setTimeout(function(){
    	if(isMobile==false){
    	    	ResizeAll();
    	    	RePositionAll();
    	}
    	else
    	{
    		RePositionAll();
    		// ResizeAll();
    	    		
    	}
    }, 100);
	
})

function RePositionAll()
{
  $(".mmBoxResizeble").each(function(){

  		
  		Position($(this),true);
  })
}

function ResizeAll()
{

	var WindowWidth = $(window).width();
	var WindowHeight = $(window).height();

	$(".mmBoxResizeble").each(function(){

		var ThisModal = $(this);

		

		var oWidth = ThisModal.attr("oWidth");
		var oHeight = ThisModal.attr("oHeight");

		var HasTitle = ThisModal.find(".mmBoxTitle").height();

		var widthPercent = oWidth.indexOf("%");
		var heightPercent = oWidth.indexOf("%");
		
		// Checking the Widths
		if(widthPercent < 0 ){
			var CurrentWidth = ThisModal.width();
			var OriginalWidth = oWidth.replace("px","");

			

			if(OriginalWidth < WindowWidth){
				//No need for adaptation. It fits
				ThisModal.clearQueue().animate({
					width: OriginalWidth+"px",
				},300,function(){
					Position(ThisModal,true);
				});
			}else{
				// I need to addap it a little
				ThisModal.clearQueue().animate({
					width: (WindowWidth-50)+"px",
				},300,function(){
					Position(ThisModal,true);
				})
			}
		}


		// Checking the heights
		if(heightPercent < 0 ){

			var CurrentHeight  = ThisModal.height();
			var OriginalHeight = oHeight.replace("px","");

			if(OriginalHeight < WindowHeight){
				
				//No need for adaptation. It fits
				if(HasTitle != null){
					var NewIframeHeight = OriginalHeight - HasTitle-10;	
				}
				else
				{
					var NewIframeHeight = OriginalHeight;
				}

				ThisModal.find(".mmiFrame").css({
					height: NewIframeHeight + "px"
				});

				ThisModal.clearQueue().animate({
					height: oHeight,
				},300,function(){
					Position(ThisModal,true);
				});
			}else{
				// I need to addapt a little
				if(HasTitle != null){
					var NewIframeHeight = WindowHeight - HasTitle;	
				}
				else
				{
					var NewIframeHeight = WindowHeight;
				}
				

				ThisModal.find(".mmiFrame").css({
					height: NewIframeHeight + "px"
				});

				ThisModal.clearQueue().animate({
					height: (WindowHeight-50)+"px",
				},300,function(){
					Position(ThisModal,true);
				})
			}


		}





	});
}

function Position(ThisBox, Animated){
	var WindowWidth  = $(window).width();
	var WindowHeight = $(window).height();

	var ThisWidth  = ThisBox.width();
	var ThisHeight = ThisBox.height();

	var MiddleWidth  = (WindowWidth/2) - (ThisWidth/2);
	var MiddleHeight = (WindowHeight/2) - (ThisHeight/2);

	if(Animated == true){
		ThisBox.clearQueue().animate({
			left: MiddleWidth  + "px",
			top : MiddleHeight + "px",
		},400)
	}
	else
	{
		ThisBox.css({
			left: MiddleWidth  + "px",
			top : MiddleHeight + "px",
		})
	}
}



$.MetroModal = function(settings,callback){

	var content = "";
	var backbox = "";
	var DragOpacity = 0.3;
	var MouseOutColor = "black";
	var MouseOverColor = "";
	var WindowWidth  = $(window).width();
	var WindowHeight = $(window).height();

	settings = $.extend({
        	html: "Loading...",
        	title: undefined,
        	width: "300px",
        	height: "300px",
        	backcolor: "#ffffff",
			backscreen: true,
			backscreencolor: "#000000",
			backscreenopacity: 0.3,
			controls: true,
			clickoutside: true,
			iframe: undefined,
			iframescrolling: false,
			draggable: true,
			timeout: undefined,
			animation: "bounceIn",
			colors: undefined,
			colortimer: 1500,
        }, settings);

		mmBoxes +=1;
		mmBackBoxes +=1;

		var ThisBackScreen = "";
		var ThisBackScreenID = "mmBackBox"+mmBackBoxes;

		var ThisModalBox   = "";
		var ThisModalBoxID = "mmModalBox"+mmBoxes;

		MouseOverColor = settings.backscreencolor;


		
		content += '<div id="mmModalBox'+ mmBoxes +'" class="mmBox mmBoxResizeble animated '+ settings.animation +'" Mouse="in" style="width:'+ settings.width +'; height:'+ settings.height +'" oWidth="' + settings.width + '" oHeight="'+ settings.height +'" backbox="'+ ThisBackScreenID +'">';

		if(settings.controls == true){
		        content += '<div style="background: #ffffff; width: 100%; border: 0px solid #00ff00;"><table border="0" cellpadding="5"><tbody>';
				content += '<tr><td><span class="mmBotWhite mmBotMax" maxes="'+ ThisModalBoxID +'"></span></td>';
				//content += '<span class="mmBotWhite mmBotRestore" restores ="'+ ThisModalBoxID +'"></span>';
				content += '<td><span class="mmBotWhite mmBotClose" closes="'+ ThisModalBoxID +'"></span></td></tr>';
				//content += '<div style="clear: both;"></div>';
				content += '</tbody></table></div>';
		}

		if(settings.title !=undefined){
				content += '<div class="mmBoxTitle" align="center">';
				content += '<span class="mmBoxTitleSpan">' + settings.title + '</span>';
				content += '</div>';
		}

		if(settings.iframe != undefined){
			if(isMobile==true)
				content+= "<br/>";

			content += '<div class="mmiFrameContainer">';
			content += '<iframe id="mmiFrame" class="mmiFrame" style="width:99%;" frameborder="0" scrolling="'+ settings.iframescrolling +'" marginwidth="0" src="'+ settings.iframe +'" ></iframe>';
			content += '</div>';
		}
		else
		{
			content += settings.html;
			content += '</div>';
		}

		$("body").prepend(content);
		ThisModalBox = $("#mmModalBox"+mmBoxes);
		
		
		
		// magic
		destruirElBenditoModal = function() { DestroyBox(ThisModalBox); }
		
		
		
		ThisModalBox.css("background-color",settings.backcolor);

		ThisModalBox.find(".mmBoxTitle").css("border-color",settings.backscreencolor);

		// ================== Touch enabled iFrames
		if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {

			var HasHeader = ThisModalBox.find(".mmBoxTitle").height();

			if(HasHeader >0){

				$(".mmiFrameContainer").css("height",ThisModalBox.height()-HasHeader - 10);
				
				if(/iPhone|iPod/.test(navigator.userAgent)){
					$(".mmiFrameContainer").css("height",ThisModalBox.height()-HasHeader - 20);
				}
			}
			
		}
	

		if(settings.title !=undefined){
			// Title Ajust
			var LessPixes = ThisModalBox.find(".mmBoxTitle").height()+5;

			// ThisModalBox.find(".mmiFrame").css("height","100%");
			var Pixes = ThisModalBox.find(".mmiFrame").height();
			Pixes = Pixes - LessPixes;
			ThisModalBox.find(".mmiFrame").css("height", Pixes + "px");
		}

		if(settings.backcolor == settings.backscreencolor)
		{
			ThisModalBox.removeClass("mmBox").addClass("mmBoxNoShadow");
			DragOpacity = 1;
			ThisModalBox.find(".mmBotWhite").css("color","white");
			BackAndMainSame = true;
			MouseOutColor = "white";
			MouseOverColor = "black";
		}

		if(isMobile==true){
			if(settings.backcolor == "#ffffff")
				ThisModalBox.find(".mmBotWhite").css("color","black");
			else
				ThisModalBox.find(".mmBotWhite").css("color","white");

		}
		
		if(settings.backscreen == false){
			settings.backscreenopacity = 0;
		}
			

		// Back Screen
			backbox = '<div id="mmBackBox'+ mmBackBoxes +'" closes="'+ ThisModalBoxID +'" class="mmBackBox mmBackBox'+ mmBackBoxes +'"></div>';
			$("body").append(backbox);

			ThisBackScreen = $("#mmBackBox"+mmBackBoxes);

			ThisBackScreen.css("background-color",settings.backscreencolor);

			ThisBackScreen.animate({
				opacity: settings.backscreenopacity
			},300,function(){
				// Append the Modal Box				
				ThisModalBox.animate({
					opacity: 1,
				},300,function(){
					ThisModalBox.attr("Mouse","out");
				});
			});



			// Changing colors
			var Inter ="";
			if(settings.colors !=undefined){

				if(settings.backscreencolor == settings.backcolor){
					ThisModalBox.css("background-color","transparent");
				}

				for(var i = 0; i <= settings.colors.length-1; i++){
					backbox = '<div id="mmBackBox'+ mmBackBoxes +'-'+ i +'" closes="'+ ThisModalBoxID +'" class="mmBackBox mmBackBoxColors mmBackBox'+ mmBackBoxes +'" style="background-color: '+ settings.colors[i].color +'"></div>';
					$("body").prepend(backbox);
				}	
				clearInterval(Inter);
				var CurrentBack = 0;
				var FirstTime = true;
				Inter = setInterval(function(){
										
					if(CurrentBack > settings.colors.length-1){
						CurrentBack = 0;
					}

					if(CurrentBack == 0){
						PrevBack = settings.colors.length-1;
					}
					else
					{
						PrevBack = CurrentBack -1;
					}

					var ThisBackID   = 'mmBackBox'+ mmBackBoxes +'-'+ CurrentBack;
					var PrevBackID   = 'mmBackBox'+ mmBackBoxes +'-'+ PrevBack;
					var ThisMainBack = $('#mmBackBox'+ mmBackBoxes);

					

					if(CurrentBack == 0)
					{
						//First back
						ThisMainBack.animate({
								opacity: 0,
						},500);


						$("#"+ThisBackID).animate({
							opacity: settings.backscreenopacity,
						},500);


						$("#"+PrevBackID).animate({
							opacity: 1,
						},0);

						CurrentBack +=1;
					}else
					{
						

						$("#"+PrevBackID).animate({
							opacity: 0,
						},500);

						$("#"+ThisBackID).animate({
							opacity: settings.backscreenopacity,
						},0);


						CurrentBack +=1;
					}


				},settings.colortimer)


			}
			// End of Changing Colors


		if(settings.clickoutside == true){
			$("#"+ThisBackScreenID).bind("click",function(){
				DestroyBox(ThisModalBox);
			})
		}


		//========================== Initial Resize
			WindowWidth  = $(window).width();
			WindowHeight = $(window).height();

			var HasTitle = ThisModalBox.find(".mmBoxTitle").height();
			

			var ThisModal = ThisModalBox;
			var oWidth = ThisModal.attr("oWidth");
			var oHeight = ThisModal.attr("oHeight");

			var widthPercent = oWidth.indexOf("%");
			var heightPercent = oHeight.indexOf("%");
			
			// Checking the Widths
			if(widthPercent < 0 ){
				var CurrentWidth = ThisModal.width();
				var OriginalWidth = oWidth.replace("px","");

				

				if(OriginalWidth < WindowWidth){
					//No need for adaptation. It fits
					ThisModal.css({
						width: OriginalWidth+"px",
					},300,function(){
						Position(ThisModal,true);
					});
				}else{
					// I need to addap it a little
					ThisModal.css({
						width: (WindowWidth-50)+"px",
					},300,function(){
						Position(ThisModal,true);
					})
				}
			}


			// Checking the heights
			if(heightPercent < 0 ){


				var CurrentHeight  = ThisModal.height();
				var OriginalHeight = oHeight.replace("px","");

				if(OriginalHeight < WindowHeight){
					
					//No need for adaptation. It fits

					if(HasTitle != null){
						var NewIframeHeight = OriginalHeight - HasTitle-10;	
					}
					else
					{
						var NewIframeHeight = OriginalHeight;
					}
					
					if(isMobile == true){
						var	NewIframeHeight = OriginalHeight - 80;
					}


					ThisModal.css({
						height: oHeight,
					},300,function(){
						Position(ThisModal,true);
					});


					ThisModal.find(".mmiFrame").css("height",NewIframeHeight+"px");
					ThisModal.find(".mmiFrameContainer").css("height",(NewIframeHeight+5)+"px");


				}else{
					// I need to addap it a little
					if(HasTitle != null){
						var NewIframeHeight = WindowHeight - HasTitle-60;	
					}
					else
					{
						var NewIframeHeight = WindowHeight-50;
					}
					
					if(isMobile == true){
							NewIframeHeight = NewIframeHeight - 80;
					}


					ThisModal.find(".mmiFrame").css("height",NewIframeHeight+"px");


					ThisModal.css({
						height: (WindowHeight-50)+"px",
					},300,function(){
						Position(ThisModal,true);
					});

				}


			}
		//========================== End Initial Resize

		// ========================  Positioning
		Position(ThisModalBox);



		// ========================== Draggable Enabled
		if( settings.draggable == true ){
			var Axis ="";

			

			if(WindowWidth <= ThisModalBox.width()+20)
			{
				Axis = "y";
			}
			if(WindowHeight <= ThisModalBox.height()+20)
			{
				Axis = "x"
			}

				ThisModalBox.draggable({
					axis: Axis,

					start:function(){
						ThisModalBox.clearQueue().animate({
							opacity: DragOpacity,
							
						});
					}, //drag start
					stop:function(){
						ThisModalBox.clearQueue().animate({
							opacity: 1,
						});
					}
				}); // End Draggable
			

		}

		// ================================== Buttons
		// Max
		if(settings.controls == true){
			$(".mmBotMax").on("mouseover",function(){
				$(this).css("color",MouseOverColor);
			}).on("mouseout",function(){
				$(this).css("color",MouseOutColor);
			});

			$(".mmBotMax").on("click",function(){
				var ThisBox = $("#"+ $(this).attr("maxes"));
				ThisBox.animate({
					top: "3px",
					left: "3px",
					width: "98%",
					height: "98%",
				},400);

				var HasTitle = ThisModal.find(".mmBoxTitle").height();
				if(HasTitle != null){
					var NewIframeHeight = OriginalHeight - HasTitle-10;	
				}
				else
				{
					var NewIframeHeight = OriginalHeight;
				}

				ThisModal.find(".mmiFrameContainer").css("height","100%");

				ThisModal.find(".mmiFrame").css({
					height: "98%"
				});

				// iPad/iPhone/iPod Fix
				if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {

					$(".mmiFrameContainer").css("height","100%");


						// $(".mmiFrameContainer").css("height",ThisModalBox.height()-HasHeader - 10);
					
				}

			});// End Max Button
		
		$(".mmBotRestore").on("mouseover",function(){
				$(this).css("color",MouseOverColor);
			}).on("mouseout",function(){
				$(this).css("color",MouseOutColor);
			});

			$(".mmBotRestore").on("click",function(){
				var ThisBox = $("#"+ $(this).attr("restores"));
				var oWidth  = ThisBox.attr("oWidth");
				var oHeight = ThisBox.attr("oHeight");

				ThisBox.animate({
					width: oWidth,
					height: oHeight,
				},400,function(){
					Position(ThisBox,true);
				});


				var HasTitle = ThisModal.find(".mmBoxTitle").height();
				if(HasTitle != null){
					var NewIframeHeight = OriginalHeight - HasTitle-20;	
				}
				else
				{
					var NewIframeHeight = OriginalHeight;
				}


				ThisModal.find(".mmiFrame").animate({
					height: (NewIframeHeight-5) + "px"
				});

								// iPad/iPhone/iPod Fix
				if (/iPhone|iPod|iPad/.test(navigator.userAgent)) {

					var HasHeader = ThisModalBox.find(".mmBoxTitle").height();
					if(HasHeader >0)
						$(".mmiFrameContainer").css("height",(OriginalHeight-HasHeader - 10) +"px");
					else
						$(".mmiFrameContainer").css("height",(OriginalHeight- 10) +"px");
					
				}

			}); // End Respores


			// Close
			$(".mmBotClose").on("mouseover",function(){
				$(this).css("color",MouseOverColor);
			}).on("mouseout",function(){
				$(this).css("color",MouseOutColor);
			});

			$(".mmBotClose").on("click",function(){
				var ThisBox = $("#"+ $(this).attr("closes"));
				ThisBox.removeClass("animated " + settings.animation);
				

				if (typeof callback == "function") 
	            {   
	                if(callback) callback("ModalClosed");
	            }

				DestroyBox(ThisBox);

			}); // End Respores


		} // End Has buttons

		// ================================= End Buttons

		if(settings.timeout != undefined){


			setTimeout(function() {
				if (typeof callback == "function") 
	            {   
	                if(callback) callback("ModalClosed");
	            }

				DestroyBox(ThisModalBox);
			}, settings.timeout);

		}

		// ================================= Click OutsideCloses
		if(settings.clickoutside==true){

			ThisModalBox.bind("mouseover",function(){
				$(this).attr("Mouse","in");
			});

			ThisModalBox.bind("mouseleave",function(){
				$(this).attr("Mouse","out");
			});

			$("body").on("click",function(){
				var MousePosition = ThisModalBox.attr("Mouse");
				if(MousePosition == "out"){
					DestroyBox(ThisModalBox);

					$("body").unbind("click");
					if (typeof callback == "function") 
		            {   
		                if(callback) callback("ModalClosed");
		            }
				}

			});

		}

		// mmBackBoxClose="mmBackBox'+ mmBackBoxes +'" class="mmBackBox mmBackBoxColors mmBackBox'+ mmBackBoxes +'"
		// In has multiple background color
		if(settings.colors != undefined){
			var BackPack = "mmBackBox" + mmBackBoxes;

			$("." + BackPack).bind("click",function(){
				clearInterval(Inter);
				var Closes = $(this).attr("closes");

				$("#"+Closes).removeClass("animated " + settings.animation);

				$("#"+Closes).clearQueue().animate({
					opacity: 0,
				},300,function(){

						$("."+BackPack).each(function(){
							$(this).clearQueue().animate({
								opacity: 0,
							},300,function(){
								$(this).remove();
							});
						});
					
				});


			});
		}

		 


		// Closing the box
		function DestroyBox(ThisBox){

			var BackBox   = $("#"+ThisBox.attr("backbox"));
			var BackBoxID = ThisBox.attr("backbox");

			ThisBox.clearQueue().animate({
				opacity:0,
			},300,function(){
				// Destroy the Modal box
				ThisBox.remove();


				// Destroying the BackBox
				BackBox.clearQueue().animate({
					opacity:0,
				},300,function(){
					BackBox.remove();
				});

				clearInterval(Inter);
				// var Closes = $(this).attr("closes");

				$("#"+BackBoxID).removeClass("animated " + settings.animation);

				$("#"+BackBoxID).clearQueue().animate({
					opacity: 0,
				},300,function(){

						$("."+BackBoxID).each(function(){
							$(this).clearQueue().animate({
								opacity: 0,
							},300,function(){
								$(this).remove();
							});
						});
					
				});

			})

			

		}


}


 $.fn.MetroModal = function(settings,callback) {

 	var HasTitle = $(this).attr("mmtitle");

 	var FullHTML = $("<div>").append($(this).clone().show()).html();

	settings = $.extend({
        	html: FullHTML,
        	title: HasTitle,
        	width: "300px",
        	height: "300px",
        	backcolor: "#ffffff",
			backscreen: true,
			backscreencolor: "#000000",
			backscreenopacity: 0.3,
			controls: true,
			clickoutside: true,
			iframe: undefined,
			iframescrolling: false,
			draggable: true,
			timeout: undefined,
			animation: "bounceIn",
			colors: undefined,
			colortimer: 1500,
        }, settings);

	$.MetroModal(settings,callback);
 }



})(jQuery);
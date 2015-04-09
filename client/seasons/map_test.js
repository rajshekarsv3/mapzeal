Deps.autorun(function () {
  if (Mapbox.loaded()) {
    L.mapbox.accessToken = 'pk.eyJ1IjoicmFqc2hla2Fyc3YzIiwiYSI6IjdVdzdkNzgifQ.rrOWGlfdJLu6zPw-kDir3g';;
    var map = L.mapbox.map('map', 'rajshekarsv3.j6ekoioh')
    .setView([13, 80], 9);

document.getElementById('1').addEventListener('click',function(){
	map.setView([13, 80], 5);
	setTimeout(function(){map.setView([12.732614, 77.83092399999998], 15) }, 1000);
	
})
document.getElementById('2').addEventListener('click',function(){
	map.setView([12.732614, 77.83092399999998], 5)
	setTimeout(function(){map.setView([12.720181,77.86881900000003],15)}, 1000);
})
document.getElementById('3').addEventListener('click',function(){
	
	map.setView([12.720181,77.86881900000003],5)
	setTimeout(function(){map.setView([12.736672,78.68688700000001],15)},1000);

  })
}
});



Template.map.events({
       'click #up-arrow': function(){       
       	if(!$("#up-arrow").hasClass("rotate-arrow"))
       	{
       		$("#description").show("slow");
       		$("#up-arrow").removeClass("remove-rotate-arrow").addClass("rotate-arrow");
          setTimeout(function(){
              $('#cover').css("position","relative");
          },250);
        }
        else
        {
        	$("#description").hide("slow");
        	$("#up-arrow").removeClass("rotate-arrow").addClass("remove-rotate-arrow");
          setTimeout(function(){
              $('#cover').css("position","absolute");
          },300);
        }
       }
    });


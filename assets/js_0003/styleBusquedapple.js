var timeoutBusqueda;

$().ready(function() { 
	var cssObj = { 'box-shadow' : '#222 5px 10px 10px', // Added when CSS3 is standard
		'-webkit-box-shadow' : '#222 5px 10px 10px', // Safari
		'-moz-box-shadow' : '#222 5px 10px 10px'}; // Firefox 3.5+
	$("#suggestions").css(cssObj);
});

function lookup(inputString) {
	if (timeoutBusqueda) {
		clearTimeout(timeoutBusqueda);
	}
	if(inputString.length <= 3) {
		$('#suggestions').fadeOut();
	} else {
		mostrarEstado("Buscando '"+inputString+"'...",true);
		$.post(BASE+"FrontController.php?comando=BusquedaDinamica", {queryString: ""+inputString+""}, function(data) { // Do an AJAX call
			$('#suggestions').fadeIn(); 
			$('#suggestions').html(data); 
			cerrarModal();
			//$('#suggesstions').center();
		});
	}
}


function busquedaDinamica(texto) {
	 if (timeoutBusqueda) clearTimeout(timeoutBusqueda);
	  timeoutBusqueda = setTimeout(function() {lookup(texto);}, 400);
}	


/*
jQuery.fn.center = function() {
    var container = $(window);
    var top = -this.height() / 2;
    var left = -this.width() / 2;
	alert("kea");
    return this.css('position', 'fixed').css({ 'margin-left': left + 'px', 'margin-top': top + 'px', 'left': '50%', 'top': '50%' });
}*/
function mostrarCartel(contenedor, titulo, texto) {
	cont = $(contenedor);
	cont.stop(true, true);
	cont.fadeOut("slow", function() {
		$("#mensaje").remove();
		cont.append('<div id="mensaje"><h1>'+titulo+'</h1>'+texto+'<br/><br/><br/></div>');
		cont.fadeIn("normal", function() {
			hacerScroll(cont);
		});
	});
}

function hacerScroll(elemento) {
	$('html,body').animate({ scrollTop: $(elemento).offset().top - 100 }, { duration: 'slow', easing: 'swing'});
}

function ltrim(s) {
   return s.replace(/^\s+/, "");
}

function rtrim(s) {
   return s.replace(/\s+$/, "");
}

function trim(s) {
   return rtrim(ltrim(s));
}




var contenedorOriginal;
var padre;


function mostrarModal(id) {
    cerrarModal();
    inicializarContenidoModal(id);
    $("#modalAgus").modal();
}

function mostrarModalSticky(id) {
    cerrarModal();
    inicializarContenidoModal(id);
    $("#modalAgus").modal({escapeClose: false,
        clickClose: false,
        showClose: false});
}

function inicializarContenidoModal(id) {
    ancho = $(id).width();
    largo = $(id).height();

    padre = $(id).parent();
    elemento = $(id).detach();
    elemento.appendTo("#contenidoModal");
    $("#contenidoModal").width(ancho);
    $("#contenidoModal").height(largo);
    $("#modalAgus").css('background-color', $(id).css('background-color'));
    $(id).fadeIn('slow');
    contenedorOriginal = id;
}

function guardarModal() {
    if (contenedorOriginal!=null) {
        $(contenedorOriginal).hide();
        elemento = $(contenedorOriginal).detach();
        elemento.appendTo(padre);
    }
}

function mostrarEstado(estado, sticky) {

    cerrarModal();

    $("#modalTexto").html('<div style="display:inline-block;">'+estado+'</div>');
    $("#modalTexto").show();

    if (sticky)
        mostrarModalSticky("#modalTexto");
    else
        mostrarModal("#modalTexto");
}

function mostrarEstadoTimer(estado, segs, funcion) {
    mostrarEstado(estado, true);
    setTimeout(function() {cerrarModal(); funcion();}, segs*1000);

}

function cerrarModal() {
    if (contenedorOriginal!=null) {
        guardarModal();
        $.modal.close();
        contenedorOriginal = null;
        padre = null;
    }
}

function navegar(url) {
    window.location = url;
}


function refrescar() {
    location.reload();
}



function pedirLogin() {
    mostrarModal("#formularioLogin");
}

function intentarLogin() {
    mostrarEstado(MSG_INGRESANDO, true);

    $.post(BASE+"Login", $("#formularioLogin").serialize()).done(function(e) {
        respuesta = e.split("@");
        e = respuesta[0];
        if (e=="ok") {
            usuario = respuesta[1];
            navegar(BASE);
        }
        else {
            mostrarEstadoTimer(e, 3, function() {mostrarModal("#formularioLogin");	});
        }
    }).fail(function(e) {
        mostrarEstadoTimer(MSG_ERROR_CONEXION, 3, function() {mostrarModal("#formularioLogin");	});
    });
}


function mostrarOpcionRecuperar() {
    mostrarModal("#recuperarPass");
}

function recuperar() {
    var email = $("#email").val();
    var url = BASE+'recuperarPassword/'+email;
    $.post(url, {},
        function(datos){
            mostrarEstadoTimer(MSG_LE_ENVIAMOS_DATOS,3,function(){});
        });
}


function crearCuenta() {
    mostrarModal("#formularioRegistro");

    //$( "#FechaNacimiento" ).datepicker({ changeYear: true, changeMonth:true, dateFormat: FORMATO_FECHA, defaultDate: '81-05-30'});

}

function caracteresValidos(input) {

    var caracteres = /^[A-Za-z0-9]+$/;

    if(input.val().match(caracteres))
        return true;
    else
        return false;
}

function emailValido(input) {
    var x      = input.val();
    var atpos  = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }

    return true;
}

function guardarDatosCuenta() {

    mostrarEstado(MSG_CREANDO_CTA, true);


    if (!caracteresValidos($("#nombreNuevoUsuario"))) {
        mostrarEstadoTimer(MSG_USERNAME_ALFANUMERICO, 3,
            function() {mostrarModal("#formularioRegistro");	});
        return;
    }

    if (!emailValido($("#emailNuevoUsuario"))) {
        mostrarEstadoTimer(MSG_EMAIL_INVALIDO, 3,
            function() {mostrarModal("#formularioRegistro");	});
        return;
    }
    if ($( "#Pais option:selected" ).val() == -444) {
        mostrarEstadoTimer(MSG_SELECT_COUNTRY, 3,
        function() {mostrarModal("#formularioRegistro");	});
        return;
    }

    $.post(BASE+"PostDatosCuenta", $("#formRegistro").serialize()).done(function(e) {
        respuesta = e.split("@");
        e = respuesta[0];
        if (e=="ok") {
            usuario = respuesta[1];
            mostrarEstadoTimer(MSG_EMAIL_ACTIVATE, 10, function() { pedirLogin();});
        }
        else {
            mostrarEstadoTimer(e, 3, function() {mostrarModal("#formularioRegistro");	});
        }
    }).fail(function(e) {
        mostrarEstadoTimer(MSG_ERROR_CONEXION, 3, function() {mostrarModal("#formularioRegistro");	});
    });
}


function solicitarFicha() {
    mostrarModal("#formularioSolicitudFicha");
}

function enviarSolicitud() {
    mostrarEstado("Recolectando información de la especie...", true);

    $.post(BASE+"FrontController.php?comando=PedirFicha&opcion=obtenerdeTPL", $("#formularioSolicitudFicha").serialize()).done(function(e) {
        if (e.toLowerCase().indexOf("error") !== -1) {
            mostrarEstadoTimer(e, 5, function() {mostrarModal("#formularioSolicitudFicha");	});
        }
        else {
            $("#contenedorRespuestasServer").html(e);
            mostrarModal("#formularioConfirmacionSolicitud");
        }
    }).fail(function(e) {
        mostrarEstadoTimer(MSG_ERROR_CONEXION, 3, function() {mostrarModal("#formularioSolicitudFicha");	});
    });
}

function confirmarSolicitud() {
    mostrarEstado("Enviando el pedido...", true);

    $.post(BASE+"FrontController.php?comando=PedirFicha&opcion=guardar", $("#formularioConfirmacionSolicitud").serialize()).done(function(e) {
        if (e.toLowerCase().indexOf("error") !== -1) {
            mostrarEstadoTimer(e, 5, function() {mostrarModal("#formularioSolicitudFicha");	});
        }
        else {
            mostrarEstadoTimer("Su solicitud ha sido registrada!", 2, function() {});
        }
    }).fail(function(e) {
        mostrarEstadoTimer(MSG_ERROR_CONEXION, 3, function() {mostrarModal("#formularioSolicitudFicha");	});
    });
}


function setActivo(elemento, estado) {
    e = $('#' + elemento);

    if (e != null) {
        e.attr("disabled", estado);
    }
}



$(document).ready(function() {

    cargarSugerenciasHechas();

    setActivo("BotonSugerirEspecieLista", true);

    $('#formSugerenciaEspecieExistente').ajaxForm(
        {
            beforeSubmit:
                function() {
                    <!-- BEGIN: debeLoguearseParaSugerir -->
                    window.location = BASE+"Login";
                    return;
                    <!-- END: debeLoguearseParaSugerir -->
                    $("#formSugerenciaEspecieExistente").slideUp("slow", function() {
                        mostrarCartel('#wrapperFormSugerenciaEspecieExistente', 'Sugiriendo Especie', 'Por favor espere...');
                    });

                    return true;
                },
            success:
                function() {
                    $("#formSugerenciaEspecieExistente").remove();
                    $('#wrapperFormSugerenciaEspecieExistente').fadeOut("normal", function() {
                        hacerScroll('#SectorSugerencias');
                        cargarSugerenciasHechas();
                        $('#SectorOpcionesSugerencia').remove();
                        window.location = BASE+"Detalles/SinIdentificar/{IdClasificacion}/VerCactus.html";
                    });
                }
        });
});

function cargarSugerenciasHechas() {
    cargar('SectorSugerencias', 'wrapperSectorSugerencias', BASE_LANG + '/SectorSugerencias/' + ID_CLASIFICACION);
}




function cargar(destino, wrapper, url) {
    $('#'+destino).hide('fast', cargarContenido(destino, url));
    $('#cargando' + destino).remove();
    $('#'+wrapper).append('<center><span id="cargando' + destino + '"><br><br>Cargando...<br/><img src="'+BASE+'Imagenes/cargando.gif"><br><br></span></center>');
    $('#cargando' + destino).fadeIn('normal');
}

function cargarContenido(destino, url) {
    $('#'+destino).load(url, '', function() {
            $('#'+ destino).fadeIn('normal', function() { $('#cargando' + destino).fadeOut('normal'); });
        }
    );
}

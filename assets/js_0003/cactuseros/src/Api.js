/**
 * Created by Agus on 17/05/2015.
 */

ApiCS = null;
controllerVotos = null;

function ApiCactuseros(_BASE) {

    var BASE = _BASE;

    function sugerir(idPlanta, idEspecie, callback) {

    }

    function votar(idPlanta, idSugerencia, callback) {

        url = BASE + 'Votar/AFavor/Sugerencia/'+idSugerencia+'/Clasificacion/' + idPlanta;

        $.get(url).done(function(resultado) {

                        if (callback.exito) {
                            callback.exito(resultado);
                        }

                  })
                  .fail(function() {

                        if (callback.error) {
                            callback.error();
                        }

                  })
                  .always(function() {
                        if (callback.siempre) {
                            callback.siempre();
                        }
                  });
    }

    return {
        sugerir : sugerir,
        votar   : votar
    }

};

$(document).ready(function() {
    if (typeof BASE !== "undefined") {
        ApiCS = new ApiCactuseros(BASE);
        controllerVotos = new ControllerVotos(ApiCS, new ViewVotos(new Gui()), new Sesion());
    }
    else
        console.log("BASE no está definida.");
});


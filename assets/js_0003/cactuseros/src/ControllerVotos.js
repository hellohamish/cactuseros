/**
 * Created by Agus on 17/05/2015.
 */

function Sesion() {
    function logueado() {
        return true;
    }

    return {
        logueado : logueado
    };
}

function Gui() {

    function mostrarCartel(idElemento, titulo, texto) {
        window.mostrarCartel(idElemento, titulo, texto);
    }

    function hacerScroll(idElemento) {
        window.hacerScroll(idElemento);
    }

    function alert(mensaje) {
        window.alert(mensaje);
    }

    function cargarSugerenciasHechas() {
        if (typeof window.cargarSugerenciasHechas !== "undefined") {
            window.cargarSugerenciasHechas();
        }
    }

    return {
        mostrarCartel : mostrarCartel,
        hacerScroll : hacerScroll,
        alert : alert,
        cargarSugerenciasHechas : cargarSugerenciasHechas
    };
}


function ViewVotos(gui) {

    this.identificacionCompleta = function() {
        $("#SectorSugerencias").slideUp("slow", function () {
            gui.mostrarCartel('#wrapperSectorSugerencias', 'Bravo!', 'El ejemplar ha sido identificado.<br>Se ha notificado a su dueño!');
        });
        gui.hacerScroll('#SectorSugerencias');
    };

    this.identificacionAunNoCompleta = function() {
        gui.cargarSugerenciasHechas();
        gui.hacerScroll('#SectorSugerencias');
    }

    this.errorAlVotar = function() {
        gui.alert("Ocurrió un error al intentar votar. Pruebe nuevamente más tarde.");
    };

}


function ControllerVotos(api, view, sesion) {

    function votoExitoso(resultado) {
        if (resultado === 'IDENTIFICADO') {
            view.identificacionCompleta();
        }
        else {
            view.identificacionAunNoCompleta();
        }
    }

    function errorVoto() {
        view.errorAlVotar();
    }

    function votarAFavor(idCactus, idSugerencia) {

        <!-- BEGIN: debeLoguearseParaVotar -->
        if (!sesion.logueado) {
            window.location = "{BASE}Login";
            return;
        }
        <!-- END: debeLoguearseParaVotar -->

        api.votar(idCactus, idSugerencia, {exito: votoExitoso, error: errorVoto});
    }

    return {
        votarAFavor : votarAFavor
    };
}

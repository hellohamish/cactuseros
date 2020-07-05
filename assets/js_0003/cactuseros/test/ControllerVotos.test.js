/**
 * Created by Agus on 17/05/2015.
 */

var controllerVotos, sesion;
var server, vistaVotos;

QUnit.module("Controller Votos", {

    beforeEach: function() {

        api = new ApiCactuseros("http://direccion-base/");

        server = sinon.fakeServer.create();
        server.respondImmediately = true;

        sesion = new Sesion();

        vistaVotos = new ViewVotos(null);
        vistaVotos.errorAlVotar = function() {};
        vistaVotos.identificacionAunNoCompleta = function() {};
        vistaVotos.identificacionCompleta = function() {};

        sinon.spy(vistaVotos, "errorAlVotar");
        sinon.spy(vistaVotos, "identificacionAunNoCompleta");
        sinon.spy(vistaVotos, "identificacionCompleta");

        controllerVotos = new ControllerVotos(api, vistaVotos, sesion);
    }
});


QUnit.test("Votar y se identifica el ejemplar.", function(assert) {

    var done = assert.async();
    server.respondWith([200, {"Content-Type": "text/html"}, 'IDENTIFICADO']);

    controllerVotos.votarAFavor(1, 123);

    setTimeout(function() {
        assert.ok(vistaVotos.identificacionCompleta.calledOnce);
        done();
    }, 10);

});


QUnit.test("Votar y aun NO se identifica el ejemplar.", function(assert) {

    var done = assert.async();
    server.respondWith([200, {"Content-Type": "text/html"}, '']);

    controllerVotos.votarAFavor(1, 123);

    setTimeout(function() {
        assert.ok(vistaVotos.identificacionAunNoCompleta.calledOnce);
        done();
    }, 10);

});


QUnit.test("Error al votar.", function(assert) {

    var done = assert.async();
    server.respondWith([500, {"Content-Type": "text/html"}, 'INTERNAL SERVER ERROR']);

    controllerVotos.votarAFavor(1, 123);

    setTimeout(function() {
        assert.ok(vistaVotos.errorAlVotar.calledOnce);
        done();
    }, 10);

});


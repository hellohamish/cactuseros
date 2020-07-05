/**
 * Created by Agus on 17/05/2015.
 */

var api;
var server;

QUnit.module("API Cactuseros", {

    beforeEach: function() {
        server = sinon.fakeServer.create();
        api = new ApiCactuseros("http://direccion-base/");
    },

    afterEach: function() {
        server.restore();
    }
});


QUnit.test("Votar con éxito.", function(assert) {

    // espia usado para ver si se invoca al callback exito
    var spyExito = sinon.spy();
    var spyError = sinon.spy();
    var callback = {exito: spyExito, error: spyError};

    api.votar(123, 74, callback );

    server.respondWith([200, {"Content-Type": "text/html"}, '']);
    server.respond();

    assert.ok(spyExito.calledOnce);
    assert.ok(spyError.notCalled);

});


QUnit.test("Votar sin éxito.", function(assert) {

    // espia usado para ver si se invoca al callback exito
    var spyExito = sinon.spy();
    var spyError = sinon.spy();
    var callback = {exito: spyExito, error: spyError};

    api.votar(123, 74, callback);

    // rta. error
    server.respondWith([500, {"Content-Type": "text/html"}, 'Internal Server Error']);
    server.respond();

    assert.ok(spyError.calledOnce);
    assert.ok(spyExito.notCalled);

});

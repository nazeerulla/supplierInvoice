/*global QUnit*/

sap.ui.define([
	"comsap./supplierinvoiceapp/controller/createInvoice.controller"
], function (Controller) {
	"use strict";

	QUnit.module("createInvoice Controller");

	QUnit.test("I should test the createInvoice controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

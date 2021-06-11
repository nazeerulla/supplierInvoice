/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/createInvoice"
], function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();

		//Cleanup
		Then.iTeardownMyApp();
    });

    // opaTest("Should check DatePicker is available", function (Given, When, Then) {
	// 	Given.iStartMyApp();
    //     When.onTheAppPage.iClickOnDatepicker();
    //     //Cleanup
	// 	Then.iTeardownMyApp();
    //     });
        
    //     opaTest("Should check that a Cancel button is available", function (Given, When, Then) {
	// 	Given.iStartMyApp();
	// 	When.onTheAppPage.isCancelbtnAvailable();
	// 	Then.onTheAppPage.ishouldseeMessageBox();

	// 		Then.iTeardownMyApp();
    //     });
        
        opaTest("Should check that a Reference field is available", function (Given, When, Then) {
		Given.iStartMyApp();
		When.onTheAppPage.isreferenceAvailable();
		Then.onTheAppPage.ishouldseevalueinReference();

			//Then.iTeardownMyApp();
		});
    
    
    
});

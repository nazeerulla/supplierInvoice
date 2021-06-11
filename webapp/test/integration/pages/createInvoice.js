sap.ui.define([
    "sap/ui/test/Opa5",
    'sap/ui/test/matchers/AggregationLengthEquals',
	'sap/ui/test/matchers/PropertyStrictEquals',
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/opaQunit",
	"sap/ui/test/actions/EnterText"
], function (Opa5,AggregationLengthEquals, PropertyStrictEquals, AggregationFilled,Press,Properties,opaQunit,EnterText) {
	"use strict";
	var sViewName = "createInvoice";
	Opa5.createPageObjects({
		onTheAppPage: {

			actions: {
                		iClickOnDatepicker:function(){
				this.waitFor({
   viewName: sViewName,
			id: "DP1",
				actions: new Press(),
    // actions: new EnterText({ // from "sap/ui/test/actions/EnterText"
    //     text: "2021-12-09",
    //     pressEnterKey: true,
    // }),
    success: function (oDateTimePicker) {
    	$("#__component1---createInvoice--DP1-icon").trigger("click");
    	setTimeout(function(){
    		oDateTimePicker._handleCancelButton(true);
    	},2000);
    //	
        	Opa5.assert.ok(true, "Selected Date" +" : "+oDateTimePicker.getValue());
        
    },
    
});
},

	isCancelbtnAvailable:function(){
					return this.waitFor({
			viewName: sViewName,
			id: "cancelBtn",
			actions: new Press(),
			errorMessage: "Did not find the cancel button which opens the MessageBox"
		});
            },
            
            isreferenceAvailable:function(){
                return this.waitFor({
			viewName: sViewName,
			id: "referenceId",
			actions: new EnterText({ text: "Hello " }),
			errorMessage: "Did not find the cancel button which opens the MessageBox"
		});
            }
            },

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						id: "app",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
						},
						errorMessage: "Did not find the " + sViewName + " view"
					});
                },
ishouldseevalueinReference: function () {
            return this.waitFor({
                viewName: sViewName,
    id: "referenceId",
    // Get sap.m.Input which is associated with Label which have i18n text with text "Name"
    matchers: new sap.ui.test.matchers.LabelFor({ text: "Reference" }),
    // It will enter the given text in the matched sap.m.Input
    actions: new sap.ui.test.actions.EnterText({ text: "reference" }),
    success: function (oInput) {
        Opa5.assert.ok(oInput.getValue() === "reference", "Input value is correct");
    },
    
						errorMessage: "Did not find the reference input field"
});
},
                	ishouldseeMessageBox:function(){
					var sSuccessMessage="Do you want to cancel the Create Supplier Invoice?";
				 return this.waitFor({
                        // Turn off autoWait
                        searchOpenDialogs: true, //mandatory
                        autoWait: false,
                        check: function () {
                            // Locate the message toast using its class name in a jQuery function
                            return Opa5.getJQuery()(".sapMMessageBox").length > 0 && 
                            Opa5.getJQuery()(".sapMMessageBox").find(".sapMText").text() === sSuccessMessage;
                            
                        //    return !!sap.ui.test.Opa5.getJQuery()(".sapMMessageBoxSuccess").length 
},
                   
                        success: function (oDialogs) {
                        	 if (oDialogs[oDialogs.length - 1].$().text() === "Cancel") {
                           oDialogs[oDialogs.length - 1].$().trigger("tap");
                            Opa5.assert.ok(true, "Found Cancel button inside MessageBox!");
                            
                        }
                            Opa5.assert.ok(true, "The message Box  was shown");
                        },
                        errorMessage: "The message Box did not show up"
                    });
				}
			}
		}
	});

});

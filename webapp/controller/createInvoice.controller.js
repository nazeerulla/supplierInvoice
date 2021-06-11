sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/UploadCollectionParameter",
    "jquery.sap.global",
    'sap/ui/model/json/JSONModel',
    'sap/m/ColumnListItem',
    'sap/m/Label',
    'sap/m/Token',
    "sap/m/MessageBox",
    'sap/m/MessagePopover',
    'sap/m/MessageItem'

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, UploadCollectionParameter, global, JSONModel,
        ColumnListItem, Label, Token, MessageBox, MessagePopover, MessageItem) {
        "use strict";

		return Controller.extend("com.sap.supplierinvoiceapp.controller.createInvoice", {
			  onInit: function () {
                // var dvh=this.getOwnerComponent().getModel("DVH");
                //                 var oUploadCollection = this.getView().byId('UploadCollection');
                //    oUploadCollection.setUploadUrl("/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentContentSet");
                //    var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV",false);
                //     this.getView().setModel(oModel);
                this.messagePopOverFlag="";
                this.oBusy = new sap.m.BusyDialog();
                var columnsdata = this.getOwnerComponent().getModel("columnModel").getData();
                var currencyData = this.getOwnerComponent().getModel("currencyModel").getData();

                var columnstaxcodedata = this.getOwnerComponent().getModel("columntaxCode").getData();
                var taxCodeData = this.getOwnerComponent().getModel("taxCode").getData();

                var appData = {
                    tokens: [{
                        text: "EUR",
                        key: "EUR"
                    }]
                };
                ///Restriction of Manual entry for Datepicker

                // var oDatePicker = this.getView().byId("DP1");
                // oDatePicker.addEventDelegate({
                // 	onAfterRendering: function(){
                // var oDateInner = this.$().find('.sapMInputBaseInner');
                // 		var oID = oDateInner[0].id;
                // 		$('#'+oID).attr("disabled", "disabled"); 
                //     }},oDatePicker);

                //     var oDatePicker = this.getView().byId("DP2");
                // oDatePicker.addEventDelegate({
                // 	onAfterRendering: function(){
                // var oDateInner = this.$().find('.sapMInputBaseInner');
                // 		var oID = oDateInner[0].id;
                // 		$('#'+oID).attr("disabled", "disabled"); 
                //     }},oDatePicker);

                //     var oDatePicker = this.getView().byId("DP3");
                // oDatePicker.addEventDelegate({
                // 	onAfterRendering: function(){
                // var oDateInner = this.$().find('.sapMInputBaseInner');
                // 		var oID = oDateInner[0].id;
                // 		$('#'+oID).attr("disabled", "disabled"); 
                // 	}},oDatePicker);


                var dataModel = new sap.ui.model.json.JSONModel(appData);

                this.getView().setModel(dataModel, "token");

                this.oColModel = new JSONModel(columnsdata);
                this.oProductsModel = new JSONModel(currencyData);
                this.oColtaxcodeModel = new JSONModel(columnstaxcodedata);
                this.otaxCodeModel = new JSONModel(taxCodeData);
                var detailModel = new JSONModel(columnstaxcodedata.details);
                this.getView().setModel(detailModel, "detailsModel").bindElement("/");


                this.byId("DP1").setDateValue(new Date());
                this.byId("DP2").setDateValue(new Date());
                this.byId("DP3").setDateValue(new Date());
                var attachData = [];
                var model = new sap.ui.model.json.JSONModel();
                model.setData(attachData);
                this.getView().setModel(model, "attachset");

                var data = [{

                    "invoiceItem": "2",
                    "Plant": "",
                    "PurchaseOrderItem": "",
                    "taxCode": "V1",
                    "taxRate": 10,
                    "amountSupplier": "0",
                    "amountsuppUnit": "EUR",
                    "quanity": "3",
                    "Unit": "PC",
                    "amountperUnit": "0",
                    "amtperUnit": "EUR",
                    "taxAmount": "0",
                    "taxUnit": "EUR",
                    "netAmount": "",
                    "netUnit": "EUR"

                },
                {

                    "invoiceItem": "2",
                    "shortText": "Lorem ipsum dolor sit amet",
                    "taxCode": "V2",
                    "taxRate": 20,
                    "amountSupplier": "0.00",
                    "amountsuppUnit": "EUR",
                    "quanity": "3",
                    "Unit": "PC",
                    "amountperUnit": "200.00",
                    "amtperUnit": "EUR",
                    "taxAmount": "30.00",
                    "taxUnit": "EUR",
                    "netAmount": "",
                    "netUnit": "EUR"

                }]


                // var model = new sap.ui.model.json.JSONModel();
                // model.setData(data);
                // this.getView().setModel(model, "itemsModel");

                this.itemsData();
                this.detailsData();
            },

            onBeforeUploadStarts: function (oEvent) {
                // Header Slug
                var oCustomerHeaderSlug = new UploadCollectionParameter({
                    name: "slug",
                    value: oEvent.getParameter("fileName")
                });
                var oModel = this.getOwnerComponent().getModel("Attachments");

                //	oModel.refreshSecurityToken();

                //var oHeaders = oModel.oHeaders;
                var invoice = sap.ui.getCore().supplierInvoice;
                var fiscalYear = this.getView().byId("fiscalId").getValue();

                //var sToken = oHeaders['x-csrf-token'];
                // oHeaders['BusinessObjectTypeName']="BUS2081";
                // oHeaders['LinkedSAPObjectKey']="51056013542021";
                // oHeaders['Content-Type']="attachment/jpg";
                //     var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({
                //  	name: "x-csrf-token",
                //  	value:sToken
                //  });
                var contenttype = new sap.m.UploadCollectionParameter({
                    name: "Content-Type",
                    value: "attachment/jpg"
                });
                var objectKey = new sap.m.UploadCollectionParameter({
                    name: "LinkedSAPObjectKey",
                    value: "51056062102021"
                });
                var objectKeyName = new sap.m.UploadCollectionParameter({
                    name: "BusinessObjectTypeName",
                    value: "BUS2081"
                });

               // oEvent.getParameters().addHeaderParameter(oCustomerHeaderToken);
                oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
                oEvent.getParameters().addHeaderParameter(contenttype);
                oEvent.getParameters().addHeaderParameter(objectKey);
                oEvent.getParameters().addHeaderParameter(objectKeyName);
                //  oEvent.getParameters().upload();

                MessageToast.show("BeforeUploadStarts event triggered.");
            },
            handleChangePostDate: function (oEvent) {
                var dateValue = oEvent.getSource().getDateValue().getFullYear();
                this.getView().getModel("detailsModel").getData().fiscal = dateValue;
                this.getView().getModel("detailsModel").updateBindings();
                //this.getView().byId("fiscalId").setValue(dateValue);

            },
            onChange: function (oEvent) {
                //  this.flid = oEvent.getSource();

                // var uploadedfile = oEvent.getParameters().files[0];
                // this.uploadfile(uploadedfile);

                //   var oCustomerHeaderSlug = new UploadCollectionParameter({
                //                     name: "slug",
                //                     value: oEvent.getParameter("fileName")
                //                 });
                var oModel = this.getOwnerComponent().getModel("Attachments");

                oModel.refreshSecurityToken();

                var oHeaders = oModel.oHeaders;
                var invoice = sap.ui.getCore().supplierInvoice;
                var fiscalYear = this.getView().byId("fiscalId").getValue();

                var sToken = oHeaders['x-csrf-token'];
                // oHeaders['BusinessObjectTypeName']="BUS2081";
                // oHeaders['LinkedSAPObjectKey']="51056013542021";
                // oHeaders['Content-Type']="attachment/jpg";
                var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({
                    name: "x-csrf-token",
                    value: sToken
                });
                //  var  contenttype= new sap.m.UploadCollectionParameter({
                //  	name: "Content-Type",
                //  	value:"attachment/jpg"
                //  });
                //  var objectKey = new sap.m.UploadCollectionParameter({
                //  	name: "LinkedSAPObjectKey",
                //  	value:invoice+fiscalYear
                //  });
                //  var objectKeyName = new sap.m.UploadCollectionParameter({
                //  	name: "BusinessObjectTypeName",
                //  	value:"BUS2081"
                //  });

                oEvent.getSource().addHeaderParameter(oCustomerHeaderToken);
                // oEvent.getSource().addHeaderParameter(oCustomerHeaderSlug);
                // oEvent.getSource().addHeaderParameter(contenttype);
                // oEvent.getSource().addHeaderParameter(objectKey);
                // oEvent.getSource().addHeaderParameter(objectKeyName);

            },
            uploadAttach: function () {
                var oUploadCollection = this.byId("UploadCollection");
                oUploadCollection.upload();
            },

            uploadfile: function (file) {

                this.FileName = file.name;
                this.FileType = file.type;
                var oModel = this.getOwnerComponent().getModel("Attachments");

                oModel.refreshSecurityToken();

                var oHeaders = oModel.oHeaders;
                var invoice = sap.ui.getCore().supplierInvoice;
                var fiscalYear = this.getView().byId("fiscalId").getValue();

                var sToken = oHeaders['x-csrf-token'];

                this.flid.setUploadUrl("/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentContentSet");
                this.flid.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                    name: "SLUG",
                    value: file.name
                }));
                this.flid.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                    name: "x-csrf-token",
                    value: sToken
                }));

                //    this.flid.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                //        name: "content-type",
                //        value: "application/jpg"
                //    }));
                this.flid.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                    name: "LinkedSAPObjectKey",
                    value: "51056062102021"
                }));
                this.flid.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                    name: "BusinessObjectTypeName",
                    value: "BUS2081"
                }));

                this.flid.upload();


            },

            onComplete: function (oevent) {
                var that = this;


            },




            onUploadComplete: function (oEvent) {
                var oUploadCollection = this.byId("UploadCollection");
                var oData = oUploadCollection.getModel("attachset").getData();
                var statusCode = oEvent.mParameters.files[0].status;
                var date = oEvent.mParameters.files[0].headers.date;
                var fileName = oEvent.mParameters.files[0].fileName
                if (statusCode == "201") {
                    // var msg = "Attachment successfully Uploaded";
                    // sap.m.MessageBox.show(msg, {
                    //     icon: sap.m.MessageBox.Icon.SUCCESS,
                    //     title: "Success",
                    //     actions: [sap.m.MessageBox.Action.OK],
                    //     onClose: function (e) { }
                    // });

                      MessageToast.show("UploadComplete event triggered.");

                }else{

                    this.messagePopOverFlag="attachment";

                        
                        var errorMsg = oEvent.mParameters.mParameters.response;
                        // sap.m.MessageBox.show(errorMsg, {
                        //     icon: sap.m.MessageBox.Icon.ERROR,
                        //     title: "Error",
                        //     actions: [sap.m.MessageBox.Action.OK],
                        //     onClose: function (e) { }
                        // });

                        var oMessageTemplate = new MessageItem({
                            type: '{type}',
                            title: '{title}',

                            description: '{desc}'

                        });
                        that.attachmentPopOver = new MessagePopover({
                            placement: "Top",
                            items: {
                                path: '/',
                                template: oMessageTemplate
                            }
                        });


                        var array = [];
                        var obj = {};
                        obj.type = 'Error';
                        obj.title = "Error";

                        obj.desc = errorMsg;
                        array.push(obj);


                        var oModel = new JSONModel();
                        oModel.setData(array);
                        that.attachmentPopOver.setModel(oModel);
                        that.getView().byId("Messagebutton").setVisible(true);
                        var viewModel = new JSONModel();
                        viewModel.setData({
                            messagesLength: "1" + ''
                        });

                        that.getView().setModel(viewModel);
                }
                if (oData.length == "") {
                    var data = {
                        "items": [{
                            "ID": Date.now().toString(), // generate Id,
                            "fileName": oEvent.getParameter("files")[0].fileName,
                            "MIMEType": "",
                            "thumbnailUrl": "",
                            "url": "",
                            "attributes": [
                                {
                                    "title": "Uploaded By",
                                    "text": "Nazeer",
                                    "active": false
                                },
                                {
                                    "title": "Uploaded On",
                                    "text": new Date().toDateString(),
                                    "active": false
                                }

                            ],
                            "statuses": [
                                {
                                    "title": "",
                                    "text": "",
                                    "state": "None"
                                }
                            ],
                            "markers": [
                                {
                                }
                            ],
                            "selected": false
                        }]
                    };


                    var model = new sap.ui.model.json.JSONModel();
                    model.setData(data);
                    this.getView().setModel(model, "attachset");
                    this.getView().getModel("attachset").refresh();
                } else {
                    oData.items.unshift({
                        "ID": Date.now().toString(), // generate Id,
                        "fileName": oEvent.getParameter("files")[0].fileName,
                        "MIMEType": "",
                        "thumbnailUrl": "",
                        "url": "",
                        "attributes": [
                            {
                                "title": "Uploaded By",
                                "text": "Nazeer",
                                "active": false
                            },
                            {
                                "title": "Uploaded On",
                                "text": new Date().toDateString(),
                                "active": false
                            }
                        ],
                        "statuses": [
                            {
                                "title": "",
                                "text": "",
                                "state": "None"
                            }
                        ],
                        "markers": [
                            {
                            }
                        ],
                        "selected": false
                    });
                    var model = new sap.ui.model.json.JSONModel();
                    model.setData(oData);
                    this.getView().setModel(model, "attachset");
                    this.getView().getModel("attachset").refresh();
                }
                // Sets the text to the label
                //	this.byId("attachmentTitle").setText(this.getAttachmentTitleText());

                // delay the success message for to notice onChange message
                // setTimeout(function () {
                //     MessageToast.show("UploadComplete event triggered.");
                // }, 4000);
            },
            onFileDeleted: function (oEvent) {
                this.deleteItemById(oEvent.getParameter("documentId"));
                MessageToast.show("FileDeleted event triggered.");
            },

            deleteItemById: function (sItemToDeleteId) {
                var oData = this.byId("UploadCollection").getModel("attachset").getData();
                var aItems = oData.items;
                jQuery.each(aItems, function (index) {
                    if (aItems[index] && aItems[index].ID === sItemToDeleteId) {
                        aItems.splice(index, 1);
                    }
                });
                this.byId("UploadCollection").getModel("attachset").setData({
                    "items": aItems
                });
                this.byId("UploadCollection").getModel("attachset").updateBindings();
            },
            onValueHelpTaxcode: function (oEvent) {
                var aCols = this.oColtaxcodeModel.getData().cols;
                this.taxcodePath = oEvent.getSource().getBindingContext("itemsModel").sPath.split("/")[1];

                this._oValueHelpDialog = sap.ui.xmlfragment("com.sap.createsupplierinvoice.fragment.valuehelpTaxCode", this);
                this.getView().addDependent(this._oValueHelpDialog);

                this._oValueHelpDialog.getTableAsync().then(function (oTable) {
                    oTable.setModel(this.otaxCodeModel);
                    oTable.setModel(this.oColtaxcodeModel, "columns");

                    if (oTable.bindRows) {
                        oTable.bindAggregation("rows", "/taxcode");
                    }

                    if (oTable.bindItems) {
                        oTable.bindAggregation("items", "/taxcode", function () {
                            return new ColumnListItem({
                                cells: aCols.map(function (column) {
                                    return new Label({ text: "{" + column.template + "}" });
                                })
                            });
                        });
                    }

                    this._oValueHelpDialog.update();
                }.bind(this));
                this._oInput = oEvent.getSource();
                var oToken = new Token();
                //	oToken.setKey(this._oInput.getSelectedKey());
                //	oToken.setText(this._oInput.getValue());
                //	this._oValueHelpDialog.setTokens([oToken]);
                this._oValueHelpDialog.open();

            },

            onValueHelpRequested: function (oEvent) {
                var aCols = this.oColModel.getData().cols;

                this._oValueHelpDialog = sap.ui.xmlfragment("com.sap.createsupplierinvoice.fragment.ValuehelpDialog", this);
                this.getView().addDependent(this._oValueHelpDialog);

                this._oValueHelpDialog.getTableAsync().then(function (oTable) {
                    oTable.setModel(this.oProductsModel);
                    oTable.setModel(this.oColModel, "columns");

                    if (oTable.bindRows) {
                        oTable.bindAggregation("rows", "/CurrencyCollection");
                    }

                    if (oTable.bindItems) {
                        oTable.bindAggregation("items", "/CurrencyCollection", function () {
                            return new ColumnListItem({
                                cells: aCols.map(function (column) {
                                    return new Label({ text: "{" + column.template + "}" });
                                })
                            });
                        });
                    }

                    this._oValueHelpDialog.update();
                }.bind(this));
                this._oInput = oEvent.getSource();
                var oToken = new Token();
                //	oToken.setKey(this._oInput.getSelectedKey());
                //	oToken.setText(this._oInput.getValue());
                //	this._oValueHelpDialog.setTokens([oToken]);
                this._oValueHelpDialog.open();
            },

            onValueHelpOkPress: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens");
                var selectedvalue = aTokens[0].mProperties.text;
                this._oInput.setValue(selectedvalue);
                this._oValueHelpDialog.close();
            },

            onValueHelpCancelPress: function () {
                this._oValueHelpDialog.close();
            },

            onValueHelpAfterClose: function () {
                this._oValueHelpDialog.destroy();
            },
            onValueHelpOkPresstaxcode: function (oEvent) {
                var aTokens = oEvent.getParameter("tokens");
                var selectedvalue = aTokens[0].mProperties.text;
                this._oInput.setValue(selectedvalue);
                var index = oEvent.getSource().getTable().getSelectedIndex();
                if (selectedvalue == "V1") {
                    var itemsdata = this.getView().getModel("itemsModel").getData();
                    itemsdata[this.taxcodePath].taxRate = 10;
                } else if (selectedvalue == "V2") {
                    var itemsdata = this.getView().getModel("itemsModel").getData();
                    itemsdata[this.taxcodePath].taxRate = 20;
                }
                else if (selectedvalue == "V3") {
                    var itemsdata = this.getView().getModel("itemsModel").getData();
                    itemsdata[this.taxcodePath].taxRate = 30;
                }


                // var index=oevent.getSource().getBindingContext().sPath.split("/")[1];
                var tabledata = this.getView().getModel("itemsModel").getData()[this.taxcodePath];


                var amtperUnit = Number(tabledata.amountperUnit);
                var quanity = Number(tabledata.OrderQuantity);
                var taxrate = tabledata.taxRate;

                var taxAmount = Number((amtperUnit * quanity * taxrate) / 100);
                var netAmount = (amtperUnit * quanity) + taxAmount;
                this.getView().getModel("itemsModel").getData()[this.taxcodePath].taxAmount = taxAmount;
                this.getView().getModel("itemsModel").getData()[this.taxcodePath].netAmount = netAmount;

                var tabledata = this.getView().getModel("itemsModel").getData();

                var invoiceAmount = 0;

                for (var i = 0; i < tabledata.length; i++) {

                    var netamount = tabledata[i].netAmount;
                    invoiceAmount += netamount;

                }

                this.getView().byId("grossinvoice").setValue(invoiceAmount);



                this._oValueHelpDialog.close();
            },

            onValueHelpCancelPresstaxcode: function () {
                this._oValueHelpDialog.close();
            },

            onValueHelpAfterClosetaxcode: function () {
                this._oValueHelpDialog.destroy();
            },
            validateInput: function (oEvent) {
                var regExp = /^[0-9.]+$/,
                    src = oEvent.getSource(),
                    value = oEvent.getParameter("value");

                if (!regExp.test(value)) {
                    src.setValue("");
                    sap.m.MessageToast.show("Please Enter valid values");

                    return;
                }

            },

            onChangeValue: function (oevent) {

                var regExp = /^[0-9.]+$/,
                    regExp1 = /^[0-9,]+$/,
                    reg3 = /^[0-9]{13}$/,
                    src = oevent.getSource(),
                    value = oevent.getParameter("value"),

                    index = null,
                    value1 = null;
                value = value.replace(/\,/g, '');


                if (reg3.test(value)) {
                    src.setValue("");
                    MessageBox.error("Only 13 digits are allowed before decimal");
                }

                index = value.indexOf(".");
                if (index > 0) {
                    value1 = value.slice(index + 1);
                    if (value1.length > 2) {
                        sap.m.MessageToast.show("Only 2 digits are allowed after period(.)");
                        src.setValue("");

                        return;
                    }
                }
                var index = oevent.getSource().getBindingContext("itemsModel").sPath.split("/")[1];
                var tabledata = this.getView().getModel("itemsModel").getData()[index];
                tabledata.amountperUnit = value;

                var amtperUnit = Number(tabledata.amountperUnit);
                var quanity = Number(tabledata.OrderQuantity);
                var taxrate = tabledata.taxRate;

                var taxAmount = Number((amtperUnit * quanity * taxrate) / 100);
                var netAmount = (amtperUnit * quanity) + taxAmount;
                this.getView().getModel("itemsModel").getData()[index].taxAmount = taxAmount;
                this.getView().getModel("itemsModel").getData()[index].netAmount = netAmount;

                var tabledata = this.getView().getModel("itemsModel").getData();

                var invoiceAmount = 0;

                for (var i = 0; i < tabledata.length; i++) {

                    var netamount = tabledata[i].netAmount;
                    invoiceAmount += netamount;

                }

                this.getView().byId("grossinvoice").setValue(invoiceAmount);

            },
            detailsData: function () {

                var that = this;
                that.Model = this.getOwnerComponent().getModel();
                that.Model.oHeaders["x-csrf-token"] = "fetch";
                // var url = "https://cors-anywhere.herokuapp.com/https://cc3-715-api.wdf.sap.corp/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV";
                // var oModelData = new sap.ui.model.odata.v2.ODataModel(url, true);
                // oModelData.setHeaders("content-type", "application/json");
                // oModelData.setHeaders("Access-Control-Allow-Origin", "*");
                // oModelData.setHeaders("X-CSRF-Token", "Fetch");
                // oModelData.setHeaders("Authorization", "Basic Q1VfQ0MzX1BPOldlbGNvbWUxIQ==");
                //"Q1VfQ0MzX1BPOldlbGNvbWUxIQ=="

                that.Model.read("/A_PurchaseOrder('4500013318')", {
                    success: function (oData, oResponse) {
                        var oFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd/MM/YYYY" });
                        var date = oFormat.format(new Date());

                        var oModel = new sap.ui.model.json.JSONModel();
                        oData.fiscal = new Date().getFullYear();
                        oData.invoiceDate = date;
                        oData.postDate = date;
                        oData.taxDate = date;
                        oModel.setData(oData);
                        that.getView().setModel(oModel, "detailsModel").bindElement("/");
                        sap.ui.getCore().Token = that.Model.getSecurityToken();




                    },
                    error: function (oError) {
                        var error = oError;
                        var errorMsg = JSON.parse(oError.responseText).error.message.value;
                        sap.m.MessageBox.show(errorMsg, {
                            icon: sap.m.MessageBox.Icon.ERROR,
                            title: "Error",
                            actions: [sap.m.MessageBox.Action.OK],
                            onClose: function (e) { }
                        });

                    }
                })

            },
            itemsData: function () {

                var that = this;
                this.Model = this.getOwnerComponent().getModel();
                // var xhttp = new XMLHttpRequest();
                // xhttp.onreadystatechange = function () {
                //     if (this.readyState == 4 && this.status == 200) {
                //         // Typical action to be performed when the document is ready:
                //         var response = xhttp.response;
                //         console.log("ok" + response);
                //         var JSONModel = new sap.ui.model.json.JSONModel();
                //         var data = JSON.parse(response).d.results;


                //         for (var k = 0; k < data.length; k++) {
                //             data[k].ProductType = k;
                //             data[k].amountperUnit = 0;
                //             data[k].taxAmount = 0;
                //             data[k].netAmount = 0;

                //         }
                //         JSONModel.setData(data);
                //         that.getView().setModel(JSONModel, "itemsModel");


                //     } else {

                //     }
                // };
                // xhttp.open("get", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder('4500000038')/to_PurchaseOrderItem");
                // xhttp.setRequestHeader("Accept", "application/json");
                // xhttp.setRequestHeader("APIKey", "wW3YYUWu1e0yPCZXhyNJOZEd4z2GIgDG");

                // //in prod, you should encrypt user name and password and provide encrypted keys here instead 
                // xhttp.send();

                this.Model = this.getOwnerComponent().getModel();

                this.Model.read("/A_PurchaseOrder('4500013318')/to_PurchaseOrderItem", {

                    success: function (oData, oResponse) {
                        for (var k = 0; k < oData.results.length; k++) {
                            oData.results[k].serialNo = k + 1;
                            oData.results[k].TaxCode = "V0";
                            oData.results[k].taxRate = 0;
                            oData.results[k].OrderQuantity = "1";
                        }

                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(oData.results);
                        that.getView().setModel(oModel, "itemsModel");

                    },
                    error: function (oError) {
                        var error = oError;
                        var errorMsg = JSON.parse(oError.responseText).error.message.value;
                        sap.m.MessageBox.show(errorMsg, {
                            icon: sap.m.MessageBox.Icon.ERROR,
                            title: "Error",
                            actions: [sap.m.MessageBox.Action.OK],
                            onClose: function (e) { }
                        });

                    }
                });




            },
            cancelSupplier: function () {
                var that = this;
                MessageBox.warning("Do you want to cancel the Create Supplier Invoice?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    onClose: function (sAction) {
                        if (sAction == "OK") {


                        }


                    }
                });
            },
            onCreateInvoice: function () {
                var that = this;
                this.createInvoiceModel = this.getOwnerComponent().getModel("supplierInvoice");

                var itemsData = this.getView().getModel("itemsModel").getData();
                var PO = this.getView().getModel("detailsModel").getData().PurchaseOrder;

                var itemsArray = [];
                for (var k = 0; k < itemsData.length; k++) {
                    var obj = {};
                    obj.SupplierInvoiceItem = itemsData[k].serialNo.toString();
                    obj.PurchaseOrder = PO;
                    obj.PurchaseOrderItem = itemsData[k].PurchaseOrderItem;
                    obj.Plant = itemsData[k].Plant;
                    obj.TaxCode = itemsData[k].TaxCode;
                    obj.DocumentCurrency = itemsData[k].DocumentCurrency;
                    obj.SupplierInvoiceItemAmount = itemsData[k].amountperUnit;
                    obj.PurchaseOrderQuantityUnit = itemsData[k].PurchaseOrderQuantityUnit;
                    obj.QuantityInPurchaseOrderUnit = itemsData[k].OrderQuantity;

                    itemsArray.push(obj);

                }

                var detailsModel = this.getView().getModel("detailsModel").getData();
                var invoiceDate = detailsModel.invoiceDate.split("/");
                var postDate = detailsModel.postDate.split("/");
                var taxDate = detailsModel.taxDate.split("/");

                var invoiceDate = invoiceDate[2] + '-' + invoiceDate[1] + '-' + invoiceDate[0] + 'T00:00';
                var postDate = postDate[2] + '-' + postDate[1] + '-' + postDate[0] + 'T00:00';
                var taxDate = taxDate[2] + '-' + taxDate[1] + '-' + taxDate[0] + 'T00:00';
                var InvoiceGrossAmount = this.getView().byId("grossinvoice").getValue();



                var payload = {
                    "FiscalYear": detailsModel.fiscal.toString(),
                    "CompanyCode": detailsModel.CompanyCode,
                    "DocumentDate": invoiceDate,
                    "PostingDate": postDate,
                    "SupplierInvoiceIDByInvcgParty": detailsModel.InvoicingParty,
                    "InvoicingParty": detailsModel.InvoicingParty,
                    "InvoiceGrossAmount": InvoiceGrossAmount,
                    "DocumentCurrency": detailsModel.DocumentCurrency,
                    "TaxDeterminationDate": taxDate,
                    "to_SuplrInvcItemPurOrdRef": itemsArray
                }
                that.oBusy.open();
                that.createInvoiceModel.oHeaders["x-csrf-token"] = sap.ui.getCore().Token;

                that.createInvoiceModel.create("/A_SupplierInvoice", payload, {
                    success: function (oData, oResponse) {
                        that.uploadAttach();
                        that.oBusy.close();
                        var statusCode = oResponse.statusCode;
                        if (statusCode == "201") {
                            var supplierInvoice = oResponse.data.SupplierInvoice;
                            sap.ui.getCore().supplierInvoice = supplierInvoice;
                            var msg = "Supplier Invoice" + '(' + supplierInvoice + ')' + ' ' + "created Successfully";
                            sap.m.MessageBox.show(msg, {
                                icon: sap.m.MessageBox.Icon.SUCCESS,
                                title: "Success",
                                actions: [sap.m.MessageBox.Action.OK],
                                onClose: function (e) { }
                            });
                        }
                        

                    },
                    error: function (oError) {
                        that.oBusy.close();
                        this.messagePopOverFlag="supplierInvoice";

                        var error = oError;
                        var errorMsg = JSON.parse(oError.responseText).error.message.value;
                        // sap.m.MessageBox.show(errorMsg, {
                        //     icon: sap.m.MessageBox.Icon.ERROR,
                        //     title: "Error",
                        //     actions: [sap.m.MessageBox.Action.OK],
                        //     onClose: function (e) { }
                        // });

                        var oMessageTemplate = new MessageItem({
                            type: '{type}',
                            title: '{title}',

                            description: '{desc}'

                        });
                        that.invoicePopOver = new MessagePopover({
                            placement: "Top",
                            items: {
                                path: '/',
                                template: oMessageTemplate
                            }
                        });


                        var array = [];
                        var obj = {};
                        obj.type = 'Error';
                        obj.title = "Error";

                        obj.desc = errorMsg;
                        array.push(obj);


                        var oModel = new JSONModel();
                        oModel.setData(array);
                        that.invoicePopOver.setModel(oModel);
                        that.getView().byId("Messagebutton").setVisible(true);
                        var viewModel = new JSONModel();
                        viewModel.setData({
                            messagesLength: "1" + ''
                        });

                        that.getView().setModel(viewModel);





                    }
                });


            },
            handleMessagePopoverPress: function (oEvent) {

                if(this.messagePopOverFlag =="attachment"){
                 this.attachmentPopOver.toggle(oEvent.getSource());
                this.attachmentPopOver.attachAfterClose(function () {
                    this.attachmentPopOver.destroy();
                    //that.getView().byId("Messagebutton").setVisible(false);

                });
                }else{
                    this.invoicePopOver.toggle(oEvent.getSource());
                this.invoicePopOver.attachAfterClose(function () {
                    this.invoicePopOver.destroy();
                    //that.getView().byId("Messagebutton").setVisible(false);

                });

                }
                

            },
            dateValidate: function (oEvent) {
                var bValid = oEvent.getParameter("valid");

                if (!bValid) {
                    MessageBox.error("Please enter valid date format.");
                    oEvent.getSource().setValue("");

                    return;
                }

            },
            dateValidatepost: function (oEvent) {
                var bValid = oEvent.getParameter("valid");

                if (!bValid) {
                    MessageBox.error("Please enter valid date format.");
                    oEvent.getSource().setValue("");

                    return;
                }
                var dateValue = oEvent.getSource().getDateValue().getFullYear();
                this.getView().getModel("detailsModel").getData().fiscal = dateValue;
                this.getView().getModel("detailsModel").updateBindings();

            }




        });
    });

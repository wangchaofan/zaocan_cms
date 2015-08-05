'use strict';

$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$(function () {
    $("#cityList").jqGrid({
        url: "/city/lists",
        datatype: "json",
        mtype: "GET",
        styleUI: 'Bootstrap',
        colModel: [
            { name: "id", hidden: true, key: true },
            { name: "code", index: "code", label: '城市代码', editable: true },
            { name: "name", index: "name", label: '城市名称', editable: true },
            { name: "__v", hidden: true }
        ],
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: "#pager",
        sortname: "code",
        sortorder: "asc",
        viewrecords: true,
        gridview: true
    });
    var template = "<div style='margin-left:15px;'><div> Customer ID <sup>*</sup>:</div><div> {CustomerID} </div>";
        template += "<div> Company Name: </div><div>{CompanyName} </div>";
        template += "<div> Phone: </div><div>{Phone} </div>";
        template += "<div> Postal Code: </div><div>{PostalCode} </div>";
        template += "<div> City:</div><div> {City} </div>";
        template += "<hr style='width:100%;'/>";
        template += "<div> {sData} {cData}  </div></div>";
    $('#cityList').navGrid('#pager',
        { edit: true, add: true, del: true, search: true, refresh: false, view: false, position: "left", cloneToTop: false },
        // options for the Edit Dialog
        {
            editCaption: "修改记录",
            recreateForm: true,
            closeAfterEdit: true,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        },
        // options for the Add Dialog
        {
            closeAfterAdd: true,
            recreateForm: true,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        },
        // options for the Delete Dailog
        {
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
    });
});
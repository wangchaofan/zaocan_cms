'use strict';

$.jgrid.defaults.width = 780;
$.jgrid.defaults.height = 400;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$(function () {
    $("#cityList").jqGrid({
        url: "/city/lists",
        datatype: "json",
        mtype: "GET",
        styleUI: 'Bootstrap',
        colModel: [
            { name: "_id", hidden: true, key: true },
            { name: "code", index: "code", label: '城市代码', editable: true },
            { name: "name", index: "name", label: '城市名称', editable: true },
            { name: "__v", hidden: true }
        ],
        loadonce: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        multiselect: false,
        rownumbers: true,
        pager: "#pager",
        sortname: "code",
        sortorder: "asc",
        viewrecords: true,
        gridview: true,
        editurl: '/city/',
        jsonReader: {
            id: "_id"
        }
    });
    $('#cityList').navGrid('#pager',
        {
            add: true,
            edit: true,
            del: true,
            search: true,
            view: false,
            refresh:false
        },
        {
            closeOnEscape:true,
            closeAfterEdit: true,
            recreateForm: true,
            errorTextFormat: function (data) {
                console.log(data);
                return 'Error: ' + data.responseText
            }
        },
        {
            closeOnEscape:true,
            closeAfterAdd: true,
            errorTextFormat: function (data) {
                console.log(data);
                return 'Error: ' + data.responseText
            }
        },
        {
            closeOnEscape:true,
            errorTextFormat: function (data) {
                console.log(data);
                return 'Error: ' + data.responseText
            }
        },
        {
            closeOnEscape:true,
            odata : ['equal', 'not equal', 'less', 'less or equal','greater','greater or equal', 'begins with','does not begin with','is in','is not in','ends with','does not end with']
        }
    );
});
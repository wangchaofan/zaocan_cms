'use strict';

$(function () {
    var $grid = $("#cityList");
    $grid.jqGrid({
        url: "/district/lists",
        datatype: "json",
        mtype: "GET",
        styleUI: 'Bootstrap',
        colModel: [
            { name: "_id", hidden: true, key: true },
            { name: "name", index: "name", label: '区域名称', editable: true },
            { name: "city.name", index: "city.name", label: '所属城市', sortable: false },
            { name: "city._id", hidden: true },
            { name: "__v", hidden: true }
        ],
        rowNum: 10,
        rowList: [10, 20, 30],
        multiselect: false,
        rownumbers: true,
        pager: "#pager",
        sortname: "code",
        sortorder: "asc",
        viewrecords: true,
        gridview: true,
        editurl: '/district/',
        jsonReader: {
            id: "_id"
        }
    });

    $grid.navGrid('#pager',
        {
            add: true,
            edit: true,
            del: true,
            search: true,
            view: false,
            refresh:false,
            addfunc: function() {
                $('form').loadFormData({});
                modal.find('.modal-title').text('新增');
                $('p[role="errorwarn"]').text('');
                $('#submit').attr('submit-type', 'add');
                modal.modal('show');
            },
            editfunc: function () {
                var rowId =$grid.jqGrid('getGridParam','selrow');
                var rowData = $grid.jqGrid('getRowData', rowId);
                $('form').loadFormData(rowData);
                modal.find('.modal-title').text('修改');
                $('p[role="errorwarn"]').text('');
                $('#submit').attr('submit-type', 'edit');
                cityCombobox.loadData(rowData);
                modal.modal('show');
            },
            delfunc: function () {
                var rowId =$grid.jqGrid('getGridParam','selrow');
                $.ajax({
                    type: 'delete',
                    dataType: 'json',
                    url: '/district/',
                    data: { _id: rowId },
                    success: function (result) {
                        if(result.status === 1) {
                            alert('删除成功');
                            $grid.trigger("reloadGrid");
                        } else {
                            alert(result.responseText);
                        }
                    },
                    error: function () {
                        alert('请求失败，请重新提交');
                    }
                });
            }
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

    var form = '<form class="form-horizontal">' +
        '<input type="text" id="_id" name="_id" hidden="true"/>' +
        '<input type="text" id="__v" name="__v" hidden="true"/>' +
        '<div class="form-group">' +
        '<label class="col-md-3 control-label" for="name">区域名称</label>' +
        '<div class="col-md-6">' +
        '<input class="form-control" type="text" id="name" name="name"/>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="col-md-3 control-label"  for="city">所属城市</label>' +
        '<div class="col-md-6">' +
        '<div id="city" input-name="city">' +
        '</select>' +
        '</div>' +
        '</form>';
    var modal = $('#addEditModal');
    modal.find('.modal-body').append(form);
    var cityCombobox = new Combobox({render: "city", url: '/city/all'});

    $('.modal-dialog #submit').click(function () {
        var type = $(this).attr('submit-type');
        var postType = 'POST';
        var data = $('form').getSubmitData();
        if(!data.name) {
            $('p[role="errorwarn"]').text('区域名称不能为空');
            return false;
        }
        if(type === 'edit') {
            postType = "PUT";
        }
        $('p[role="errorwarn"]').text('');
        $.ajax({
            type: postType,
            dataType: 'json',
            url: '/district/',
            data: data,
            success: function (result) {
                if(result.status === 1) {
                    $grid.trigger("reloadGrid");
                    modal.modal('hide');
                } else {
                    $('p[role="errorwarn"]').text(result.responseText);
                }
            },
            error: function () {
                alert('请求失败，请重新提交');
            }
        })
    });
});
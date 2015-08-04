define('Grid',['jquery'], function ($) {
    'use strict';
    var grid = function (options) {
        var sortCss= 'sortableTable';
        this.options = {
            id: '',
            renderTo: '',
            sortable: true,
            sortname: '',
            gridCol: [],
            gridHead: [],
            url: '',
            num: 10,
            numList: [10, 20, 50, 100],
            data: null,
            searchText: '请输入关键字',
            searchCol: ['Code', 'Name']
        };
    };
    $.extend(this.options, options);
    this.prototype = {
        init: function () {
            var options = this.options,
                $dom = $('#' + options.renderTo);
            $dom.addClass('.dataTables_wrapper .form-inline. dt-bootstrap.no-footer');
            var lengthOptionsHtml = '';
            for(var i=0; i<options.numList.length; i++) {
                lengthOptionsHtml += '<option value="'+options.numList[i]+'">"'+options.numList[i]+'"</option>'
            }
            var lengthAndfilterHtml ='<div class="row">' +
                                        '<div class="col-sm-6 dataTable_length">' +
                                            '<label>' +
                                                '显示 &nbsp:'+
                                                '<select class="form-control input-sm" name="dataTable_length" data-controls="dataTable_length">' +
                                                    +lengthOptionsHtml+
                                                '</select>'+
                                                '条数据'+
                                            '</label>'+
                                        '</div>'+
                                        '<div class="col-sm-6 dataTables_filter">' +
                                            '<label>' +
                                                '<input class="form-control input-sm" type="search" name="keyValue" placeholder="'+options.searchText+'"/>' +
                                            '</label>'
                                        '</div>'+
                                      '</div>';
        },
        initEvent: function () {

        }
    };
    function initThead() {

    };
    function initTbody() {

    };
});

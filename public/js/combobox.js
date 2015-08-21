/**
 * Created by wangchaofan on 15/8/19.
 */
var Combobox = function(options) {
    this.options = {
        data: [],
        url: null,
        token: '_id'
    };
    $.extend(this.options, options);
    this.data = null;
    var tpl = '<button class="btn btn-default dropdown-toggle" type="button">' +
                '<span class="filter-option pull-left"></span>' +
                '&nbsp;'+
                '<span class="caret"></span>' +
            '</button>' +
            '<div class="combobox-menu open">' +
                '<ul class="combobox-menu inner"></ul>' +
            '</div>' +
            '<input type="hidden"/>';
    this.init(tpl);
};
Combobox.prototype = {
    init: function (tpl) {
        var _this = this;
        var dom = $('#' + this.options.render);
        dom.addClass('combobox btn-group').html(tpl);
        dom.find('input[type="hidden"]').attr('name', dom.attr('input-name'));
        this.initEvent();
    },
    initEvent: function () {
        var _this = this;
        var dom = $('#' + this.options.render);

        //初始化下拉内容
        function initMenu(data) {
            var listHtml = '';
            for(var i=0; i<data.length; i++) {
                listHtml += '<li data-original-index="'+ i +'">' +
                    '<a tabindex="'+i+'">' +
                    '<span class="text">'+data[i]["name"]+'</span>' +
                    '</a>' +
                    '</li>';
            }
            _this.data = data;
            dom.find('.combobox-menu.inner').html(listHtml);
        }

        //点击显示下拉
        dom.find('.dropdown-toggle').on('click', function () {
            if(_this.data) {
                dom.toggleClass('open');
            } else {
                if(_this.options.url) {
                    $.get(_this.options.url, function (data) {
                        initMenu(data);
                        dom.toggleClass('open');
                    });
                } else {
                    initMenu(data);
                    dom.toggleClass('open');
                }
            }
        });
        dom.find('.dropdown-toggle').on('blur', function () {
            setTimeout(function () {
                dom.removeClass('open');
            }, 100);
        });
        dom.on('mousedown', 'a', function () {
            console.log(11);
            dom.find('.filter-option').text($(this).find('.text').text());
            dom.find('li').removeClass('selected');
            $(this).parent().addClass('selected');
            var selectData = _this.data[parseInt($(this).attr('tabindex'))];
            dom.find('input').val(selectData[_this.options.token]);
        });
    },
    loadData: function (data) {
        var _this = this;
        var dom = $('#' + this.options.render);
        var keyName = dom.attr('id');
        dom.find('.dropdown-toggle .filter-option').text(data[keyName+'.'+'name']);
        dom.find('input[type="hidden"]').val(data[keyName+'.'+_this.options.token]);
    }
};
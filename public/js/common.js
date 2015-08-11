$.jgrid.defaults.width = 780;
$.jgrid.defaults.height = 400;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';

(function($) {
    $.fn.loadFormData = function(data) {
        if(typeof data !== 'object') {
            throw Error("data should be a Object");
        }
        $(this).find('input').each(function () {
            $(this).val(data[$(this).attr('name')]);
        });
    };
    $.fn.getSubmitData = function() {
        var o = {};
        var a = $(this).serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
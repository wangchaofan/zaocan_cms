var ZCMS = {
    initError: function (err) {
        var errMessage = '';
        if(err) {
            for(var errName in err.errors) {
                errMessage = err.errors[errName].message
                break;
            }
        }
        return {
            errors: err,
            status: !!errMessage ? 0 : 1,
            responseText: !!errMessage ? errMessage : "success"
        }
    }
};
module.exports = ZCMS;

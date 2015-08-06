var ZCMS = {
    initError: function (err) {
        return {
            error: err || null,
            status: !!err ? 0 : 1,
            responseText: !!err ? err.message : "success"
        }
    }
};
module.exports = ZCMS;

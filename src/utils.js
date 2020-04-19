module.exports = {
    convertHTMLtoMultiLineString: function (html) {
        var retValue = '';
        try {
            if (html) {
                retValue = html.replace(/\<br\>/g, "\n");
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    },
    removeExtraNewLines: function (string) {
        let retValue = "";
        try {
            retValue = string.replace(/[\r\n]{2,}/g, "\n");
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
}
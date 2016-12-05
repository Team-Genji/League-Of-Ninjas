module.exports = {
    validateString(str, min, max, chars) {
        if (typeof str !== 'string' || str.length < min || str.length > max) {
            return false;
        }
        if (chars) {
            let strToCheck = str.split('');
            if (strToCheck.some(char => {
                return chars.indexOf(char) < 0;
            })) {
                return false;
            }
        }
        return true;
    },

    validateUrl(url) {
        if (!url || url.length === 0) {
            return;
        }

        let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);
        if (!regex.test(url)) {
            return false;
        }
        return true;
    }
};
let validator = (function() {
    function validateString(str, min, max, chars) {
        if (typeof str !== 'string' || str.length < min || str.length > max) {
            return {
                success: false,
                message: `Invalid: Length must be between ${min} and ${max}`
            };
        }
        if (chars) {
            str = str.split('');
            if (str.some(function(char) {
                return chars.indexOf(char) < 0;
            })) {
                return {
                    success: false,
                    message: `Invalid: Chars can be ${chars}`
                };
            }
        }
        return {
            success: true
        };
    }

    function validateUrl(url) {
        if (!url || url.length === 0) {
            return;
        }

        let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);
        if (!regex.test(url)) {
            console.log(url);
            return {
                success: false,
                message: 'Invalid url'
            };
        }
        return {
            success: true
        };
    }

    return {
        validateString,
        validateUrl
    };
}());

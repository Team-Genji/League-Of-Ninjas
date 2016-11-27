class KeyProvider {
    constructor(keys) {
        this._index = 0;
        this._keys = keys;
    }

    getNextKey() {
        if (this._index === this._keys.length) {
            this._index = 0;
        }

        return this._keys[this._index++];
    }
}

module.exports.getKeyProvider = function(keys) {
    return new KeyProvider(keys);
}

module.exports.KeyProvider = KeyProvider;
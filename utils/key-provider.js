const startIndex = 0,
    incrementStep = 1;

class KeyProvider {
    constructor(keys) {
        this._index = startIndex;
        this._keys = keys;
    }

    get nextKey() {
        if (this._index === this._keys.length) {
            this.resetIndex();
        }

        let key = this._keys[this._index];
        this.incrementIndex();
        return key;
    }

    incrementIndex() {
        this._index += incrementStep;
    }

    resetIndex() {
        this._index = startIndex;
    }
}

module.exports.getKeyProvider = function(keys) {
    return new KeyProvider(keys);
};

module.exports.KeyProvider = KeyProvider;
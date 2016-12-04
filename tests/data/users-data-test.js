/*  globals it describe beforeEach*/
const chai = require('chai');
const sinonModule = require('sinon');
let expect = chai.expect;

describe('Users-data-tests', () => {

    let sinon;

    class Validator {
        
    }

    class User {
        constructor(props) {
            this.username = props.username;
            this.avatarUrl = props.avatarUrl;
            this.salt = props.salt;
            this.hashPass = props.hashPass;
        }

        save() {}
        static find() {}
        static findOne() {}
    }

    let data = require('../../data/user-data')({ User }, Validator);

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    it('Expect to pass', () => {
        expect(1).to.equal(1);
    });

    it('expect to fail', () => {
        expect(1).to.not.equal(2);
    });
});
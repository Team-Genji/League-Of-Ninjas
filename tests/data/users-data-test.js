/*  globals it describe beforeEach afterEach */
const chai = require('chai');
const sinonModule = require('sinon');
let expect = chai.expect;

describe('Users-data-tests', () => {

    let sinon;

    class User {
        constructor(props) {
            this.username = props.username;
            this.avatarUrl = props.avatarUrl;
            this.password = props.password;
        }

        save() {}
        static find() {}
        static findOne() {}
    }

    let data = require('../../data/user/user-data')({ User });

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('createUser tests', () => {
        let username = 'John',
            avatarUrl = 'http://natashaleitedemoura.com/wp-content/uploads/sites/10/2014/11/horror_2382351b.jpg',
            password = 'dwdwdw';

        let expectedUser = new User({
            username,
            password,
            avatarUrl
        });

        beforeEach(() => {
            sinon.stub(User.prototype, 'save', cb => {
                cb(null, expectedUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it('expect to return new user with valid properties', done => {
            data.createUser(username, password, avatarUrl)
                .then(user => {
                    expect(user).to.eql(expectedUser);
                    done();
                });
        });
    });
});
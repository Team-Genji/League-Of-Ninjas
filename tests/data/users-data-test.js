/*  globals it describe beforeEach afterEach */
const chai = require('chai');
const sinonModule = require('sinon');
let expect = chai.expect;
let assert = chai.assert;
var spy = sinonModule.spy();
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
        static findById() {}
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

        afterEach(() => {
            sinon.restore();
        });

        it('expect to return new user with valid properties', done => {
            sinon.stub(User.prototype, 'save', cb => {
                cb(null, expectedUser);
            });

            data.createUser(username, password, avatarUrl)
                .then(user => {
                    expect(user).to.eql(expectedUser);
                    done();
                });
        });

        it('expect to return error when username is below 3 letters', done => {
            sinon.stub(User.prototype, 'save', cb => {
                cb(null);
            });

            let shortUsername = 'tw';
            data.createUser(shortUsername, password, avatarUrl)
                .catch(err => {
                    expect(err).to.eql('You must enter correct username between 3 and 50 letters');
                    done();
                });
        });

        it('expect to return error when password is below 6 letters', done => {
            sinon.stub(User.prototype, 'save', cb => {
                cb(null);
            });

            let shortPassword = 'tw';
            data.createUser(username, shortPassword, avatarUrl)
                .catch(err => {
                    expect(err).to.eql('You must enter correct password between 6 and 50 letters');
                    done();
                });
        });

        it('expect to return error when avatar url is invalid', done => {
            sinon.stub(User.prototype, 'save', cb => {
                cb(null);
            });

            let invalidAvatarUrl = 'invalid-url-tw';
            data.createUser(username, password, invalidAvatarUrl)
                .catch(err => {
                    expect(err).to.eql('You must enter a valid url for your avatar');
                    done();
                });
        });

        it('expect to return error when user already exists', done => {
            sinon.stub(User.prototype, 'save', cb => {
                cb('User with this username already exists!', null);
            });

            data.createUser(username, password, avatarUrl)
                .catch(err => {
                    expect(err).to.eql('User with this username already exists!');
                    done();
                });
        });
    });


    // describe('updateUser tests', () => {
    //     let username = 'John',
    //         avatarUrl = 'http://natashaleitedemoura.com/wp-content/uploads/sites/10/2014/11/horror_2382351b.jpg',
    //         newPassword = 'dwdwdw',
    //         oldPassword = 'mishomisho',
    //         _id = 1;

    //     let expectedUserWithNewPassword = new User({
    //         username,
    //         newPassword,
    //         avatarUrl
    //     });

    //     let expectedUserWithOldPassword = new User({
    //         username,
    //         oldPassword,
    //         avatarUrl
    //     });

    //     afterEach(() => {
    //         sinon.restore();
    //     });

    //     it('expect to update password successfully', done => {
    //         sinon.stub(User.prototype, 'findById', cb => {
    //             cb(expectedUserWithOldPassword);
    //         });
    //         spy(User.save);
    //         let settings = { password: newPassword}
    //         data.updateUserSettings(_id, settings);
    //         console.dir(spy.calledWithExactly.arguments);
    //     });

    // });
});
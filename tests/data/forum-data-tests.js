/*  globals it describe beforeEach afterEach */
const chai = require('chai');
const sinonModule = require('sinon');
let expect = chai.expect;

describe('Forum-data-tests', () => {
    let sinon;

    class Forum {
        constructor(props) {
            this._id = props.id || '42';
            this.name = props.name;
        }

        save() {}
        static find() {}
        static findOne() {}
    }

    let data = require('../../server/data/forum/forum-data')({ Forum });

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    describe('createForum tests', () => {
        let name = 'Valid Forum Name';

        let expectedForum = new Forum({ name });

        afterEach(() => {
            sinon.restore();
        });

        it('Expect to create user with valid properties', done => {
            sinon.stub(Forum.prototype, 'save', cb => {
                cb(null, expectedForum);
            });

            data.createForum(name)
                .then(forum => {
                    expect(forum.name).to.eql(expectedForum.name);
                    done();
                });
        });
    });

    describe('getForums() tests', () => {
        let forumsNames = ['ALABALA', 'IZDISLAV', 'TURSHIYA'];
        let expectedForums = [];
        forumsNames.forEach(name => {
            expectedForums.push(new Forum({ name }));
        });
        console.log(expectedForums);
        afterEach(() => {
            sinon.restore();
        });

        it('Expect to return forums correctly', done => {
            sinon.stub(Forum, 'find', cb => {
                cb(null, expectedForums);
            });

            data.getForums()
                .then(forums => {
                    expect(forums).to.eql(expectedForums);
                    done();
                });
        });
    });

    describe('getForumById(id) tests', () => {
        let forumNames = ['Forum', 'AnotherForum'];
        let forumIds = ['uniqueIdTrustMe', 'anotherUniqueId'];
        let forums = [];
        forumNames.forEach((name, index) => {
            forums.push(new Forum({ name, id: forumIds[index] }));
        });

        it('Expect to return single forum with the corresponding ID', done => {
            let expectedForum = forums[0];

            sinon.stub(Forum, 'findOne', (query, cb) => {
                let id = query._id;
                let foundForum = forums.find(forum => forum._id === id);
                cb(null, foundForum);
            });

            data.getForumById(expectedForum._id)
                .then(forum => {
                    expect(forum).to.eql(expectedForum);
                    done();
                });
        });
    });
});
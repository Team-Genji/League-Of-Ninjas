/* globals require describe it*/

const sinonModule = require('sinon');

describe('forum-controllers-tests', () => {
    it('listForums should render ./forums/forum-main', () => {
        let forums = [];
        const forumData = {
            getForums() {
                return new Promise(resolve => resolve(forums));
            }
        };
        const forumController = require('../../server/controllers/forum/forum-controller')(forumData);

        const res = {
            status() {
                return this;
            },
            render() {
                return this;
            },
            redirect() {
                return this;
            }
        };
        const req = {};
        const expectedRoute = './forums/forum-main';
        const resMock = sinonModule.mock(res);
        resMock
            .expects('render')
            .returnsThis()
            .withArgs(expectedRoute)
            .once();
        forumController.listForums(req, res);
    });
});
/* globals require describe it*/

const sinonModule = require('sinon');

describe('users-controllers-tests', () => {
    it('getLogin should render ./user-controls/signin', () => {
        const userData = {};
        const userController = require('../../server/controllers/users/users-controller')(userData);
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
        const expectedRoute = './user-controls/signin';
        const resMock = sinonModule.mock(res);
        resMock
            .expects('render')
            .returnsThis()
            .withArgs(expectedRoute)
            .once();
        userController.getLogin(req, res);

    });

    it('getProfile should render ./user-controls/profile if authenticated', () => {
        const userData = {};
        const userController = require('../../server/controllers/users/users-controller')(userData);
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
        const req = {
            isAuthenticated: () => {}
        };
        sinonModule.stub(req, 'isAuthenticated', () => {
            return true;
        });
        const expectedRoute = './user-controls/profile';
        const resMock = sinonModule.mock(res);
        resMock
            .expects('render')
            .returnsThis()
            .withArgs(expectedRoute)
            .once();
        userController.getProfile(req, res);

        resMock.verify();

    });

    it('getProfile should redirect to ./unauthorized if not authenticated', () => {
        const userData = {};
        const userController = require('../../server/controllers/users/users-controller')(userData);
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
        const req = {
            isAuthenticated: () => {}
        };
        sinonModule.stub(req, 'isAuthenticated', () => {
            return false;
        });
        const expectedRoute = '/unauthorized';
        const resMock = sinonModule.mock(res);
        resMock
            .expects('redirect')
            .returnsThis()
            .withArgs(expectedRoute)
            .once();
        userController.getProfile(req, res);
        resMock.verify();
    });

    it('getRegister should render ./user-controls/signup ', () => {
        const userData = {};
        const userController = require('../../server/controllers/users/users-controller')(userData);
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
        const expectedRoute = './user-controls/signup';
        const resMock = sinonModule.mock(res);
        resMock
            .expects('render')
            .returnsThis()
            .withArgs(expectedRoute)
            .once();
        userController.getRegister(req, res);
        resMock.verify();
    });
});
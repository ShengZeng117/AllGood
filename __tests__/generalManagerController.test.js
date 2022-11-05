const generalManagerController = require('../controllers/generalManagerController')

describe('Test for Login', () => {
    const req = {};
    const res = {
        render: jest.fn()
    };

    beforeAll(() => {
        res.render.mockClear();
        generalManagerController.generalmanagerLogin(req,res);
    });
    
    describe('render general manager login page', () => {
        beforeAll(() => {
            res.render.mockClear();
            generalManagerController.generalmanagerLogin(req, res);
        });
        test('should call res.render', () => {
            expect(res.render).toHaveBeenCalledWith('manager_loginD.hbs', { layout: 'manager_login'});
        });
    })
})
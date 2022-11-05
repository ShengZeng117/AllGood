const managerController = require('../controllers/managerController')

describe('Test for Login', () => {
    const req = {};
    const res = {
        render: jest.fn()
    };

    beforeAll(() => {
        res.render.mockClear();
        managerController.managerLogin(req,res);
    });
    
    describe('render manager login page', () => {
        beforeAll(() => {
            res.render.mockClear();
            managerController.managerLogin(req, res);
        });
        test('should call res.render', () => {
            expect(res.render).toHaveBeenCalledWith('manager_loginD.hbs', { layout: 'manager_login'});
        });
    })
})
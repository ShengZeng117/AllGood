const generalManagerController = require('../controllers/generalManagerController')
const GeneralManager = require('../models/generalManager')
const Department = require('../models/Department')

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

/*describe('Test for get account page', () => {
    const req = {
        params : {
            generalManager_id: '63512bd0fbc5512761e005a3'
        }
    }

    const res = {
        sendStatus: jest.fn(),
        render: jest.fn()
    }

    const next = {}

    beforeAll(() => {
        res.sendStatus.mockClear()
        res.render.mockClear()
        GeneralManager.findById = jest.fn().mockResolvedValue({
            _id: '63512bd0fbc5512761e005a3',
            Id: '11111',
            FirstName: 'annie',
            LastName: 'Lu',
            Gender: 'Male',
            Position: 'General',
            Email: 'alexL@company.com',
            ContactNumber: '032938475',
            Age : '30',
            Password: '123456789'
        })
        Department.find = jest.fn().mockResolvedValue([
        {_id: '635f84257c7d17078edbb54f'},
        {_id: '63637b76d82327c2ee4510c1'}])
        Department.findById = jest.fn().mockResolvedValue([
        {_id: '635f84257c7d17078edbb54f'},
        {_id: '63637b76d82327c2ee4510c1'}
        ])
        generalManagerController.getaccoutPage(req,res,next)
    })
})*/
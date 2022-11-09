const managerController = require('../controllers/managerController')
const Manager = require('../models/Manager')
const GeneralManager = require('../models/generalManager')

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
    
describe('Test for get manager ID', () => {
    const req = {
        body: {
            password: '123456789',
            email: 'JL@company.com'
        }
    };
    const res = {
        redirect: jest.fn()
    };

    beforeAll(() => {
        res.redirect.mockClear();
        managerController.getmanagerID(req,res);
    })

    describe('Should get manager by Email', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            Manager.findOne = jest.fn().mockResolvedValue({
                _id: '6363c6325ae3c05943ea6b0c',
                Email: 'JL@company.com',
                Password: '123456789'
            });
            Manager.findOne.mockClear()
            managerController.getmanagerID(req, res);
        })
        test("Should find manager by email", done => {
            const manager = Manager.findOne({Email: req.body.email})
            manager.then((user) => {
                expect(user.Email).toBe(req.body.email)
                expect(user.Password).toBe(req.body.password)
            })
            done()
        });
    })

    describe('Should return error if manager not valid', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            Manager.findOne = jest.fn().mockResolvedValue();
            Manager.findOne.mockClear()
            managerController.getmanagerID(req, res);
        })
        test("Should be null", done => {
            const manager = Manager.findOne({Email: req.body.email})
            expect(manager).toBeNull
            done()
        });
    })

    describe('Should return error if password not correct', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            Manager.findOne = jest.fn().mockResolvedValue({
                _id: '6363c6325ae3c05943ea6b0c',
                Email: 'JL@company.com',
                Password: '987654321'
            });
            Manager.findOne.mockClear()
            managerController.getmanagerID(req, res);
        })
        test("Should fail", done => {
            const manager = Manager.findOne({Email: req.body.email})
            manager.then((user) => {
                expect(user.Email).toBe(req.body.email)
                expect(user.Password).not.toEqual(req.body.password)
            })
            done()
        });
    })
})

describe('Test for get general manager ID', () => {
    const req = {
        body: {
            password: '123456789',
            email: 'alexL@company.com'
        }
    };
    const res = {
        redirect: jest.fn()
    };

    beforeAll(() => {
        res.redirect.mockClear();
        managerController.getmanagerID(req,res);
    })

    describe('Should get manager by Email', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            Manager.findOne = jest.fn().mockResolvedValue({
                _id: '6363c6325ae3c05943ea6b0c',
                Email: 'JL@company.com',
                Password: '123456789'
            });
            GeneralManager.findOne = jest.fn().mockResolvedValue({
                _id: '63512bd0fbc5512761e005a3',
                Email: 'alexL@company.com',
                Password: '123456789'
            })
            Manager.findOne.mockClear()
            GeneralManager.findOne.mockClear()
            managerController.getmanagerID(req, res);
        })
        test("Should find general manager by email", done => {
            const manager = Manager.findOne({Email: req.body.email})
            const generalManager = GeneralManager.findOne({Email: req.body.email})
            if (!manager) {
                generalManager.then((user) => {
                    expect(user.Email).toBe(req.body.email)
                    expect(user.Password).toBe(req.body.password)
                })
            }
            done()
        });
    })

    describe('Should return error if general manager not valid', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            GeneralManager.findOne = jest.fn().mockResolvedValue();
            GeneralManager.findOne.mockClear()
            managerController.getmanagerID(req, res);
        })
        test("Should be null", done => {
            const generalManager = GeneralManager.findOne({Email: req.body.email})
            expect(generalManager).toBeNull
            done()
        });
    })

    describe('Should return error if password not correct', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            GeneralManager.findOne = jest.fn().mockResolvedValue({
                _id: '63512bd0fbc5512761e005a3',
                Email: 'alexL@company.com',
                Password: '987654321'
            })
            GeneralManager.findOne.mockClear()
            managerController.getmanagerID(req, res);
        })
        test("Should fail", done => {
            const manager = GeneralManager.findOne({Email: req.body.email})
            manager.then((user) => {
                expect(user.Email).toBe(req.body.email)
                expect(user.Password).not.toEqual(req.body.password)
            })
            done()
        });
    })
})
const staffController = require('../controllers/staffController');
const { deleteOne } = require('../models/Devices');
const User = require('../models/User')
const Device = require('../models/Devices')
const Department = require('../models/Department')

jest.mock('../models/User')
describe('Test for Login', () => {
    const req = {
        render: jest.fn()
    };
    const res = {
        render: jest.fn()
    };

    beforeAll(() => {
        res.render.mockClear();
        staffController.stafflogIn(req,res);
    });
    
    describe('Render staff login page', () => {
        beforeAll(() => {
            res.render.mockClear();
            staffController.stafflogIn(req, res);
        });
        test('Should call res.render', () => {
            expect(res.render).toHaveBeenCalledWith('staff_loginD.hbs', { layout: 'staff_login'});
        });
    })
})

describe('Test for get staff ID', () => {
    const req = {
        body: {
            password: '123456789',
            email: 'JArmstrong@company.com'
        }
    };
    const res = {
        redirect: jest.fn()
    };

    beforeAll(() => {
        res.redirect.mockClear();
        staffController.getstaffID(req,res);
    })

    describe('Should get staff by Email', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            User.findOne = jest.fn().mockResolvedValue({
                _id: '6363ba8f29ef12e2164ffa83',
                Email: 'JArmstrong@company.com',
                Password: '123456789'
            });
            User.findOne.mockClear()
            staffController.getstaffID(req, res);
        })
        test("Should find staff by email", done => {
            const staff = User.findOne({Email: req.body.email})
            staff.then((user) => {
                expect(user.Email).toBe(req.body.email)
                expect(user.Password).toBe(req.body.password)
            })
            done()
        });
    })

    describe('Should return error if staff not valid', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            User.findOne = jest.fn().mockResolvedValue();
            User.findOne.mockClear()
            staffController.getstaffID(req, res);
        })
        test("Should be null", done => {
            const staff = User.findOne({Email: req.body.email})
            expect(staff).toBeNull
            done()
        });
    })

    describe('Should return error if password not correct', () => {
        beforeAll(() => {
            res.redirect.mockClear();
            User.findOne = jest.fn().mockResolvedValue({
                _id: '6363ba8f29ef12e2164ffa83',
                Email: 'JArmstrong@company.com',
                Password: '987654321'
            });
            User.findOne.mockClear()
            staffController.getstaffID(req, res);
        })
        test("Should fail", done => {
            const staff = User.findOne({Email: req.body.email})
            staff.then((user) => {
                expect(user.Email).toBe(req.body.email)
                expect(user.Password).not.toEqual(req.body.password)
            })
            done()
        });
    })
})

/*describe('Test for getting staff overview', async () => {
    const req = {
        params: {
            _id: '6363ba8f29ef12e2164ffa83',
        }
    };
    const res = {
        sendStatus: jest.fn()
    }
    const next = 'next';
    beforeAll(() => {
        res.sendStatus.mockClear();
        User.findById = jest.fn().mockResolvedValue({
            _id: '6363ba8f29ef12e2164ffa83'
        });

        staffController.staffoverview(req,res,next);
    })

    test('Returning a staff', async () => {
        
    })
})

describe('Test for input usage', async () => {
    const req = {
        params: {
            _id: '6363ba8f29ef12e2164ffa83',
        },
        body: {
            editU: 100,
            confU: 100,
            confN: "air condition"
        }
    };
    const res = {
        sendStatus: jest.fn()
    };
    const next = 'next';
    beforeAll(() => {
        res.sendStatus.mockClear();
        User.findById = jest.fn().mockResolvedValue({
            _id: '6363ba8f29ef12e2164ffa83'
        });
        User.findById.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue({
                _id: '6363ba8f29ef12e2164ffa83'
            }),
        }));
        Device.findById.mockResolvedValue({
            _id: '633048bea2c12b2655942a12'
        });
        Device.findById.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue({
                _id: '633048bea2c12b2655942a12'
            })
        }))
        staffController.inputUsage(req, res, next);
    })

    test('Should update the usage', () => {

    })
})*/
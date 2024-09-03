import Joi from 'joi';

export const registerEmployeeSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    gender: Joi.string().required(),
    birthDate: Joi.date().required(),
    maritalStatus: Joi.string().required(),
    nationality: Joi.string().required(),
    homeAddress: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    zipCode: Joi.string().required(),
    department: Joi.string().required(),
    designation: Joi.string().required(),
    employeeType: Joi.string().required(),
    contractType: Joi.string().required(),
    workingDays: Joi.string().required(),
    image: Joi.string().allow(''),
    bankBranch: Joi.string().required(),
    bankAccountNumber: Joi.string().required(),
    accountName: Joi.string().required(),
    officeLocation: Joi.string().required(),
    slackId: Joi.string().required(),
    twitterId: Joi.string().required(),
    skypeId: Joi.string().required(),
    githubId: Joi.string().required(),
})
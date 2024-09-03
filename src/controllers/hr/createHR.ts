import { Request, Response } from 'express';import HR from '../../models/hrModel/hrModel';
import { generatePassword, generateWorkEmail, hashPassword } from '../../utilities/helpersFunctions';
import { sendMail } from '../../utilities/emailNotification';


export const adminRegister = async(request:Request,response:Response) => {
    try {

        const {firstName, lastName, email, phone} = request.body;

        if(!firstName || !lastName || !email || !phone){
            return response.status(400).json({
                message: "All fields are required"
            });
        }

        const findAdmin = await HR.findOne({email});

        if(findAdmin){
            return response.status(400).json({
                message: "HR already exists"
            });
        
        }

        const newPassword = generatePassword(lastName);

        const hashedPassword = await hashPassword(newPassword);

        const employeeWorkEmail = generateWorkEmail(request.body.firstName, request.body.lastName); 

        await HR.create({
            firstName,
            lastName,
            email,
            phone,
            workEmail: employeeWorkEmail,
            password: hashedPassword,
            isManager: true,
            designation: "HR"
        });

        const checkAdmin = await HR.findOne({email});

        if(!checkAdmin){
            return response.status(400).json({
                message: "Unable to create, try again later"
            });
        }

        await sendMail(email, newPassword, employeeWorkEmail);

        return response.status(200).json({
            message: "Admin Registered",
            admin: {
                firstName: checkAdmin.firstName,
                lastName: checkAdmin.lastName,
                email: checkAdmin.email,
                workEmail: checkAdmin.workEmail,
                phone: checkAdmin.phone,
                designation: checkAdmin.designation
            }
        });

    } catch (error:any) {
        console.log(error.message);
        response.status(500).json({
            message: "Internal Server Error"
        });
    }
}
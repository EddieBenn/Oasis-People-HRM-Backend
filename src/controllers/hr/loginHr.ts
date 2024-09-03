import { Request, Response } from "express";
import HR from "../../models/hrModel/hrModel";
import bcrypt from 'bcryptjs';
import { tokenGenerator } from "../../utilities/helpersFunctions";
import Employee from "../../models/employeeModel/employeeModel";

export const login = async(request:Request,response:Response) => {
    try {

        const {email, password } = request.body;

        if(!email.includes('@oasis.com')){
            return response.status(400).json({
                message: "Invalid work email, use your work email please"
            });
        }

        if( !email || !password){
            return response.status(400).json({
                message: "All fields are required"
            });
        }

        const findAdmin: any = await HR.findOne({workEmail:email});
        const findEmployee: any = await Employee.findOne({workEmail:email});

        if(!findAdmin && !findEmployee){
            return response.status(400).json({
                message: `${email} does not exist`
            });
        
        }

        if(findAdmin){
            const validatePassword = await bcrypt.compare(password, findAdmin.password);
            if (!validatePassword) {
                return response.status(401).send({
                  message: "Password is Incorect"
                });
              }
          
              const tokenData = {
                _id: findAdmin._id,
                email: findAdmin.email,
              };
              const token = await tokenGenerator(tokenData);
          
              return response.status(200).json({
                status: "success",
                message: "Login Successful",
                user: {
                  firstName: findAdmin.firstName,
                  lastName: findAdmin.lastName,
                  email: findAdmin.email,
                  phone: findAdmin.phone,
                  designation: findAdmin.designation,
                  isManager: findAdmin.isManager
              },
                token,
              });
        }

        if(findEmployee){
            const validatePassword = await bcrypt.compare(password, findEmployee.password);
            if (!validatePassword) {
                return response.status(401).send({
                  message: "Password is Incorect"
                });
              }
          
              const tokenData = {
                _id: findEmployee._id,
                email: findEmployee.email,
              };
              const token = await tokenGenerator(tokenData);
          
              return response.status(200).json({
                status: "success",
                message: "Login Successful",
                user: findEmployee,
                token,
              });
        }

    } catch (error:any) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
}
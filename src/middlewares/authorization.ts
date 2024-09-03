import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Employee from "../models/employeeModel/employeeModel";
import HR from "../models/hrModel/hrModel";

export const employeeAuthoriser = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization;

    if (authorization === undefined) {
      return response.status(401).json({
        message: `You are not authorized to view this page`,
      });
    }

    const token = authorization.split(" ");
    const mainToken = token[1];
    if (!mainToken || mainToken === "") {
      return response.status(401).json({
        status: `Failed`,
        message: `Login required`,
      });
    }

    const decode:any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);
    const employee:any = await Employee.findOne({_id:decode._id})
    
    if(employee === null){
      return response.status(400).json({
        status: `error`,
        message: `Login again`
      })
    }

    if(employee.isManager){
      return response.status(400).json({
        status: `error`,
        message: `You are not allowed to access this resource. Only Employees`
      })
    }

    request.user = decode;
    next();
  }  catch (error: any) {
    if(error.message === 'jwt expired' || error.message === 'invalid signature'){
      return response.status(401).json({
        status: 'error',
        message: 'Session Expired. Please log in again.',
      });
    }
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error: ${error}`,
    })
  }
};

export const hrAuthoriser = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization;

    if (authorization === undefined) {
      return response.status(401).json({
        message: `You are not authorized`,
      });
    }

    const token = authorization.split(" ");
    const mainToken = token[1];
    if (!mainToken || mainToken === "") {
      return response.status(401).json({
        status: `Failed`,
        message: `Login required`,
      });
    }

    const decode:any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);
    const admin:any = await HR.findOne({_id:decode._id})

    if(admin === null){
      return response.status(400).json({
        status: `error`,
        message: `Login again`
      })
    }

    if(!admin.isManager){
      return response.status(400).json({
        status: `error`,
        message: `You are not allowed to access this resource. Contact the admin`
      })
    }
    request.user = decode;


    next();
  } catch (error: any) {
    if(error.message === 'jwt expired' || error.message === 'invalid signature'){
      return response.status(401).json({
        status: 'error',
        message: 'Session Expired. Please log in again.',
      });
    }
    console.log(error.message);
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error: ${error}`,
    })
  }
};
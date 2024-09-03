import { JwtPayload } from "jsonwebtoken";
import {Response} from 'express';
import Employee, { IEmployee } from "../../models/employeeModel/employeeModel";


export const updateEmployeeProfile = async(request:JwtPayload,response:Response)=>{
    try{

        const userId = request.params.id

    const { firstName,
        lastName,
        phone,
        address,
        employmentType,
        department,
        contractType } = request.body;

    const user = await Employee.findOne({_id:userId})

    if(!firstName && !lastName && !phone && !address && !employmentType && !department && !contractType){
        return response.status(400).json({
            message: "Please select atleast one field to update",
          });
    }

    if (!user) {
        return response.status(404).json({
          message: "Employee not found",
        });
      }

    const updatedEmployeeFields: Partial<IEmployee> = {};

    // Check if the fields are empty and add them to the object
    if (firstName !== "") {
      updatedEmployeeFields.firstName = firstName;
    }

    if (lastName !== "") {
      updatedEmployeeFields.lastName = lastName;
    }

    if (phone !== "") {
      updatedEmployeeFields.phone = phone;
    }

    if (address !== "") {
      updatedEmployeeFields.homeAddress = address;
    }

    if (employmentType !== "") {
      updatedEmployeeFields.employeeType = employmentType;
    }
    if (department !== "") {
        updatedEmployeeFields.department = department;
      }

      if (contractType !== "") {
        updatedEmployeeFields.contractType = contractType;
      }

      const updatedUser = await Employee.findByIdAndUpdate(
        userId,
        { $set: updatedEmployeeFields },
        { new: true }
      );

    const newEmployee = await Employee.findOne({_id:userId})


    return response.status(200).json({
      message: "Employee Details Updated Successfully",
      newEmployee,
    });
  } catch (error:any) {
    console.error("Error updating user:", error.message);
    return response.status(500).json({
      Error: "Internal Server Error",
    });
  }
}
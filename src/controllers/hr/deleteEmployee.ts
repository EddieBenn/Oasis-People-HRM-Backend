import { Response } from 'express';
import Employee from "../../models/employeeModel/employeeModel";
import { JwtPayload } from 'jsonwebtoken';
import Leave from '../../models/leaveModel/leave';
import Attendance from '../../models/attendanceModel/attendance';

export const deleteEmployee = async (request: JwtPayload, response: Response) => {
  try {
    const id = request.params.id;

    const employee = await Employee.findByIdAndDelete(id);

    await Leave.deleteMany({userId:id})

    await Attendance.deleteMany({employeeId:id})

    if (!employee) {
      return response.status(404).json({
        message: "Employee not found",
      });
    }

    return response.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error:any) {
    console.error("Error deleting employee:", error.message);
    return response.status(500).json({
      message: "Internal Server Error"
    });
  }
};

import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Leave from '../../models/leaveModel/leave';


export const viewLeaveHistory = async(request:JwtPayload, response:Response) => {
    try{

        const userId = request.user._id;

        const leave = await Leave.find({userId:userId})

        if(leave.length < 1){
            return response.status(404).json({
                message:'No leave request',
                leave
            })
        }
        return response.status(200).json({
            message: 'Leave requests found',
            leave
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}
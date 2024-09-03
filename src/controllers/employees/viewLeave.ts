import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Leave from '../../models/leaveModel/leave';


export const viewSingleLeave = async(request:JwtPayload, response:Response) => {
    try{
        const leaveId = request.params.id;

        if(!leaveId){
            return response.status(400).json({
                message:'Invalid request'
            })
        }

        const userId = request.user._id;

        const leave = await Leave.findOne({ _id:leaveId, userId:userId})

        if(!leave){
            return response.status(404).json({
                message:'Leave not found'
            })
        }
        return response.status(200).json({
            message: 'Leave found',
            leave
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}
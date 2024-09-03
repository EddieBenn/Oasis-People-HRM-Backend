import express from 'express';
import { employeeAuthoriser } from '../../middlewares/authorization';
import { employeeClockIn } from '../../controllers/employees/employeeClockIn';
import { employeeClockout } from '../../controllers/employees/employeeClockout';
import { employeeRequestLeave } from '../../controllers/employees/employeeRequestLeave';
import { viewSingleLeave } from '../../controllers/employees/viewLeave';
import { viewLeaveHistory } from '../../controllers/employees/viewLeaveHistory';
import { viewPersonalAttendanceRecord } from '../../controllers/employees/viewPersonalAttendance';
import { viewProfile } from '../../controllers/employees/viewProfile';

const router = express.Router();

router.post('/clock-in', employeeAuthoriser, employeeClockIn)
router.put('/clock-out', employeeAuthoriser, employeeClockout)
router.post('/request-leave', employeeAuthoriser, employeeRequestLeave)
router.get('/view-leave/:id', employeeAuthoriser, viewSingleLeave)
router.get('/view-leave-history', employeeAuthoriser, viewLeaveHistory)
router.get('/view-attendance', employeeAuthoriser, viewPersonalAttendanceRecord)
router.get('/view-profile', employeeAuthoriser, viewProfile)


export default router;
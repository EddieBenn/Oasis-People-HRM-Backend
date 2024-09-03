import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const generatePassword = (last_name: string) => {
    let last_name_edit = last_name.toLowerCase();
    const newPassword = (last_name_edit += Math.floor(1000 + Math.random() * 90000));
    return newPassword;
  };

  export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

export const tokenGenerator = async(data:any)=>{
    if(process.env.APP_SECRET){
        return jwt.sign(data, process.env.APP_SECRET, {expiresIn: `1d`})
    }
}

export const generateEmployeeID = (oldCode: string) => {

  let newCode: string;

  if (oldCode.length === 0) {
    newCode = `OAS-EMP-10101`;
  } else {
      newCode = `OAS-EMP-${Number(oldCode) + 1}`;
    }
    return newCode;
  };


  export const setHours = (date:Date) => {
    const checkInDate = new Date(date);
    checkInDate.setHours(0, 0, 0, 0);
    return checkInDate;
  }

  export const checkClockInTime = (clockInTime:Date) => {
    const nineAM = new Date(clockInTime);
    nineAM.setHours(9, 0, 0, 0); 
    if (clockInTime > nineAM) {
      return 'late';
    } else {
      return 'on-time';
    }
  }

  export const checkClockOutTime = (clockOutTime:Date) => {
    const fivePM = new Date(clockOutTime);
    const eightPM = new Date(clockOutTime);
    eightPM.setHours(20, 0, 0, 0); // Set the time to 8:00 PM
    fivePM.setHours(17, 0, 0, 0); // Set the time to 5:00 PM
  
    if (clockOutTime < fivePM) {
      return 'too early';
    } else if(clockOutTime > fivePM && clockOutTime < eightPM){
      return 'on-time';
    }else {
      return 'late';
    }
  };

  export const confirmCheckIn = (checkIns:Date[], today:Date) => {
    const hasCheckedInToday = checkIns.some(checkIn => {
      const checkInDate = new Date(checkIn);
      checkInDate.setHours(0, 0, 0, 0);
      return checkInDate.getTime() === today.getTime();
    });
    return hasCheckedInToday;
  }

export const confirmCheckInCheckOut = (checkIns:any, today:Date) => {
  // Normalize the 'today' date to remove the time part
  today.setHours(0, 0, 0, 0);

  const foundCheckIn = checkIns.find((checkIn:any) => {
    const checkInDate = new Date(checkIn.date); // Assuming each check-in has a 'date' property
    // Normalize the check-in date to remove the time part
    checkInDate.setHours(0, 0, 0, 0);

    return checkInDate.getTime() === today.getTime();
  });

  return foundCheckIn;
};



export function formatTimeFromISO(isoString: Date): string {
  // Parse the ISO string to a Date object
  const date = new Date(isoString);
  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // Format minutes to always have two digits
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  // Combine into final formatted string
  const formattedTime = `${hours}:${minutesStr}${ampm}`;
  return formattedTime;
}

export const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const daysBetween = (startDate: Date, endDate: Date): string => {
  // Convert the ISO string dates to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Calculate the difference in time (milliseconds)
  const diffTime = end.getTime() - start.getTime();
  // Convert the difference from milliseconds to days
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  // Return the number of days
 const finaldays = Math.round(diffDays);
 return finaldays === 1 ? `${finaldays} day` : `${finaldays} days`
}


export const generateWorkEmail = (firstName:string, lastName: string) => {
  const lastNameInitial = lastName.substring(0, 3).toLowerCase();
  const newEmail = `${firstName.toLowerCase()}.${lastNameInitial.toLowerCase() }${Math.floor(100 + Math.random() * 900)}@oasis.com`
  return newEmail;
};


export const leaveDateChecker = (startDate: Date, endDate: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  const end = new Date(endDate);

  if(start.getTime() === end.getTime()){
    return 'error 5'
    // return res.status(400).json({ error: 'Start date and end date cannot be the same.' });
  }
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'error 1'
    // return res.status(400).json({ error: 'Invalid date format.' });
  }
  if (start < today) {
    return 'error 2'
    // return res.status(400).json({ error: 'Start date cannot be in the past.' });
  }
  if (end < today) {
    return 'error 3'
    // return res.status(400).json({ error: 'End date cannot be in the past.' });
  }
  if (start > end) {
    return 'error 4'
    // return res.status(400).json({ error: 'Start date cannot be after end date.' });
  }
}
import mongoose, { Schema } from "mongoose";


export interface IEmployee extends Document {
  _id: string;
  firstName: string;
  image: string;
  lastName: string;
  employeeId: string;
  password: string;
  gender: string;
  phone: string;
  email: string;
  workEmail: string;
  officeLocation: string;
  birthDate: Date;
  maritalStatus: string;
  nationality: string;
  homeAddress: string;
  city: string;
  district: string;
  zipCode: string;
  department: string;
  designation: string;
  employeeType: string;
  contractType: string;
  workingDays: string[];
  hireDate: Date;
  slackId: string
  twitterId: string
  skypeId: string
  githubId: string
  bankBranch: string;
  bankAccountNumber: string;
  accountName: string;
  isManager: boolean;
  leaveDaysGiven: number;
  usedLeaveDays: number;
  totalDaysLeft: number;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    firstName: {
      type: String,
    },
    image: {
      type: String,
    },
    lastName: {
      type: String,
    },
    officeLocation: {
      type: String,
    },
    password: {
      type: String,
    },
    slackId: {
      type: String,
    },
    twitterId: {
      type: String,
    },
    skypeId: {
      type: String,
    },
    githubId: {
      type: String,
    },
    employeeId: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    workEmail: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    maritalStatus: {
      type: String,
    },
    nationality: {
      type: String,
    },
    homeAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    employeeType: {
      type: String,
    },
    contractType: {
      type: String,
    },
    workingDays: {
      type: [String],
    },
    hireDate: {
      type: Date,
    },
    bankBranch: {
      type: String,
    },
    bankAccountNumber: {
      type: String,
    },
    accountName: {
      type: String,
    },
    isManager: {
      type: Boolean,
      default: false
    },
    leaveDaysGiven: {
      type: Number,
    },
    usedLeaveDays: {
      type: Number,
    },
    totalDaysLeft: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema)

export default Employee;
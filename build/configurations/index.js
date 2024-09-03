"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let conn;
const database = async () => {
    if (conn) {
        return conn;
    }
    else {
        conn = await mongoose_1.default.connect("mongodb+srv://andaobong:8RhWB1aDgVSAtdr2@cluster0.twfwc1c.mongodb.net/oasis_hrm", {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000
        });
        console.log("Database connected");
        return conn;
    }
};
exports.database = database;

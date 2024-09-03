"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const configurations_1 = require("./configurations");
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes/employeeRoutes"));
const hrRoutes_1 = __importDefault(require("./routes/hrRoutes/hrRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
//middlewares
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/employee', employeeRoutes_1.default);
app.use('/admin', hrRoutes_1.default);
//database connection
(0, configurations_1.database)();
app.get("/", (request, response) => {
    response.send("Oasis HRM is Ready...:)");
});
//server
app.listen(process.env.PORT, () => {
    console.log(`server running on Port ${process.env.PORT}`);
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const url_routes_1 = __importDefault(require("./routes/url.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const cors_1 = __importDefault(require("cors"));
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 8080;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use((0, morgan_1.default)('combined', {
            stream: {
                write: (message) => {
                    exports.prisma.log.create({
                        data: {
                            message: message.trim(),
                        },
                    });
                },
            },
        }));
        app.use((0, helmet_1.default)());
        const options = {
            origin: ['https://shortener-fe.vercel.app/', 'http://127.0.0.1:5173/', '*'],
            methods: ['POST', 'PUT', 'GET'],
            allowedHeaders: ['Content-Type'],
        };
        app.use((0, cors_1.default)(options));
        app.use(express_1.default.json());
        app.use('/api/users', user_routes_1.default);
        app.use('/api/urls', url_routes_1.default);
        app.use("/api/analytics", analytics_routes_1.default);
        app.all("*", (req, res) => {
            res.status(404).json({ error: `Route ${req.originalUrl} not found` });
        });
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    });
}
exports.main = main;
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$connect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=App.js.map
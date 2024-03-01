"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../utils/auth");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        (0, auth_1.verifyToken)(token);
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map
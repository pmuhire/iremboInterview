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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = exports.analyticsController = void 0;
const client_1 = require("@prisma/client");
const Analtics_model_1 = require("../models/Analtics.model");
const prisma = new client_1.PrismaClient();
class AnalyticsController {
    recordAnalytics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shortCode } = req.params;
            const { ipAddress, os, location } = req.body;
            try {
                const url = yield prisma.url.findUnique({
                    where: { shortUrl: `${req.protocol}://${req.get('host')}/api/urls/${shortCode}` }
                });
                if (!url) {
                    res.status(404).json({ error: 'Short URL not found' });
                    return;
                }
                const prismaAnal = yield prisma.analytics.create({
                    data: { ipAddress, os, location, urlId: url.id, },
                });
                const customAnal = (0, Analtics_model_1.mapAnalyticsToPrismaModel)(prismaAnal);
                res.json({ message: 'Analytics recorded successfully', data: customAnal });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.AnalyticsController = AnalyticsController;
const analyticsController = new AnalyticsController();
exports.analyticsController = analyticsController;
//# sourceMappingURL=Analytics.controller.js.map
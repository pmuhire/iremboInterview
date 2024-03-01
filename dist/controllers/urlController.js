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
exports.UrlController = exports.urlController = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
class UrlController {
    shortenUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originalUrl } = req.body;
            try {
                const existingUrl = yield prisma.url.findUnique({
                    where: { originalUrl },
                });
                if (existingUrl) {
                    res.json({ sucess: true, info: { existingUrl } });
                    return;
                }
                const shortCode = (0, uuid_1.v4)().substr(0, 7);
                const createdUrl = yield prisma.url.create({
                    data: {
                        originalUrl,
                        shortCode: shortCode,
                        shortUrl: `${req.protocol}://${req.get('host')}/api/urls/${shortCode}`,
                    },
                });
                console.log(createdUrl);
                res.json({ sucess: true, info: createdUrl });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    redirectToOriginalUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const shortCode = req.params.shortCode;
            try {
                const url = yield prisma.url.findUnique({
                    where: { shortUrl: `${req.protocol}://${req.get('host')}/api/urls/${shortCode}` },
                });
                if (!url) {
                    res.status(404).json({ error: 'Short URL not found' });
                    return;
                }
                yield prisma.url.update({
                    where: { id: url.id },
                    data: { clicks: { increment: 1 } },
                });
                res.redirect(url.originalUrl);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.UrlController = UrlController;
const urlController = new UrlController();
exports.urlController = urlController;
//# sourceMappingURL=urlController.js.map
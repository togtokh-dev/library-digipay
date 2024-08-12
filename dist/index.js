"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoice = exports.config = exports.host = void 0;
const auth_1 = require("./auth");
const invoice_1 = require("./invoice");
exports.host = {
    prod: "https://doob.world:7005",
    staging: "https://doob.world:7005",
};
exports.config = {
    client_id: "",
    client_secret: "",
    merchantId: "",
    merchantName: "",
    terminalId: "",
    host: "https://doob.world:7005",
    token: "",
};
exports.default = {
    auth: auth_1.default,
    invoice: invoice_1.default,
};
var invoice_2 = require("./invoice");
Object.defineProperty(exports, "invoice", { enumerable: true, get: function () { return invoice_2.default; } });

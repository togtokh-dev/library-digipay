"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const auth_1 = require("./auth");
const axios_master_1 = require("axios-master");
const CREATE = async (body) => {
    var _a, _b, _c;
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "POST",
            url: `${_1.config.host}/v3/superapp/save/invoice`,
            data: {
                merchantId: _1.config.merchantId,
                merchantName: _1.config.merchantName,
                terminalId: _1.config.terminalId,
                ...body,
            },
            headers: {
                Authorization: `Bearer ${_1.config.token}`,
                "Content-Type": "application/json",
            },
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken, // Function to refresh the token
            name: "CREATE Invoice",
            timeout: 20000,
            logger(data) { },
        });
        if (res.invoiceId) {
            return {
                success: true,
                message: "success",
                data: res,
            };
        }
        else {
            console.log("FAILED", res);
            return {
                success: false,
                message: `${res}`,
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
const INFO = async (invoice_id) => {
    var _a, _b, _c;
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "GET",
            url: `${_1.config.host}/v3/superapp/check/invoice?invoiceId=${invoice_id}`,
            headers: {
                Authorization: `Bearer ${_1.config.token}`,
                "Content-Type": "application/json",
            },
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken, // Function to refresh the token
            name: "INFO Invoice",
            timeout: 20000,
            logger(data) { },
        });
        if (res.invoiceId) {
            return {
                success: true,
                message: "success",
                data: res,
            };
        }
        else {
            console.log("FAILED", res);
            return {
                success: false,
                message: "",
            };
        }
    }
    catch (error) {
        console.log("FAILED", (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        return {
            success: false,
            message: ((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "error",
        };
    }
};
exports.default = { CREATE, INFO };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const axios_1 = require("axios");
const _1 = require("./");
const TOKEN = async (body) => {
    var _a, _b;
    try {
        if (body.host == "prod") {
            _1.config.host == _1.host.prod;
        }
        if (body.host == "staging") {
            _1.config.host == _1.host.staging;
        }
        _1.config.client_id = body.client_id;
        _1.config.client_secret = body.client_secret;
        _1.config.merchantId = body.merchantId;
        _1.config.merchantName = body.merchantName;
        _1.config.terminalId = body.terminalId;
        const res = await axios_1.default.post(`${_1.config.host}/v1/wallet/auth/token?grant_type=client_credentials`, {}, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(_1.config.client_id + ":" + _1.config.client_secret).toString("base64")}`,
            },
        });
        const result = res.data;
        if (result.access_token) {
            _1.config.token = result.access_token;
        }
        console.log("SUCCESS");
        return {
            success: true,
            message: "SUCCESS",
        };
    }
    catch (error) {
        console.log("FAILED", error);
        return {
            success: false,
            message: ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "error",
        };
    }
};
const getToken = async () => {
    try {
        const res = await axios_1.default.post(`${_1.config.host}/v1/wallet/auth/token?grant_type=client_credentials`, {}, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(_1.config.client_id + ":" + _1.config.client_secret).toString("base64")}`,
            },
        });
        const result = res.data;
        if (result.access_token) {
            _1.config.token = result.access_token;
        }
        console.log("SUCCESS");
        return result.access_token;
    }
    catch (error) {
        console.log("FAILED", error);
        return "";
    }
};
exports.getToken = getToken;
exports.default = { TOKEN };

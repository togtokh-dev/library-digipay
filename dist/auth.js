"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const axios_1 = require("axios");
const axios_master_1 = require("axios-master");
const _1 = require("./");
/**
 * Digipay эхлүүлэх — token авч config-д хадгална.
 * Бүх дараагийн хүсэлтүүдийн өмнө нэг удаа дуудах шаардлагатай.
 */
const TOKEN = async (body) => {
    try {
        if (body.host == "prod") {
            _1.config.host = _1.host.prod;
        }
        if (body.host == "staging") {
            _1.config.host = _1.host.staging;
        }
        _1.config.client_id = body.client_id;
        _1.config.client_secret = body.client_secret;
        _1.config.merchantId = body.merchantId;
        _1.config.merchantName = body.merchantName;
        _1.config.terminalId = body.terminalId;
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "POST",
            url: `${_1.config.host}/v1/wallet/auth/token?grant_type=client_credentials`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(_1.config.client_id + ":" + _1.config.client_secret).toString("base64")}`
            }
        }, {
            name: "INVOICE PAY",
            timeout: 20000,
            logger: (0, _1.logAxios)(_1.config.logger, "INVOICE PAY")
        });
        const result = res.data;
        if (result.access_token) {
            _1.config.token = result.access_token;
        }
        console.log("SUCCESS");
        return {
            success: true,
            message: "SUCCESS"
        };
    }
    catch (error) {
        console.log("FAILED", error);
        return {
            success: false,
            message: (0, _1.parseErr)(error)
        };
    }
};
/** 401 хариу ирэх үед axios-master дотроос шинэ token авахад ашиглах refresh функц */
const getToken = async () => {
    try {
        const res = await axios_1.default.post(`${_1.config.host}/v1/wallet/auth/token?grant_type=client_credentials`, {}, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(_1.config.client_id + ":" + _1.config.client_secret).toString("base64")}`
            }
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

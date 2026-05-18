"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const auth_1 = require("./auth");
const axios_master_1 = require("axios-master");
/** Төлбөрийн нэхэмжлэх үүсгэх — invoiceId болон redirectUrl буцаана */
const CREATE = async (body) => {
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "POST",
            url: `${_1.config.host}/v3/superapp/save/invoice`,
            data: {
                merchantId: _1.config.merchantId,
                merchantName: _1.config.merchantName,
                terminalId: _1.config.terminalId,
                ...body
            },
            headers: {
                Authorization: `Bearer ${_1.config.token}`,
                "Content-Type": "application/json"
            }
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken, // Function to refresh the token
            name: "CREATE Invoice",
            timeout: 20000,
            logger(data) { }
        });
        if (res.invoiceId) {
            return {
                success: true,
                message: "success",
                data: res
            };
        }
        else {
            console.log("FAILED", res);
            return {
                success: false,
                message: `${res}`
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: (0, _1.parseErr)(error)
        };
    }
};
/** Нэхэмжлэхийн төлөв болон дэлгэрэнгүй мэдээллийг лавлах */
const INFO = async (invoice_id) => {
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "GET",
            url: `${_1.config.host}/v3/superapp/check/invoice?invoiceId=${invoice_id}`,
            headers: {
                Authorization: `Bearer ${_1.config.token}`,
                "Content-Type": "application/json"
            }
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken, // Function to refresh the token
            name: "INFO Invoice",
            timeout: 20000,
            logger(data) { }
        });
        if (res.invoiceId) {
            return {
                success: true,
                message: "success",
                data: res
            };
        }
        else {
            console.log("FAILED", res);
            return {
                success: false,
                message: ""
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: (0, _1.parseErr)(error)
        };
    }
};
/** VOID буцаалт — худалдан авалт хийсэн өдрийн 00:00 цагаас өмнө бүтэн дүнгээр буцаалт хийнэ */
const VOID = async (invoiceId) => {
    try {
        const res = await (0, axios_master_1.axiosMasterMain)({
            method: "POST",
            url: `${_1.config.host}/v3/superapp/request/void?invoiceId=${invoiceId}`,
            headers: {
                Authorization: `Bearer ${_1.config.token}`,
                "Content-Type": "application/json"
            }
        }, {
            shouldRetry: true,
            shouldRetryStatus: [400, 401],
            retryFunction: auth_1.getToken,
            name: "VOID Refund",
            timeout: 20000,
            logger() { }
        });
        if (res.invoiceId) {
            return { success: true, message: "success", data: res };
        }
        return { success: false, message: `${res}` };
    }
    catch (error) {
        return { success: false, message: (0, _1.parseErr)(error) };
    }
};
exports.default = { CREATE, INFO, VOID };

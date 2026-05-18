import { AxiosMasterError, AxiosMasterLoggerType } from "axios-master";
export declare function parseErr(error: unknown | AxiosMasterError): string;
export declare const logAxios: (enabled: boolean, name: string) => (data: AxiosMasterLoggerType) => void;
export declare const host: {
    prod: "https://api-wallet.khanbank.com";
    staging: "https://doob.world:7005";
};
export declare const config: {
    client_id: string;
    client_secret: string;
    merchantId: string;
    merchantName: string;
    terminalId: string;
    host: "https://doob.world:7005" | "https://api-wallet.khanbank.com";
    token: string;
    logger: boolean;
};
declare const _default: {
    auth: {
        TOKEN: (body: {
            host: "prod" | "staging";
            client_id: string;
            client_secret: string;
            merchantId: string;
            merchantName: string;
            terminalId: string;
        }) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    invoice: {
        CREATE: (body: {
            amount: number;
            webHookUrl: string;
        }) => Promise<{
            success: boolean;
            message: string;
            data?: {
                invoiceId: string;
                redirectUrl: string;
            };
        }>;
        INFO: (invoice_id: string) => Promise<{
            success: boolean;
            message: string;
            data?: {
                amount: number;
                merchantId: string;
                merchantName: string;
                terminalId: string;
                webHookUrl: string;
                invoiceId: string;
                txnId: string;
                status: "ERROR" | "NEW" | "SUCCESS";
                errorMessage: string;
                redirectUrl: string;
                extInvoiceId: string;
                userId: string;
                refundedAmount: number;
                voidAmount: number;
            };
        }>;
        VOID: (invoiceId: string) => Promise<{
            success: boolean;
            message: string;
            data?: {
                amount: number;
                merchantId: string;
                merchantName: string;
                terminalId: string;
                webHookUrl: string;
                invoiceId: string;
                txnId: number;
                status: "ERROR" | "NEW" | "SUCCESS";
                extInvoiceId: string;
                refundedAmount: number;
                voidAmount: number;
            };
        }>;
    };
};
export default _default;
export { default as invoice } from "./invoice";

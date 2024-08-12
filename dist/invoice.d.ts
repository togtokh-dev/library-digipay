type CreateT = {
    amount: number;
    webHookUrl: string;
};
type ResCreateT = {
    invoiceId: string;
    redirectUrl: string;
};
type InfoT = {
    amount: number;
    merchantId: string;
    merchantName: string;
    terminalId: string;
    webHookUrl: string;
    invoiceId: string;
    txnId: null | string;
    status: "NEW" | "SUCCESS" | "ERROR";
    errorMessage: null | string;
    redirectUrl: null | string;
    extInvoiceId: null | string;
    userId: string;
    refundedAmount: null | number;
    voidAmount: null | number;
};
declare const _default: {
    CREATE: (body: CreateT) => Promise<{
        success: boolean;
        message: string;
        data?: ResCreateT;
    }>;
    INFO: (invoice_id: string) => Promise<{
        success: boolean;
        message: string;
        data?: InfoT;
    }>;
};
export default _default;

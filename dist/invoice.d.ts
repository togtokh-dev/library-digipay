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
type VoidResT = {
    amount: number;
    merchantId: string;
    merchantName: string;
    terminalId: string;
    webHookUrl: string;
    invoiceId: string;
    txnId: number | null;
    status: "NEW" | "SUCCESS" | "ERROR";
    extInvoiceId: string | null;
    refundedAmount: number | null;
    voidAmount: number | null;
};
declare const _default: {
    CREATE: (body: CreateT) => Promise<{
        /** Хүсэлт амжилттай эсэх */
        success: boolean;
        /** Алдааны мэдэгдэл эсвэл "success" */
        message: string;
        /** invoiceId болон redirectUrl агуулсан объект */
        data?: ResCreateT;
    }>;
    INFO: (invoice_id: string) => Promise<{
        /** Хүсэлт амжилттай эсэх */
        success: boolean;
        /** Алдааны мэдэгдэл эсвэл "success" */
        message: string;
        /** Нэхэмжлэхийн бүрэн мэдээлэл (status, amount, txnId гэх мэт) */
        data?: InfoT;
    }>;
    VOID: (invoiceId: string) => Promise<{
        /** Хүсэлт амжилттай эсэх */
        success: boolean;
        /** Алдааны мэдэгдэл эсвэл "success" */
        message: string;
        /** Буцаалтын дэлгэрэнгүй мэдээлэл */
        data?: VoidResT;
    }>;
};
export default _default;

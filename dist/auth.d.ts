export declare const getToken: () => Promise<string>;
declare const _default: {
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
export default _default;

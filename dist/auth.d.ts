/** 401 хариу ирэх үед axios-master дотроос шинэ token авахад ашиглах refresh функц */
export declare const getToken: () => Promise<string>;
declare const _default: {
    TOKEN: (body: {
        /** "prod" = https://api-wallet.khanbank.com, "staging" = тест орчин */
        host: "prod" | "staging";
        /** Банкнаас олгосон client ID */
        client_id: string;
        /** Банкнаас олгосон client secret */
        client_secret: string;
        /** Бүртгүүлсэн merchant ID */
        merchantId: string;
        /** Бүртгүүлсэн merchant нэр */
        merchantName: string;
        /** Бүртгүүлсэн terminal ID */
        terminalId: string;
    }) => Promise<{
        /** Хүсэлт амжилттай эсэх */
        success: boolean;
        /** Алдааны мэдэгдэл эсвэл "SUCCESS" */
        message: string;
    }>;
};
export default _default;

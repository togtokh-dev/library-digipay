import axios from "axios";
import { axiosMasterMain, AxiosMasterError } from "axios-master";
import DIGIPAY, { config, host, logAxios, parseErr } from "./";

type tokenResT = {
  access_token: string;
  access_token_expires_in: number;
  organization_name: string;
  developer_email: string;
  token_type: string;
};

/**
 * Digipay эхлүүлэх — token авч config-д хадгална.
 * Бүх дараагийн хүсэлтүүдийн өмнө нэг удаа дуудах шаардлагатай.
 */
const TOKEN = async (body: {
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
}): Promise<{
  /** Хүсэлт амжилттай эсэх */
  success: boolean;
  /** Алдааны мэдэгдэл эсвэл "SUCCESS" */
  message: string;
}> => {
  try {
    if (body.host == "prod") {
      config.host = host.prod;
    }
    if (body.host == "staging") {
      config.host = host.staging;
    }
    config.client_id = body.client_id;
    config.client_secret = body.client_secret;
    config.merchantId = body.merchantId;
    config.merchantName = body.merchantName;
    config.terminalId = body.terminalId;
    const res = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/v1/wallet/auth/token?grant_type=client_credentials`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            config.client_id + ":" + config.client_secret
          ).toString("base64")}`
        }
      },
      {
        name: "INVOICE PAY",
        timeout: 20000,
        logger: logAxios(config.logger, "INVOICE PAY")
      }
    );

    const result: tokenResT = res.data;
    if (result.access_token) {
      config.token = result.access_token;
    }
    console.log("SUCCESS");
    return {
      success: true,
      message: "SUCCESS"
    };
  } catch (error) {
    console.log("FAILED", error);
    return {
      success: false,
      message: parseErr(error)
    };
  }
};
/** 401 хариу ирэх үед axios-master дотроос шинэ token авахад ашиглах refresh функц */
export const getToken = async (): Promise<string> => {
  try {
    const res = await axios.post(
      `${config.host}/v1/wallet/auth/token?grant_type=client_credentials`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            config.client_id + ":" + config.client_secret
          ).toString("base64")}`
        }
      }
    );
    const result: tokenResT = res.data;
    if (result.access_token) {
      config.token = result.access_token;
    }
    console.log("SUCCESS");
    return result.access_token;
  } catch (error) {
    console.log("FAILED", error);
    return "";
  }
};
export default { TOKEN };

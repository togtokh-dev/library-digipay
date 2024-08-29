import axios from "axios";
import DIGIPAY, { config, host } from "./";
type tokenResT = {
  access_token: string;
  access_token_expires_in: number;
  organization_name: string;
  developer_email: string;
  token_type: string;
};
const TOKEN = async (body: {
  host: "prod" | "staging";
  client_id: string;
  client_secret: string;
  merchantId: string;
  merchantName: string;
  terminalId: string;
}): Promise<{
  success: boolean;
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

    const res = await axios.post(
      `${config.host}/v1/wallet/auth/token?grant_type=client_credentials`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            config.client_id + ":" + config.client_secret
          ).toString("base64")}`,
        },
      }
    );
    const result: tokenResT = res.data;
    if (result.access_token) {
      config.token = result.access_token;
    }
    console.log("SUCCESS");
    return {
      success: true,
      message: "SUCCESS",
    };
  } catch (error) {
    console.log("FAILED", error);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};
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
          ).toString("base64")}`,
        },
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

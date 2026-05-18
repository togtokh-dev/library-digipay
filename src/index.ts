import { AxiosMasterError, AxiosMasterLoggerType } from "axios-master";
import auth from "./auth";
import invoice from "./invoice";

export function parseErr(error: unknown | AxiosMasterError): string {
  if (typeof error === "string" && error.trim()) return error;

  if (typeof error === "object" && error !== null) {
    const err = error as any;

    // Axios / axiosMasterMain response error
    if (typeof err.response === "object" && err.response !== null) {
      const data = err.response.data;
      if (typeof data === "string" && data.trim()) return data;
      if (typeof data === "object" && data !== null) {
        return (
          data.message ||
          data.error ||
          data.error_description ||
          data.msg ||
          JSON.stringify(data)
        );
      }
      return `HTTP ${err.response.status ?? "error"}`;
    }

    // Network / timeout — no response
    if (err.code === "ECONNABORTED") return "Request timed out";
    if (err.code === "ERR_NETWORK" || err.message === "Network Error")
      return "Network error";

    // Plain Error or any object with message
    if (typeof err.message === "string" && err.message.trim())
      return err.message;
  }

  return "Unexpected error";
}

export const logAxios =
  (enabled: boolean, name: string) => (data: AxiosMasterLoggerType) => {
    if (!enabled) return;

    console.log(
      `[${name}]`,
      JSON.stringify(
        {
          time: data?.json?.time,
          request: data?.json?.request,
          response: `${data?.json?.response ?? ""}`,
          responseBody: data?.json?.responseBody,
          statusCode: data?.json?.statusCode
        },
        null,
        2
      )
    );
  };

export const host: {
  prod: "https://api-wallet.khanbank.com";
  staging: "https://doob.world:7005";
} = {
  prod: "https://api-wallet.khanbank.com",
  staging: "https://doob.world:7005"
};

export const config: {
  client_id: string;
  client_secret: string;
  merchantId: string;
  merchantName: string;
  terminalId: string;
  host: "https://doob.world:7005" | "https://api-wallet.khanbank.com";
  token: string;
  logger: boolean;
} = {
  client_id: "",
  client_secret: "",
  merchantId: "",
  merchantName: "",
  terminalId: "",
  host: "https://doob.world:7005",
  token: "",
  logger: true
};
export default {
  auth,
  invoice
};
export { default as invoice } from "./invoice";

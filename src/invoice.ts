import DIGIPAY, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";
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
  status: "NEW" | "SUCCESS" | "ERROR"; //new, success, error
  errorMessage: null | string;
  redirectUrl: null | string;
  extInvoiceId: null | string;
  userId: string;
  refundedAmount: null | number;
  voidAmount: null | number;
};
const CREATE = async (
  body: CreateT
): Promise<{
  success: boolean;
  message: string;
  data?: ResCreateT;
}> => {
  try {
    const res: ResCreateT = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/v3/superapp/save/invoice`,
        data: {
          merchantId: config.merchantId,
          merchantName: config.merchantName,
          terminalId: config.terminalId,
          ...body,
        },
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "CREATE Invoice",
        timeout: 20000,
        logger(data) {},
      }
    );
    if (res.invoiceId) {
      return {
        success: true,
        message: "success",
        data: res,
      };
    } else {
      console.log("FAILED", res);
      return {
        success: false,
        message: `${res}`,
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};

const INFO = async (
  invoice_id: string
): Promise<{
  success: boolean;
  message: string;
  data?: InfoT;
}> => {
  try {
    const res: InfoT = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/v3/superapp/check/invoice?invoiceId=${invoice_id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "INFO Invoice",
        timeout: 20000,
        logger(data) {},
      }
    );

    if (res.invoiceId) {
      return {
        success: true,
        message: "success",
        data: res,
      };
    } else {
      console.log("FAILED", res);
      return {
        success: false,
        message: "",
      };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};

export default { CREATE, INFO };

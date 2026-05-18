import DIGIPAY, { config, parseErr } from ".";
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
/** Төлбөрийн нэхэмжлэх үүсгэх — invoiceId болон redirectUrl буцаана */
const CREATE = async (
  body: CreateT
): Promise<{
  /** Хүсэлт амжилттай эсэх */
  success: boolean;
  /** Алдааны мэдэгдэл эсвэл "success" */
  message: string;
  /** invoiceId болон redirectUrl агуулсан объект */
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
          ...body
        },
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json"
        }
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "CREATE Invoice",
        timeout: 20000,
        logger(data) {}
      }
    );
    if (res.invoiceId) {
      return {
        success: true,
        message: "success",
        data: res
      };
    } else {
      console.log("FAILED", res);
      return {
        success: false,
        message: `${res}`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: parseErr(error)
    };
  }
};

/** Нэхэмжлэхийн төлөв болон дэлгэрэнгүй мэдээллийг лавлах */
const INFO = async (
  invoice_id: string
): Promise<{
  /** Хүсэлт амжилттай эсэх */
  success: boolean;
  /** Алдааны мэдэгдэл эсвэл "success" */
  message: string;
  /** Нэхэмжлэхийн бүрэн мэдээлэл (status, amount, txnId гэх мэт) */
  data?: InfoT;
}> => {
  try {
    const res: InfoT = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/v3/superapp/check/invoice?invoiceId=${invoice_id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json"
        }
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken, // Function to refresh the token
        name: "INFO Invoice",
        timeout: 20000,
        logger(data) {}
      }
    );

    if (res.invoiceId) {
      return {
        success: true,
        message: "success",
        data: res
      };
    } else {
      console.log("FAILED", res);
      return {
        success: false,
        message: ""
      };
    }
  } catch (error) {
    return {
      success: false,
      message: parseErr(error)
    };
  }
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

/** VOID буцаалт — худалдан авалт хийсэн өдрийн 00:00 цагаас өмнө бүтэн дүнгээр буцаалт хийнэ */
const VOID = async (
  invoiceId: string
): Promise<{
  /** Хүсэлт амжилттай эсэх */
  success: boolean;
  /** Алдааны мэдэгдэл эсвэл "success" */
  message: string;
  /** Буцаалтын дэлгэрэнгүй мэдээлэл */
  data?: VoidResT;
}> => {
  try {
    const res: VoidResT = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/v3/superapp/request/void?invoiceId=${invoiceId}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json"
        }
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "VOID Refund",
        timeout: 20000,
        logger() {}
      }
    );

    if (res.invoiceId) {
      return { success: true, message: "success", data: res };
    }
    return { success: false, message: `${res}` };
  } catch (error) {
    return { success: false, message: parseErr(error) };
  }
};
export default { CREATE, INFO, VOID };

import auth from "./auth";
import invoice from "./invoice";

export const host = {
  prod: "https://doob.world:7005",
  staging: "https://doob.world:7005",
};

export const config: {
  client_id: string;
  client_secret: string;
  merchantId: string;
  merchantName: string;
  terminalId: string;
  host: "https://doob.world:7005" | "https://doob.world:7005";
  token: string;
} = {
  client_id: "",
  client_secret: "",
  merchantId: "",
  merchantName: "",
  terminalId: "",
  host: "https://doob.world:7005",
  token: "",
};
export default {
  auth,
  invoice,
};
export { default as invoice } from "./invoice";

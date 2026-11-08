# DigiPay

A Node.js and TypeScript client for the Khan Bank DigiPay wallet payment gateway — authenticate, create invoices, and check or void payments.

## Install

```bash
npm i @togtokh.dev/digipay
```

## Features

- OAuth-style authentication against the DigiPay wallet API (`auth.TOKEN`)
- Create payment invoices with an amount and webhook callback URL (`invoice.CREATE`)
- Look up the full status of an invoice, including payment state (`invoice.INFO`)
- Void an invoice (`invoice.VOID`)
- Built-in production and staging host selection
- Optional Axios request/response logger (`logAxios`) and an error parser (`parseErr`)

## Quick start

```ts
import DIGIPAY from "@togtokh.dev/digipay";

async function main() {
  // 1. Authenticate (host is "prod" or "staging")
  const auth = await DIGIPAY.auth.TOKEN({
    host: "staging",
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    merchantId: "YOUR_MERCHANT_ID",
    merchantName: "YOUR_MERCHANT_NAME",
    terminalId: "YOUR_TERMINAL_ID",
  });
  console.log(auth); // { success, message }

  // 2. Create an invoice
  const invoice = await DIGIPAY.invoice.CREATE({
    amount: 100,
    webHookUrl: "https://example.com/webhook",
  });
  console.log(invoice); // { success, message, data?: { invoiceId, redirectUrl } }

  // 3. Check the payment status
  if (invoice.data?.invoiceId) {
    const info = await DIGIPAY.invoice.INFO(invoice.data.invoiceId);
    console.log(info.data?.status); // "NEW" | "SUCCESS" | "ERROR"
  }
}

main().catch(console.error);
```

## API

### `auth`

#### `auth.TOKEN(body)`

Authenticates with DigiPay and stores the resulting token and configuration internally for subsequent calls.

```ts
auth.TOKEN(body: {
  host: "prod" | "staging";
  client_id: string;
  client_secret: string;
  merchantId: string;
  merchantName: string;
  terminalId: string;
}): Promise<{ success: boolean; message: string }>
```

`host` selects the base URL:

- `"prod"` → `https://api-wallet.khanbank.com`
- `"staging"` → `https://doob.world:7005`

### `invoice`

The `invoice` namespace is also available as a named export:

```ts
import { invoice } from "@togtokh.dev/digipay";
```

#### `invoice.CREATE(body)`

Creates a new payment invoice.

```ts
invoice.CREATE(body: {
  amount: number;
  webHookUrl: string;
}): Promise<{
  success: boolean;
  message: string;
  data?: {
    invoiceId: string;
    redirectUrl: string;
  };
}>
```

#### `invoice.INFO(invoice_id)`

Fetches the full details and payment status of an invoice.

```ts
invoice.INFO(invoice_id: string): Promise<{
  success: boolean;
  message: string;
  data?: {
    amount: number;
    merchantId: string;
    merchantName: string;
    terminalId: string;
    webHookUrl: string;
    invoiceId: string;
    txnId: string | null;
    status: "NEW" | "SUCCESS" | "ERROR";
    errorMessage: string | null;
    redirectUrl: string | null;
    extInvoiceId: string | null;
    userId: string;
    refundedAmount: number | null;
    voidAmount: number | null;
  };
}>
```

#### `invoice.VOID(invoiceId)`

Voids an invoice.

```ts
invoice.VOID(invoiceId: string): Promise<{
  success: boolean;
  message: string;
  data?: {
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
}>
```

### `config`

A module-level object holding the active credentials and runtime state. It is populated by `auth.TOKEN` and read by the invoice methods.

```ts
config: {
  client_id: string;
  client_secret: string;
  merchantId: string;
  merchantName: string;
  terminalId: string;
  host: "https://doob.world:7005" | "https://api-wallet.khanbank.com";
  token: string;
  logger: boolean;
}
```

### Helpers

#### `parseErr(error)`

Extracts a readable error message from an unknown error or an `AxiosMasterError`.

```ts
parseErr(error: unknown): string
```

#### `logAxios(enabled, name)`

Builds an Axios logger callback. When `enabled` is `true`, it logs requests/responses under the given `name`.

```ts
logAxios(enabled: boolean, name: string): (data: AxiosMasterLoggerType) => void
```

## Response

Every method resolves to a promise of the same shape:

```ts
Promise<{
  success: boolean;   // whether the request succeeded
  message: string;    // error message, or "success"
  data?: ...;         // method-specific payload (present on success)
}>
```

## License

ISC

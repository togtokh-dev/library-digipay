# DIGI PAY

<!-- ![Alt text](https://developer.qpay.mn/intro.png) -->

## Example

```bash
    import DIGIPAY from "@togtokh.dev/digipay";

    DIGIPAY.auth
    .TOKEN({
      host: "staging",
      client_id: "",
      client_secret: "",
      merchantId: "",
      merchantName: "",
      terminalId: "",
    })
    .then(async (r) => {
      console.log(r);
      const invoice = await DIGIPAY.invoice.CREATE({
        amount: 100,
        webHookUrl: "https://looktv.mn/home",
      });
      console.log(invoice);
      if (invoice.data?.invoiceId) {
        const info = await DIGIPAY.invoice.INFO(invoice.data?.invoiceId);
        console.log(info);
      }
    })
    .catch((e) => {
      console.log(e);
    });


```

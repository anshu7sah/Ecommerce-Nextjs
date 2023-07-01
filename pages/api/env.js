import { createRouter } from "next-connect";

const router = createRouter();

router.get((req, res) => {
  res.status(200).json({
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});

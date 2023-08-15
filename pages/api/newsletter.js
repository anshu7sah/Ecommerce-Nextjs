import axios from "axios";
import { createRouter } from "next-connect";
import crypto from "crypto";
const router = createRouter();

router.post(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please add an email address." });
    }
    const { url, data, headers } = mailchimphandler(email);

    const check = await checkSubscriptionStatus(email);
    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    if (!check) {
      await axios.post(url, data, { headers });
      return res.status(200).json({
        message: "You have been added to our newsletter successfully",
      });
    } else {
      await unsubscribeUser(subscriberHash, headers);

      return res.status(200).json({
        message: "You have been unsubscribed from our newsletter successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});

function mailchimphandler(email) {
  const { MAILCHIMP_APi_KEY, MAILCHIMP_LIST_ID } = process.env;
  const DATACENTER = MAILCHIMP_APi_KEY.split("-")[1];
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
  const data = {
    email_address: email,
    status: "subscribed",
  };
  const base64key = Buffer.from(`anystring:${MAILCHIMP_APi_KEY}`).toString(
    "base64"
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64key}`,
  };
  return { url, data, headers };
}

async function unsubscribeUser(subscriberId, headers) {
  const { MAILCHIMP_APi_KEY, MAILCHIMP_LIST_ID } = process.env;
  console.log("anshu");
  const DATACENTER = MAILCHIMP_APi_KEY.split("-")[1];
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberId}`;

  try {
    const r = await axios.delete(url, { headers });
    console.log(r);
  } catch (error) {
    console.error("Error unsubscribing user:", error.message);
  }
}
async function checkSubscriptionStatus(email) {
  const { MAILCHIMP_APi_KEY, MAILCHIMP_LIST_ID } = process.env;
  const DATACENTER = MAILCHIMP_APi_KEY.split("-")[1];
  const subscriberHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`;

  const base64key = Buffer.from(`anystring:${MAILCHIMP_APi_KEY}`).toString(
    "base64"
  );
  const headers = {
    Authorization: `Basic ${base64key}`,
  };

  try {
    const response = await axios.get(url, { headers });

    return response.data.status === "subscribed";
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false; // Subscriber not found, hence not subscribed
    }
    console.error("Error checking subscription status:", error.message);
    throw error;
  }
}

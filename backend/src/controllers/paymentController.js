const Khalti = require('khalti-node');

const khalti = new Khalti({
  secretKey: process.env.KHALTI_SECRET_KEY,
  publicKey: 'test_public_key_xxxxxxxxxxxx'
});

exports.processPayment = async (req, res) => {
  try {
    const payload = {
      amount: req.body.amount, // in paisa (1000 paisa = Rs.10)
      mobile: req.body.mobile,
      productIdentity: `job-${req.body.jobId}`,
      productName: 'Featured Job Post'
    };

    const response = await khalti.payment.initiate(payload);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Payment failed' });
  }
};
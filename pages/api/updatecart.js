import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../utils/db";
import Product from "../../models/Product";

const router = createRouter();

router.post(async (req, res) => {
  try {
    await mongoConnect();
    const promises = req.body.products.map(async (p) => {
      let dbProduct = await Product.findById(p._id).lean();
      let originalPrice = dbProduct.subProducts[p.style].sizes.find(
        (x) => x.size == p.size
      ).price;
      let quantity = dbProduct.subProducts[p.style].sizes.find(
        (x) => x.size == p.size
      ).qty;
      let discount = dbProduct.subProducts[p.style].discount;
      return {
        ...p,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - originalPrice / discount
            : originalPrice,
        discount: discount,
        quantity: quantity,
        shipping: dbProduct.shipping,
      };
    });

    const data = await Promise.all(promises);

    await mongoDisconnect();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});

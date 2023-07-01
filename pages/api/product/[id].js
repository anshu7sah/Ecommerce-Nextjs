import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import Product from "../../../models/Product";

const router = createRouter();

router.get(async (req, res) => {
  try {
    await mongoConnect();
    const id = req.query.id;
    const style = req.query.style;
    const size = req.query.size;

    const product = await Product.findById(id).lean();

    let discount = product?.subProducts[style].discount;
    let priceBefore = product?.subProducts[style].sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;

    await mongoDisconnect();
    return res.status(200).json({
      _id: product?._id,
      style: Number(style),
      name: product?.name,
      shipping: product?.shipping,
      description: product?.description,
      slug: product?.slug,
      sku: product?.subProducts[style].sku,
      brand: product?.brand,
      images: product?.subProducts[style].images,
      color: product?.subProducts[style].color,
      size: product.subProducts[style].sizes[size].size,
      price,
      priceBefore,
      discount,
      quantity: product?.subProducts[style].sizes[size].qty,
    });
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
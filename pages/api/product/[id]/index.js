import { createRouter } from "next-connect";
import Product from "../../../../models/Product";
import { mongoConnect, mongoDisconnect } from "../../../../utils/db";

const router = createRouter();

router.get(async (req, res) => {
  console.log("anshu");
  try {
    await mongoConnect();
    const id = req.query.id;
    const style = req.query.style || 0;
    const size = req.query.size || 0;

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
      category: product.category,
      subCategories: product.subCategories,
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

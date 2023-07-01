import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";
import auth from "../../../middleware/auth";
const router = createRouter();

router.use(auth).post(async (req, res) => {
  try {
    await mongoConnect();
    const { cart } = req.body;
    let products = [];
    let user = await User.findById(req.user);
    let existing_cart = await Cart.findOne({ user: user._id });
    if (existing_cart) {
      await existing_cart.deleteOne();
    }
    for (let i = 0; i < cart.length; i++) {
      let dbProduct = await Product.findById(cart[i]._id).lean();
      let subProduct = dbProduct.subProducts[cart[i].style];
      let tempProduct = {};
      tempProduct.name = dbProduct.name;
      tempProduct.product = dbProduct._id;
      (tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      }),
        (tempProduct.image = subProduct.images[0].url);
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.size = cart[i].size;
      let price = Number(
        subProduct.sizes.find((p) => p.size === cart[i].size).price
      );
      tempProduct.price =
        subProduct.discount > 0
          ? (price - price / Number(subProduct.discount)).toFixed(2)
          : price.toFixed(2);
      products.push(tempProduct);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].qty;
    }
    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();
    await mongoDisconnect();
    res.status(201).json({
      message: "Cart added successfully in the database",
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

import { createRouter } from "next-connect";
import Product from "../../../../models/Product";
import { mongoConnect, mongoDisconnect } from "../../../../utils/db";
import auth from "../../../../middleware/auth";

const router = createRouter();

router.use(auth).put(async (req, res) => {
  try {
    await mongoConnect();
    const product = await Product.findById(req.query.id);
    if (product) {
      const exist = product.reviews.find(
        (x) => x.reviewBy.toString() == req.user
      );
      if (exist) {
        await Product.updateOne(
          {
            _id: req.query.id,
            "reviews._id": exist._id,
          },
          {
            $set: {
              "reviews.$.review": req.body.review,
              "reviews.$.rating": req.body.rating,
              "reviews.$.size": req.body.size,
              "reviews.$.fit": req.body.fit,
              "reviews.$.images": req.body.images,
              "reviews.$.style": req.body.style,
            },
          },
          {
            new: true,
          }
        );
        const updatedProduct = await Product.findById(req.query.id);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a, r) => r.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();
        await updatedProduct.populate("reviews.reviewBy");
        await mongoDisconnect();
        return res
          .status(200)
          .json({ reviews: updatedProduct.reviews.reverse() });
      } else {
        const review = {
          reviewBy: req.user,
          rating: req.body.rating,
          review: req.body.review,
          size: req.body.size,
          fit: req.body.fit,
          style: req.body.style,
          images: req.body.images,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, r) => r.rating + a, 0) /
          product.reviews.length;
        await product.save();
        await product.populate("reviews.reviewBy");
        await mongoDisconnect();
        return res.status(200).json({ reviews: product.reviews.reverse() });
      }
    }
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

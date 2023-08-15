import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../../utils/db";
import slugify from "slugify";
import Product from "../../../../models/Product";
import auth from "../../../../middleware/auth";
import admin from "../../../../middleware/admin";

const router = createRouter();

router
  .use(auth)
  .use(admin)
  .post(async (req, res) => {
    try {
      await mongoConnect();

      if (req.body.parent) {
        const parent = await Product.findById(req.body.parent);
        if (!parent) {
          return res.status(400).json({
            message: "Parent product not found",
          });
        } else {
          const newParent = await parent.updateOne(
            {
              $push: {
                subProducts: {
                  sku: req.body.sku,
                  color: req.body.color,
                  images: req.body.images,
                  sizes: req.body.sizes,
                  discount: req.body.discount,
                },
              },
            },
            { new: true }
          );
        }
      } else {
        req.body.slug = slugify(req.body.name);
        const newProduct = new Product({
          name: req.body.name,
          description: req.body.description,
          brand: req.body.brand,
          details: req.body.details,
          questions: req.body.questions,
          slug: req.body.slug,
          category: req.body.category,
          subCategories: req.body.subCategories,
          subProducts: [
            {
              sku: req.body.sku,
              color: req.body.color,
              images: req.body.images,
              sizes: req.body.sizes,
              discount: req.body.discount,
            },
          ],
        });
        await newProduct.save();
      }
      console.log("anshu is very very handsome");
      res.status(201).json({ message: "Product created Successfully." });

      await mongoDisconnect();
    } catch (error) {
      console.log("anshu is not so handsome");
      res.status(500).json({ message: error.message });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});

import { createRouter } from "next-connect";
import auth from "../../../middleware/auth";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import slugify from "slugify";
import admin from "../../../middleware/admin";
const router = createRouter();

router
  .use(auth)
  .use(admin)
  .post(async (req, res) => {
    try {
      await mongoConnect();
      const { name, parent } = req.body;
      const test = await SubCategory.findOne({ name });
      if (test) {
        return res
          .status(400)
          .json({ message: "SubCategory already exist, Try a different name" });
      }
      await new SubCategory({ name, parent, slug: slugify(name) }).save();

      res.json({
        message: `Sub-Category ${name} has been created successfully`,
        subCategories: await SubCategory.find({})
          .sort({ updatedAt: -1 })
          .populate({ path: "parent", model: Category }),
      });
      await mongoDisconnect();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

router
  .use(auth)
  .use(admin)
  .delete(async (req, res) => {
    try {
      const { id } = req.query;
      await mongoConnect();
      await SubCategory.findByIdAndRemove(id);
      await mongoDisconnect();
      return res.status(201).json({
        message: "Sub-Category has been deleted successfully",
        subCategories: await SubCategory.find({})
          .sort({ createdAt: -1 })
          .populate({ path: "parent", model: Category })
          .lean(),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router
  .use(auth)
  .use(admin)
  .put(async (req, res) => {
    try {
      const { id, name, parent } = req.body;
      await mongoConnect();
      await SubCategory.findByIdAndUpdate(id, {
        name,
        parent,
        slug: slugify(name),
      });
      await mongoDisconnect();

      return res.status(201).json({
        message: "Sub-Category has been updated successfully",
        subCategories: await SubCategory.find({})
          .sort({ createdAt: -1 })
          .populate({ path: "parent", model: Category })
          .lean(),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router
  .use(auth)
  .use(admin)
  .get(async (req, res) => {
    try {
      const { category } = req.query;

      if (!category) {
        return res.json({});
      }
      await mongoConnect();
      const results = await SubCategory.find({ parent: category }).select(
        "name"
      );

      await mongoDisconnect();
      return res.status(200).json(results);
    } catch (error) {
      await mongoDisconnect();
      res.status(500).json({ message: error.message });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});

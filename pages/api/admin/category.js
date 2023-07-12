import { createRouter } from "next-connect";
import auth from "../../../middleware/auth";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import Category from "../../../models/Category";
import slugify from "slugify";
import admin from "../../../middleware/admin";
const router = createRouter();

router
  .use(auth)
  .use(admin)
  .post(async (req, res) => {
    try {
      await mongoConnect();
      const { name } = req.body;
      const test = await Category.findOne({ name });
      if (test) {
        return res
          .status(400)
          .json({ message: "Category already exist, Try a different name" });
      }
      await new Category({ name, slug: slugify(name) }).save();

      res.json({
        message: `Category ${name} has been created successfully`,
        categories: await Category.find({}).sort({ updatedAt: -1 }),
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
      await Category.findByIdAndRemove(id);
      await mongoDisconnect();
      return res.status(201).json({
        message: "Category has been deleted successfully",
        categories: await Category.find({}).sort({ updatedAt: -1 }).lean(),
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
      const { id, name } = req.body;
      await mongoConnect();
      await Category.findByIdAndUpdate(id, { name, slug: slugify(name) });
      await mongoDisconnect();
      return res.status(201).json({
        message: "Category has been updated successfully",
        categories: await Category.find({}).sort({ createdAt: -1 }).lean(),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});

import React from "react";
import Layout from "../../../components/admin/layout";
import { mongoConnect } from "../../../utils/db";
import Category from "../../../models/Category";
import { useState } from "react";
import Create from "../../../components/admin/categories/Create";
import List from "../../../components/admin/categories/List";

export default function categories({ categories }) {
  const [data, setData] = useState(categories);

  return (
    <Layout>
      <div>
        <Create setCategories={setData} />
        <List categories={data} setCategories={setData} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongoConnect();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

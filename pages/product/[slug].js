import styles from "../../styles/product.module.scss";
import { mongoConnect, mongoDisconnect } from "../../utils/db";
import Product from "../../models/Product";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Category from "../../models/Category";
import User from "../../models/User";
import SubCategory from "../../models/SubCategory";
import MainSwiper from "../../components/productPage/mainSwiper";
import { useState } from "react";
import Infos from "../../components/productPage/infos";
import Reviews from "../../components/productPage/reviews";

export default function ProductPage({ product }) {
  const [activeImg, setActiveImg] = useState("");
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country={""} />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product.category.name}{" "}
            {product.subCategories.map((sub, i) => (
              <span key={i}>/{sub.name}</span>
            ))}{" "}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos product={product} setActiveImg={setActiveImg} />
          </div>
          <Reviews product={product} />
        </div>
      </div>
      <Footer country={""} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;
  await mongoConnect();
  let product = await Product.findOne({
    slug,
  })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();

  let subProduct = product?.subProducts[style];
  let prices = subProduct?.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });
  let newProduct = {
    ...product,
    style,
    images: subProduct?.images,
    sizes: subProduct?.sizes,
    discount: subProduct?.discount,
    sku: subProduct?.sku,
    colors: product?.subProducts.map((p) => {
      return p.color;
    }),
    priceRange:
      prices?.length > 1
        ? subProduct.discount
          ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(
              2
            )} to ${(
              prices[prices.length - 1] -
              prices[prices.length - 1] / subProduct.discount
            ).toFixed(2)}$`
          : `From ${prices[0]} to ${prices[prices.length - 1]}$`
        : "",
    price:
      subProduct?.discount > 0
        ? (
            subProduct?.sizes[size]?.price -
            subProduct?.sizes[size].price / subProduct?.discount
          ).toFixed(2)
        : subProduct?.sizes[size]?.price,
    priceBefore: subProduct?.sizes[size].price,
    quantity: subProduct?.sizes[size].qty,
    ratings: [
      {
        pecentage: calculatePercentage("5"),
      },
      {
        pecentage: calculatePercentage("4"),
      },
      {
        pecentage: calculatePercentage("3"),
      },
      {
        pecentage: calculatePercentage("2"),
      },
      {
        pecentage: calculatePercentage("1"),
      },
    ],
    reviews: product.reviews.reverse(),
    allSizes: product.subProducts
      .map((p) => {
        return p.sizes;
      })
      .flat()
      .sort((a, b) => {
        return a.size - b.size;
      })
      .filter(
        (element, index, array) =>
          array.findIndex((e2) => e2.size === element.size) === index
      ),
  };
  function calculatePercentage(num) {
    return (
      (product.reviews.reduce((a, review) => {
        return (
          a +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product.reviews.length
    ).toFixed(1);
  }

  await mongoDisconnect();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}

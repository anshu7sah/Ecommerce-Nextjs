import Link from "next/link";
import Header from "../components/header";
import MainSwiper from "../components/home/main/swiper";
import styles from "../styles/anshu.module.scss";
import FlashDeals from "../components/home/flashDeals";
import Hero from "../components/test/Hero";
import Product from "../models/Product";
import User from "../models/User";
import { mongoConnect, mongoDisconnect } from "../utils/db";
import Footer from "../components/footer";
import PopularProducts from "../components/test/PopularProducts";
import SuperQuality from "../components/test/SuperQuality";
import Services from "../components/test/Services";
export default function anshu({
  country,
  products,
  statistics,
  popularProducts,
}) {
  return (
    <>
      <Header country={country} />
      {/* <div className={styles.container}>
        <MainSwiper />
        <div className={styles.textbox}>
          <h1 className={styles.headingPrimary}>
            <span className={styles.headingPrimary_main}>Dressing Dreams</span>
            <span className={styles.headingPrimary_sub}>
              One Outfit at a Time
            </span>
          </h1>
          <Link
            href={"/browse"}
            className={`${styles.btn} ${styles.btn_white} ${styles.btn_animated}`}
          >
            Discover our fashion
          </Link>
        </div>
      </div>
      <FlashDeals /> */}
      <main className="relative">
        <section className="xl:padding-l wide:padding-r padding-b">
          <Hero products={products} statistics={statistics} />
        </section>
        <section className="padding">
          <PopularProducts popularProducts={popularProducts} />
        </section>
        <section className="padding">
          <SuperQuality products={products} />
        </section>
        <section className="padding-x py-10">
          <Services />
        </section>
        {/* <section className="padding">
          <SpecialOffer />
        </section> */}
      </main>
      <Footer country={country} />
    </>
  );
}
export async function getServerSideProps() {
  await mongoConnect();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let users = await User.find({});
  let shops = await Product.find().distinct("subProducts.shop");
  let brands = await Product.find().distinct("brand");
  let popularProduct = [...products].sort((a, b) => b.rating - a.rating);

  let PopularProductNum = 4;
  let finalPopularStructure = [];
  popularProduct.map((p, i) => {
    if (i < PopularProductNum) {
      let subIndex = Number(Math.floor(Math.random() * p.subProducts.length));
      let sizeIndex = Number(
        Math.floor(Math.random() * p.subProducts[subIndex].sizes.length)
      );
      finalPopularStructure.push({
        imgURL: p.subProducts[subIndex].images[0].url,
        name: p.name,
        price: p.subProducts[subIndex].sizes[sizeIndex].price,
        rating: p.rating,
        slug: p.slug,
        size: sizeIndex,
        style: subIndex,
      });
    }
  });
  await mongoDisconnect();

  return {
    props: {
      country: {
        name: "Nepal",
        flag: "https://www.iconarchive.com/download/i109264/wikipedia/flags/NP-Nepal-Flag.ico",
      },
      products: JSON.parse(JSON.stringify(products)),
      statistics: [
        { value: `${brands.length}+`, label: "Brands" },
        { value: `${shops.length}+`, label: "Shops" },
        { value: `${users.length}+`, label: "Customers" },
      ],
      popularProducts: JSON.parse(JSON.stringify(finalPopularStructure)),
    },
  };
}

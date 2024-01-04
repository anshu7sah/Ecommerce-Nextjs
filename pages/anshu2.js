import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import styles from "../styles/Home.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "../components/home/main";
import FlashDeals from "../components/home/flashDeals";
import Category from "../components/home/category";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "../data/home";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "../components/productsSwiper";
import { mongoConnect, mongoDisconnect } from "../utils/db";
import Product from "../models/Product";
import ProductCard from "../components/productCard";
export default function Home({ country, products }) {
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {(!isMedium || isMobile) && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper
            products={gamingSwiper}
            header={"For Gamers"}
            bg="#2f82ff"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header={"House Improvements"}
            bg="#5a31f4"
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  await mongoConnect();
  let products = await Product.find().sort({ createdAt: -1 }).lean();

  // let data = await axios
  //   .get(`https://api.ipregistry.co/?key=${process.env.LOCATION_API_KEY}`)
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  await mongoDisconnect();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: "Nepal",
        flag: "https://www.iconarchive.com/download/i109264/wikipedia/flags/NP-Nepal-Flag.ico",
      },
    },
  };
}

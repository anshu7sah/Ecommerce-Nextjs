import styles from "../styles/browse.module.scss";
import { mongoConnect, mongoDisconnect } from "../utils/db";
import Product from "../models/Product";
import Category from "../models/Category";
import SubCategory from "../models/SubCategory";
import { filterArray, randomize, removeDuplicates } from "../utils/arraysUtils";
import Header from "../components/header";
import Link from "next/link";
import ProductCard from "../components/productCard";
import CategoryFilter from "../components/browse/CategoryFilter";
import SizesFilter from "../components/browse/SizesFilter";
import ColorsFilter from "../components/browse/ColorFilter";
import BrandsFilter from "../components/browse/BrandsFilter";
import StylesFilter from "../components/browse/StylesFilter";
import PatternsFilter from "../components/browse/PatternsFilter";
import MaterialsFilter from "../components/browse/MaterialsFilter";
import GenderFilter from "../components/browse/GenderFilter";
import HeadingFilters from "../components/browse/HeadingFilters";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";
export default function Browse({
  subCategories,
  categories,
  products,
  sizes,
  colors,
  brands,
  style,
  patterns,
  materials,
  paginationCount,
}) {
  const router = useRouter();
  const filter = ({
    search,
    category,
    brand,
    style,
    size,
    color,
    pattern,
    material,
    gender,
    price,
    shipping,
    rating,
    sort,
    page,
  }) => {
    const path = router.pathname;

    const { query } = router;
    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    if (size) query.size = size;
    if (color) query.color = color;
    if (pattern) query.pattern = pattern;
    if (material) query.material = material;
    if (gender) query.gender = gender;
    if (price) query.price = price;
    if (shipping) query.shipping = shipping;
    if (rating) query.rating = rating;
    if (sort) query.sort = sort;
    if (page) query.page = page;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const searchHandler = (search) => {
    if (search == "") {
      filter({ search: {} });
    } else {
      filter({ search });
    }
  };
  const categoryHandler = (category) => {
    filter({ category });
  };
  const brandHandler = (brand) => {
    filter({ brand });
  };
  const stylehandler = (style) => {
    filter({ style });
  };
  const sizehandler = (size) => {
    filter({ size });
  };
  const colorhandler = (color) => {
    filter({ color });
  };
  const patternhandler = (pattern) => {
    filter({ pattern });
  };
  const materialhandler = (material) => {
    filter({ material });
  };
  const genderhandler = (gender) => {
    filter({ gender });
  };
  const pricehandler = (price, type) => {
    let priceQuery =
      (router.query.price && router.query.price?.split("_")) || "";
    let min = priceQuery[0] || 0;
    let max = priceQuery[1] || Infinity;
    let newPrice = "";

    if (type == "min") {
      newPrice = `${price}_${max}`;
    } else {
      newPrice = `${min}_${price}`;
    }

    filter({ price: newPrice });
  };
  const multiPriceHandler = (min, max) => {
    filter({ price: `${min}_${max}` });
  };
  const shippinghandler = (shipping) => {
    filter({ shipping });
  };
  const ratinghandler = (rating) => {
    filter({ rating });
  };
  const sortHandler = (sort) => {
    if (sort == "") {
      filter({ sort: {} });
    } else {
      filter({ sort });
    }
  };
  const pagehandler = (e, page) => {
    filter({ page });
  };

  function checkChecked(queryName, value) {
    if (
      router.query[queryName]?.search(value) === -1 ||
      router.query[queryName]?.search(value) === undefined
    ) {
      return false;
    }
    return true;
  }

  function replaceQuery(queryName, value) {
    const existedQuery = router.query[queryName];
    const valueCheck = existedQuery?.search(value);
    const _check = existedQuery?.search(`_${value}`);
    let result = "";
    if (existedQuery) {
      if (existedQuery == value) {
        result = {};
      } else {
        if (valueCheck !== -1) {
          if (_check !== -1) {
            result = existedQuery?.replace(`_${value}`, "");
          } else if (valueCheck == 0) {
            result = existedQuery?.replace(`${value}_`, "");
          } else {
            result = existedQuery?.replace(value, "");
          }
        } else {
          if (_check !== -1) {
            result = `${existedQuery}${value}`;
          } else {
            result = `${existedQuery}_${value}`;
          }
        }
      }
    } else {
      result = value;
    }
    return {
      result,
      active: existedQuery && valueCheck !== -1 ? true : false,
    };
  }
  const [scrollY, setScrollY] = useState(0);
  const [height, setHeight] = useState(0);
  const headerRef = useRef(null);
  const el = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    setHeight(headerRef.current?.offsetHeight + el.current?.offsetHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(scrollY, height);

  return (
    <div className={styles.browse}>
      <div ref={headerRef}>
        <Header country="" searchHandler={searchHandler} />
      </div>
      <div className={styles.browse__container}>
        <div ref={el}>
          <div className={styles.browse__path}>Home / Browse</div>
          <div className={styles.browse__tags}>
            {categories.map((category) => (
              <Link href="" key={category._id}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div
          className={`${styles.browse__store} ${
            scrollY >= height ? styles.fixed : ""
          }`}
        >
          <div
            className={`${styles.browse__store_filters} ${styles.scrollbar}`}
          >
            <button
              className={styles.browse__clearBtn}
              onClick={() => router.push("/browse")}
            >
              Clear All ({Object.keys(router.query).length})
            </button>
            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
              categoryHandler={categoryHandler}
              checkChecked={checkChecked}
              replaceQuery={replaceQuery}
            />
            <SizesFilter sizes={sizes} sizehandler={sizehandler} />
            <ColorsFilter
              colors={colors}
              colorhandler={colorhandler}
              replaceQuery={replaceQuery}
            />
            <BrandsFilter
              brands={brands}
              brandHandler={brandHandler}
              replaceQuery={replaceQuery}
            />
            <StylesFilter
              style={style}
              stylehandler={stylehandler}
              replaceQuery={replaceQuery}
            />
            <PatternsFilter
              patterns={patterns}
              patternhandler={patternhandler}
              replaceQuery={replaceQuery}
            />
            <MaterialsFilter
              materials={materials}
              materialhandler={materialhandler}
              replaceQuery={replaceQuery}
            />
            <GenderFilter
              genderhandler={genderhandler}
              replaceQuery={replaceQuery}
            />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters
              pricehandler={pricehandler}
              multiPriceHandler={multiPriceHandler}
              shippinghandler={shippinghandler}
              replaceQuery={replaceQuery}
              ratinghandler={ratinghandler}
              sortHandler={sortHandler}
            />
            <div className={styles.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
            <Pagination
              count={paginationCount}
              defaultPage={Number(router.query.page) || 1}
              onChange={pagehandler}
              variant="outlined"
              color="primary"
              className={styles.pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const searchQuery = query.search || "";
  // const categoryQuery = query.category || "";
  const genderQuery = query.gender || "";
  const priceQuery = (query.price && query.price?.split("_")) || "";
  const shippingQuery = query.shipping || 0;
  const ratingQuery = (query.rating && query.rating?.split("_")) || "";
  const sortQuery = query.sort || "";
  const pageSize = 20;
  const page = query.page || 1;

  const categoryQuery = (query.category && query.category.split("_")) || "";

  // .........
  const styleQuery = (query.style && query.style.split("_")) || "";
  const styletemp = `^${styleQuery[0]}`;

  const styleRegex = createRegex(styleQuery, styletemp);
  // ..............
  const sizeQuery = (query.size && query.size.split("_")) || "";
  const sizetemp = `^${sizeQuery[0]}`;

  const sizeRegex = createRegex(sizeQuery, sizetemp);
  // ......
  const colorQuery = (query.color && query.color.split("_")) || "";
  const colortemp = `^${colorQuery[0]}`;

  const colorRegex = createRegex(colorQuery, colortemp);
  // ..........
  const brandQuery = (query.brand && query.brand.split("_")) || "";
  const brandtemp = `^${brandQuery[0]}`;

  const brandRegex = createRegex(brandQuery, brandtemp);
  // ......
  const patternQuery = (query.pattern && query.pattern.split("_")) || "";
  const patterntemp = `^${patternQuery[0]}`;

  const patternRegex = createRegex(patternQuery, patterntemp);
  // ..........

  const materialQuery = (query.material && query.material.split("_")) || "";
  const materialtemp = `^${materialQuery[0]}`;

  const materialRegex = createRegex(materialQuery, materialtemp);
  // ..........

  const search =
    searchQuery && searchQuery !== ""
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  const category =
    categoryQuery && categoryQuery !== ""
      ? {
          category: {
            $in: categoryQuery,
          },
        }
      : {};

  const style =
    styleQuery && styleQuery !== ""
      ? {
          "details.value": {
            $regex: styleRegex,
            $options: "i",
          },
        }
      : {};
  const size =
    sizeQuery && sizeQuery !== ""
      ? {
          "subProducts.sizes.size": {
            $regex: sizeRegex,
            $options: "i",
          },
        }
      : {};
  const color =
    colorQuery && colorQuery !== ""
      ? {
          "subProducts.color.color": {
            $regex: colorRegex,
            $options: "i",
          },
        }
      : {};
  const brand =
    brandQuery && brandQuery !== ""
      ? {
          brand: {
            $regex: brandRegex,
            $options: "i",
          },
        }
      : {};
  const pattern =
    patternQuery && patternQuery !== ""
      ? {
          "details.value": {
            $regex: patternRegex,
            $options: "i",
          },
        }
      : {};
  const material =
    materialQuery && materialQuery !== ""
      ? {
          "details.value": {
            $regex: materialRegex,
            $options: "i",
          },
        }
      : {};
  const gender =
    genderQuery && genderQuery !== ""
      ? {
          "details.value": {
            $regex: genderQuery,
            $options: "i",
          },
        }
      : {};
  const price =
    priceQuery && priceQuery !== ""
      ? {
          "subProducts.sizes.price": {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};

  const shipping =
    shippingQuery && shippingQuery === "0"
      ? {
          shipping: 0,
        }
      : {};
  const rating =
    ratingQuery && ratingQuery !== ""
      ? {
          rating: {
            $gte: Number(ratingQuery),
          },
        }
      : {};
  const sort =
    sortQuery == ""
      ? {}
      : sortQuery == "popular"
      ? { rating: -1, "subProducts.sold": -1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReviewed"
      ? { rating: -1 }
      : sortQuery == "priceHighToLow"
      ? { "subProducts.sizes.price": -1 }
      : sortQuery == "priceLowToHigh"
      ? { "subProducts.sizes.price": 1 }
      : {};

  function createRegex(data, styleRegex) {
    if (data.length > 1) {
      for (let i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }

  await mongoConnect();
  let productsDb = await Product.find({
    ...search,
    ...category,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...pattern,
    ...material,
    ...gender,
    ...price,
    ...shipping,
    ...rating,
  })
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort(sort)
    .lean();
  let products =
    sortQuery && sortQuery !== "" ? productsDb : randomize(productsDb);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();
  let colors = await Product.find({ ...category }).distinct(
    "subProducts.color.color"
  );
  let brandsDb = await Product.find({ ...category }).distinct("brand");
  let sizes = await Product.find({ ...category }).distinct(
    "subProducts.sizes.size"
  );
  let details = await Product.find({ ...category }).distinct("details");
  let styleDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(styleDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);

  let totalproducts = await Product.countDocuments({
    ...search,
    ...category,
    ...brand,
    ...style,
    ...size,
    ...color,
    ...pattern,
    ...material,
    ...gender,
    ...price,
    ...shipping,
    ...rating,
  });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      sizes: JSON.parse(JSON.stringify(sizes)),
      colors: JSON.parse(JSON.stringify(colors)),
      brands: JSON.parse(JSON.stringify(brands)),
      style: JSON.parse(JSON.stringify(styles)),
      patterns: JSON.parse(JSON.stringify(patterns)),
      materials: JSON.parse(JSON.stringify(materials)),
      paginationCount: Math.ceil(totalproducts / pageSize),
    },
  };
}

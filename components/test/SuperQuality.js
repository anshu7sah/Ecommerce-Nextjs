import { useRouter } from "next/router";
import Button from "../testCompponents/Button";

const SuperQuality = ({ products }) => {
  const router = useRouter();
  return (
    <section
      id="about-us"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      <div className="flex flex-1 flex-col items-start">
        <h2 className="font-palanquin capitalize text-4xl lg:max-w-lg font-bold">
          We Provide You
          <span className="text-[#2f82ff]"> Super </span>
          <span className="text-[#2f82ff]">Quality </span> Shoes
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Ensuring premium comfort and style, our meticulously crafted footwear
          is designed to elevate your experience, providing you with unmatched
          quality, innovation, and a touch of elegance.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          Our dedication to detail and excellence ensures your satisfaction
        </p>
        <div className="mt-11">
          <Button
            label="View details"
            onClick={() => router.push(`/product/${products[0].slug}?style=0`)}
          />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img
          src={products[0].subProducts[0].images[0].url}
          alt="product detail"
          width={570}
          height={522}
          className="object-contain cursor-pointer"
          onClick={() => router.push(`/product/${products[0].slug}?style=0`)}
        />
      </div>
    </section>
  );
};

export default SuperQuality;

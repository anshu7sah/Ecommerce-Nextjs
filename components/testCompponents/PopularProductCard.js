import { Rating } from "@mui/material";
import Link from "next/link";

const PopularProductCard = ({
  imgURL,
  name,
  price,
  rating,
  slug,
  style,
  size,
}) => {
  return (
    <Link
      href={`/product/${slug}?style=${style}`}
      className="flex flex-1 flex-col w-full max-sm:w-full rounded-2xl items-start"
    >
      <img
        src={imgURL}
        alt={name}
        className="w-[282px] h-[282px] rounded-2xl"
      />
      <div className="mt-8 flex justify-start gap-2.5">
        <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={0.5}
          readOnly
          style={{ color: "#FACF19", height: "25", width: "25" }}
        />
        <p className="font-montserrat text-xl leading-normal text-slate-gray">
          ({rating.toFixed(2)})
        </p>
      </div>
      <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
        {name.length > 25 ? `${name.slice(0, 25)}...` : name}
      </h3>
      <p className="mt-2 font-semibold font-montserrat text-[#2f82ff] text-2xl leading-normal">
        {`Rs.${price}`}
      </p>
    </Link>
  );
};

export default PopularProductCard;

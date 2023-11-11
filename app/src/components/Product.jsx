"use client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  const imgUrl = image && urlFor(image[0]).url();
  return (
    <div>
      <Link href={`/product/${slug?.current}`}>
        <div className="product-card">
          <Image
            src={imgUrl}
            alt={name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;

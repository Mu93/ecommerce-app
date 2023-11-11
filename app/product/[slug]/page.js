'use client'
import { client, urlFor } from '@/app/src/lib/client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai'
import { useParams } from 'next/navigation'
import { Product } from '@/app/src/components'
import { useStateContext } from '@/app/src/context/StateContext'

function ProductDetails() {
  const [slugProduct, setSlugProduct] = useState({})
  const [products, setProducts] = useState([])
  const [banners, setBanners] = useState([])
  const [index, setIndex] = useState(0)
  const { slug } = useParams()

  // console.log('slug', slug)
  // console.log('slugProduct', slugProduct)
  // console.log('products', products)
  // console.log('banners', banners)
  const { image, name, details, price } = slugProduct

  // =================================
  const { incQty, decQty, qty, addToCart } = useStateContext()

  // =================================

  useEffect(() => {
    const slugQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
    const productQuery = '*[_type == "product"]'
    const bannerQuery = '*[_type == "banner"]'

    const fetchData = async () => {
      try {
        const slug = await client.fetch(slugQuery)
        const products = await client.fetch(productQuery)
        const banners = await client.fetch(bannerQuery)
        setSlugProduct(slug)
        setProducts(products)
        setBanners(banners)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const imgUrl = image && urlFor(image[index]).url()

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              width={500}
              height={500}
              src={imgUrl}
              className="product-detail-image"
              alt="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
                alt="small-image"
                width={500}
                height={500}
                key={i}
                src={urlFor(item).url()}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div style={{ display: 'flex' }}>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <div className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addToCart(slugProduct, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

import { HeroBanner, FooterBanner, Product } from './src/components'
import { client } from './src/lib/client'

const Home = async () => {
  // =============== productQuery =============== //
  const productQuery = '*[_type == "product"]'

  const products = await client.fetch(productQuery)
  // console.log(products)

  // =============== bannerQuery =============== //
  const bannerQuery = '*[_type == "banner"]'

  const banners = await client.fetch(bannerQuery)
  console.log(banners)

  return (
    <>
      <HeroBanner heroBanner={banners.length && banners[0]} />

      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <div key={product?._id}>
            {console.log(product)}
            <Product product={product} />
          </div>
        ))}
      </div>

      <FooterBanner footerBanner={banners.length && banners[0]} />
    </>
  )
}

export default Home

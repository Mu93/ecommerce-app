import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  // projectId: process.env.SANITY_ID,
  projectId: 'xioh4f3v',
  dataset: 'production',
  apiVersion: '2022-03-29', // Replace with the latest API version
  useCdn: true, // Enable this for faster response times, but beware of potential caching issues during development
  // token: import.meta.env.VITE_SANITY_TOKEN,
  token: process.env.SANITY_TOKEN,
  // token:
  //   'skUMSIQAD6qKDkddKmkkChPH0MJZteaJKvlHYCjrtsBK6vLRM4RlLcpsIBXdDuXPRL8oON0GFYsjGIL194kzJUrm8KmXrVgxleP0U3TDgDbMGG1zJ1JRqAavvJufmZePEOZvWt1z7SCg1N7tn2HNayTxHNszGxCxEhy0Bjvv4BVw26YP60NO',
})
// console.log(process.env.SANITY_ID)
// console.log(process.env.SANITY_TOKEN)
const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

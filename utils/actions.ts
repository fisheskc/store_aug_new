// 'use server';

import db from '@/utils/db';
// if we cannot find any matching product, we want the user to be redirected to the homepage
import  { redirect } from 'next/navigation'


export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
        // We get the products where the featured flag is set to true
        featured:true
    }
   })
   return products
}

// We set up a function to fetch all of the prodcut
// We will set this as the default value, empty string
// If this is going to be undefined, we will have no products
// If there is no value, we want to provide all of the product
// We want to set up the type & we will use search
export const fetchAllProducts = ({ search = '' }: { search: string }) => {
    // We want to return the DB
    return db.product.findMany({
        where:{
        // We need to use the syntax of OR, since we want to search into places in the company property
        //  as well as the name. We set it equal to an array. We set up two objects, one for each property
        // name is going to be equal to contains, which is a special keyword
        // We provide the search
        // Make sure the mode is set to equal to insensitive
          OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
         // In this case, we want to set up the order
         // The newest product is going to be displayed first
         orderBy: {
            createdAt: 'desc'
         }
    })
   
}

export const fetchSingleProduct = async(productId:string) => {
    const product = await db.product.findUnique({
        // We have two options, we have the entire product or it is going to be null
        where: {
            id:productId
        }
    })
    // If there is no matching product, then we want to redirect the user
    if(!product) redirect('/products')
        return product
}
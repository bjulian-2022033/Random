'use strict'


import Product from '../product/product.model.js'
import mongoose from 'mongoose'

export const saveProduct = async(req, res) =>{
    try {
        let data = req.body

        let newproduct = new Product(data)
        await newproduct.save()

        return res.send({message: 'Product saved succesfully'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving Product', err})
        
    }
}

export const productUpdate = async(req, res) => {
    try {

        let { id } = req.params
        let data = req.body
        let updateProduct = await Product.findOneAndUpdate(
            
            { _id: id},
            data,
            { new: true}

            )
            if(!updateProduct) return res.status(401).send({message: 'Product not found and not updated'})
            return res.send({message: 'Update Product', updateProduct})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating product'})
        
    }
}

export const deleteP = async (req, res) =>{
    try {

        let { id } = req.params
        let deletedProduct = await Product.findOneAndDelete({ _id: id})
        if(!deletedProduct) return res.status(404).send({message: 'Product not found and not delete'})
        return res.send({message: 'Product delete successfully'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting Product'})
        
    }
}

export const getProducts = async(req, res) =>{
    try {

        let products = await Product.find().populate('category')
        return res.send({ products })
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting products'})
    }
}

export const searchProduct = async (req, res) =>{
    try {

        let { search } = req.body
        let products = await Product.find(
            { name: search}
        )
        if(products.length == 0) return res.status(404).send({message: 'Products not found'})
        return res.send({ message: 'products found', products})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching products'})
        
    }
}


//out of stock
export const outofStock = async(req, res) => {
    try {

        let data = await Product.findOne({ stock: 0}).populate('category')
        if(data){
            return res.send(data) 
        }
        return res.status(444).send({ message: 'No out stock products'})  
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'no out of stock products found'})
    }
}

//Productos mas vendidos
export const getTopSellingProducts = async (req, res) => {
    try {
      const allProducts = await Product.find().sort({ totalQuantitySold: -1 }).limit(10);
      return res.send(allProducts);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error retrieving top selling products', error: err });
    }
  }

  //Buscar productos por categoria
  export const getProductsByCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid category ID' });
      }
  
      const products = await Product.find({ category: id });
  
      res.send(products);
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      res.status(500).send({ message: 'Error retrieving products by category', error: error.message });
    }
  };
  
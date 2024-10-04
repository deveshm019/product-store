import Product from '../model/product.js';
import mongoose from 'mongoose';

export const getProducts = async (req,res)=>{
    try {
        const data = await Product.find({});
        res.status(200).json({success:true,message:"Data retrieval successfull!",products:data})
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({success: false, message: "Internal server error!"});
    }
}

export const createProduct = async (req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message: "Please fill in all fields!"})
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({success: false, message: "Internal server error!"});
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false,message:"Invalid product ID!"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,message:"Product updated successfully!",data:updatedProduct});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false,message:"Invalid product ID!"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted successfully!"})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error!"})
        console.log(`Error: ${error}`);
    }
}
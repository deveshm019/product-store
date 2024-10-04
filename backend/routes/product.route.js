import express from 'express';
import Product from '../model/product.js';
import mongoose from 'mongoose';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);

router.post("/",createProduct)

router.put("/:id",updateProduct)

router.delete("/:id", deleteProduct)

export default router;
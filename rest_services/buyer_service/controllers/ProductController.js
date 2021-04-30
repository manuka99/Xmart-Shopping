const Product = require("../model/Product");

exports.listProducts = async(req, res) => {
    try {
        let products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};

exports.findProduct = async(req, res) => {
    try {
        let product = await Product.findById(req.params.pid);
        if (product) return res.status(200).json(product);
        else return res.status(400).json({ message: "Product not found" });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};

exports.searchProducts = async(req, res) => {
    try {
        let products = await Product.find({
            $text: { $search: req.params.text },
        });
        if (products.length > 0) return res.status(200).json(products);
        else return res.status(400).json({ message: "Products not found" });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};

exports.storeProduct = async(req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            sku: req.body.sku,
            size: req.body.size,
            stock: req.body.stock,
        });
        const result = await newProduct.save();
        if (result && result.error) return res.status(400).json(result);
        else
            return res
                .status(200)
                .json({ message: "Product was saved successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};

exports.updateProduct = async(req, res) => {
    try {
        let product = await Product.findById(req.params.pid);
        if (product) {
            product.name = req.body.name;
            product.image = req.body.image;
            product.description = req.body.description;
            product.price = req.body.price;
            product.sku = req.body.sku;
            product.size = req.body.size;
            product.stock = req.body.stock;
            const result = await product.save();
            if (result && result.error) return res.status(400).json(result);
            else
                return res
                    .status(200)
                    .json({ message: "Product was updated successfully" });
        } else return res.status(400).json({ message: "Product not found" });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};

exports.deleteProduct = async(req, res) => {
    try {
        let result = await Product.findByIdAndDelete(req.params.pid);
        if (result && result.error) return res.status(400).json(result);
        else
            return res
                .status(200)
                .json({ message: "Product was deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};

exports.buyProduct = async(req, res) => {
    try {
        let result = await Product.findByIdAndDelete(req.params.pid);
        if (result && result.error) return res.status(400).json(result);
        else
            return res
                .status(200)
                .json({ message: "Product was deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};
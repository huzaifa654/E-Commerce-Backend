const Product = require("../models/ProductModel")
const add_product = async (req, res) => {
    try {
        const { vendor_id, store_id, name, price, discount, category_id, sub_cat_id } = req.body
        const arrImages = [];
        for (let i = 0; i < req.files.length; i++) {
            arrImages[i] = req.files[i].filename;

        }
        const product = await new Product({
            vendor_id: vendor_id,
            store_id, store_id,
            name: name,
            price: price,
            discount: discount,
            category_id: category_id,
            sub_cat_id: sub_cat_id,
            images: arrImages

        })

        const ProductData = await product.save();
        res.status(200).send({ success: true, msg: "Product Data", data: ProductData })

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

module.exports = {
    add_product
}
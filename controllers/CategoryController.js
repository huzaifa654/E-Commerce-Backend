const Category = require("../models/CategoryModel")
const Add_Category = async (req, res) => {
    try {
        const category = req.body.category
        const category_data = await Category.findOne({ category: category.toLowerCase() })
        if (category_data) {
            res.status(200).send({ success: false, msg: `Category of ${category.toLowerCase()} is already created`, })

        } else {
            const categoryData = await new Category({
                category: category.toLowerCase()
            });

            const catData = await categoryData.save()
            res.status(200).send({ success: true, msg: "Category Data", data: catData })
        }


    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })

    }
}


module.exports = ({
    Add_Category
})
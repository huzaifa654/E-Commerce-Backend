const SubCategorty = require("../models/SubCategoryModel")
const Category = require("../models/CategoryModel")

const create_subcategory = async (req, res) => {
    try {
        const catId = req.body.category_id
        const sub_category = req.body.sub_category
        const subCatId = req.body.category_id
        const CategoryData = await Category.findById({ _id: catId });
        if (CategoryData) {
            const SubCategortyData = await SubCategorty.findOne({ sub_category: sub_category.toLowerCase() })
            if (SubCategortyData) {
                res.status(200).send({ success: false, msg: `The SubCategory ${sub_category.toLowerCase()} is already created` })
            } else {
                const SubCategoryRes = await new SubCategorty({
                    category_id: subCatId,
                    sub_category: sub_category.toLowerCase()
                })
                const Response = await SubCategoryRes.save();
                res.status(400).send({ success: true, msg: "Sub Category Data", data: Response })
            }
        } else {
            res.status(400).send({ success: false, msg: "The Category is not found" })

        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}
module.exports = {
    create_subcategory
}
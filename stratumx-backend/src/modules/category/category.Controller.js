import * as categoryService from "./category.Service.js";

export const create = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { businessId, lang } = req.query;
    const categories = await categoryService.getCategories(
      Number(businessId),
      lang || "en"
    );
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(Number(req.params.id));
    res.json({ message: "Category soft deleted" });
  } catch (err) {
    next(err);
  }
};
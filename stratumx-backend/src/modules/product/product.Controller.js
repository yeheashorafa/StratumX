import * as productService from "./product.Service.js";

export const create = async (req, res, next) => {
  try {
    const data = { ...req.body };

    // Parse translations if sent as string via FormData
    if (typeof data.translations === "string") {
      try {
        data.translations = JSON.parse(data.translations);
      } catch (e) {
        console.error("Failed to parse translations array:", e);
      }
    }

    // Handle uploaded file
    if (req.file) {
      data.images = [
        {
          url: `/uploads/${req.file.filename}`,
          altText: data.name || "Product Image",
          isPrimary: true,
        },
      ];
    }

    // Convert stringified numbers
    if (data.businessId) data.businessId = Number(data.businessId);
    if (data.categoryId) data.categoryId = Number(data.categoryId);
    if (data.price) data.price = Number(data.price);
    if (data.stock) data.stock = Number(data.stock);

    const product = await productService.createProduct(data);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const result = await productService.getProducts({
      businessId: Number(req.query.businessId),
      lang: req.query.lang,
      categoryId: req.query.categoryId
        ? Number(req.query.categoryId)
        : undefined,
      search: req.query.search,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const product = await productService.getProductById(
      Number(req.params.id),
      req.query.lang,
    );
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = { ...req.body };

    // Parse translations if sent as string via FormData
    if (typeof data.translations === "string") {
      try {
        data.translations = JSON.parse(data.translations);
      } catch (e) {
        console.error("Failed to parse translations array:", e);
      }
    }

    // Handle uploaded file
    if (req.file) {
      data.images = [
        {
          url: `/uploads/${req.file.filename}`,
          altText: data.name || "Product Image",
          isPrimary: true,
        },
      ];
    }

    // Convert stringified numbers
    if (data.businessId) data.businessId = Number(data.businessId);
    if (data.categoryId) data.categoryId = Number(data.categoryId);
    if (data.price) data.price = Number(data.price);
    if (data.stock) data.stock = Number(data.stock);

    const product = await productService.updateProduct(
      Number(req.params.id),
      data,
    );
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await productService.deleteProduct(Number(req.params.id));
    res.json({ message: "Product soft deleted" });
  } catch (err) {
    next(err);
  }
};

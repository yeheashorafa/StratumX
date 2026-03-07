import * as pageService from "./page.Service.js";

export const create = async (req, res, next) => {
  try {
    const page = await pageService.createPage(req.body);
    res.status(201).json(page);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const businessId = Number(req.query.businessId) || req.user.businessId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await pageService.getPages(
      businessId,
      req.query.lang,
      true, // isAdmin
      page,
      limit,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const page = await pageService.updatePage(Number(req.params.id), req.body);
    res.json(page);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await pageService.deletePage(Number(req.params.id));
    res.json({ message: "Page soft deleted" });
  } catch (err) {
    next(err);
  }
};

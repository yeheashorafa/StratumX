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
    const pages = await pageService.getPages(
      Number(req.query.businessId),
      req.query.lang,
    );
    res.json(pages);
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

import * as serviceService from "./service.Service.js";

export const create = async (req, res, next) => {
  try {
    const data = { ...req.body, businessId: req.user.businessId };
    const service = await serviceService.createService(data);
    res.status(201).json({ message: "Service created successfully", service });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { businessId, lang, page, limit } = req.query;
    const bId = Number(businessId) || req.user.businessId;
    const language = lang || "en";
    const p = Number(page) || 1;
    const l = Number(limit) || 10;

    const result = await serviceService.getServices(
      bId,
      language,
      true, // isAdmin
      p,
      l,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const service = await serviceService.updateService(
      Number(req.params.id),
      req.body,
    );
    res.json(service);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await serviceService.deleteService(parseInt(req.params.id));
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    next(err);
  }
};

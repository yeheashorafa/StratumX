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
    const { businessId, lang } = req.query;
    if (!businessId || !lang) {
      return res
        .status(400)
        .json({ error: "businessId and lang are required" });
    }
    const services = await serviceService.getServices(
      parseInt(businessId),
      lang,
    );
    res.json(services);
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

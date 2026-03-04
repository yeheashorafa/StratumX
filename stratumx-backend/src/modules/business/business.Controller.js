// src/modules/business/business.Controller.js
import * as businessService from "./business.Service.js";

export const createBusinessController = async (req, res, next) => {
  try {
    const business = await businessService.createBusiness(req.body);
    res.status(201).json(business);
  } catch (error) {
    next(error);
  }
};

export const getBusinessesController = async (req, res, next) => {
  try {
    const businesses = await businessService.getBusinesses();
    res.json(businesses);
  } catch (error) {
    next(error);
  }
};

export const getBusinessByIdController = async (req, res, next) => {
  try {
    const business = await businessService.getBusinessById(req.params.id);
    res.json(business);
  } catch (error) {
    next(error);
  }
};

export const updateBusinessController = async (req, res, next) => {
  try {
    const business = await businessService.updateBusiness(req.params.id, req.body);
    res.json(business);
  } catch (error) {
    next(error);
  }
};

export const deleteBusinessController = async (req, res, next) => {
  try {
    await businessService.deleteBusiness(req.params.id);
    res.json({ message: "Business deleted successfully" });
  } catch (error) {
    next(error);
  }
};
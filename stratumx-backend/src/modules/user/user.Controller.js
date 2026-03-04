import * as userService from "./user.Service.js";

export const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req.user.businessId);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.json({ message: "User soft deleted successfully" });
  } catch (err) {
    next(err);
  }
};

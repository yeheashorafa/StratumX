import * as cartService from "./cart.Service.js";

export const getUserCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const item = await cartService.addToCart(
      req.user,
      Number(productId),
      Number(quantity)
    );
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const item = await cartService.updateCartItem(
      req.user,
      Number(req.params.itemId),
      Number(quantity)
    );
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    await cartService.removeCartItem(req.user, Number(req.params.itemId));
    res.json({ message: "Item removed" });
  } catch (err) {
    next(err);
  }
};
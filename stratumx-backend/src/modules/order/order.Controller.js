import * as orderService from "./order.Service.js";

export const checkout = async (req, res, next) => {
  try {
    const { items, businessId } = req.body;
    const order = await orderService.checkoutGuest(items, businessId);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders({
      businessId: Number(req.query.businessId) || req.user.businessId,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(Number(req.params.id));
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateOrderStatus(
      Number(req.params.id),
      req.body.status,
    );
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await orderService.deleteOrder(Number(req.params.id));
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};

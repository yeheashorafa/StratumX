import * as contactService from "./contact.Service.js";

export const create = async (req, res, next) => {
  try {
    const message = await contactService.createMessage(req.body);
    res
      .status(201)
      .json({ message: "Message sent successfully", data: message });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    // Only Admin of that business can see them
    const messages = await contactService.getMessages(req.user.businessId);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const updated = await contactService.markAsRead(parseInt(req.params.id));
    res.json({ message: "Message marked as read", data: updated });
  } catch (err) {
    next(err);
  }
};

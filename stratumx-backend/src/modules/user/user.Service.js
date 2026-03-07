import bcrypt from "bcrypt";
import prisma from "../../config/db.js";
import { generateToken } from "../../config/auth.js";

export const registerUser = async (data) => {
  const { name, email, password, businessId, roleId } = data;

  const existing = await prisma.user.findFirst({
    where: { email, businessId },
  });

  if (existing) {
    throw new Error("Email already exists in this business");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Find the CUSTOMER role for this business if no roleId provided
  let resolvedRoleId = roleId;
  if (!resolvedRoleId) {
    const customerRole = await prisma.role.findFirst({
      where: { name: "CUSTOMER", businessId },
    });
    if (!customerRole) throw new Error("Default CUSTOMER role not found");
    resolvedRoleId = customerRole.id;
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      businessId,
      roleId: resolvedRoleId,
    },
    include: { role: true },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.name,
  };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findFirst({
    where: { email },
    include: { role: true },
  });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!user.isActive) throw new Error("Account is inactive");

  const token = generateToken({
    userId: user.id,
    businessId: user.businessId,
    role: user.role?.name,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role?.name,
      businessId: user.businessId,
    },
  };
};

export const getAllUsers = async (businessId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const where = { businessId, isActive: true };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: { select: { name: true } },
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: { select: { name: true } },
    },
  });
};

export const deleteUser = async (id) => {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
};

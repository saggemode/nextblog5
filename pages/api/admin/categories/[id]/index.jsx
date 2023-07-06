import { getSession } from "next-auth/react";
import Category from "../../../../../models/Category";
import db from "../../../../../lib/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("signin required");
  }

  const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res, user);
  } else if (req.method === "PUT") {
    return putHandler(req, res, user);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const category = await Category.findById(req.query.id);
  await db.disconnect();
  res.send(category);
};

const putHandler = async (req, res) => {
  await db.connect();
  const category = await Category.findById(req.query.id);
  if (category) {
    category.name = req.body.name;
    category.slug = req.body.slug;

    await category.save();
    await db.disconnect();
    res.send({ message: "Post updated successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Post not found" });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const category = await Category.findById(req.query.id);
  if (category) {
    await category.remove();
    await db.disconnect();
    res.send({ message: "Category Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Category Not Found" });
  }
};
export default handler;

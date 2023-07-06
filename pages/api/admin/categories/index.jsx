import { getSession } from "next-auth/react";
import Category from "../../../../models/Category";
import db from "../../../../lib/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required");
  }
  // const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res);
  }
  if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const categories = await Category.find({});
  await db.disconnect();
  res.send(categories);
};

const postHandler = async (req, res) => {
  await db.connect();
  const product = await new Category(req.body);
  try {
    await product.save();
    await db.disconnect();
    res.send({ message: "Category creation successfully" });
  } catch (error) {
    await db.disconnect();
    res.status(500).send({ message: "Category creation Failed" });
  }
};
export default handler;

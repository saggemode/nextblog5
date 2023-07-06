import { getSession } from "next-auth/react";
import slugify from "slugify";
import Category from "../../../models/Category";
import db from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }

  const { name} = req.body;
  if (!name ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();


  const slug = slugify(req.body.name, { remove: /[*+~.()'"!:@]/g });
    const existingSlug = await Category.findOne({ slug: slug });
  if (existingSlug) {
    res.status(422).json({ message: "Slug exists already!" });
    await db.disconnect();
    return;
  }

  const newCategory = new Category({
    name,
    slug:slug.toLocaleLowerCase(),

  });

  const post = await newCategory.save();
  await db.disconnect();
  res.status(201).send({
    message: "Created Category!",
    name: post.name,
    slug: post.slug,

  });
}

export default handler;

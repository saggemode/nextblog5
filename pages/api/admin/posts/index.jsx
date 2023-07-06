import { getSession } from "next-auth/react";
import Product from "../../../../models/Post";
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
  const products = await Product.find({})
    .populate("author", "_id name email, image")
    .select(
      "_id title slug  category taglists author createdAt updatedAt"
    )
    .exec((error, products) => {
      if (error) {
        return res.json({ error });
      }
      res.json(products);
    });
  await db.disconnect();
  res.send(products);
};

// const postHandler = async (req, res) => {
//   await db.connect();
//   const product = await new Product(req.body);
//   try {
//     product.title = req.body.title;
//     product.slug = req.body.slug;
//     product.image = req.body.image;
//     let allTheListOfCategories =
//       product.category && product.category.split(",");
//     let allTheListOfTags = product.taglists && product.taglists.split(",");
//     product.description = req.body.description;
//     await product.save((error, result) => {
//       res.send({ message: "Post creation successfully" });
//       if (error) {
//         return res.status(400).json({ error });
//       }
//       db.disconnect();

//       product
//         .findByIdAndUpdate(
//           result._id,
//           { $push: { category: allTheListOfCategories } },
//           { new: true }
//         )
//         .exec((error, result) => {
//           if (error) {
//             return res.status(400).json({ error });
//           } else {
//             product
//               .findByIdAndUpdate(
//                 result._id,
//                 { $push: { taglists: allTheListOfTags } },
//                 { new: true }
//               )
//               .exec((error, result) => {
//                 if (error) {
//                   return res.status(400).json({ error });
//                 } else {
//                   res.json(result);
//                 }
//               });
//           }
//         });
//     });

//     await db.disconnect();
//   } catch (error) {
//     await db.disconnect();
//     res.status(500).send({ message: "Post creation Failed" });
//   }
// };

const postHandler = async (req, res) => {
  await db.connect();
  const product = await new Product(req.body);
  try {
    product.title = req.body.title;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.image = req.body.image;
    product.description = req.body.description;
    await product.save();

    await db.disconnect();
    res.send({ message: "Post creation successfully" });
  } catch (error) {
    await db.disconnect();
    res.status(500).send({ message: "Post creation Failed" });
  }
};
export default handler;

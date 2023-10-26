const db = require("../db/db");

exports.storeProducts = async (req, res) => {
  try {
    const products = req.body.products;
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: "Invalid request. Please provide an array of products." });
    }

    const insertQuery = "INSERT INTO products (name, price, availability) VALUES ?";
    const values = products.map((product) => [
      product.name,
      product.price,
      product.availability,
    ]);

    // db.query(insertQuery, [values], (err, result) => {
    //   if (err) {
    //     console.error("Error executing query: ", err);
    //     res.status(500).send({ message: "Internal Server Error.", error: err });
    //   } else {
    //     res.json({ message: "Products stored successfully." });
    //   }
    // });
    res.status(200).json({message: "Stored successfully"});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error.", error: error });
  }
};

exports.listProducts = async (req, res) => {
  try {
    // db.query("SELECT * FROM products", (err, results) => {
    //   if (err) {
    //     console.error("Error executing query: ", err);
    //     res.status(500).send({ message: "Internal Server Error.", error: err });
    //   } else {
    //     const transformedResults = results.map((product) => ({
    //       name: product.name,
    //       price: product.price,
    //       availability: product.availability === 1 ? true : false,
    //     }));
    //     res.json({ products: transformedResults });
    //   }
    // });

    res.status(200).json({message: "fetched successfully"});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error.", error: error });
  }
};

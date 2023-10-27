const db = require("../db/db");

const postOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: ""
};

exports.storeProducts = async (req, res) => {
  try {
    const products = req.body.products;
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: "Invalid request. Please provide an array of products." });
    }

    console.log("trying to insert values into the database");
    const insertQuery = "INSERT INTO products (name, price, availability) VALUES ?";
    const values = products.map((product) => [
      product.name,
      product.price,
      product.availability,
    ]);

    db.query(insertQuery, [values], (err, result) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).send({ message: "Internal Server Error.", error: err });
      } else {
        res.json({ message: "Products stored successfully." });
      }
    });
    //res.status(200).json({message: "Stored successfully"});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error.", error: error });
  }
};

exports.listProducts = async (req, res) => {
  try {
    let transformedResults;
    const response = await fetch('http://3.87.235.144:6000/list-products');
    const data = response.json();

    if (response.status === 200) {
      console.log("You are getting the following response from the cache");
      res.status(200).json({ products: data });
    }
    else if (response.status === 204) {
      db.query("SELECT * FROM products", (err, results) => {
        if (err) {
          console.error("Error executing query: ", err);
          res.status(500).send({ message: "Internal Server Error.", error: err });
        } else {
            transformedResults = results.map((product) => ({
            name: product.name,
            price: product.price,
            availability: product.availability === 1 ? true : false,
          }));
          
        }
      });

      postOptions.body = JSON.stringify(transformedResults);
      const out = await fetch('http://3.87.235.144:6000/store-products', postOptions);
      const res = out.json();
      res.json({ products: transformedResults});    
    }

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error.", error: error });
  }
};

const redis = require("redis");

exports.storeProducts = async (req, res) => {
  try {
    console.log("Inside the cache ec-2 trying to create client for storing products");
    const redisClient = redis.createClient();
    const output = req.body;
    console.log(output);

    await redisClient.connect();


    console.log("trying to store the values to the cache");

    await redisClient.set('products', JSON.stringify(output));
    
    await redisClient.disconnect();
    return res.status(200).json(true);
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error: error });
  }
};

exports.listProducts = async (req, res) => {
  try {

    console.log("Inside the cache ec-2 trying to create client for listing the products");

    const key = 'products';
    const redisClient = redis.createClient();

    await redisClient.connect();

    console.log("trying to fetch the values from the cache or database");
    const value = await redisClient.get(key);
    console.log(value);

    if (value === null) {
      res.status(204).json(false);
    } else {
      res.status(200).json({ products: JSON.parse(value), cache: true });
    }

    await redisClient.disconnect();
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error: error });
  }
};

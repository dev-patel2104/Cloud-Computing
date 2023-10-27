const redis = require("redis");

exports.storeProducts = async (req, res) => {
  try {
    console.log("Inside the cache ec-2 trying to create client for storing products");
    const redisClient = redis.createClient();
    const transformedResults = req.body;
    console.log(transformedResults);
    // Handle Redis connection errors

    // redisClient.on("error", (err) => {
    //   console.error("Redis Error: " + err);
    // });

    await redisClient.connect();


    console.log("trying to store the values to the cache");

    // Check if data is available in the Redis cache
    await redisClient.set(key, JSON.stringify(transformedResults));
    // redisClient.set(key, req.body.products, (err, reply) => {
    //     if (err) {
    //         return res.status(400).json(err);
    //     } else {
    //         return res.status(200).json(true);
    //     }
    // });
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

    // Handle Redis connection errors
    // redisClient.on("error", (err) => {
    //   console.error("Redis Error: " + err);
    // });
    await redisClient.connect();

    console.log("trying to fetch the values from the cache or database");
    const value = await redisClient.get(key);
    console.log(value);

    if (value === null) {
      res.status(200).json(false);
    } else {
      res.status(200).json({ products: JSON.parse(value), cache: true });
    }

    await redisClient.disconnect();
    

    // Check if data is available in the Redis cache
    // redisClient.get("products", async (redisErr, redisData) => {
    //   if (redisErr) {
    //     console.error("Redis Error: " + redisErr);
    //   }

    //   if (redisData) {
    //     // Data found in Redis cache, parse and send it
    //     const transformedResults = JSON.parse(redisData);
    //     res.status(200).json({ products: transformedResults });
    //   } else {

    //     res.status(204).json({ message: "No data in cache" });
    //   }
    // });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error: error });
  }
};

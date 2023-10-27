const redis = require("redis");

exports.storeProducts = async (req, res) => {
  try {
    console.log("Inside the cache ec-2 trying to create client for storing products");
    const redisClient = redis.createClient();
    const transformedResults = req.body;
    // Handle Redis connection errors
    
    redisClient.on("error", (err) => {
      console.error("Redis Error: " + err);
    });
    
    
    console.log("trying to store the values to the cache");

    // Check if data is available in the Redis cache
    redisClient.set("products", JSON.stringify(transformedResults), (redisErr, result) => {
      if (redisErr) {
        console.error("Error storing data in Redis: " + redisErr);
        res.status(500).json({ message: "Error storing data in Redis.", error: redisErr });
      } else {
        console.log("Data stored in Redis successfully");
        res.status(200).json({ message: "Data stored in Redis successfully" });
      }
    });
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error: error });
  }
};

exports.listProducts = async (req, res) => {
  try {

    console.log("Inside the cache ec-2 trying to create client for listing the products");

    const redisClient = redis.createClient();

    // Handle Redis connection errors
    redisClient.on("error", (err) => {
      console.error("Redis Error: " + err);
    });
    console.log("trying to fetch the values from the cache or database");

    // Check if data is available in the Redis cache
    redisClient.get("products", async (redisErr, redisData) => {
      if (redisErr) {
        console.error("Redis Error: " + redisErr);
      }

      if (redisData) {
        // Data found in Redis cache, parse and send it
        const transformedResults = JSON.parse(redisData);
        res.status(200).json({ products: transformedResults });
      } else {

        res.status(204).json({message : "No data in cache"});
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error: error });
  }
};

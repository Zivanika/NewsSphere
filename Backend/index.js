const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require('dotenv').config();

const apiKey = process.env.API_KEY;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/news", async (req, res) => {
  try {
    const { country, category, query, page, pageSize } = req.body;
    if (query) {
      var url = `https://newsapi.org/v2/everything?q=${query+" "}&sortBy=popularity&language=en&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    }
    else{
      var url = `https://newsapi.org/v2/top-headlines?&country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    }
    let response = await fetch(url);
    let data = await response.json();
    //   console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

app.listen(port, () => {
  console.log(`[+] Listening on port number: ${port}`);
});
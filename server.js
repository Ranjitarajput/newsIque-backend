const express = require("express")
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get("/", async (req,res) => {
    const {page = 1, pagesize = 10, category="general", searchQuery = "" } = req.query;
    const query = searchQuery ? `&q=${searchQuery}` : "";
    console.log(NEWS_API_KEY);

    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us${query}&category=${category}&page=${page}&pageSize=${pagesize}&apiKey=${NEWS_API_KEY}`);
        res.json(response.data);
        console.log(response.data);
    } catch (err) {
        res.status(500).json({error: "Error in fetching data"});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`)
});


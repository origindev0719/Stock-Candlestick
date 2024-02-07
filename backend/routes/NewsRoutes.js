import express from "express";
import asyncHandler from "express-async-handler";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const newsRouter = express.Router();

const SPORT_NEWS_API_ENDPOINT = 'https://news67.p.rapidapi.com/v2';
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Delay function
const delay = ms => new Promise(res => setTimeout(res, ms));

// Function to fetch news
const fetchNewsWithRetry = async (topic, batchSize = 3, retries = 3, retryDelay = 1000) => {
  try {
    const response = await axios.get(`${SPORT_NEWS_API_ENDPOINT}/topic-search`, {
      params: {
        languages: 'EN',
        search: topic,
        batchSize,
      },
      headers: {
        'X-RapidAPI-Key': NEWS_API_KEY,
        'X-RapidAPI-Host': 'news67.p.rapidapi.com'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.log(`Rate limit exceeded. Retrying in ${retryDelay}ms...`);
      await delay(retryDelay);
      return fetchNewsWithRetry(topic, batchSize, retries - 1, retryDelay);
    } else {
      throw error; // rethrow the error if not a rate limit issue or retries exhausted
    }
  }
};

// GET LATEST NEWS
newsRouter.get("/latest-news", asyncHandler(async (req, res) => {
  try {
    const topics = ['NBA basketball', 'American football', 'baseball', 'UFC fights'];
    const combinedNews = [];

    for (const topic of topics) {
      const news = await fetchNewsWithRetry(topic);
      combinedNews.push(...news.news);
      await delay(1000); // wait for 1 second
    }

    res.json({news: combinedNews});
  } catch (error) {
    console.error('Error fetching latest news:', error);
    res.status(500).send('Error fetching latest news');
  }
}));

// GET CRYPTO NEWS
newsRouter.get("/crypto-news", asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(`${SPORT_NEWS_API_ENDPOINT}/crypto`, {
      params: {
        languages: 'EN',
        sortOrder: 'latest',
        batchSize: 10,
      },
      headers: {
        'X-RapidAPI-Key': NEWS_API_KEY,
        'X-RapidAPI-Host': 'news67.p.rapidapi.com'
      }
    });

    const news = response.data; 
    res.json(news);
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    res.status(500).send('Error fetching crypto news');
  }
}));

// GET STOCKS NEWS
newsRouter.get("/stocks-news", asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(`${SPORT_NEWS_API_ENDPOINT}/feed`, {
      params: {
        languages: 'EN',
        categoryCode: 'medtop:20000186',
        sortOrder: 'latest',
        batchSize: 10,
      },
      headers: {
        'X-RapidAPI-Key': NEWS_API_KEY,
        'X-RapidAPI-Host': 'news67.p.rapidapi.com'
      }
    });

    const news = response.data;
    res.json(news);
  } catch (error) {
    console.error('Error fetching stock news:', error);
    res.status(500).send('Error fetching stock news');
  }
}));

// SEARCH
newsRouter.get("/search", asyncHandler(async (req, res) => {
  try {
    const topic = req.query.topic;
    
    const response = await axios.get(`${SPORT_NEWS_API_ENDPOINT}/topic-search`, {
      params: {
        languages: 'EN',
        search: topic,
        batchSize: 3,
      },
      headers: {
        'X-RapidAPI-Key': NEWS_API_KEY,
        'X-RapidAPI-Host': 'news67.p.rapidapi.com'
      }
    });

    const news = response.data;
    res.json(news);
  } catch (error) {
    console.error('Error fetching stock news:', error);
    res.status(500).send('Error fetching stock news');
  }
}));

export default newsRouter;

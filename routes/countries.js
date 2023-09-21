const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Secret Key for JWT verification
const SECRET_KEY = 'mysecretkey';
let JWT_TOKEN=null;
// Middleware for authentication
router.use((req, res, next) => {
  const token = req.header('Authorization');
 
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  // Extract the actual token from the "Bearer <token>" format
  const extractedToken = token.split(' ')[1];
  JWT_TOKEN = extractedToken;

  try {
    jwt.verify(extractedToken, SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Fetch detailed information about a country, if more than one countries have matching names it will return all
router.get('/details/:countryName', async (req, res) => {
  try {
    const { countryName } = req.params;
    const response = await axios.get(`https://restcountries.com/v3/name/${countryName}`,{
    headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
  });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch country details' });
  }
});
// Fetch detailed information about a specific country, provide full country name
router.get('/details/specific/:countryName', async (req, res) => {
    try {
      const { countryName } = req.params;
      const response = await axios.get(`https://restcountries.com/v3/name/${countryName}?fullText=true`,{
      headers: {
          'Authorization': `Bearer ${JWT_TOKEN}`
        }
    });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch country details' });
    }
});

// Fetch a list of all countries based on filters and sorting
router.get('/list', async (req, res) => {
    try {
      const { population, area, language, sort, page = 1, limit = 10 } = req.query;
      const response = await axios.get('https://restcountries.com/v3/all',{
        headers: {
            'Authorization': `Bearer ${JWT_TOKEN}`
          }
      });
      let countries = response.data;
  
      // Filter by population
      if (population) {
        countries = countries.filter(country => country.population >= population);
      }
  
      // Filter by area
      if (area) {
        countries = countries.filter(country => country.area >= area);
      }
  
      // Filter by language
      if (language) {
        countries = countries.filter(country => country.languages.includes(language));
      }
  
      // Sort (asc or desc)
      if (sort) {
        countries.sort((a, b) => {
          if (sort === 'asc') {
            return a.name.localeCompare(b.name);
          } else if (sort === 'desc') {
            return b.name.localeCompare(a.name);
          }
        });
      }
  
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedCountries = countries.slice(startIndex, endIndex);
  
      res.json({
        total: countries.length,
        page,
        limit,
        countries: paginatedCountries,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch countries list' });
    }
  });  

module.exports = router;

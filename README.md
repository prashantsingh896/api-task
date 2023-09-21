Running the Application

    fork the repo. 
    In your local IDE, git clone <url> to clone the repo.
    Ensure node is installed locally.
    run 'npm ci' command.
    run 'node app.js'

You can then use Postman or other tools to test the endpoints:

    Generate Auth Token: POST http://localhost:3000/api/auth/token
        Add the generated auth token to your subsequent request headers as Bearer token
    
    Fetch Country Details: GET http://localhost:3000/api/countries/details/:countryName
    
    Fetch Specific Country Details using Full Name: GET http://localhost:3000/api/countries/details/specific/:countryName
    
    List of Countries: GET http://localhost:3000/api/countries/list
        You can also filter using fields population, area, language, sort, page (page number), limit (page limit). Pass them as query params in URL.

Testing Using CURL:

    1. Generate Auth token : 
        curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "password"}' http://localhost:3000/api/auth/token

    2. Fetch details about a country:
        curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk1Mjk4MTE1LCJleHAiOjE2OTUzMDE3MTV9.4LSVB6hkNF9Qy9CmGycTRekehy2gkOdCzs0nPcCxJ5A" http://localhost:3000/api/countries/details/USA

    3. Fetch details about a specific country specifying full name
        curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk1Mjk4MTE1LCJleHAiOjE2OTUzMDE3MTV9.4LSVB6hkNF9Qy9CmGycTRekehy2gkOdCzs0nPcCxJ5A" http://localhost:3000/api/countries/details/specific/USA

    4. List of Countries with filters
        curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk1Mjk4MTE1LCJleHAiOjE2OTUzMDE3MTV9.4LSVB6hkNF9Qy9CmGycTRekehy2gkOdCzs0nPcCxJ5A" "http://localhost:3000/api/countries/list?population=1000000"


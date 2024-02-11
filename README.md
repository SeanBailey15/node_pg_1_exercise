# Node Postgres Exercise Part 1  

## Description  

In this exercise, students are tasked with creating a RESTful API utilizing Express.js and PostgreSQL, with which the routes and endpoints will perform database CRUD operations.  

## Getting Started  

At the time of publication, I can only provide instructions for installation using the Bash command line. I recommend using ```WSL2``` if you are on a Windows machine. I will not go into setting up WSL2 on your machine in these instructions. These instructions also assume the user has previously installed ```Node.js``` and ```npm``` on their machine, and has a basic understanding of how to use them.

***Fair warning: I am a novice developer.*** These instructions are provided to the best of **MY** knowledge. Google, Stack Overflow, Reddit and MDN Documentation have been essential for troubleshooting throughout my educational journey.  

### From within the Bash terminal:

1. Install PostgreSQL:  
   
   ```$ sudo apt install postgresql```

2. Create the database:  
   
   ```$ createdb biztime```

3. Navigate to your chosen directory and clone the repository there with the following command:  
   
   ```$ git clone https://github.com/SeanBailey15/node_pg_1_exercise.git```

4. ***(Optional but recommended)*** Install nodemon globally to automatically restart the application when file changes are detected (similar to the Live Server extension in VSCode). Global installation makes nodemon available to all of your apps, regardless of which directory they are in:  
   
   ```$ npm install -g nodemon```  

5. Navigate into the app directory:  
   
   ```$ cd node_pg_1_exercise```  

6. Install app requirements:  
   
   ```$ npm install```  

7. Populate the database with the ```data.sql``` file:  
   
    ```$ psql < data.sql```  

8. Run the app:  
   
   ```$ PGPASSWORD=<your_postgresql_password> nodemon server.js```

   **Do not include the '<' or '>' characters*  

   **You may not need the password argument depending on how you've configured PostgreSQL.  
   In this case run this command:*  

   ```$ nodemon server.js```  

9. The app is configured to run on Port 3000.

## Endpoints (Using the API) 

In order to try out the API, use an API client such as [Insomnia](https://insomnia.rest/)

There are two main endpoints in the current version of this app:  
- /companies  
- /invoices  

Depending on which type of HTTP verb is used to request the endpoint, the app will perform the appropriate CRUD operation on the database tables. The HTTP verbs and routes/endpoints are as follows:   

### /companies
---

- GET http://localhost:3000/companies  

  - This endpoint will retrieve a list of all companies in the database.  
  
  - Displays the company code, company name, and company description. 
  
- GET http://localhost:3000/companies/ ```<company_code>```  
  
  - This endpoint will retrieve information about a specified company in the database.  
  
- POST http://localhost:3000/companies  
  
  - Will create a new company entry in the database (*with proper input data).  
  
  - Accepts a company code, a company name, and a company description.
  
  - Requires a JSON formatted request body. ex:  
  ``` json  
  // POST request to endpoint: http://localhost:3000/companies
  { 
    "code": "tesla", 
    "name": "Tesla Motors", 
    "description": "Electric vehicle manufacturer"
    }  
    ```  

- PUT http://localhost:3000/companies/ ```<company_code>```  
  
  - Will update an existing company entry in the database (*with proper input data).  

  - Accepts a company name and a company description.  
  
  - Requires a JSON formatted request body. ex:  
  ``` json  
  // PUT request to endpoint: http://localhost:3000/companies/tesla
  { 
    "name": "Tesla Motors", 
    "description": "Elon roolz"
    }  
    ```  

- DELETE http://localhost:3000/companies/ ```<company_code>```  

  - Will delete the database entry for the specified company.  
  
### /invoices
---

- GET http://localhost:3000/invoices  

  - This endpoint will retrieve a list of all invoices in the database.  
  
  - Displays the invoice id, company code associated with the invoice, the invoice amount, whether or not the invoice has been paid(true or false), the date the invoice was added to the database, and the date the invoice was paid. 
  
- GET http://localhost:3000/invoices/ ```<id>```  
  
  - This endpoint will retrieve information about a specified invoice in the database.  
  
  - Accepts an invoice id number.
  
- POST http://localhost:3000/invoices  
  
  - Will create a new invoice entry in the database (*with proper input data).  
  
  - Accepts a company code and an amount.
  
  - Requires a JSON formatted request body. ex:  
  ``` json  
  // POST request to endpoint: http://localhost:3000/invoices
  { 
    "comp_code": "tesla", 
    "amt": 500
    }  
    ```  

- PUT http://localhost:3000/invoices/ ```<id>```  
  
  - Will update an existing entry in the database (*with proper input data).  

  - Accepts an amount.  
  **Currently the exercise only requires functionality to update the amount of an invoice.*  
  
  - Requires a JSON formatted request body. ex:  
  ``` json  
  // PUT request to endpoint: http://localhost:3000/invoices/1
  { 
    "amt": 1000
    }  
    ```  

- DELETE http://localhost:3000/invoices/ ```<id>```  

  - Will delete the database entry for the specified invoice.  

## Thank you for checking out my project!  
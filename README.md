# **FANKLE SERVER**
### *A Node.js server for Fankle url shortener.*
### Built in Node.js version 12.13.0

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

## **INSTALLING THE DEPENDENCIES**

`npm install`

## **OTHER REQUIREMENTS**
### Create a `.env` file and add the url for your MongoDB instance. This project uses MongoDB Atlas.

`url=<url-for-the-database>`

## **APIs**

- GET `/r`<br> Return the following json object: <br> `{
        success: true,
        message: "Welcome to Fankle!"
    }`

- GET `/r/:id`<br> Redirects the user to the actual website corresponding to the parameter `id`

- POST `/r/url` <br> Generates a short url for the correspondin base url.<br>
Request body must have a `url` key and may have an optional `slug` key.<br>
Returns the following object: <br> `{
    success:true, url: <base_url>, 
    slug: <slug>
}`<br>
Redirection url can be generated as \`${server-url}/r/${slug}\`

## **ERROR**
Incase of an error, the following object is returned: <br>
`{
    success: false,
    message: <error-message>,
    stack: <env-dependent-stack>
}`



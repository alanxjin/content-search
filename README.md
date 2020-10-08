## Folder Structure

```
/acme_search
    ...server files
    /data
    /clients
        /src
            index.js
            /components
        /public
            index.html
        /build (only appear after run build)
            index.html
```

## Run the app

Under folder `acme_search`, run below commands.

1. `npm install` : install the packages required by the server
2. `npm run install_client`: install the packages required the client app
3. `npm run build`: build the client codes. Build will be put in the folder `acme_search/clients/build`
4. `npm start`: serve the webpage and run the backend api/websocket.
5. Check `localhost:5000` in a browser.

## Product design

### Frontend

- Search. A search bar with a button, where the user can input the search keyword.
- Tabs. Each tab contains the search results for each category.
- Create-new-contact button: Open a form for creating new contact. This is for testing "Dynamically update results as new data becomes available".

### Backend

- I set up a simple backend server to serve the webpage.
  It also serves the data by using below apis:
  1. A Get endpoint `/api/search?`. This accept a `keyword` as the parameter, and return the filtered data.
     _Note: this api is not used in current implemtation. I use websocket instead._
  2. A Post endpoint `/api/contacts`. This accept a contact object `{name:"", company:"", emails:"", phones:"", matching_terms:""}`, and create a new contact.
  3. Websocket connection: websocket is implemented with `socket.io` library.
     I keep a hashmap store all current active clients with their search keyword. Everytime a new contact is added, it pushs the new filtered data to every client.
- Note:
  1. I keep all data in the memory, which should be in database (which I guess is not allowed for this project) normally. So the data will be reset whenever the server is restarted.
  2. Filter: for every item in each category, I check if there is any matching term that starts with the search keyword.

## Advanced feature

I added "Dynamically update results as new data becomes available".
This is achieved by websocket as described in previous section.

To test it, you can:

1. Open two pages and both run the webapp.
2. Do a search with some keyword on one page.
3. On the other page, create an new contact with the keyword you put in step 2 in the matching terms.
4. Go back to the first page, and you will see the new contact is showing in the result.

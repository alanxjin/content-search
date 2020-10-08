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
3. `npm run build`: build the client codes, which will be put in the folder `acme_search/clients/build`
4. `npm start`: serve the webpage and run the backend api/websocket.
5. Go to `localhost:5000`.

## Product design

### Frontend

- Search. A search bar with a button, where the user can input there search keyword.
- Tabs. Each tab contains the search results for different categories.
- Create-new-contact button: Open a form for creating new contact. This is for testing "Dynamically update results as new data becomes available".

### Backend

- I set up a simple backend server to serve the webpage.
  It also serves the data by using below apis:
  1. A Get endpoint `/api/search?`. This accept a `keyword` as the parameter, and return the filtered data.
     _Note: this api is not used in current implemtation. we use websocket instead._
  2. A Post endpoint `/api/contacts`. This accept a contact object {name:"", company:"", emails:"", phones:"", matching_terms:""}, and create a new contact.
  3. Websocket connection: websocket is implemented with `socket.io` library.
     I keep a hashmap store to all current active clients with its search keyword. Everytime a new contact is added, push the new filtered data to every client.
- Note:
  1. I keep all data into the memory, which should be in database (which I guess is not allowed for this project) normally. So the data will be reset whenever the server is restarted.
  2. Filter: for every item in each category, I check if there is any matching term are start with the search keyword.

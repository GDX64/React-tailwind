# Super Contacts List

This application is a contact managing helper. You can use it to add, update and delete contacts.
The information will be saved locally in your browser and is going to persist across sessions

You can change the name, email, phone, age and photo of your contacts.

## Finding your contacts

You can navigate throught the pages using the arrows, or search with the search bar. The search bar is going to query for name, phone and email in this order. So if your search matches a contact name, and a contact email, it is going to rank the one that matched the name first.


## Technologies used

I used pure React and Tailwind to build the UI. The tests are made with jest, and the data is saved to the indexedDB with Dexie.

## State managment

The state is managed by a reducer in the store file. Each state update is saved to the indexedDB, but will only be read before initializing the app. All the state updates are sync. But we could use something like a thunk and redux to manage the store, if we needed to make async calls to some API before updating in some situations.

## Deployment

This app is deployed to heroku after a push to the master branch and the jest tests run by the github actions.
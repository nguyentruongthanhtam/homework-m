# homework-metacore


Here is the link to the deployed site
https://homework-metacore.vercel.app/


## Stack

- I used Vue 3.0 + Vite for this project
- Test is done in Cypress (with note down below)
- Extra libraries used:
    - vue-datepicker (https://vue3datepicker.com/)
    - vuelidate (https://vuelidate-next.netlify.app/)

## Features

- Splash screen 😊
- Board and panel as in the game
- Add new item modal
- Edit properties in modal
- Edit modal has only 1 basic validation rule
- Chain id indication modal (ℹ️ button)
- Move items between cell (drag and drop for web browser - not on mobile devices)
- Delete an item button
- Indication (tooltip) for hidden and in bubble items
- Item level indicated in the panel
- When an item type is unknown, a 'not-found' image will show instead of an image
- A simple store for centralize data flow. Avoid prop drilling issue
- Responsive with 2 breakpoints
  
## Notes during development
- Tried to replicate the look and feel of the game
- Button styles are inspired by the game as well
- Asset images are AI generated with some exceptions which are gotten from the wiki
for example the Seedling Kit : https://merge-mansion.fandom.com/wiki/Seedling_Kit
- No restriction on the hidden and in-bubble items so they are free to move
- The chain indication modal is inspired by the one in the game
    - The modal will show all the items are in the same chain based on the json file
    - The selected cell will be highlighted in the path initially but others can be selected too
    - Only the level of the item is indicated, no other info
    - the logic is: I search throughout the json to get the max level and existing items which belong to the same chain id. Then, plot them in the modal. Those empty cells are items which are not discovered yet.
    - In Edit form
    - Used extra lib to handle the date types (CreatedAt, PausedUntil)
    - Used extra lib to do validation but just simply for 3 required fields Item Level, Item Type, Chain Id. I think those are important when you create a new item.
- Similarly, when adding new item to the board, only these fields are populated Item Level, Item Type, Chain Id, Visibility
- I didn't get too much into Testing since Cypress test got some compatibility issues with vite 5.0 (https://github.com/cypress-io/cypress/issues/28347)
## What could be implement/improve in the future
- When an item can be both hidden and in bubble, this need a custom validation
- Validating other fields of the edit form accordingly
- Handle touch on mobile devices
- The chain indication modal: could add more info when select others than the current cell
- Improve the store: create more get method
- Simplify some store reference in the code
- Could implement a confirmation when delete an item
- Can add more animation when swaping the cell or some pulsing effect like in the game

init.js
=======
- inits app.js
- fetches the user object

- if (user): it kicks off model.story.js
- else: it goes to login.

app.js
======
- creates and stores the main UI objects (user, router, story, state, controlPanel, storyPanel).
- waits for: 
	- a change in state (kicks off the panels)
	- a change in block (kicks off loading and displaying that block)

model.story.js
==============
- fetches the story
- kicks off routing

router.js
=========
- uses the URL to run specific piece of code
- dumps content into #main div.
# League of Ninjas - A League of Legends fan site [![Build Status](https://travis-ci.org/Team-Genji/League-Of-Ninjas.svg?branch=master)](https://travis-ci.org/Team-Genji/League-Of-Ninjas)
<img src="http://ih0.redbubble.net/image.169628516.9422/sticker,375x360.u1.png" width="300px"/>
## A project by Team Genji
The **LoN** project is a website which provides you with a lot of data about all League of Legends players and championships. It has a neat forum system where you can discuss about various topics. We also have a very cool live web chat, where you can chat with your mates.
 
We have used our whole javascript skillset to deliver a well-engineered project by following the best practices in the MVC architectural pattern.

## Authors
|       Name     | http://telerikacademy.com profile                           |https://github.com profile                   |
|:--------------:|:-----------------------------------------------------------:|:-------------------------------------------:|
|Toni Nikolov    |[Tony_Nikolov](https://telerikacademy.com/Users/Tony_Nikolov)|[TonyNikolov](https://github.com/TonyNikolov)|
|Lyubomir Rumenov|[Lyubomir.R](https://telerikacademy.com/Users/Lyubomir.R)    |[Def4l71diot](https://github.com/Def4l71diot)|
|Kaloyan Yanev   |[Kalito98](https://telerikacademy.com/Users/Kalito98)        |[Kalito98](https://github.com/Kalito98)      |
|Alexander Yankov|[snowflake2513](https://telerikacademy.com/Users/snowflake2513)|[ultron1251](https://github.com/ultron1251)|

### Setup instructions
**1.** npm install - this installs all packages and bower

**2.** mongodb server needs to be started before running the app

**3.** starting the project is as easy as runnning **npm start**

### Restful API reference
**get /api/forums** returns all forums in our database

**get /api/forums/:id** returns a forum by given id

**post /api/forums/create** creates a forum. It **requires** user authentication.

**get /api/forums/:forumId/topics** gets all topics in a given forum by its id

**get /api/topics** gets all topics in our database

**get /api/topics/:topicId** gets a topic by its id

**get /api/topics/:topicId/comments** returns all comments in a topic by its id

---------------------------------------------------------------------------------------------------------------------------------
**The project is licensed under the GPLv3 License**

[The project is being hosted here.](https://leagueofninjas.herokuapp.com/)

[YouTube presentation video](https://www.youtube.com/watch?v=A6pnXQya8jM)

[Telerik Academy showcase system link](http://best.telerikacademy.com/projects/387/League-of-Ninjas)

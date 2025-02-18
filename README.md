Project 3 ideas

Company idea Generation platform
Core Features (MVP - Minimum Viable Product):

3 models:
User model
Idea model (form) —> create
Likes/voting model
Comments model

* User Authentication: Users can register (username, email, password) and log in/out.  JWT (JSON Web Tokens) should be used for secure authentication.   
* Post Creation: Authenticated users can create short posts (think Twitter's character limit). Posts should have content, a timestamp, and the author (user).
* Post Viewing: All users (or potentially  just logged-in users, depending on your design) can view posts. Posts should be displayed in reverse chronological order (newest first).
* Post Deletion (by author): Users can delete their own posts.

# UserStories 
As a user I would like to sign up 
as a user I would like to log in securely
as a user I would like to post comments under my name
as a user I would like to edit or delete my comments
as a user I would like to like other comments 
as a user I would like to see the top liked comment float to the top of the page (stretched goal)


# MVP
1. User sign up
2. User Log-in
3. User Posting Comments
4. User Liking Comments

Figure the Schema out settle the MVP and APIs by Saturday

# Brainstorming

- Store likes under the idea database i.e. store the array of users that have liked the idea
- Instead of creating another schema, for just likes alone, adding another field in ideaSchema would make sense —>  store an array of the users that have liked the idea 
- But have to make sure the users are not allowed to vote more than once per idea
- useState to keep track of the likes in my component
- useEffect to fetch the initial likes from my mongoDB when the component mounts
- A handleLike function to update the likes in the state and send a request to backend to update mongoDB

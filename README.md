# MadLube
Mohamed and Lubes' week 8 project, building on the Saucy Psychic Ninjas' week 7 project.

## Initial outline
Our site will be a blog about what was cooked for dinner at the guesthouse (or elsewhere). Users can submit new posts about meals, read about specific meals, and ultimately comment on posts and maybe search/filter posts.

## Week 8 outline
- The site will be expanded with authentication:
  - The homepage will be visible to everyone
  - The login page will redirect to Github
  - The 'add post' page will require authentication

## Authentication
- we will create an authentication strategy using JWT and/or cookies
### Flow
- login page redirects to Github, to request authorisation
- if successful, the server requests an access token from Github
- we create a JWT (JSON Web Token), and send it to the browser
- we authenticate (e.g. for the 'add post' page) using the JWT

## Goals
- a (private?) profile page for each user
- each user can edit/delete their own posts
- have logout button
- have individual page for each post
- allow comments on posts if logged in

## User Stories
**As a member of Founders and Coders, who wants to write a blog post**
> I want to log in with my Github account

> So that I can access the 'add post' page


**As any user who is logged in**
> I want to see my username & Github profile picture on the homepage

> So that I benefit from logging in with Github OAuth, and don't have to do any profile setup on your site.


**As a bored internet browser who navigates to the home page:**
> I want to see a list of posts about different dinners which were cooked

> So that I can see if there are any I would like to read more about

## Local install instructions

## Database Schema:
### Posts
Column      |     Type    |    Modifiers   | More info           
--- | --- | --- | ---
id               | integer                     | not null default | serial primary key
dish             | character varying(255)      | not null |
description      | text                        |          |
chef_name        | character varying(255)      | not null |
background_color | character varying(25)       | not null |
date_published   | timestamp without time zone | not null default now() |

### Users
TODO

### Comments
TODO

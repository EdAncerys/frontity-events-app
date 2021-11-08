# <span style="color:#6166B3">frontity-events-app</spam>

This project was bootstrapped with [Frontity](https://frontity.org/).

### <span style="color:#C85C5C">Simple and basic web app to help test the Word Press & forntity framework.</span>

Webb app have basic events project actions & usages.User able browse for featured events and hosting panelists.
Featuring login/logout functionality & JWT and encrypted cookie 🍪 storage.

### Basic Usage

To use this app you need to set up Word Press instance locally or on the server. [MAMP](https://www.mamp.info/) is used to set up local WP server.

Have to point home/main WP url to frontity.settings.js settings file. 
WP have 3 main CPT set up (all of them have custom post fields (CPF)): 
    
  `Events` `Panelists` `Registrations`

<span style="color:#678983">* See WP set instructions at the end of the md file </span>

#### Launch a development server

```
npx frontity dev
```

#### Create your custom theme

```
npx frontity create-package your-custom-theme
```

Use the command `npx frontity create-package` to create a new package that can be set in your `frontity.settings.js` as your theme.

That's it! Good luck

# 👹

lookatemail@gmail.com


# Frontity docs

#### Table of Contents

- [Launch a development server](#launch-a-development-server)
- [Create your custom theme](#create-your-custom-theme)
- [Create a production-ready build](#create-a-production-ready-build)
- [Deploy](#deploy)



> Have a look at our blog post [How to Create a React WordPress Theme in 30 Minutes](https://frontity.org/blog/how-to-create-a-react-theme-in-30-minutes/)

### Create a production-ready build

```
npx frontity build
```

Builds the app for production to the `build` folder.

This will create a `/build` folder with a `server.js` (a [serverless function](https://vercel.com/docs/v2/serverless-functions/introduction)) file and a `/static` folder with all your javascript files and other assets.

Your app is ready to be deployed.

> Get more info about [Frontity's architecture](https://docs.frontity.org/architecture)

### Deploy

With the files generated in the _build_ you can deploy your project.

#### As a node app

Use `npx frontity serve` to run it like a normal Node app.

This command generates (and runs) a small web server that uses the generated `server.js` and `/static` to serve your content.

#### As a serverless service

Upload your `static` folder to a CDN and your `server.js` file to a serverless service, like Vercel or Netlify.

> Get more info about [how to deploy](https://docs.frontity.org/deployment) a Frontity project

# WP configuration

First install a new local copy of Wordpress, you can use MAMP or Local to run it.
Clean it out of all plugins and install the following: 
- CPT UI
- ACF Pro (license will be needed)
- ACF to REST API
- WP JWT Authentication 

Post Types

Create a custom post type called Events, ensure it is showing up in the REST API. For the event title we will use the standard post title, and for the event thumbnail when we create the events loop page we will use the Wordpress core thumbnail. 

Create. Custom post type called Panelists, again make sure it is showing in the rest API, and use the Title field only, we will use a custom field for the photo of the panelist. 

Crate a custom post type of Registrations, again expose it to the REST API and just use the title field. 


Custom Fields

Events fields
Add the following custom fields to the event post type: 
- Event Date
- Event Start Time
- Timezone (this will be key later)
- Event Logo (image field, be sure to mark it to return the URL in the settings)
- Event Banner
- Video URL
- Chat URL (I will explain all with these last two)
- Event Owner (A relationship field where you grab the users ID, so do a relationship field for users)

Then add a slightly more complicated field called a repeater field, we use these a lot and it is important you get to know it. A repeater fields is like a table, where you can iterate through the rows in the table and it has various fields in each row. For the repeater field this is what I want you to do: 

Call the repeater field: Agenda
The fields for the repeater field are: 
- Start time
- End time
- Title
- Description
- Panelists (this is a relationship field which will get panelists from the panelists custom post type and it returns the ID, we are going to query this to display the panelists for an event. This is an important process as these relationship are really good to master).
- 

Panelist fields
Add the following fields to Panelists

- First Name
- Last Name
- Email
- Telephone
- Mobile
- Company 
- Job Title
- Image (return the URL)
- Biography (WYSIWYG field as I want you to see how it works when a field outputs HTML, it’s not fun)

Registrations Fields
- First Name
- Last Name
- Email
- Telephone
- Company 
- Job Title
- Event ID (ties the registration to the event)
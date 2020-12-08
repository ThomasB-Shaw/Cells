# Cells

## Description
_Duration: 2-Week Sprint_

Cells is created for fluid artists who would like help honing their craft and find consistences in their work.  By providing a web space for fluid artist to congregate and store their work using the ASW S3 Cloud to review at a later time or for other users to view and try and replicate.  Cells provides these tools an artist can narrow down what components will result in what style in a painting, with this knowledge on their next attempt they can dial in and continually improve for the next painting

## Usage

1. After landing at the home page, you will be able to browse nine random images on the home gallery 
2. On click of a painting on a gallery you will be able to see that paintings Title, Date Made, Dimensions, Description, the methods, colors and tools the painting is comprised of.
3. Navigating back to the home page or choosing the ```log in/Register``` option off of the top nav bar
4. Upon click of ```log in``` you will be brought to the log in page, if you have an account you may sign in, otherwise registering is an option
5. Registering will require the user to provide a unique user name and password.  After which they will be prompted back to the log in page to sign in.  After Successfully signing in the user will be dropped back at the home page
6. New options will be in the nav bar once signed in (```Add Painting```, ```My Account```)
7. Upon Click of ```Add Painting``` you will brought to the add painting page.  Here you will be able to fill in the Title, Date Made, Dimensions, Description.  You will need to upload a file from your device to be sent to the AWS cloud.  You will need to add a method, color and tool per used.  When everything has been updated hitting ```Save Painting``` will post it to the database.  You will be navigated to your user page upon successful save.
8. Upon landing at your account page, you will see all of your current paintings you have uploaded.  Clicking on these will bring you to the edit page
9.  The edit page will allow you to revert any inputs and allow you to delete / add more methods, colors, and tools
10. If signed in and viewing your own painting a ```DELETE PAINTING``` upon click you will be prompted if you are sure.  If proceeded, you will be dropped on your account page with the chosen painting delete

### Prerequisites

Link to software that is required to install the app.

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

1. Get to main project directory in command line, assuming node is installed, and type in `npm install` to install required dependencies.
2. Install postgreSQL at [this](https://www.postgresql.org/download/) link.
3. Install postgreSQL GUI like [Postico](https://eggerapps.at/postico/).
4. Run commands from database.sql file in Postico to create table, in `cells` database.


## Built With
- _Node.js_
- _Express.js_
- _React_ 
- _Redux_
- _Redux-Sagas_
- _postgreSQL_
- _Bootstrap_
- _Sweet Alerts_
- _Amazon Web Services S3_

## Support

If you have any questions, feel free to email me at tbrookshaw13@gmail.com

## Acknowledgments

* Shoutout to all of Prime staff for being so supportive and being such great teachers.

---

## Where I want to go from here

- [ ] Studio View, which will allow a user to make a wall of paintings in an arrangement they would make with draggable JS tools, this could then be shown off at their profile.
- [ ] Refresh Page,  Use the get request through params, to add user forgiveness if refresh every occurs
- [ ] Filter Page, to use different type of filters to check the DB for paintings that fullfil those tags
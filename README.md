# team04
Currently we have two main branches, the "main" branch has the most functional version of our code, and the "3d" branch upgrades the skin editor to a fully featured 3d editor which is sitll a work in progress, we intend to have it complete for phase 2.

To run view the instructions in frontend/README.md

Our web application enables the sharing of resources relating to minecraft, centered around skins, resource packs and maps.

## Login Credentials
**Email:** hey@gmail.com [admin]

**Password:** 123456

## How To Use

Access the web application at https://mc.tom.ac/.

After boot up you should land on the home page. You can first login with the above credentials by accessing the login modal in the top right of the screen. After being logged in, you can nagivate through the web app by using the scroll bar to navigate between viewing skins, resource packs and maps. You can click on any card from this page to view further details about it. On this viewing skin page, you may comment as well.

To add a new skin, resource or map, from your account, choose the desired commodity from the left side bar and click the “+” icon at the top.

To edit any of the commodities, follow the same path, but instead of clicking the plus, select a card and change any attribute of the element. To edit skins, select a color in the right side color picker, then select a block to change its color. Click the save button to save any changes. To upload a map, drag and drop a zipped map and a cover photo.

## Phase 2 Additions

Routes were added to access (GET), create (POST) and edit (PATCH) user information, skins, maps and texture packs. Backend technologies that were used include MongoDB (along with Mongoose) and Express (for server side). MongoDB was used to hold the information associated with these resources (each had its own collection within the SkinPixel db). Debugging the database related actions was done in MongoDB Compass. Postman was also used to debug the request related actions. Express was used for the server side architecture. and as mentioned previously we had routes created for all four resource types (user, skins, maps and texture packs).

## Admin Privileges
As admin, you can delete users from the Account page (navigable by the button on the nav bar).

## Testing out 3D functionality

If you want to check out the version with the 3D skin editor checkout the 3d branch and start up as normal, navigate to the skin editor and you can view the 3d rendering. You can zoom in using the scroll wheel, and if you click and drag you can change the orientation. If you select a color and hover over one of the blocks the block will change color, if you click on a block it will apply the color change to that block. 

# 3rd Party Libraries
* Classnames
* Material UI/{core, icons, lab}
* Testing Library/{jest-dom, react, user-event}
* React
* React-{color, dom, router-dom, script , dropzone, dropzone-uploader}
* Web Vitals
* React Three Fiber


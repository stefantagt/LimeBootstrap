#LIME Bootstrap
The LIME Bootstrap is made to make it easier, better and faster working with Actionpads in LIME pro. The framework relies heavily on Knockout.js and Twitter Bootstrap but with custom styling and a simple, yet powerful script called `lbs.js`. The framework contains several built in functions and third 
party libraries, but is also expandable through custom apps. 


LIME-bootstrap is only meant to be used inside LIME Pro, but for debugging reasons all functionality (except the data connections) should work in any browser.

##Requirements

*	Internet Explorer 9 <- With some design quirks
*	Internet Explorer 10
*	Internet Explorer 11

Older versions of IE __won't__ work!

*	LIME 10.11 or greater

note
On Lime 10.10 the data from activeinspector can not be trusted and there are some quirks when publishing actionpads.


##Install
LIME Bootstrap is included in the LIME Basic database and nothing is needs to be done in this case. If installing LIME Bootstrap from scratch:

1.	Copy all the folders, `lbs.html` and `_config.js` to the Actionpad-folder
2.	Create two new VBA modules from the VBA found in `system/vba/` with the same name as the files
3.	Change the URL of all Actionpads in LIME Pro to `lbs.html`

If you'll like the some basic views to start with you can find some [here](https://github.com/Lundalogik/LimeBootstrapBaseActionpads)

##Update
Updating LIME Bootstrap is done by downloading the lastest version and replacing some files and updating some VBA. Remember to check if you need to unblock the zip file under properties

1.	Replace the system folder, `lbs.html` and `_config.js` in the Actionpad-folder
2.	Replace the VBA modules from the VBA found in `system/vba/` with the same name as the files.

__check the `_config.js` for customizations and add those to the new `_config.js` file.__

##Custom CSS in Lime Bootstrap (LBS)
Our recommendation and the basic principle are to avoid the use of self-written CSS LBS since we can not guarantee how this will affect future versions of LBS. The purpose of LBS is to standardize Actionpads and to be able to deliver updates without worrying for failures.

We  cannot prevent customers to add their own written CSS. If you really have to you SHOULD NOT  update lime.css or add a custom CSS file in system / css folder. This is very risky since an update will replace the entire system folder. To avoid disasters where custom css is removed when updating LBS you should follow the below instructions.

Create a folder called custom in the actionpad folder, in this folder create a CSS file called custom.css

This file is not maintained by Lundalogik and we can not guarantee that the custom CSS will work with future LBS updates, but it will not get overwritten or removed. In addition to this they have to include it in lbs.html, which it does with the following line of code in the css section:

`<link rel="stylesheet" type="text/css" href"custom/custom.css" />`

IMPORTANT: The recommendation is to avoid custom CSS.

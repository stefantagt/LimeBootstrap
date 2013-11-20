The framework is "convention over configuration", meaning there should be one and only one way to do things. If you find yourself writing lots of code to do something, or god forbid, needing to modify ANY file in the systems folder, you're propably doing it wrong. Take a deep breath and ask for assistance.

If you want to use the framework then solemnly swear to the following conditions:

1. The systems folder should never, ever be modified. I can achieve cool and smart functions without ever touching it.
2. lbs.html should never be modified, except from toggleing debug mode on and off.
3. I must unlearn what I have learned! The framework offers a completely different methodology of working with Actionpads, I will embrace it.
4. I will not ever copy and paste code from old Actionpads. A rabbit will die if I even think of copying and pasting a VBScript...
5. I want to contribute to a better framework. Any improvements, errors or bugfixes will be committed or reported to this git repository.
6. I will follow the design guidlines:
	1. The design should be flat, free from gradients and focused on content.
	2. The Actionpad is very narrow (~250px), use the height and not the width of the Actionpad.
	3. Font should be dark blue on the deafult blue background. In any other case, white should be used. If white cannot be used, use a darker variant of the background color, i.e., dark green on green background etc.
	4. Font awesome is used for all icons except for the header icons. There we use Icon Experience's new M-icon set.
	5. Stick to default colors, don't "brand" the solution with the customer's logo and colors.
7. I will use `lbs.common.executeVBA()` to run any LIME function and `lbs.limeDataConnection` to access any LIME object when building apps.
8. I won't include any scripts or styles in my views.
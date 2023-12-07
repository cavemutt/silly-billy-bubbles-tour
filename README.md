# The Silly Billy Bubbles Tour!

Let Silly Billy give a tour of your website/web app!

![The Silly Billy Bubbles Tour in action!](/assets/SillyBillyBubblesTour.jpg)
_(This project is Silly Billy-approved)_ 

## This project uses : 
HTML, CSS3, JavaScript, GSAP

## Why I built this :
I have some personal projects that have features and little details that I want users to know about, but may get overlooked or left unknown if not pointed out. When a mentor at Promineo Tech said I should have something to point these things out, I was reminded of the old music video show that uses fun little bubbles that pop up during the video to point out details and bts info. Using that idea, combined with my rescue cat Silly Billy, I created this project to be something I could (fairly) easily pop into my other projects.  

## How it works :
This is a completely original project of my own design(except for it's inspiration) and coding, and including the photos of Billy and his paw. Basically, it takes an array of element tags you want on the tour and cycles through each one to obtain the position of the element, line up the Bubble and the Indicator helper near the element it is talking about, and GSAP is used to facilitate the animation of the Bubble items popping in and out.

To make it easier to control the styles that might need to change to suit a project, like the colors and font styling, I've included custom CSS variables in the root of the CSS file. Everything is named with the "bubble" theme, so you can import these "bubble" files into a project easily and it is highly unlikely they will interfere with other CSS and JS files. The content of the Bubble at each tour stop is controlled by a custom HTML data property, ```data-bubble="_what you want in the Bubble content_"```, that you add to each tour stop element.

There is an introductory div so that Billy can introduce himself, and an 'outro' that is the content for the button that starts/stops the tour anytime, so Billy can point out that button and say goodbye.

## Silly Billy's Bubbles go on tour
You can see him in action in my pinned projects!

## Instructions for using the app :
**1. Add the Bubble HTML block at the top of your body tag. Use my photos or your own.**
**2. Link your HTML to the bubbleStyles and bubbleScript files.**
**3. Add the link to GSAP at the bottom of your body tag but above your regular script file link.**
**4. Find the tourArray near the top of the bubbleScript file and remove all elements except for the intro and outro.** 
**5. Test the intro, outro, and Billy button, which should already be working at this point. The button is positioned at the top right corner of your page, so adjust any styling you might need to.**
**6. Decide what elements you want in your tour (it will go in order of the array), add the tag/id name to the array (it is not currently set up to take multiple elements with the same class name).**
**7. NOTE: If your elements are heavily nested, it might work better to use less-nested or nearby input/button elements just to get the Bubble where you want it. See notes in the .js file or below in the future/known issues section.**
**8. Add the ```data-bubble=""``` attribute to each element on your tour with the content you want for that tour stop.**
**9. Play through it (maybe add one or two at a time to make sure it's working as you go along). If the positioning of the Bubble items are wonky, see notes in the .js file or below in the future/known issues section.**
**10. Make any adjustments to improve any positioning issues or animation timings to your liking.** 
**11. Change the styles of the custom CSS variables in the root section of the .css file to suit your project!**


## Features summary :
- A Billy Paw button that will begin or end the tour at any time.
- The intro Bubble auto-plays onload, and can be ended with the ```X``` button or continued with the ```>>``` button, so the user has full control. 
- You control what it says, what stops it makes on the tour and how many stops are in the tour. 
- I am using actual photos of my rescue cat Silly Billy and of his own paw, which rotate randomly with each popup.
- The indicator helps point focus towards the element on each tour stop. 
- Element can also be highlighted. This can be turned off by removing/commenting out 3 parts as indicated in the .js file.
- This app uses ```element.offsetTop``` to establish the positioning of the Bubble and Indicator. This may not work well for every stop on your tour, see the notes in the .js file or below in the future/known issues section for more info. 
- Silly Billy Bubbles is screen size responsive
- GSAP is used for animating the Bubble items in and out, because why reinvent a wheel that's already been perfected? It takes the focus off the detailed coding and onto how the animation actually looks. And the bounce easing is perfect for this project!


### What I've learned, future development, and known issues : 
This is an original project from concept to future development, whereas some of my projects started from course assignments or what I felt would be a course assignment. While animation timing and function can be time-consuming, the biggest things I learned while doing this project are how the different position-getting methods work and how they can sometimes return something different than you might expect. 

In addition to making this app more screen-reader accessible-friendly, I would like to keep working on perfecting the positioning functionality.

### Known Issues and Fixes 

The positioning of the Bubble Container and the Indicator are determined here by using offsetTop (and other offsets) of the elements on the tour. Though I was hoping to find a method that would get the exact position of any element in relation to the whole site page, it's a little more complicated than that, especially for nested elements. Also, different methods of getting an element's positioning can hit any top/bottom of page solutions I've planned for to catch.

_different methods_
```Element.offsetTop``` retrieves the element's top relative to it's nearest visible parent container. So, as things get nested, they can get weird. This app uses elements nested only 3 deep from the body and it seems to work...ok. 
Using ```element.getBoundingClientRect()``` gets info relative to the window viewport, also not the page.
I've also seen ```scrollY``` suggested as a solution, but it retrieve the Y position of an element relative to it's parent's scrolling height. So, if the element is not a child of the body you are scrolling, and if the parent doesn't even have an overflow to need a scrollbar, the scrollY will return as 0.
I've also tried looking for an element's and it's parents and parent's parent's (however deep it was from the body element) offsets to add them together, and that did not work as expected either.

**Possible Fixes**
_If your positioning for an element is wonky :_ 
- try pointing the Bubble/Indicator to a nearby element that is less nested. You'd probably want to turn the highlighter off, though, since it highlights the element you specify. This can easily be done by commenting out/removing 3 parts as indicated in the .js file.
- I've noticed that it works better pointing the bubble to an input or a button. 
- Try using element.getBoundingClientRect().top instead of offsetTop, but know that it retrieves coordinates in relation to the viewport window, so make sure you have the viewport scrolled to where you want it first. (And even then I've had issues on more complicated HTML structures than this one.)
- I've also tried setting a data-adjustment="200" or whatever px value you need to add or subtract to get the positioning where you want it, but I was not happy with the results.
- The easiest thing, I believe, is to reduce how nested things are if possible, and either try nearby elements or create an element with absolute positioning nearby to point the bubble to. The last suggestion will probably need manual adjustments to it's position to make it responsive to different screen sizes.


I would like in future versions to have a feature that can dynamically point an element to one method or the other to allow an easier way to test and use what works best for each element specifically. 
I wanted to do the positioning with vanilla JS, but I will likely also try GSAP plugins at some point as well.

### Credits :
A thank you to the geniuses at Greensock.
And a thanks to my rescue cat Silly Billy for his patience while I took photos of his silly face and paws. 

A shoutout to the biggest influences on my Web Dev journey :
The mentors and instructors at Promineo Tech (school)
Zero To Mastery (school)
Kevin Powell (on Youtube and courses)
Developed By Ed (on Youtube and courses)
Web Dev Simplified (on Youtube and courses)


_Please enjoy and thanks for checking it out!_

![Silly Billy says goodbye until next time!](/assets/BubbleOutro.jpg)

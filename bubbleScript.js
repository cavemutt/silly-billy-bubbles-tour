

// NOTES :  The positioning of the Bubble Container and the Indicator are determined here by using offsetTop of the elements on the tour. The offset top retrieves the element's top relative to it's nearest visible parent container. So, as things get nested, they can get weird. This app uses elements nested only 3 deep from the body and it seems to work...ok. I've noticed that it works better pointing the bubble to an input or a button. An alternative solution is to use element.getBoundingClientRect().top, but know that that retrieves coordinates in relation to the viewport window, so make sure you have the viewport scrolled to where you want it first. Maybe have a feature that can point an element to one method or the other to allow an easier way to use what works best for each element specifically. Mb set a data-method="offset" or "bounding" on the element and look for that in the positioning functions? I will continue to work on this.
// I might just try GSAP plugins, because why reinvent a complicated wheel that's already perfected?
// SEE NOTES ON POSITION FINDING METHODS AND OTHER THINGS AT BOTTOM  


// THESE ARE the elements we need to access, I generally like to use classes for the CSS and id's for the JS to avoid any confusion
const bubbleWrapper = document.querySelector('.bubble-wrapper')
const billyBtn = document.querySelector('#billy-btn')
const bubbleContainer = document.querySelector('#silly-billy-bubbles')
const billyBubble = document.querySelector('#billy-bubble')
const bubbleContent = document.querySelector('#bubble-content')
const bubbleIndicatorDot = document.querySelector('#bubble-indicator')
const closeBubbleBtn = document.querySelector('#close-bubble')
const nextBubbleBtn = document.querySelector('#continue-bubble')
const bubbleBtns = document.querySelectorAll('.bubble-btn')

// the tourCounter will control which element we're on in the tourArray and if anything special happens at a certain stop (specifically the end)
// this can also be used for future updates to show the specific tour stop bubble on a certain user action to invoke it, without going through the whole tour
let tourCounter = 0


// this is an array of element id's that will be tour stops, listed in order of the tour
// * ADD YOUR OWN TOUR STOPS IN THE TOURARRAY * as you would in a document.querySelector()
const tourArray = ['#bubble-intro', '#logo', '#link-1', '#link-2', '#page-title', '#p-1', '#p-2', '#p-3', '#footer', '#footer-p', '#bubble-outro' ]
// * don't forget to add/update the data-bubble="" content in each html element in the tour, including the intro and outro


// EVENT LISTENERS

// disable the context menu to not interfere with little fun things
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, false)

//  start the tour on load and handle scroll history on reload 
window.addEventListener('load', () => {
    setTimeout(() => {
        startBillyBubbles()
    }, 1000)
    
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }
})

// billyBtn will toggle to start the tour or end it before it finishes
billyBtn.addEventListener('click', () => {
    billyBtn.classList.toggle('start')
    if(billyBtn.classList.contains('start')) {
        tourCounter = 0
        startBillyBubbles()
    } else {
        bubbleContainer.classList.add('close')
        closeIt()
    }
})

// the close button will end the tour
closeBubbleBtn.addEventListener('click', () => {
    closeBubbleBtn.style.background = "#555"
    bubbleContainer.classList.toggle('close')
    closeIt()
})

// the next button continues the tour to the next stop
nextBubbleBtn.addEventListener('click', () => {
    nextBubbleBtn.style.background = '#555'
    closeBillyBubbles()
    tourCounter += 1
    
    setTimeout(() => {
        if (tourCounter === tourArray.length - 1) {
            bubbleContainer.classList.add('close')
            closeIt()
        } else {
            bubbleTour(tourArray, tourCounter)
        }
    }, 1000)
})

// the bubbleBtns are the close tour and continue tour buttons, this is just to cover for the CSS hover effect that was overridden by the gsap animations
bubbleBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.opacity = '1'
        btn.style.scale = '1.1'
    })
    btn.addEventListener('mouseleave', () => {
        btn.style.opacity = '0.8'
        btn.style.scale = '1'
    })
})


// THE TOUR 

// start the tour at the beginning of the array
function startBillyBubbles() {
    bubbleTour(tourArray, 0)
}

// this separate function controls closing the container to go to the next stop, or closing at the end of the tour, which removes the next/continue button
function closeIt() {
    if(bubbleContainer.classList.contains('close')) {
        closeBillyBubbles()
        setTimeout(() => {
            lastStop()
        }, 500)
    } else {
        closeBillyBubbles()
        bubbleContainer.classList.remove('close')
    }
}

// take in the array and the index of the current element, pass through to the functions to position the bubble, the indicator, and to set styles and content of bubble animation 
function bubbleTour(arr, i) { 
    const element = document.querySelector(arr[i])
    openBillyBubbles(element)
}

// set the descriptive content of the bubble for each tour stop 
function showBubbleContent(el) {
    bubbleContent.innerText = el.dataset.bubble
}

// scroll to the current tour stop
function scrollToBubble(elem) {
    elem.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})

    bubblePosition(elem)
    bubbleIndicator(elem)
// **HIGHLIGHTER** 1 of 3 - if no highlighting is wanted, remove/comment out next line and 2 more things below
    highlighter(elem)
}

// determine the position of the bubble for each tour stop
function bubblePosition(el) {
    const body = document.querySelector('body')
    const bodyHeight = body.offsetHeight
    const elOffsetTop = el.offsetTop 
    const elOffsetHeight = el.offsetHeight
    const bubbleOffsetHeight = bubbleContainer.offsetHeight
    // Y positioning

    let isAtBottom = elOffsetTop + elOffsetHeight >= bodyHeight - elOffsetHeight
    if (
        elOffsetTop + elOffsetHeight + bubbleOffsetHeight >= window.innerHeight 
        ) {
            bubbleContainer.style.top = (elOffsetTop + (elOffsetHeight * 0.3)) + 'px'
        } 
    if ( isAtBottom ) {
            bubbleContainer.style.top = (elOffsetTop - (bubbleOffsetHeight + 50)) + 'px' 
        } else {
            bubbleContainer.style.top = (elOffsetTop + elOffsetHeight + 10) + 'px'
        }

    // X positioning
    el.offsetLeft <= body.offsetLeft ? bubbleContainer.style.left = '20px' : el.offsetLeft + bubbleContainer.offsetWidth + 20 >= body.offsetWidth ? bubbleContainer.style.left = (body.offsetWidth - (bubbleContainer.offsetWidth + 20)) + 'px' : bubbleContainer.style.left = (el.offsetLeft + 20) + 'px'

}

// **HIGHLIGHTER** 2 of 3 - if no highlighting is wanted, remove/comment out below function and one more line at the bottom
function highlighter(elem) {
    elem.classList.add('highlight')
}

// set the position of the indicator, which highlights the current stop of the tour
function bubbleIndicator(el) {
    const body = document.querySelector('body')
    const bodyLeft = body.offsetLeft
    const bodyHeight = body.offsetHeight
    const elTop = el.offsetTop
    const elLeft = el.offsetLeft
    const elHeight = el.offsetHeight
    let isAtBottom = elTop + elHeight >= bodyHeight - elHeight
    
    // Y position
    isAtBottom ? bubbleIndicatorDot.style.top = (elTop - 50) + 'px' : bubbleIndicatorDot.style.top = (elTop + (elHeight * 0.2)) + 'px'   
    
    // X position
    elLeft <= bodyLeft ? bubbleIndicatorDot.style.left = (elLeft + 40) + 'px' : bubbleIndicatorDot.style.left = (elLeft - 60) + 'px'
    
    // call a small random rotation on the indicator, for fun
    randomRotation(bubbleIndicatorDot) 
}

// a little fun rotation for Silly Billy and the indicator
//  note: the gsap timeline may have overridden this setting for Silly Billy, so the let random variable holds the rotation value and it is then used in the gsap animation for the Billy image, but below does work for the paw indicator.
function randomRotation(elem) {
    let random = Math.floor(Math.random() * 21) - 10
    return elem.style.rotate = `${random}deg`
}

// set up the last stop on the tour to show the outro and end the tour
function lastStop() {
    tourCounter = tourArray.length - 1
    bubbleTour(tourArray, tourArray.length - 1)
    billyBtn.classList.remove('start')
}

// ANIMATIONS 

// animation the opening and set content of Billy Bubbles using GSAP
function openBillyBubbles(element) {
    const tl = new gsap.timeline({defaults: {duration: 0.75, ease: 'elastic.out(0.8, 0.5)' }})
    
    // if we're at the end of the tour, we don't want a continue button
    if(tourCounter === tourArray.length - 1) {
        tl.set(nextBubbleBtn, {visibility: 'hidden'})
    } else {
        tl.set(nextBubbleBtn, {visibility: 'visible'})
    }

    tl
    .set(nextBubbleBtn, { background: 'var(--bubble-btn-color)'})
    .set(closeBubbleBtn, {background: 'var(--bubble-btn-color)'})
    .set(window, {onStart: scrollToBubble(element)})
    .to(billyBubble, { onStart: randomRotation(billyBubble), scale: 1}, '-=.3')
    .to(bubbleContent, {duration: 1, scale: 1, width:"clamp(10em, 24vw, 18em)", onComplete: showBubbleContent(element)}, '-=0.5')
    .fromTo(bubbleIndicatorDot, {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, '-=.5')
    .to(closeBubbleBtn, {opacity: 0.8, scale: 1}, '-=.2')
    .to(nextBubbleBtn, {opacity: 0.8, scale: 1}, '-=.6')
}

function topAtEnd() {
    if(tourCounter === tourArray.length - 1) {
        window.scrollTo(0, 0)
    }
}


// close the bubbles after each stop on the tour
function closeBillyBubbles() {
    const currentElem = document.querySelector(tourArray[tourCounter])
    const tl = new gsap.timeline({defaults: {duration: .3, ease: 'power2.out' }})
    tl
    .to(nextBubbleBtn, {opacity: 0, scale: 0})
    .to(bubbleContent, { scale: 0}, '<.05')
    .to(bubbleIndicatorDot, {opacity: 0}, '<.05')
    .to(closeBubbleBtn, {opacity: 0, scale: 0}, '<.05')
    .to(billyBubble, {scale: 0, onComplete: topAtEnd}, '<.05')
// **HIGHLIGHTER** 3 of 3 - if no highlighting is wanted, remove/comment out next line
    .to(currentElem, {onComplete: ()=>currentElem.classList.remove('highlight')}, '-=.3')
}


// Testing different position getters :
// function test(element) {
//     const el = document.querySelector(element) 
//     console.log('style top ', el.style.top)
//     console.log('page top ', el.pageY)
//     console.log('offset top ', el.offsetTop)
//     console.log('scroll top ', el.scrollTop)
//     console.log('bounding top ', el.getBoundingClientRect().top)
//     console.log('client rects ', el.getClientRects())
//     console.log('window ', window.innerHeight)
// }

// test('h1')
// test('footer')
// test('#p-1')
// test('#p-8')
// test('#billy-btn')

// OFFSETTOP vs SCROLLTOP vs GETBOUNDINGCLIENTRECT()
// It's not easy to get the page coordinates of elements nested inside of elements.
// element.offsetTop gets the top y in relation to it's parent container, not the page.
// element.getBoundingClientRect().top gets the top in relation to the window viewport. 
// element.scrollTop gets the top in relation to the current parent's scrollbar, so if your parent container is not overflowing with it's own scrollbar, it's just going to return 0 


// I've tried digging into each nested layer per element in relation to the body, and I suppose that would work if you got the offset of each relative to it's parent and added each offset together to get the whole px value, HOWEVER, offset does get some nested elements, and sometimes bounding client works, I don't know the specific rules of it, did not see in a scan of MDN docs, but I am curious to figure it out someday.
// I've noticed that nested inputs and buttons seem to work better than divs and such. 
// Another idea is to overlay the whole site with unnested fake divs to point the bubbles at that are positioned above each tour element, but that would take time to do that and make responsive exactly how the actual site is responsive. 
// Avoiding unnecessary nesting of elements would help too.


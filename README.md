🎯 What requirements did you achieve?

I managed to get all requirements done.

🎯 Were there any requirements or goals that you were unable to achieve?

Yes I wanted to have an error message that came up on the form for a couple of seconds when the user didn't submit the minimum length description, I ended up having to use an alert instead because of time, I got too carried away with other things that probably didn't need to be done at this point in the course.

🎯 If so, what was it that you found difficult about these tasks?

I did stuggle with the css a little, I have one media query (technically two) and that makes it so that on small screen the form and comments stack. I did realize towards the end that instead of trying to see what it looks like on different screens all the time, I should have started mobile first and then once I felt that was right then move for bigger screens. If you look at my CSS file a lot of the CSS is basic but then at the bottom I think one of the media queries isn't really needed if I had stuck to one screen first, if you look in the media queries one is for screen less than 500px and one for more than 500px, I found this out when trying to make one media query for screens bigger than 600px but that broke my toggle form button and then I had to copy my previous code from github to get back to where I was as I don't know how to pull in an old commit.

### What errors or bugs did you encounter while completing your assignment? How did you solve them?

I used my code from week 3 assignment to make a dark theme toggler, it works fine after the dark theme has been put into storage, however when it's the first time it is used then it takes two clicks of the button to change it from dark to light, for example you click the sun on the button once and it stays dark but the sun is there still, then you have to click it again to get the theme to work right, but when it does it switches between a sun and moon emoji.
Requesting feedback about a specific part of your submission.  
What useful external sources helped you complete the assignment (e.g Youtube tutorials)?

Another task I found tricky was to delete a comment, at first I couldn't figure out how to get the id from the comments as at the time the id was only available in my fetch comments function, in that function was where I built up the HTML, Joe gave the idea to add `data-set` attribute on the comment itself, then once I had that I was oble to use the `closest` method to get the closest div using the `this` keyword in my delete function, something like this

```
const commentDiv = this.closest('div');
  const id = commentDiv.dataset.id;
```

I already sort of had an idea how to use a delete in express js.

After that I wanted to create a dynamic route so that you could click on the comment and that would take you to the comment with id of 2 for example /comments/2 in the url and that display the comment, I set it up on the backend but having to make it work in the front end with vanilla js was hard for me, so I gave up, I left the code in the file though so you can see what I tried to do, again it was using the id from `data-set` but I wanted to focus more on doing the things that was more needed. I know if this was a React project though I could do it, but I havent used the latest version of React router, only 6.4 I think it was.

My screenshots of my database schema, SQL queries and my wireframe are in the screenshots folder.

Overall I am 80% happy with what I have acheived with this. Feedback would be great.

Deployed frontend: https://week4-assignment-1.onrender.com/
Deployed backend: https://week4-assignment-mqdw.onrender.com/comments

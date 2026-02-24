1. Difference between getElementById, getElementsByClassName, querySelector, querySelectorAll

getElementById() - Returns one element by its unique ID.
getElementsByClassName() -Returns a live collection of elements with the same class.
querySelector() - Returns the first element** that matches a CSS selector.
querySelectorAll() - Returns all matching elements (static list).
 2. Create and insert a new element into the DOM

Use document.createElement() to create.
Add content (text or HTML).
Insert it using appendChild() or append().


3. What is Event Bubbling?

Event bubbling means an event starts from the target element and moves upward to its parent elements until it reaches the root.

4. What is Event Delegation? Why useful?

Event delegation means adding an event listener to a parent element instead of each child.
It works because of bubbling.
It is useful because it reduces code and works for dynamically added elements.



5. Difference between preventDefault() and stopPropagation()

* **preventDefault()  Stops the browser’s default action.
* **stopPropagation() Stops the event from bubbling to parent elements.

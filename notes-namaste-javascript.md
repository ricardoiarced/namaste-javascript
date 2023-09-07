### Execution context

**Everything in JavaScript happens inside the execution context**
This execution context you can think of it as a big box or container in which all JavaScript code is executed.

The execution context has to components

| Memory     | Code                 |
| ---------- | -------------------- |
| key: value | code                 |
| a: 10      | another line of code |
| fn: {...}  | another line of code |

- The memory component is the place where all the variables and functions as a key value pairs. The memory component is also known as **variable environment**. Is sort of an environment in which all these variables and functions are stored as key value pairs.

- The code component is the second component of the execution context. Is the place where code is executed one line at a time and is known as **thread of execution**. It is like a thread in which the whole code is executed one line at a time.

- JavaScript is a synchronous single-threaded language. Single threaded means that JavaScript can only execute one command at a time, and synchronous single-threaded means that JavaScript can only execute one command at a time but in specific order, therefore that means it can only go to the next line once the current line has been finished executing

### What happens when you run JavaScript code?

An execution context is created

so, let's take this example:

```js
var n = 2;
function square(num) {
  var ans = num * num;
  return ans;
}
var square2 = square(n);
var sqaure4 = square(4);
```

When we run this code a global execution context is created

Global execution context in the first phase:

| Memory             | Code |
| ------------------ | ---- |
| n: undefined       |      |
| square: {...}      |      |
| square2: undefined |      |
| square4: undefined |      |

Global execution context in the second phase:

| Memory        | Code |
| ------------- | ---- |
| n: 2          |      |
| square: {...} |      |
| square2: 4    |      |
| square4:      |      |

New execution context created by the first function invocation(This new execution context goes inside the code component or single thread of execution) in the first phase:

| Memory         | Code |
| -------------- | ---- |
| num: undefined |      |
| ans: undefined |      |

New execution context created by the first function invocation(This new execution context goes inside the code component or single thread of execution) in the second phase:

| Memory | Code                          |
| ------ | ----------------------------- |
| num: 2 | num times num (2 times 2 = 4) |
| ans: 4 | return ans                    |

New execution context created by the second function invocation(This new execution context goes inside the code component or single thread of execution) in the first phase:

| Memory         | Code |
| -------------- | ---- |
| num: undefined |      |
| ans: undefined |      |

New execution context created by the second function invocation(This new execution context goes inside the code component or single thread of execution) in the second phase:

| Memory  | Code                           |
| ------- | ------------------------------ |
| num: 4  | num times num (4 times 4 = 16) |
| ans: 16 | return ans                     |

This global execution context is created in two phases:

1. Creation phase (memory creation phase):
   In the first phase of memory creation JavaScript will allocate memory to all the variables and functions. Therefore as soon as JS encounters line one it allocates memory to n. Similarly, JavaScript goes to line two and it sees there is a function named square. Therefore it allocates some memory to square. when it allocates memory to n it stores a special value which is known as **undefined**. In case of functions, it stores the whole code of the function inside the memory space. And then it will allocate memory for square2 and square4, and both of them will store the value of undefined.
2. Code execution phase: JavaScript runs again through the whole JavaScript program line by line and it executes the code now. So this is the point when all these functions and every calculation in the program is done. So as soon as it encounters the first line 'var n = 2;', it places the '2' inside 'n', so the two will replace the placeholder undefined in the identifier of n. After finishing line one goes to line two and sees that it has nothing to do here. Then it moves to line 6, and we invoke a function and what is a function invocation? Whenever you see a function name, with the parentheses it means that the function is being executed. A function is like a mini program, and that mini program is invoked and then a new execution context is created. This new execution context has its own memory component and code component and goes inside the code component of the global execution context, and it will have two phases involved
   1. Creation phase (memory creation phase):
      Here, first of all it will be allocating memory to 'num' and for 'ans', and both of them will have a value of undefined as a placeholder.
   2. Code execution phase:
      First of all when the function is invoked in line 6 the argument 'n' is passed to 'num' and 'n = 2'. Therefore num will hold the value of 2. Now we move to line 3 and it wil do the calculation of 'num times num' and put the value inside 'ans'. After finishing line number 3 it goes to line 4 and it encounters the special keyword 'return' with the variable 'ans'. So it is basically telling the function that it has done its work now, and return the value of 'ans' to the place where the function was invoked which is line 6. As soon as we encounter the return statement with 'ans' it finds the value of 'ans' inside the local memory of the execution context created by the function invocation which has the value of 4. Therefore the return keyword returns the control back to line 6 and in the global context the identifier of 'square2' holds now the value of 4. One more thing that happens when the whole function is executed is that this whole execution context for that instance of that function will be deleted, so it will be completed deleted.
      After that it will go to line 7 when we're invoking the same function again but with the argument of '4'. And as well as the first invocation a new execution context will be created.
   - creation phase (memory creation phase):
     First it will allocate memory for 'num' and assign a value of 'undefined' and then allocating memory for the identifier ans with the same value 'undefined'.
   - Code execution phase:
     First the function invocation in line 7 has the argument '4' which will be replacing the num parameter of the function in line 2. After that it goes to line 3 where it will do the calculation of num times num which is 16, and the 16 will replace the undefined placeholder inside attached to the 'ans' identifier. Then it goes to line 4 and the return statement takes back the control to line number 7, where the function was actually invoked, and now the value 16 will replace undefined in the 'square4' variable. As soon as we are done with the function execution, this whole execution context is now deleted. The line 7 was the last part of the code so, JavaScript is done with all it's work, now the program is finished, and the whole global execution context also get deleted.

It handles everything to manage this execution context creation, deletion, and the control it manages a stack. This is known as the call stack and it's the most beautiful thing that JS engine has. It is a stack and in the bottom of the stack we have our global execution context, so that means whenever any JS program is run, this call stack is populated with this Global execution context. And whenever a function is invoked a new execution context is created as in line 6. And that new execution context is pushed inside the stack, and once it returns 'ans' that execution context is popped out of the stack, and the control goes back to the execution context, so the control goes back to line number 6. We move to line 7 where the new invocation takes place and therefore, a new execution context was created. Now that new execution context will go up to the stack. Then when the function finishes executing it goes off of the stack, and the control goes back to the global execution context. This call stack is only for managing these execution contexts. After the whole code has finished execution the global execution context moves out of the stack and the call stack gets empty.

### What does call stack do?

Maintains the order of execution of execution contexts (It is also called as Execution context Stack, Program stack, Control stack, Runtime stack, Machine stack)

### Hoisting

```js
getName();
console.log(x);

var x = 7;

function getName() {
  console.log("Namaste JavaScript");
}
```

What will happen if we run that code?

Well, we would get:

1. Namaste JavaScript
2. undefined

The function call somehow accessed the function even before it was initialized but for variable 'x' didn't happen that way.

Let's remove the line 'var x = 7'

```js
getName();
console.log(x);

function getName() {
  console.log("Namaste JavaScript");
}
```

Here we would get:

1. Namaste JavaScript
2. ReferenceError: x is not defined

Now the result of logging the variable 'x' to the console shows an error that x is not defined. So, it's undefined and not defined the same thing? No, it's not.

```js
getName();
console.log(x);

var x = 7;

function getName() {
  console.log("Namaste JavaScript");
}
```

This beautiful thing is called as hoisting in JS. Hoisting is a phenomenom by which you can access this variables and functions even before you have initialized them without any error. So the line 'var x = 7;' you can just access it anywhere in the program.

Let's comment the first two lines and add a console.log inside the code at the end:

```js
// getName();
// console.log(x);

var x = 7;

function getName() {
  console.log("Namaste JavaScript");
}

console.log(getName);
```

What would happen if we run the code? Well, We would get the actual function printed literally in the console.

But what if we try to do the same befor initializing the function like this:

```js
getName();
console.log(x);
console.log(getName);

var x = 7;

function getName() {
  console.log("Namaste JavaScript");
}
```

The result will be the same as if 'console.log(getName)' were at the end of the code and in case of 'x' it gaves us undefined.

Let's grab the structure of the first code we had:

```js
var x = 7;

function getName() {
  console.log("Namaste JavaScript");
}

getName();
console.log(x);
console.log(getName);
```

Whenever we run a JS program an execution context is created, and it is created in two phases, the first phase is the memory creation phase, so this whole concept lies there only. So, let's start with our previous code. Before the code starts executing the memory allocates each and every variable and function, and for every variable it assigns the value of undefined as a placeholder, and for functions just assigns all the entire function, and that's set even before running the code (We can see this in reality if we go over sources in our developer console and put a debugger in the initial line of code and over Scope -> Global we can see the memory allocation).

Now, let's change those 3 last lines of code to the top:

```js
getName();
console.log(x);
console.log(getName);

var x = 7;

function getName() {
  console.log("Namaste JavaScript");
}
```

So, with this code even before after start executing the code the variables and functions are already placed inside the memory allocation with their respective values (undefined for variables and the whole function for functions). And that's the main reason why we get:

1. Namaste JavaScript.
2. undefined
3. function getName() {
   console.log("Namaste JavaScript");
   }

Let's remove the line code 'var x = 7;':

```js
getName();
console.log(x);
console.log(getName);

function getName() {
  console.log("Namaste JavaScript");
}
```

Now since we have removed that line of code the identifier for the variable 'x' is gone. So instead of undefined, we have the value of not defined. As soon as we go to the first line the variable 'x' is not palced in the memory allocation, we just have reserved memory for getName, so when the code tries to access 'x' throws a reference error because is not present in memory, and it is not initialized in any part of the code.

Now let's change this in the code:

```js
getName();
console.log(x);
console.log(getName);

var x = 7;

var getName = () => {
  console.log("Namaste JavaScript");
};
```

What would we get in the console as a result for getName();? We would get a TypeError: getName is not a function. So when we are executing the first line of the code when the getName is an arrow function it just behaves as another variable. Therefore what will do is even before executing the whole code in the memory creation phase of the execution context will be allocated just as if it were another variable with the identifier getName and will have assigned the value of undefined.

Now let's add another type of function to compare that in memory allocation:

```js
getName();
console.log(x);
console.log(getName);

var x = 7;

var getName2 = function () {};

var getName = () => {
  console.log("Namaste JavaScript");
};
```

Here, if we look up getName2 in the Global space memory, the value that it has assigned is undefined as a placeholder. This how it works and that's why you can access these variables and functions even before initialization.

Something to take into account is that you can access to call stack and see what is happening in the developer tools, so, you can actually test what is being said about the call stack and execution context more in detail.

### Functions and variable environment

How functions invocations work behind the scenes?

```js
var x = 1;
a();
b();
console.log(x);

function a() {
  var x = 10;
  console.log(x);
}

function b() {
  var x = 100;
  console.log(x);
}
```

In this code the result printed for a(); b(); and console.log(x); will be:

1. 10
2. 100
3. 1

So whenever JavaScript runs any program a global execution context is created.

Global execution context in the first phase (memory creation phase):

| Memory       | Code |
| ------------ | ---- |
| x: undefined |      |
| a: {...}     |      |
| b: {...}     |      |
|              |      |

before even executing a single line of code memory will be reserved to allocate our variables and functions in the first phase. So x will be pointing to undefined and functions will be pointing to its own function declarations.

Global execution context in the second phase (execution phase):

| Memory   | Code            |
| -------- | --------------- |
| x: 1     | var x = 1;      |
| a: {...} | console.log(x); |
| b: {...} |                 |

- So, first of all the first line starts executing and now x inside memory is pointing to the value of 1.
- Now goes to the second line of code and a function is invoked. A new execution context is created and goes inside up the stack.

  - This execution context has its own memory component (variable environment and code component):

  | Memory       | Code |
  | ------------ | ---- |
  | x: undefined |      |

  - Memory creation phase: So the x inside the function declaration 'a' has its own variable 'x' which has nothing to do with the one in the global execution context, and inside its execution context it has its memory allocation with the value of undefined attached to the variable.

  | Memory | Code            |
  | ------ | --------------- |
  | x: 10  | var x = 10;     |
  |        | console.log(x); |

  - Execution code phase: Now the program goes to line 7 and 'var x = 10;' is executed.
  - Then the program goes to line 8 where is a 'console.log(x);', and when we do a 'console.log(x);' the JS engine will look up for the value that 'x' has in the local memory space (variable environment) and then prints the value of 10 (value of 'x' in memory) in the console.
  - Now after that the function has finished its execution so it gets out of the call stack.

- Now the control goes back to number 2 where the function was invoked and goes one line more to line 3 and a new function is invoked and a new execution context is created and goes inside up the call stack.

  - Memory creation phase (variable environment): First of all we reserved memory allocation to all the variables and functions that are inside of that execution context

  | Memory       | Code |
  | ------------ | ---- |
  | x: undefined |      |

  - Code execution phase: First the JS engine goes to line 12 where 'var x = 100;' and then that line is executed, so the variable x inside the execution context in the memory component will be pointing now to the value of 100.
  - Then it goes to line 13 and it executes the 'console.log(x);' which then looks inside the local memory component for the value of 'x' which is 100 and then prints that value to the console.
  - After that, the execution of function finishes and the execution context gets out of the stack.

    | Memory | Code            |
    | ------ | --------------- |
    | x: 100 | var x = 100;    |
    |        | console.log(x); |

- Now, we return back to line 3 where the function was invoked but since it has finished execution we go to the next line which is line 4 and it executes the 'console.log(x);', so, it will start looking for the value of 'x' inside the local memory of the global execution context which is 1, and then will print one to the console.

- JS engine moves to the next line and it sees that's nothing more to execute. Once the whole code has been executed the global execution context is removed from the call stack.

### Window and this keyword

What happens if we use an empty file and execute the file and we set a debugger on line one? JS engine will create a global execution context and sets some memory space, and also creates something known as window.

So if we execute the first line and then type window and execute it we'll see something called Window in the console and we can see that has a lot of methods (functions) and variables. All of these are created by the JS engine and into the global space, you can access any variable or function inside the Window object anywhere in your JavaScript program.

JavaScript engine also creates a 'this' keyword. So if we type this and execute it in the console we'll see is giving us the Window object, so, the 'this' keyword in the global scope points to the Window object.

What is Window? Window is a global object which is created along with the global execution context, so, whenever a JavaScript program is run a global object is created and a global execution context is created and along with that global execution context a 'this' variable is created.

So the global object in case of browsers is known as Window. JavaScript doesn't run just in browsers, it runs on servers and other devices, and wherever JavaScript is running there must be a JavaScript engine. Therefore every engine of every browser has the responsibility of create its own global object. In case of browsers is known as Window, and in case of node is known as something else, so wherever you run the JavaScript program is different but there is always a global object created. The 'this' keyword is strictly equal to the window object.

If our file doesn't have any code inside that doesn't matter because once it gets executed the JS engine will create a global execution context with memory allocation along with the 'this' variable and also a global object will be created.

And if we start adding code to our file like variables and functions (variables with var), those variables and functions will be part of the global object (Window object) because they're being created in the global space (global scope).

If we wanted to log something we attached to the window object we can use this:

```js
var a = 10;
function b() {
  var x = 10;
}

console.log(window.a);
console.log(a);
```

So in the previous code we can see that for login a to the console we used 'window.a' and 'a'. It works the same because if you're not using the window keyword it assumes that you're trying to access that variable inside the global object.

Let's add something more in the code:

```js
var a = 10;
function b() {
  var x = 10;
}

console.log(window.a);
console.log(a);
console.log(x);
console.log(this.a);
```

If we log 'x' to the console what will be the result? The result will be a ReferenceError: x is not defined. Because it is defined inside a local scope that is inside the function. When we log 'this.a' to the console we get the same as with 'window.a' and 'a'.

So, the shortest program in JavaScript is with no code!

### Undefined vs not defined

Let's see what happens when we put a debugger in the first line of this code:

```js
var a = 7;
```

JS engine will create a memory space for the variable 'a' even before the line of code is run, and will assign a value undefined as a placeholder. And this is taken memory, so it is taking place in memory.

Let's add anothe line of code:

```js
var a = 7;
console.log(x);
```

So, what would happen here? Well, the log to the console will throw a ReferenceError: x is not defined and that is because we haven't declared the variable anywhere in our code, therefore is not a space reserved in memory for that variable.

Now we have this code:

```js
console.log(a);
var a = 7;
console.log(a);
```

If we log this to the console the first line will print undefined because it will take the value in which the variable was assigned in memory with the placeholder when the global execution context was created. And if we log the last line of code we will get 7 in the console because by that time the JS engine will have already executed the line where the value is assigned to the 'a' variable.

What would happen with this code?

```js
var a;
console.log(a);
```

Well, when the script log the value of 'a' to the console we can see the value of 'undefined' printed because since we're not initializing the variable with any value it just takes the value with which was assigned the first time it was placed in memory.

JavaScript is a loosely type language, and this means that does not attach to its variables any specific data type, therefore we can change the value of some variable like a string (like hello world) to a number (like 10) and to a boolean (like true), so, JavaScript is very flexible. So in the case of a means that we can put anything inside the variable 'a'. So, JavaScript is a loosely type language and a loosely type language is also known as weakly type language.

Never do this in JavaScript:

```js
a = undefined;
```

The reason is because undefined is a value or keyword in JavaScript, and is totally possible to assign undefined to any variable but it is kind of a mistake and a bad thing to do in JavaScript. This can lead to a lot of inconsistencies.

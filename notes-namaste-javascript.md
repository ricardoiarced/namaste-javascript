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

### The scope chain, scope and lexical environment

Let's suppose we have this code:

```js
function a() {
  console.log(b);
}
var b = 10;
a();
```

What would be the result of the 'console.log(b);' inside the function declaration? Well, it would be 10 printed in the console because first of all, a global execution context will be created, and then the memory creation phase will start, so, all the variables and the functions will be reserved in memory as identifiers. Variables will have attached the value of undefined as a placeholder and the functions their own functions. Now, as soon as 'var b = 10;' is executed, the identifier b will be pointing now to 10. and once 'a();' is executed a new execution context is created and since there is only a 'console.log(b);' it will start looking for the variable b outside its scope and will take the value of ten and then print that value to the console.

Let's add some more code:

```js
function a() {
  c();
  function c() {
    console.log(b);
  }
}
var b = 10;
a();
```

What would be the result of 'console.log(b);'? Well, it still will be 10. So it could access the variable that was outside its own function scope and even outside another function scope, and then there could access the variable value inside the global scope.

Now we have this code:

```js
function a() {
  var b = 10;
  c();
  function c() {}
}

a();
console.log(b);
```

What would happen with this code? Well, once it reaches the line 'console.log(b);' the console will throw us a ReferenceError: b is not defined. Here comes scope into picture. **Scope means where you can access a specific variable or function in your code**. Let's explain what happens. first a global execution context is created and is pushed up inside the call stack, it has its memory and code components. So before executing the code starts the first phase of the Global execution context creation which is the memory allocation for our variables and functions globally. So we have something like this:

    | Memory | Code            |
    | ------ | --------------- |
    | a: {...} |               |
    |    /||/   |                 |

The reference in the global level points to its own lexical environment plus null because it has no parent.

Then a new phase starts which is the code execution phase and the JS engine will execute the function call 'a();' creating a new execution context:

    | Memory | Code            |
    | ------ | --------------- |
    | a: {...} | a();            |
    |        |                 |

Here is the creation of the execution context for the function call 'a();'(Memory allocation phase):

    | Memory | Code            |
    | ------ | --------------- |
    | b: undefined |               |
    | c: {...}  |                 |
    |   /||/      |                 |

Here its reference points to its own lexical environment plus the global environment or global level.

Code execution phase:

| Memory   | Code        |
| -------- | ----------- |
| b: 10    | var b = 10; |
| c: {...} | c();        |

It is created another execution context because of the 'c();' call.

So here it is our new execution context with the first phase (memory allocation):

| Memory | Code |
| ------ | ---- | --- | --- |
| /      | ...  | /   |     |

**Lexical environment: Whenever a execution context is created a lexical environment is created as well. A lexical environment is the local memory along with the lexical environment of its parent. Lexical is a term that means in hierarchy or in order, so where the code is present physically**

For example in this code the 'c' function is lexically sitting inside 'a' function. So function 'c' is physically present inside function 'a', and 'a' is lexically inside the global scope.

When we say lexical environment that means the local memory along with the lexical environment of the parent.

In the execution context of 'c' we get a reference of the lexical environment of its parent which is 'a'. And what is the lexical environment of 'a'? is its lexical environment plus the lexical environment of its parent.

Then the code execution phase starts but the function is empty so it finishes execution and gets removed from the call stack

| Memory | Code |
| ------ | ---- |
|        |      |

Now we return to the execution context of the 'a();' call and it finishes execution so itw own execution context is removed from the call stack also.

| Memory   | Code        |
| -------- | ----------- |
| b: 10    | var b = 10; |
| c: {...} | c();        |

Then we get to line 10 and console.log and since is not in its own lexical environment and its parent lexical environment which is null, that's why the console prints null, so is not inside the scope chain.

That way of finding is known as scope chain. And it is the chain of all the lexical environments that references to the parent.

### let and const, temporal dead zone

Are let and const declarations hoisted in JavaScript? Yes, they are hoisted, but thet are hoisted very differently than the var declarations. You can say that they are in the temporal dead zone.

Let's put this code:

```js
let a = 10;
console.log(a);
var b = 100;
```

What would happen when we log to the console the variable 'a'? Well, we get 10 printed in the console. So behind the scenes if we put a debugger in the first line of the code we can see that even before executing the code the variable 'a' and variable 'b' have been placed in the memory space and have the value of undefined attached to them. But there is a slightly difference, the indentifier of 'a' is inside something known as script and the 'b' identifier inside of the global space. Memory allocation was assigned to 'b' and this variable 'b' was attached to the global object but in case of let and const they are allocated in memory as well and that is why is called hoisting but they are stored in a different memory space of global, and you cannot access this memory space, so, you can't access this const and let declarations before you have put some value in them.

What is a temporal dead zone? It is the time since the let variable was hoisted until it has some value initialized.

Let's take an example here:

```js
console.log(a);
let a = 10;
var b = 100;
```

The temporal dead zone starts above the let variable declaration, so if we inspect that with our debugger we can note that before everything is executed the variable 'a' is allocated in memory but in some different space than the global one where the variable 'b' is allocated. The variable 'a' has the value of undefined attached to it. So that's when the temporal dead zone starts because the variable 'a' has not been initialized, and the temporal dead zone ends when the initialization of the variable is executed (let a = 10;) and the value of 10 is replacing the placeholder of undefined in that specific space in memory.

Whenever you try to access a variable inside the temporal dead zone it gives you a ReferenceError: Cannot access 'a' before initialization.

Let's have this code:

```js
console.log("jsbshshshs");
let a = 10;
let a = 100;
```

What would be the result? Well, our console will throw a SyntaxError: Identifier 'a' has already been declared. And if we add some additional code before that redeclaration it won't execute any code if the JavaScript engine sees a redeclaration or duplicate of the same let variable.

You can't do this also:

```js
let a = 10;
var a = 100;
```

It will throw a SyntaxError: Identifier 'a' has already been declared.

But we can do this:

```js
var b = 10;
var b = 100;
```

This will not throw an error. So it's possible in var but not with let. let variables are more stricted than var variables.

Now let's play with const:

```js
let a;
const b;
b = 1000;
a = 10;
console.log(a);
```

const variables are more stricted than let variables. With let variables we can reassign values after declaring them but with const variables that's not possible and the console will throw us a SyntaxError: Missing initializer in const declaration. SyntaxError means that code won't even run, so it rejects it immediately no matter what. So that error 'Missing initializer in const declaration' means that const needs to be initialized when is declared in the same line.

So you need to do this:

```js
let a;
const b = 1000;
a = 10;
console.log(a);
```

And let's take another example of code to know one more thing about the const declaration:

```js
let a;
const b = 1000;
b = 10000;
a = 10;
console.log(a);
```

This time the console will throw a TypeError: Assigment to constant variable. We're trying to assign other value to a constant variable, and since our variable is a type const, so, it needs to be declared and initialized in one line and you can't assign a value later on.

SyntaxError: Missing initializer in const declaration is because we have missing syntax, and in the example of a const variable like before if we have something like this 'const b;' it expects to have the initialization as well 'const b = 10;' to clear that error.

SyntaxError: Identifier 'a' has already been declared. And this error happens when redeclaring the same variable with let, and again has to do with the syntax of the code because we're duplicating a declaration:

```js
let a = 100;
let a = 1000;
```

ReferenceError happens when the JS engine tries to find a specific variable inside the memory space and doen't find it or cannot access it.
Types of reference errors:
ReferenceError: You cannot access 'x' before initialization.
ReferenceError: 'x' is not defined.

### Block scope and shadowing

What is a block scope in JavaScript? let and const are block scoped. A block scope is the place where let and const variables exist.

This is a block in JavaScript:

```js
{
}
```

That block is also known as compound statement. A block combines multiple JavaScript statements into a group.

Example of it:

```js
{
  var a = 10;
  console.log(a);
}
```

Why we need to wrap all these statements together? We need to do so that we can use multiple statements in a place where JavaScript expects only one statement like this:

```js
{
  var a = 10;
  console.log(a);
}
if (true)
```

The console will throw an error where the if condition was written. And it would be a SyntaxError: Unexpected end of input. And that is because the if expects one statement at the same line where if was written.

Example with a valid statement for the if condition:

```js
{
  var a = 10;
  console.log(a);
}
if (true) true;
```

This is a valid statement, but if you want to write multiple statements you need to group them into a code block:

```js
if (true) {
  var a = 10;
  console.log(a);
}
```

Now this group of multiple statements can be used in a place when JavaScript expects one single statement. And this is the same reason why we use the block for while loops, for loops, and all other places.

Let's add another example:

```js
{
  var a = 10;
  let b = 20;
  const c = 30;
}
```

Block scope means that all the variables and functions written inside we can access them inside the same block. Once we run this code with the three variables inside the block, we can see that in the part of the memory allocation we can see that we got something called Block and inside we have 'b' and 'c' variables. In the case of 'a' is hoisted inside the Global scope. That's why let and const variables are block scoped because they are in memory but in an independent space from the global scope that is reserved just for that block. You cannot access let and const variables outside the block while the var variable can be accessed even outside the block because is not block scoped, it is in the global scope.

Let's see what happens in the console if we try to print everything inside and outside the block:

```js
{
  var a = 10;
  let b = 20;
  const c = 30;
  console.log(a);
  console.log(b);
  console.log(c);
}
console.log(a);
console.log(b);
console.log(c);
```

And it will print the value of 'a', 'b', 'c' and 'a' again. For the other logs with 'b' and 'c' the console throws a ReferenceError: b is not defined. If we head over to the Scope part inside the dev tools and we execute the line after the block scope, in the memory the Block with the variables is gone now, and only it is present the global scope.

And what is shadowing in JavaScript?

```js
var a = 100;
{
  var a = 10;
  console.log(a);
}
```

The variable 'var a = 10;' inside the block shadows the variable 'var a = 100;' outside the block, so, the value printed will be 10;

And if we have this:

```js
var a = 100;
{
  var a = 10;
  console.log(a);
}
console.log(a);
```

The result will be the same because the variable again is shadowing the one which is outside of the block and this is because both variables inside the console.log() are pointing to the same memory location and when we get to those logs the identifier has changed its own value to 10(console.log(a);).

With let does not happen that way:

```js
let b = 100;
{
  let b = 20;
  console.log(b);
}
console.log(b);
```

What would heppen in the console? Well the console will print the value of 20 and 100. The let 'b' variable inside the block shadows the other one outside the block and that's why we get 20 first and the 100 is because of the log outside the block. The 'b' variable is in the Script space, so, it's not even in the global space, and the other 'b' variable is inside the Block scope. The same happens with const variables, so, no need to explain.

Now let's take an example with function scope:

```js
const c = 100;
function x() {
  const c = 30;
  console.log(c);
}
x();
console.log(c);
```

This again will be replicating the shadowing of the 'c' variable, so, we get 100 and 30 printed in the console.

Example of illegal shadowing:

```js
let a = 20;
{
  var a = 20;
  console.log(a);
}
console.log(a);
```

We cannot do this because the console will throw a SyntaxError: Identifier 'a' has already been declared. It's like illegal shadowing, so, we can't shadow a let using var. This is because it crosses its boundaries so the same variables are like in the same scope.

But we can do this:

```js
var a = 20;
{
  let a = 20;
}
```

This is completely valid.

We have another example:

```js
const a = 20;
{
  const a = 100;
  {
    const a = 200;
    console.log(a);
  }
}
```

Here every block scope has its own lexical scope, so the result will be 200 in the console.

And if we have this:

```js
const a = 20;
{
  const a = 100;
  {
    console.log(a);
  }
}
```

Here we will get 100 in the console.

And lastly:

```js
const a = 20;
{
  const a = 100;
  {
    const a = 200;
  }
}
console.log(a);
```

Here the result will be 20. So, lexical scope works the same in blocks also.

Let's talk about arrow functions, whether you declare a function with a function keyword or use the arrow syntax they have the same rules for scope related to functions

### Closures

Example of closure:

```js
function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  y();
}
x();
```

So, for the lexical scope the console.log() will try to find the variable a inside its own lexical scope and since is not there will go to the lexical scope of its parent and there will find the variable a assigned with the value of 7 and will print to the console the 7. This is what a closure is!

A closure means a function bind (along) together with its lexical environment. In the example the 'y' function forms a closure with the variables that are part of the 'x' function. It has access to its parent lexical scope. In other words a closure is a function bundled together with its lexical environment.

Another example of closure but returning a function inside a function:

```js
function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  return y;
}
var z = x();
console.log(z);
```

Here we're returning the function 'y' when invoking the function 'x', and the return is going where the function was invoked, so it will be on the call of 'x();' and if we save the invoke of the function inside a variable we can see what is returning y. And in the console we can see that is returning the function itself.

So when the line the function 'x' returns the 'y' function. The execution context of the function 'x' gets out of the call stack and the function 'y' was returned outside and is stored in 'z'.

So we can access the function by calling the function 'z();' now:

```js
function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  return y;
}
var z = x();
console.log(z);
//.....
z();
```

This will print 7; Here closure comes into picture. Functions are so beautiful that when they reuturn another function this still maintains its lexical scope. They remember where the are actually present. Even though the execution context of the function 'x' was out of the call stack, the function 'y' remembers its lexical scope. When we return the function is not only the function that was returned but a closure was returned. That closure is the function along with its lexical scope bundled together.

Let's take this example:

```js
function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  a = 100;
  return y;
}
var z = x();
console.log(z);
//.....
z();
```

What would be the result of calling 'z();'? It will be 100 printed in the console. That's because the closure takes the reference no the value in memory after the function was returned.

Another example:

```js
function z() {
  var b = 900;
  function x() {
    var a = 7;
    function y() {
      console.log(a, b);
    }
    y();
  }
  x();
}
z();
```

So, What would happen with this code behind the scenes? Well, it will generate a closure which is a function bundled together with its lexical environment, and it will remember the values of b and a even though their execution contexts are gone from the call stack.

Uses of Closures:

- Module Design Pattern
- Currying
- Functions that run like once
- memoize
- maintaining state in async world
- setTimeouts
- Iterators
- And many more

### setTimeout + Closures Interview Question

We have this example:

```js
function x() {
  var i = 1;
  setTimeout(function () {
    console.log(i);
  }, 1000);
  console.log("Namaste JavaScript");
}
x();
```

The function inside setTimeout forms a closure, so that function remembers the reference to 'i'. What does the setTimeout function with the callback function? Well it stores it in some place and attaches a timer to it, so the JavaScript code proceeds and that's when Namaste JavaScript is printed to the console and once the 3000 milliseconds have passed it takes the callback function and puts it again into the call stack and runs it, that's how setTimeout works.

We have another example:

```js
function x() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  console.log("Namaste JavaScript");
}
x();
```

Suppose you are givena problem where you need to print Namaste JavaScript first then 1 after 1 sec, 2 after 2 secs, 3 after 3 secs, 4 after 4 secs and 5 after five secs. The previous code will work that way? Nope. It will print Namaste JavaScript first but it will print 6 after 1, 2, 3, 4, 5, secs. Why does this work this way? It is working this way because of the closure. When this setTimeout takes the callback function (5 functions) outside and puts it in another place with a timer, that function remembers the reference to i, The 5 copies are getting the reference of i because all the environments of those functions are the same. But JavaScript does not wait for anything the loop will run after reaching the condition to stop the loop and by the time the copies print the value of i, i will be pointing to 6 in the memory allocation so it will print 6. How can we fix this? A very quick way of fixing it will be using let instead of var inside the foor loop.

Example with the solution:

```js
function x() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  console.log("Namaste JavaScript");
}
x();
```

So in this example what happens is that let keyword is block scoped so in each iteration of the foor loop the variable 'i' is a new copy of variable 'i' and each time setTimeout is run the callback function has a new copy of i with it. When i = 2 the callback forms a closure with that value in memory of that copy of 'i' and prints it, and so on with the other values of i. So it forms a closure with each iteration. But if the interviewer says you that you need to do it with var only. What would you do? Only closures can help us here.

Example with the solution with var:

```js
function x() {
  for (var i = 1; i <= 5; i++) {
    function close(x) {
      setTimeout(function () {
        console.log(x);
      }, x * 1000);
    }
    close(i);
  }
  console.log("Namaste JavaScript");
}
x();
```

Here we need to make this work with var and previously it wasn't working because the variable 'i' was refering to the same memory location. Somehow we have to give a new copy of 'i' everytime to the setTimeout and forms a closure with it. To achieve this we need to create a function and then put inside the setTimeout function, and after that call the function passing 'i' as an argument and put a variable as a parameter to receive the value of 'i' on each iteration. And that works beautifully because whenever you call the function with 'i' it creates a new copy of 'i' and pass it to the function.

### First class functions

What is a function statement?

```js
function a() {
  console.log("a called");
}
```

What is a function expression?

```js
var b = function () {
  console.log("b called");
};
```

Here function acts like a value.

What is the difference between a function statement and a function expression? The main difference between the two is hoisting so let's take this example:

```js
a();
b();
function a() {
  console.log("a called");
}

var b = function () {
  console.log("b called");
};
```

What would be the result for both of them? Well, the result for the call of 'a();' would be 'a called' and for the call of 'b();' would be a TypeError: b is not a function. That is because when the execution context is created the identifier b which is the variable that stores the function in our code, inside memory allocation has the placeholder of undefined, so it is treated as a variable. And when the execution reaches the invocation of the function 'b' then it throws the TypeError: b is not a function because it was treated like a variable.

Function statement is also known as function declaration

What is an anonymous function?

```js
function () {

}
```

Anonymous functions don't have its own identity means that if you create an anonymous function like the previous one this will result to be a SyntaxError. But why? It looks like a function declaration or statement and according to ECMAscript specification function statements should always have a name, so, this is an invalid syntax. And the SyntaxError says SyntaxError: Function statements require a function name. Anonymous functions are used when functions are used as values.

What is a named function expression? A named function expression is exactly the same as the function expression using an anonymous function but with a name.

Let's see that in an example:

```js
var b = function xyz() {
  console.log("b called");
};
xyz();
```

What would be the result in the console? It will throw a ReferenceError: xyz is not defined. It creates a variable inside its own local scope, so, you can access the variable inside but not outside of its scope.

What are parameters and arguments?

Whenever you're creating a function inside the parenthesis you can put parameters, and that creates variables in the local scope of the function. And arguments are used inside the parenthesis when you're calling a function.

What are first class functions? Are functions passed as arguments (values) to other functions or return a function from another function:

```js
var b = function (param1) {
  console.log(param1);
};
function xyz() {}
b(xyz);
```

The ability to use functions as values is known as first-class functions.
first class functions are first-class citizens. When are used as values.

If you change var keyword in a function for a let or const it behaves the same way as variables like they have the temporal dead zone.

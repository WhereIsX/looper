# Looper

Hi! Welcome! This is Looper, a Ruby loop animator.  It's meant to take in a small snippet of ruby `.each` code and display the values of all variables through various stages.  Great for beginners learning to code.  Feel free to clone it, fork it, give it a loop, and let me know how it went!  

![](http://g.recordit.co/uIEQLjf9Ck.gif)

**WARNING:** Do not host Looper on a public server.  It is insecure AF! Looper uses Ruby's `.eval(string)`, which gives tremendous power to the `string` it evaluates.


### built with
- Postgres and Ruby on Rails in the backend, `looperBack`
- React, Redux, MaterialUI in the frontend, `looperFront`

### future of Looper (end of the line)
**TLDR:** setting up Looper is not beginner friendly, ergo I'm no longer going to update this repo.  Look out for Looper2.0 though, which will run in your local browser :>  

I recently (Feb 2020) found that Looper is horribly difficult to set up.  Even as the creator of Looper, I'm mildly frustrated that I have to have the right ruby version (thank you rbenv, but idk how your cousin rvm works), the updated bundler, a postgres db ready to be connected, etc.  And if I'm frustrated... then this is *not* a good app for folks learning / getting better at ruby.  While I can make some changes, like disconnecting the postgrest from the rails app, I still don't want to subject anyone to the lengthy set up.  

**A good tool *just works*.**

And Looper, as it is right now, isn't that.  :(  So, with a heavy heart, I'm declaring this repo dead.  

BUT there may be hope!  I'm going go try remaking Looper into a front-end only project using [Opal](https://opalrb.com/), a Ruby to JavaScript source to source compiler.  That way, I can host it, and you can break it :D (in your own browser, without any harm to my 'boopa)


### story behind Looper
When I first learning to code, I found it very difficult to keep track of the iterative pattern and all the syntax to set it up.  I also didn't know `binding.pry` existed, so I stuck `puts` everywhere.  It was very tedious and I always wished there was some kind of tool that would show me what each variable's value was at the end of every line.  So I made Looper.  I hope it can help others learn to code because coding can be so fun.

#### three ways to "parse"
Right now, Looper looks and works kind of like how I initially dreamed it would.  While making Looper, I came up with at least 3 ways I could make this happen:

1. make a parser and lexer
  - Why I Didn't: I felt pressed for time and was not confident I'd learn all the tools to make it work in time.  (Looper started as a graduation project)
    - I looked at some videos for making parsers and lexers, as well as slides from Universities CS courses, and it looked like I would need at least a couple weeks to understand how it all worked, and another couple weeks to make my own for the Ruby language.  
    - I'd be reimplementing the Ruby interpreter? I should probably look up how the Ruby interpreter does it first.


2. take in a `string` of code, and stick `puts` in between every line.  Use I/O File class to run it as another file, such that it `puts` to the command line, and then return the command line outputs.
  - Why I Didn't: See above, but not as extreme.


3. take in a `string` of code, collect all variable values in an array, and then make an array of those variable_values array.
  - Why I Did: I didn't need to deal with the I/O File class :D (yes, I was a bit lazy here)

... TBD!

**Last Updated: Jan 08, 2018**


<!-- ##### design decisions
- Ruby on Rails in the backend does most of the work
  - single endpoint: `POST` /code_bits
    - accept variable declaration
    - accept `.each` parts: collection, element, block
  - returns an array of states
    - as string, for easy frontend rendering
  - misc.
    - CodeBits instance `belongs to` a collection, aka a Variable instance
    - CodeBits displays a
- React in the frontend to display -->

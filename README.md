# Looper

Hi! Welcome! This is Looper, a Ruby loop animator.  It's meant to take in a small snippet of ruby `.each` code and display the values of all variables through various stages.  Great for beginners learning to code!

![](http://g.recordit.co/uIEQLjf9Ck.gif)

**WARNING:** Do not host Looper on a public server.  It is insecure AF.  Looper uses Ruby's `.eval(string)`, which gives tremendous power to the `string` it evaluates.


##### built with
- Ruby on Rails in the backend, `looperBack`
- React, Redux, MaterialUI in the frontend, `looperFront`



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

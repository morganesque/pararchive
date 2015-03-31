# Pararchive Prototype

This repo is where I stored all the stuff I used for creating a number of rapidly evolving prototypes during the design process of the [Pararchive](http://pararchive.com) project.

The prototypes were built using (Backbone)[http://backbonejs.org/] and [Marionette](http://marionettejs.com/) to provide a front-end framework for passing data around and creating a UI. 

I used a MySQL database and [RedBeanPHP](http://www.redbeanphp.com/) to create a RESTful API which formed a persistence layer for any data entered.

For the record I'd say that I found this combination of technologies to be a pretty good bet for rapidly prototyping quite a complex service and whilst it is quite heavily client-side weighted (in terms of development) the structure of Backbone & Marionette (and the discipline of a RESTful API) mean that you don't end up with a great be ol' hacky mess ;-)
#conREST#
conREST is an application to configure and chain multiple REST calls.

[![Build Status](https://travis-ci.org/EnoF/con-rest.svg?branch=travis)](https://travis-ci.org/EnoF/con-rest)

##Introduction##
While testing our `REST services` we noticed that our `REST services test tool` are focusing on single calls.
This resulted in manual actions in order to reuse the result retrieved from the previous requests to perform a test
for an `workflow`.

This also implied that the knowledge of the `workflow` has to be stored outside of the test tool. We want to have all
information grouped together, easy accessable and sharable.

##Features##
###Implemented###
* REST call deletion
* REST call editing
* REST call execution
* REST call registration
* Workflow deletion
* Workflow editing
* Workflow execution
* Workflow registration

###Roadmap###
* Connectors (INPROGRESS)
* Mappers (INPROGRESS)
* Transformers
* User authentication
* User roles/rights

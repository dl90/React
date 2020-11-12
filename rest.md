# REST

Representational State Transfer

* style of software architecture
* resources should be language-agnostic and standardized for client/server interactions

## Restful architecture

* client server
  * separation of concerns between user interface and data storage
  * improves scalability and allows changes due to loose coupling
* statelessness
  * server has no client context between requests, session state stored client side (JWT)
  * session state can be stored on a db for auth (Redis session cache)
* cacheability
  * clients/servers can cache responses
  * responses must specify cacheability to prevent stale data
* layered system
  * clients do not know which server it is connected to (reverse proxy/load balancer)
  * servers may collect data from other servers to build the response
* uniquely addressable resources
  * each resource is unique, using HTTP request methods

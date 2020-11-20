# Web Architecture

motivation:

* better code organization and reusability, additional features, scales
* decoupled front and back end, connected through http requests

## Representational State Transfer (REST)

* style of software architecture
* resources should be language-agnostic and standardized for client/server interactions

### Restful architecture

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

---

## Model View Controller (MVC)

* Model: managing data of application, receives inputs from controller, business logic
* View: User interface
* Controller: responds to user input and interacts/relays to Model
  * interface between view and model
  * receive and send data but does not manipulate it

pro:

* high level separation of concerns
* easier to collaborate (front/back)
* layered testing

con:

* 1 : 1 controller to model standard
* feature break down in to MVC may be difficult/trivial
* larger code base

---

## Model View ViewModel (MVVM)

controller may not be suitable for all web apps (SPA)

* relies heavily on frontend
* ViewModel acts as a binder that binds data between View and Model
* designed to allow the View and Model to communicate directly
* MVVM allows SPA to quickly/fluidly save info to db
* separates view from the rest of the layers
* ViewModel transforms model data to view representation (creates data binding)

pro:

* uses data binding, uses more memory

con:

* overkill for simple apps, mostly used for SPA

---

* two way data binding: data changes in model or view are reflected on both sides
* one way data binding: UI triggers model to update data (Redux dispatch/reducers/store), only model has access to change app state
  * deterministic, easier to follow

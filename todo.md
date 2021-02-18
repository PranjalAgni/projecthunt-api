### GET /users [x]

- Query Params
  - ?sortBy
    - popular []
    - recent (people who have recently uploaded a product) [x]
- Must be paginated

### GET /users/{userId} [x]

Get a single user.

### GET /users/{userId}/projects [x]

Projects of a particular user

- Must be paginated

### GET /users/{userId}/votes []

### GET /users/{userId}/comments []

### GET /hashtags []

list of all hashtags

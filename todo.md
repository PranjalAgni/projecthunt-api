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

### GET /users/{userId}/votes [x]

### GET /users/{userId}/comments [x]

### GET /hashtags [x]

list of all hashtags

### POST /projects [x]

Create a new project

### GET /projects []

- Query Params
  - ?sortBy
    - new
    - trending
    - popular
  - ?name=X
    - search for projects like %X%
  - ?tag=xxx
    - list all projects of hashtag xxx
- Must be paginated

### GET /projects/{projectId} [x]

Fetches a single project by project id

### POST /projects/{projectId}/vote [x]

```jsx
{
  value: 1;
}
```

### POST /projects/{projectId}/comments [x]

### GET /projects/{projectId}/comments [x]

[] Refactor codebase
[] Write a exception handling class
[] Add salting for password hashing
[] Integrate Sentry for monitoring(logging)
[] Handle edge cases for logout

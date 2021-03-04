# PerfectCode

## The Only Code Review API That Makes You Better

PerfectCode aims to allow users to upload their code files, and receive a review and corrections of styling inconsistencies or errors. Focused on allowing the user the opportunity to improve, PerfectCode allows users to create an account with their code submission history, so they can see common issues and work to improve.

## Getting Started

The base URL for perfect code is currently:

```zsh
http://localhost:3000
```

### Signing Up Users

To begin using Perfect Code, users must first have an account.

To sign up users, you'll need to make a POST request to:

```zsh
/user/signup
```

**Request**:

```json
{
  "username": "testusername",
  "email": "test@perfectcode.com",
  "password": "password"
}
```

You'll receive a "Sign up successful!" message in response that you can use to confirm success or display to users on the front end.

When signing up users, users are also provided with an active JWT token.

**Response**:

```json
{
    "msg": "Sign up successful!",
    "user": {
        "username": "testusername",
        "email": "test@perfectcode.com",
        "codeSubs": []
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI2MDNkNjc4Y2M4NDM5NjAwMTRiNWIxNzgiLCJpYXQiOjE2MTQ2NTcyMjUsImV4cCI6MTYxNDY2MDgyNX0.clQhtrzV-xwOmK9ZyuKyYLuyd1IipNvjHOMz-8FjJmY"
}
```

### Signing In Users:

To sign in users, make a POST request to:

```zsh
/users/signin
```

In response, you'll receive a JWT token that can be used to authenticate subsequent requests. Our server will expect the token to be returned in subsequent request headers as an 'Authorization' header with a Bearer token. Your headers must follow this pattern:

```zsh
"Authorization": "Bearer <token>"
```

It will be expected that there is a space between "Bearer" and the JWT token.

**Sign In Request**:

```json
{
  "username": "someusername",
  "password": "somepassword"
}
```

**Sign In Response**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI2MDNkNjc4Y2M4NDM5NjAwMTRiNWIxNzgiLCJpYXQiOjE2MTQ2NTcyMjUsImV4cCI6MTYxNDY2MDgyNX0.clQhtrzV-xwOmK9ZyuKyYLuyd1IipNvjHOMz-8FjJmY"
}
```

### Submitting Code

The current version of Perfect Code only supports Github submissions. This means that users are required to have a Github account in order to use our API.

In future releases, we hope to also accept code submissions via file paths, so that a Github account isn't required.

Users will need to provide their Github username, as well as the name of their repository.

Optionally, users can provide an *oid*, which can be a commit hash or or a branch name. If this isn't provided, the latest default branch of the repository will be used.

**Request**:

Code submission requests should be made as a POST request to:

```zsh
/submission/new
```

Using a branch name:

```json
{
  "repo": "perfectCode",
  "owner": "testgithubusername",
  "oid": "main"
}
```

Using a commit hash:

```json
{
  "repo": "perfectCode",
  "owner": "testgithubusername",
  "oid": "cd70ccd21fd71b9ed7e8dc75f375316b16aa3ddb"
}
```

Without oid (will use latest commit on main or master branch):

```json
{
  "repo": "perfectCode",
  "owner": "testgithubusername"
}
```

**Response**:

Once the user submits code, it will be stored in their history and packaged to be analyzed. The submission response will contain the submission object.

```json
{
  "submission": {
       "_id": "603db58ae3e3ee0015f5a5f7",
       "owner": "githubusername",
       "repo": "name-of-repository",
       "oid": "branch-name",
       "__v": 0
   }
}
```

### Getting Code Analysis - COMING SOON

To receive an analysis, once users have bundled their files and created a submission, they can send this submission to our code analysis API in order to receive an analysis of their code.

This will return suggestions that they are able to access in their history and review indefinitely.

**Request**:

Requests for analysis will be sent as a GET request to:

```zsh
/submission/:id
```

Where the "id" we expect is the returned ObjectId of the submission bundle to be analyzed.

This will enable our code analysis API to query for the documents, saving your users wait time.

**Response**:

*This feature is currently not available, but will be made available for the next major release*.

### Reviewing Code Analysis - COMING SOON

**Request**:

To view a completed analysis, make a GET request to:

```zsh
/submission/:id/analysis
```

Where the "id" we expect is the returned ObjectId of the submission bundle that's been analyzed, and that the user would like to view.

**Response**:

*This feature is currently not available, but will be made available for the next major release*.


### Deleting User Accounts:

Users will have the ability to delete their accounts and data.

**Request**:

To delete a user account, please send a DELETE request to:

```zsh
/user/delete
```

To avoid passing ID's through query parameters, identifying routes will find the user account to delete by an active JWT token. This means that you will also need to ensure to send an Authorization header.

```json
headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI2MDNkNjc4Y2M4NDM5NjAwMTRiNWIxNzgiLCJpYXQiOjE2MTQ2NTcyMjUsImV4cCI6MTYxNDY2MDgyNX0.clQhtrzV-xwOmK9ZyuKyYLuyd1IipNvjHOMz-8FjJmY"
}
```

**Response**:

A successful delete request will send a status code of **204**.

### Updating User Accounts:

Users will also have the ability to change their email or password. Additional verification for changing the email or password will be up to you and your application.

**Request**:

To update user data, please make a PUT request to:

```zsh
/user/update
```

To avoid passing ID's through query parameters, identifying routes will find the user account to delete by an active JWT token. This means that you will also need to ensure to send an Authorization header.

```json
headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI2MDNkNjc4Y2M4NDM5NjAwMTRiNWIxNzgiLCJpYXQiOjE2MTQ2NTcyMjUsImV4cCI6MTYxNDY2MDgyNX0.clQhtrzV-xwOmK9ZyuKyYLuyd1IipNvjHOMz-8FjJmY"
}
```

The user attributes that will be updated will be the attributes that are passed through the request body. Valid attributes are:

- username:String

- password:String

- email:String


Example request:

```json
{
  "username": "newusername"
}
```

```json
{
  "email": "mynewemail@mail.com"
}
```

You may pass as many valid fields through a single PUT request as you would like at one time. Any combination of email, username, and password, so long as they are valid, are currently accepted.

**Response**:

Perfect-Code will return to you the updated user information. This can be used to show the user instantly their updated values.

```json
{
  "user": {
    "codeSubs": [
            "603db58ae3e3ee0015f5a5f7"
        ],
        "_id": "603d678cc843960014b5b178",
        "username": "NEW",
        "email": "TESTUPDATE@test.com",
        "password": "test",
        "__v": 1
  }
}
```

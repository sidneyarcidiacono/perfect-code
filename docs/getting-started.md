# Getting Started

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

When signing up users, users are not initially provided with an authentication token. You will have to prompt the user to sign in once they've created their account.

**Response**:

```json
{
    "msg": "Sign up successful!",
    "user": {
        "username": "testusername",
        "email": "test@perfectcode.com",
        "codeSubs": []
    }
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

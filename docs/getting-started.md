# Getting Started

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

Once the user submits code, it will be stored in their history as well as analyzed. The submission response will contain both the data they just submitted as well as the result of their code's analysis. 

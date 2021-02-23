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

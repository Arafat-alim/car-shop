# Project Name: `Car Shop`

- ER-Diagram

```md
users[icon: user] {
\_id string pk
email string unique
password string
role string enum[user, admin]
createdAt Date
updatedAt Date
}

cars[icon: car] {
\_id string pk
make string
model string
year number
price number
image string
description string
slug string unique
createdBy ObjectId fk users
createdAt Date
updatedAt Date
}

cars.createdBy - users.\_id
```

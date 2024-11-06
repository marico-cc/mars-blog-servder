# Write your query or mutation here

```
query findAll($userIds: [ID!]!) {
    users(userIds: $userIds) {
        id
        userName
        email
    }
}

{
  "userIds": [
    "0aa88744-223b-49b3-b240-11c5d14ac79e",
    "16b4cd2c-9fb8-4dd3-a998-39c262269a54",
    "210d49da-6f3a-4efc-bb32-93ab9cdf2981"
  ]
}
```
```
 query finOne {
   user(id:"302f10f2-f4d7-40a3-9166-f4f4c83c1e8d") {
     id
     userName
     email
   }
 }
```
```
 mutation createUser($createUserInput: CreateUserInput!) {
   createUser(createUserInput: $createUserInput) {
     id
     userName
     nickName
     email
     phone
     gender
   }
 }

 {
    "createUserInput":
      {
       "userName": "test6",
       "nickName": "Test6",
       "email": "look@marico.cc",
       "password": "123456",
       "phone": "18660050334",
       "gender": "male"
     }
   }
```

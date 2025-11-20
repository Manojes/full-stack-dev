authRouter
POST/signup
POST/login
POST/logout

ProfileRouter
GET/profile/view
PATCH/profile/edit
PATCH/profile/password

ConnectionRequestRouter
POST /request/send/interested/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:requestId
POST /request/review/rejected/:reqeustId


Get /user/connection
get /requests/received
get /feed- gets you yhe profiles of other users on platfrom
status:ignore,interested,accepted,rejected

// each can be grouped
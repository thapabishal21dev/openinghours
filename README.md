# Opening Hours API

This API provides endpoints to manage and retrieve opening hours for a business.

## Installation

1. Clone the repository:

git clone https://github.com/thapabishal21dev/openinghours.git

2. Install dependencies:

cd opening-hours-api
npm install

3. Start the server:

node index.js

## Endpoints

### 1. GET /getopeninghours

This endpoint retrieves the opening hours for the business.

#### Testing in Postman:

1. Open Postman.
2. Set the request type to GET.
3. Enter the following URL: `http://localhost:3000/getopeninghours`.
4. Click Send.
5. You should receive a response containing the opening hours for the business.

### 2. POST /updatesingledaystatus

This endpoint updates the opening hours for a specific day.

#### Request Body:

json
{
  "day": "Monday",
  "date": "2024-03-18",
  "status": "Open",
  "open": "09:00",
  "close": "17:00"
}

Testing in Postman:

    Open Postman.
    Set the request type to POST.
    Enter the following URL: http://localhost:3000/updatesingledaystatus.
    Set the request body to the JSON mentioned above.
    Click Send.
    You should receive a response confirming the update.


### 3. POST /updatesingledaystatus

This endpoint updates the opening hours for a all days for the next week.
Request Body:

json
{
  "opening_times": {
    "Sunday": {
      "date": "2024-03-17",
      "status": "closed",
      "open": "10:00",
      "close": "18:00"
    },
    "Monday": {
      "date": "2024-03-18",
      "status": "closed",
        "open": "10:00",
      "close": "18:00"
    },
    "Tuesday": {
      "date": "2024-03-19",
      "status": "closed",
         "open": "10:00",
      "close": "18:00"
    },
    "Wednesday": {
      "date": "2024-03-20",
      "status": "closed",
         "open": "10:00",
      "close": "18:00"
    },
    "Thursday": {
      "date": "2024-03-14",
      "status": "open",
        "open": "10:00",
      "close": "18:00"
    },
    "Friday": {
      "date": "2024-03-15",
      "status": "open",
        "open": "10:00",
      "close": "03:00"
    },
    "Saturday": {
      "date": "2024-03-21",
      "status": "closed",
        "open": "100",
      "close": "00"
    }
  },
  "_id": "65f686403cce7575867cc978"
}


Testing in Postman:

    Open Postman.
    Set the request type to PUT.
    Enter the following URL: http://localhost:3000/updateopeninghours.
    Set the request body to the JSON mentioned above.
    Click Send.
    You should receive a response confirming the update for the next week.


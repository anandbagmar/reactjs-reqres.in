# react.js sample working with reqres.in Api

#  Features:
 - Sign up (using Api)
  - Log in (using Api)
  - Get users list (from Api) and save it to redux store
  - Edit a user (sending request to Api) and save changes to redux store
  - Add a new user (sending request to Api) and save changes to redux store
  - Delete a user (sending request to Api) and delete user from redux store

 In the project directory, you can run:
```sh
npm i
npm start
```


 #  Technologies:
 - react.js
  - react-redux
  - redux-saga
  - axios
  - styled-components
  - loadash

# End-2-End (Functional) Tests
* End-2-End (E2E) Functional Tests are implemented using Selenium-Java. 
* Visual validation is done using Applitools (https://applitools.com)
* Intelligent stubbing is achieved using Specmatic (https://specmatic.in)

For the purpose of the demo, the /api/users?delay=2&page=1 GET endpoint is stubbed using Specmatic

## Running the E2E tests
To run the tests, follow the below steps:
* Signup for a free Applitools account from https://auth.applitools.com/users/register
* Save the Applitools API as an environment variable with name - APPLITOOLS_API_KEY
    ```
    > export APPLITOOLS_API_KEY=..... (on Linux / Mac)
    ```
    or
    ```
    > set APPLITOOLS_API_KEY=..... (on Windows)
    ```
* Download Specmatic from (https://github.com/znsio/specmatic/releases) to some directory 
* Start Specmatic in stub mode and give it the path to the Specmatic spec

    Example:
    If Specmatic jar is downloaded in directory ./temp
    ``` 
    java -jar ./temp/specmatic.jar stub ./src/e2eTest/resources/getUsers.qontract
    ```

* Run the test
```
./gradlew clean test
```

* Check Applitools dashboard (https://eyes.applitools.com) for visual test results
* TestNG logs of executed tests are available in the reports directory




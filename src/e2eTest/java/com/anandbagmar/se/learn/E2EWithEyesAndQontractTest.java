package com.anandbagmar.se.learn;

import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.selenium.Eyes;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.filter.log.LogDetail;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Method;
import java.time.Duration;

import static io.restassured.RestAssured.given;

public class E2EWithEyesAndQontractTest extends BaseTest {
    private final String appName = "reactjs-reqres.in";
    private final String qontractServerUrl = "http://localhost:9000";
    private final String qontractServerExpectationEndpoint = "/_qontract/expectations";

    RectangleSize viewportSize = new RectangleSize(1024, 768);

    @BeforeMethod(alwaysRun = true)
    public void beforeMethod(Method method) {
        setupBeforeMethod(appName, method, viewportSize, true, true);
    }

    @Test(description = "Login and update user name")
    public void loginAndUpdateUserName() {
        Eyes eyes = getEyes();
        WebDriver driver = getDriver();

        setExpectationInQontract(loadAndUpdateExpectationForUsers());

        String url = "http://localhost:3000";
        driver.get(url);
        eyes.checkWindow("onLoad");
        driver.findElement(By.cssSelector("input[name='email']")).sendKeys("eve.holt@reqres.in");
        driver.findElement(By.cssSelector("input[name='password']")).sendKeys("cityslicka");
//        ((JavascriptExecutor) driver).executeScript("document.querySelector(\".form-btn\").style.backgroundColor = \"blue\"");
//        ((JavascriptExecutor) driver).executeScript("document.querySelector(\"input[name='email']\").style.borderColor = \"blue\"");
//        ((JavascriptExecutor) driver).executeScript("document.querySelector(\"label[for='email']\").style.backgroundColor=\"grey\"");
//        ((JavascriptExecutor) driver).executeScript("document.querySelector(\"label[for='email']\").style.color=\"#431\"");
        eyes.checkWindow("enteredCredentials");

        driver.findElement(By.cssSelector(".form-btn")).click();
        explicitlyWaitFor(driver, By.cssSelector("button.btn.logout"));
        eyes.checkWindow("after login");

        driver.findElement(By.cssSelector("a.btn.edit")).click();
        eyes.checkWindow("edit user name");
        driver.findElement(By.cssSelector("input[name='first_name']")).clear();
        driver.findElement(By.cssSelector("input[name='last_name']")).clear();
        eyes.checkWindow("clear current user details");
        driver.findElement(By.cssSelector("input[name='first_name']")).sendKeys("Anand");
        driver.findElement(By.cssSelector("input[name='last_name']")).sendKeys("Bagmar");
        eyes.checkWindow("update user name");
        driver.findElement(By.cssSelector(".form-btn")).click();

        explicitlyWaitFor(driver, By.cssSelector("button.btn.logout"));
        eyes.checkWindow("updated list");
    }

    private void explicitlyWaitFor(WebDriver driver, By locator) {
        long duration = Duration.ofSeconds(15).getSeconds();
        new WebDriverWait(driver, duration).until(ExpectedConditions.elementToBeClickable(locator));
    }

    private JSONObject loadAndUpdateExpectationForUsers() {
        JSONObject jsonObject = loadFromJSON("src/e2eTest/resources/_getUsers_data_/getUsers.json");
        return jsonObject;
    }

//    private JSONObject loadAndUpdateExpectationForUserId(int userId) {
//        JSONObject jsonObject = loadFromJSON("src/test/resources/getUserExpectations.json");
//        JSONObject httpRequest = (JSONObject) jsonObject.get("http-request");
//        String path = (String) httpRequest.get("path") + userId;
//        httpRequest.put("path", path);
//
//        JSONObject httpResponse = (JSONObject) jsonObject.get("http-response");
//        JSONObject responseBody = (JSONObject) httpResponse.get("body");
//        JSONObject responseBodyData = (JSONObject) responseBody.get("data");
//        responseBodyData.put("id", userId);
//
//        System.out.println("Updated expectations: " + jsonObject);
//        return jsonObject;
//    }

    private JSONObject loadFromJSON(String fileName) {
        JSONParser jsonParser = new JSONParser();

        JSONObject loadedExpectation = null;
        try (FileReader reader = new FileReader(fileName)) {
            Object obj = jsonParser.parse(reader);
            loadedExpectation = (JSONObject) obj;
            System.out.println(loadedExpectation);
        } catch (ParseException | IOException e) {
            e.printStackTrace();
        }
        return loadedExpectation;
    }

    private void setExpectationInQontract(JSONObject jsonBody) {
        RequestSpecification requestSpec = new RequestSpecBuilder()
                                                   .setBaseUri(qontractServerUrl)
                                                   .setContentType(ContentType.JSON)
                                                   .log(LogDetail.ALL)
                                                   .build();

        ResponseSpecification responseSpec = new ResponseSpecBuilder()
                                                     .expectStatusCode(200)
                                                     .expectContentType(ContentType.TEXT)
                                                     .log(LogDetail.ALL)
                                                     .build();
        given()
                .spec(requestSpec)
                .log().all()
                .when()
                .body(jsonBody)
                .post(qontractServerExpectationEndpoint)
                .then()
                .spec(responseSpec)
                .log().all(true);
    }
}
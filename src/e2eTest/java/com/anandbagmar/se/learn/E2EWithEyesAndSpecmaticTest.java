package com.anandbagmar.se.learn;

import com.applitools.eyes.RectangleSize;
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
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;

import static io.restassured.RestAssured.given;

public class E2EWithEyesAndSpecmaticTest extends BaseTest {
    private final String appName = "reactjs-reqres.in AppiumConf";
    private final String specmatictServerUrl = "http://localhost:9000";
    private final String qontractServerExpectationEndpoint = "/_qontract/expectations";

    RectangleSize viewportSize = new RectangleSize(1280, 1024);

    @Test(description = "Login and update user name")
    public void loginAndUpdateUserName() {
        // Set dynamic expectation on stubbed external endpoint
        setExpectationInSpecmatic(loadAndUpdateExpectationForUsers());

        String url = "http://localhost:3000";
        driver.get(url);
        eyes.checkWindow("onLoad");

        // Login
        driver.findElement(By.cssSelector("input[name='email']")).sendKeys("eve.holt@reqres.in");
        driver.findElement(By.cssSelector("input[name='password']")).sendKeys("cityslicka");
        eyes.checkWindow("enteredCredentials");

        driver.findElement(By.cssSelector(".form-btn")).click();
        explicitlyWaitFor(driver, By.cssSelector("button.btn.logout"));
        eyes.checkWindow("after login");

        // Edit Username
        explicitlyWaitFor(driver, By.cssSelector("a.btn.edit")).click();
//        driver.findElement(By.cssSelector("a.btn.edit")).click();
        eyes.checkWindow("edit user name");
        driver.findElement(By.cssSelector("input[name='first_name']")).clear();
        driver.findElement(By.cssSelector("input[name='last_name']")).clear();
        eyes.checkWindow("clear current user details");
        driver.findElement(By.cssSelector("input[name='first_name']")).sendKeys("Anand");
        driver.findElement(By.cssSelector("input[name='last_name']")).sendKeys("Bagmar");
        eyes.checkWindow("update user name");
        driver.findElement(By.cssSelector(".form-btn")).click();

        // Verify updated list of users
        explicitlyWaitFor(driver, By.cssSelector("button.btn.logout"));
        eyes.checkWindow("updated list");
    }

    private WebElement explicitlyWaitFor(WebDriver driver, By locator) {
        return new WebDriverWait(driver, Duration.ofSeconds(15)).until(ExpectedConditions.elementToBeClickable(locator));
    }

    private JSONObject loadAndUpdateExpectationForUsers() {
        JSONObject jsonObject = loadFromJSON("src/e2eTest/resources/_getUsers_data_/getUsers.json");
        return jsonObject;
    }

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

    private void setExpectationInSpecmatic(JSONObject jsonBody) {
        RequestSpecification requestSpec = new RequestSpecBuilder()
                                                   .setBaseUri(specmatictServerUrl)
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
package com.anandbagmar.se.learn;

import com.applitools.eyes.*;
import com.applitools.eyes.selenium.*;
import com.applitools.eyes.visualgrid.model.DeviceName;
import com.applitools.eyes.visualgrid.model.ScreenOrientation;
import com.applitools.eyes.visualgrid.services.VisualGridRunner;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Random;

public abstract class BaseTest {
    private final int concurrency = 20;
    private LocalDateTime bt_beforeMethod;
    private LocalDateTime bt_afterMethod;
    private EyesRunner runner;
    private BatchInfo batchInfo = null;
    private String appName;
    protected WebDriver driver;
    protected Eyes eyes;
    private static final String appNameFromTest = "react-reqjs";

    protected static RectangleSize getViewportSize() {
        return new RectangleSize(1024, 960);
    }

    protected static String getBrowserName() {
        return (null == System.getenv("BROWSER")) ? "chrome" : System.getenv("BROWSER");
    }

    protected static boolean isDisabled() {
        return (null == System.getenv("DISABLED")) ? false : Boolean.parseBoolean(System.getenv("DISABLED"));
    }

    protected static boolean isInject() {
        return null == System.getenv("INJECT") ? false : Boolean.parseBoolean(System.getenv("INJECT"));
    }

    private static boolean isUfg() {
        return (null == System.getenv("USE_UFG") ? false : Boolean.parseBoolean(System.getenv("USE_UFG")));
    }

    @BeforeSuite
    public void beforeSuite() {
        System.out.println("--------------------------------------------------------------------");
        String applitoolsDontCloseBatches = System.getenv("APPLITOOLS_DONT_CLOSE_BATCHES");
        if (null == applitoolsDontCloseBatches) {
            throw new IllegalArgumentException("Env variable 'APPLITOOLS_DONT_CLOSE_BATCHES' should be set to true before running these tests for batches to work correctly");
        }
        System.out.println("APPLITOOLS_DONT_CLOSE_BATCHES: env : " + applitoolsDontCloseBatches);

        boolean useUFG = isUfg();
        System.out.println("useUFG: " + useUFG);
        runner = useUFG ? new VisualGridRunner(concurrency) : new ClassicRunner();
        runner.setDontCloseBatches(true);
        System.out.println("--------------------------------------------------------------------");

        appName = getUpdatedAppName(appNameFromTest);

        System.out.println("appNameFromTest: " + appNameFromTest);
        if (null == batchInfo) {
            batchInfo = new BatchInfo(appName);
            batchInfo.setNotifyOnCompletion(false);
            String batchID = String.valueOf(randomWithRange());
            batchInfo.setId(batchID);
        }
        System.out.println(null == batchInfo ? "batchInfo is null" : "batchInfo: " + batchInfo.getId());
    }

    @BeforeMethod(alwaysRun = true)
    public void beforeMethod(Method method) {
        String className = this.getClass().getSimpleName();
        driver = createDriver(method, getBrowserName());
        eyes = configureEyes(runner, batchInfo);
        eyes.open(driver, appName, className + "-" + method.getName(), getViewportSize());
        System.out.println("BeforeMethod: Test name: " + eyes.getConfiguration().getTestName() + ", App Name: " + eyes.getConfiguration().getAppName() + ", Batch name: '" + eyes.getConfiguration().getBatch().getName() + "'");
    }

    private String getUpdatedAppName(String appName) {
        if (isUfg()) {
            appName = appName + "-UFG";
        }
        return appName;
    }

    private long randomWithRange() {
        Random random = new Random();
        return new Date().getTime() - random.nextInt();
    }

    private synchronized WebDriver createDriver(Method method, String browser) {
        System.out.println("BaseTest: createDriver for test: '" + method.getName() + "' with ThreadID: " + Thread.currentThread().getId());
        bt_beforeMethod = LocalDateTime.now();
        WebDriver innerDriver = null;
        System.out.println("Running test with browser - " + browser);
        switch (browser.toLowerCase()) {
            case "chrome":
                System.out.println("Creating local ChromeDriver");
                innerDriver = createChromeDriver();
                break;
            case "firefox":
                System.out.println("Creating local FirefoxDriver");
                innerDriver = new FirefoxDriver();
                break;
            case "self_healing":
                System.out.println("Creating Driver using ExecutionCloud");
                innerDriver = createExecutionCloudRemoteDriver();
                break;
            default:
                System.out.println("Default: Creating local ChromeDriver");
                innerDriver = createChromeDriver();
        }
        return innerDriver;
    }

    private static WebDriver createChromeDriver() {
        WebDriver innerDriver;
        ChromeOptions options = new ChromeOptions();
        options.setCapability("applitools:tunnel", true);
//        options.addArguments("applitools:tunnel=true");
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        options.addArguments("--remote-allow-origins=*");
//                options.addArguments("headless");
        innerDriver = new ChromeDriver(options);
        return innerDriver;
    }

    private static WebDriver createExecutionCloudRemoteDriver() {
        WebDriver innerDriver;
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setBrowserName("chrome");
        try {
            innerDriver = new RemoteWebDriver(new URL(Eyes.getExecutionCloudURL()), caps);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        return innerDriver;
    }

    @AfterMethod(alwaysRun = true)
    public void afterMethod(ITestResult result) {
        System.out.println("AfterMethod: Test name: " + eyes.getConfiguration().getTestName() + ", App Name: " + eyes.getConfiguration().getAppName() + ", Batch name: '" + eyes.getConfiguration().getBatch().getName() + "'");

        eyes.closeAsync();
        quitDriver();

        bt_afterMethod = LocalDateTime.now();
        long seconds = Duration.between(bt_beforeMethod, bt_afterMethod).toMillis() / 1000;
        System.out.println(">>> " + BaseTest.class.getSimpleName() + " - Tests: '" + result.getTestName() + "' took '" + seconds + "' seconds to run");
    }

    @AfterSuite(alwaysRun = true)
    public void afterSuite() {
        TestResultsSummary allTestResults = runner.getAllTestResults(false);
        TestResultContainer[] results = allTestResults.getAllResults();
        System.out.println("Number of tests: " + results.length);
        boolean mismatchFound = false;
        for (TestResultContainer eachResult : results) {
            Throwable ex = results[0].getException();
            TestResults testResult = eachResult.getTestResults();
            mismatchFound = handleTestResults(ex, testResult) || mismatchFound;
        }
        System.out.println("Overall Visual Validaiton failed? - " + mismatchFound);
    }

    protected void waitFor(int numSeconds) {
        try {
            Thread.sleep(numSeconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    protected void quitDriver() {
        if (null != driver) {
            try {
                driver.close();
                driver.quit();
            } catch (Exception e) {
                System.out.println(e.getMessage());
            } finally {
                driver = null;
            }
        }
    }

    protected boolean handleTestResults(Throwable ex, TestResults result) {
        if (!result.getStatus().equals(TestResultsStatus.Disabled)) {
            System.out.println("\tTest Name: " + result.getName() + " :: " + result);
            System.out.println("\tTest status: " + result.getStatus());
            System.out.printf("\t\tName = '%s', \nBrowser = %s,OS = %s, viewport = %dx%d, matched = %d, mismatched = %d, missing = %d, aborted = %s\n",
                    result.getName(),
                    result.getHostApp(),
                    result.getHostOS(),
                    result.getHostDisplaySize().getWidth(),
                    result.getHostDisplaySize().getHeight(),
                    result.getMatches(),
                    result.getMismatches(),
                    result.getMissing(),
                    (result.isAborted() ? "aborted" : "no"));
            System.out.println("Results available here: " + result.getUrl());
        }
        boolean hasMismatches = result.getMismatches() != 0 || result.isAborted();
        System.out.println("Visual validation failed? - " + hasMismatches);
        return hasMismatches;
    }

    private synchronized Eyes configureEyes(EyesRunner runner, BatchInfo batch) {
        Eyes eyes = new Eyes(runner);
        System.out.println("Is Applitools Visual AI enabled? - " + !isDisabled());
        Configuration config = eyes.getConfiguration();
        config.setBatch(batch);
        config.setMatchLevel(MatchLevel.STRICT);
        config.setIsDisabled(isDisabled());
        config.setStitchMode(StitchMode.CSS);
        config.setForceFullPageScreenshot(true);
        config.getBatch().setNotifyOnCompletion(false);
        String branchName = System.getenv("BRANCH_NAME");
        branchName = ((null != branchName) && (!branchName.trim().isEmpty())) ? branchName.toLowerCase() : "main";
        System.out.println("Branch name: " + branchName);
        config.setBranchName(branchName);
        String applitoolsApiKey = System.getenv("APPLITOOLS_API_KEY");
        System.out.println("API key: " + applitoolsApiKey);
        config.setApiKey(applitoolsApiKey);
        eyes.setLogHandler(new StdoutLogHandler(true));
        config.setSendDom(true);
        config = getUFGBrowserConfiguration(config);
        eyes.setConfiguration(config);
        return eyes;
    }

    private synchronized Configuration getUFGBrowserConfiguration(Configuration config) {

        config.addBrowser(1024, 1024, BrowserType.EDGE_CHROMIUM);
        config.addBrowser(1200, 1024, BrowserType.SAFARI);
        config.addBrowser(1024, 1200, BrowserType.CHROME);
        config.addBrowser(1200, 1200, BrowserType.FIREFOX);
        config.addDeviceEmulation(DeviceName.Galaxy_S20, ScreenOrientation.PORTRAIT);
        config.addDeviceEmulation(DeviceName.iPad, ScreenOrientation.PORTRAIT);
        config.addDeviceEmulation(DeviceName.iPhone_11_Pro_Max, ScreenOrientation.PORTRAIT);
        System.out.println("Running tests on Ultrafast Grid with '" + config.getBrowsersInfo().size() + "' browsers configurations");
        return config;
    }

}

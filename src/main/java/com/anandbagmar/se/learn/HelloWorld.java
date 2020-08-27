package com.anandbagmar.se.learn;

public class HelloWorld {
    public HelloWorld() {
        System.out.println("HelloWorld instantiated");
    }

    public String getDefaultMessage() {
        return this.getClass().getSimpleName();
    }

    public static void main(String[] args) {
        System.out.println(new HelloWorld().getDefaultMessage());
    }
}

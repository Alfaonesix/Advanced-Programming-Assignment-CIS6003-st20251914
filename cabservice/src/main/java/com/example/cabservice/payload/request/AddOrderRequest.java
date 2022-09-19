package com.example.cabservice.payload.request;

import javax.validation.constraints.NotBlank;

public class AddOrderRequest {
    @NotBlank
    private String driver;
    @NotBlank
    private String vehicle;

    @NotBlank
    private String img;

    @NotBlank
    private String userid;

    @NotBlank
    private String user;

    @NotBlank
    private String destination;

    @NotBlank
    private String branch;

    @NotBlank
    private String state;
    @NotBlank
    private String date;

    private String confirmedby;

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getVehicle() {
        return vehicle;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getConfirmedby() {
        return confirmedby;
    }

    public void setConfirmedby(String confirmedby) {
        this.confirmedby = confirmedby;
    }
}

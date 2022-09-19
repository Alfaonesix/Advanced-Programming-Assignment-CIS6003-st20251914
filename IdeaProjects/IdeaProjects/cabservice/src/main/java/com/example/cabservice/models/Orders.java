package com.example.cabservice.models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    private String date;

    @NotBlank
    private String state;

    private String confirmedby;


    public Orders(String driver, String vehicle, String img, String userid, String user, String destination, String branch, String state, String date, String confirmedby) {
        this.driver = driver;
        this.vehicle = vehicle;
        this.img = img;
        this.userid = userid;
        this.user = user;
        this.destination = destination;
        this.branch = branch;
        this.state = state;
        this.date = date;
        this.confirmedby = confirmedby;
    }

    public Orders() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

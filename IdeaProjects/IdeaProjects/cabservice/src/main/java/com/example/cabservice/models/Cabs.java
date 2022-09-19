//package com.example.cabservice.models;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
//import java.util.HashSet;
//import java.util.Set;
//
//@Entity
//@Table(name = "cabs")
//public class Cabs {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private String Id;
//
//    @NotBlank
//    private String imgurl;
//
//    @NotBlank
//    private String vehicletype;
//
//    @NotBlank
//    private String vehiclename;
//
//    @NotBlank
//    private String drivername;
//
//    @NotBlank
//    private String price;
//
//    @NotBlank
//    private String vehicleNumber;
//
//    private String seats;
//
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "cabs_branches",
//       joinColumns = @JoinColumn(name = "cabs_id"),
//            inverseJoinColumns = @JoinColumn(name = "branches_id"))
//    private Set<Branches> branches = new HashSet<>();
//
//    public Cabs() {
//
//    }
//
//    public Cabs(String imgurl, String vehicletype, String vehiclename, String drivername, String price, String vehicleNumber, String seats) {
//        this.imgurl = imgurl;
//        this.vehicletype = vehicletype;
//        this.vehiclename = vehiclename;
//        this.drivername = drivername;
//        this.price = price;
//        this.vehicleNumber = vehicleNumber;
//        this.seats = seats;
//    }
//
//    public String getId() {
//        return Id;
//    }
//
//    public void setId(String id) {
//        Id = id;
//    }
//
//    public String getImgurl() {
//        return imgurl;
//    }
//
//    public void setImgurl(String imgurl) {
//        this.imgurl = imgurl;
//    }
//
//    public String getVehicletype() {
//        return vehicletype;
//    }
//
//    public void setVehicletype(String vehicletype) {
//        this.vehicletype = vehicletype;
//    }
//
//    public String getVehiclename() {
//        return vehiclename;
//    }
//
//    public void setVehiclename(String vehiclename) {
//        this.vehiclename = vehiclename;
//    }
//
//    public String getDrivername() {
//        return drivername;
//    }
//
//    public void setDrivername(String drivername) {
//        this.drivername = drivername;
//    }
//
//    public String getPrice() {
//        return price;
//    }
//
//    public void setPrice(String price) {
//        this.price = price;
//    }
//
//    public String getVehicleNumber() {
//        return vehicleNumber;
//    }
//
//    public void setVehicleNumber(String vehicleNumber) {
//        this.vehicleNumber = vehicleNumber;
//    }
//
//    public String getSeats() {
//        return seats;
//    }
//
//    public void setSeats(String seats) {
//        this.seats = seats;
//    }
//
//    public Set<Branches> getBranches() {
//        return branches;
//    }
//
//    public void setBranches(Set<Branches> branches) {
//        this.branches = branches;
//    }
//}

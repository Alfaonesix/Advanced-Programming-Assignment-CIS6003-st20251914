package com.example.cabservice.payload.response;

import java.util.List;

public class AgentInfoResponse {

    private Long id;

    private String username;

    private String email;

    private String phone;

    private String vehiclename;

    private String vehicletype;

    private List<String> roles;

    private List<String> branches;

    public AgentInfoResponse(Long id, String username, String email, String phone, String vehiclename, String vehicletype, List<String> roles, List<String> branches) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.vehiclename = vehiclename;
        this.vehicletype = vehicletype;
        this.roles = roles;
        this.branches = branches;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getVehiclename() {
        return vehiclename;
    }

    public void setVehiclename(String vehiclename) {
        this.vehiclename = vehiclename;
    }

    public String getVehicletype() {
        return vehicletype;
    }

    public void setVehicletype(String vehicletype) {
        this.vehicletype = vehicletype;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public List<String> getBranches() {
        return branches;
    }

    public void setBranches(List<String> branches) {
        this.branches = branches;
    }
}

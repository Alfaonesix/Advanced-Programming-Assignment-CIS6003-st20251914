package com.example.cabservice.controllers;


import com.example.cabservice.Exception.ResourceNotFoundException;
import com.example.cabservice.models.Branches;
import com.example.cabservice.models.Driver;
import com.example.cabservice.repositories.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class ServicesController {

    @Autowired
    DriverRepository driverRepository;

    @GetMapping("/driver")
    public List<Driver>getAllDrivers() {
        return driverRepository.findAll();
    }

    @GetMapping("/driver/{id}")
    public ResponseEntity<Driver> getDriverByID(@PathVariable long id){
        Driver driver = driverRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Driver Not Found" +id));
        return ResponseEntity.ok(driver);
    }

    @GetMapping("/driverByBranch/{id}")
    public List<Driver>driverByBranch(@PathVariable Branches id){
        return driverRepository.findAllByBranches(id);
    }

    @DeleteMapping("/driver/{id}")
    public void deleteDriver(@PathVariable long id) {
        driverRepository.deleteById(id);
    }
}

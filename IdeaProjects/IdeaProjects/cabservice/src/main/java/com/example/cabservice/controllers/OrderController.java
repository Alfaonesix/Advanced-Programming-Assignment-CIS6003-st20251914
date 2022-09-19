package com.example.cabservice.controllers;

import com.example.cabservice.Exception.ResourceNotFoundException;
import com.example.cabservice.models.Driver;
import com.example.cabservice.models.Orders;
import com.example.cabservice.payload.request.AddOrderRequest;
import com.example.cabservice.payload.response.MessageResponse;
import com.example.cabservice.repositories.OrderRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class OrderController {

    @Autowired
    OrderRespository orderRespository;

    @PostMapping("/buy-now")
    public ResponseEntity<?> AddNewOrder (@RequestBody AddOrderRequest addOrderRequest){
        Orders orders = new Orders(
                addOrderRequest.getDriver(),
                addOrderRequest.getVehicle(),
                addOrderRequest.getImg(),
                addOrderRequest.getUserid(),
                addOrderRequest.getUser(),
                addOrderRequest.getDestination(),
                addOrderRequest.getBranch(),
                addOrderRequest.getState(),
                addOrderRequest.getDate(),
                addOrderRequest.getConfirmedby()
        );
        orderRespository.save(orders);
        return ResponseEntity.ok(new MessageResponse("New Booking Added Successfully"));
    }

    @GetMapping("/AllOrders")
    public List<Orders>getAllOrders(){
        return orderRespository.findAll();
    }


    @GetMapping("/userorders/{id}")
    public List<Orders> useOrders(@PathVariable String id) {
        return orderRespository.findByUserid(id);
    }

    @GetMapping("/driverOrder/{driver}")
    public List<Orders> driverOrders(@PathVariable String driver){
        return orderRespository.findByDriver(driver);
    }

    @GetMapping("/findOrderByBranch/{branch}")
    public List<Orders>findOrdersByBranch(@PathVariable String branch){
        return orderRespository.findOrderByBranch(branch);
    }
    @GetMapping("/orders/{id}")
    public ResponseEntity<Orders> getOrdersByID(@PathVariable long id){
        Orders orders = orderRespository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Order Not Found" + id));
        System.out.println(orders);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{id}")
    public ResponseEntity<Orders> updateStatus(@PathVariable long id , @RequestBody Orders orderDetails) {
        Orders orders = orderRespository.findById(id).orElseThrow(()-> new RuntimeException("Driver not exist with username" + id));

        orders.setBranch(orderDetails.getBranch());
        orders.setDate(orderDetails.getDate());
        orders.setDestination(orderDetails.getDestination());
        orders.setDriver(orderDetails.getDriver());
        orders.setImg(orderDetails.getImg());
        orders.setState(orderDetails.getState());
        orders.setUser(orderDetails.getUser());
        orders.setUserid(orderDetails.getUserid());
        orders.setVehicle(orderDetails.getVehicle());

        Orders updateStatus = orderRespository.save(orders);
        return ResponseEntity.ok(updateStatus);
    }

//    @GetMapping("/ordersState/{id}")
//    public ResponseEntity<Orders> getStatus(@PathVariable long id){
//        Orders orders = orderRespository.findById(id).orElseThrow(()-> new ResourceNotFoundException(("Order status Not Found" + id)));
//        System.out.println(orders);
//        return ResponseEntity.ok(orders);
//    }
}

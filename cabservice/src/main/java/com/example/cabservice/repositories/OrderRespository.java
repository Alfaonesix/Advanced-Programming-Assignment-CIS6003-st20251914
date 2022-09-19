package com.example.cabservice.repositories;

import com.example.cabservice.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

public interface OrderRespository extends JpaRepository<Orders, Long> {

    List<Orders> findByUserid(@NotBlank String userid);

    List<Orders> findOrderByBranch(String branch);

    List<Orders> findByDriver(String driver);

    Optional<Orders> findById(Long id);

}

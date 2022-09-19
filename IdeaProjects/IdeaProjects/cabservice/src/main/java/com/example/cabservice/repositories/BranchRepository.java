package com.example.cabservice.repositories;

import com.example.cabservice.models.Branches;
import com.example.cabservice.models.EBranch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BranchRepository extends JpaRepository<Branches, Long> {
    Optional<Branches> findByName(EBranch name);
}

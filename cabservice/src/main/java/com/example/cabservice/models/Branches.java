package com.example.cabservice.models;

import javax.persistence.*;

@Entity
@Table(name = "branches")
public class Branches {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private EBranch name;

    public Branches(EBranch name) {
        this.name = name;
    }

    public Branches() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public EBranch getName() {
        return name;
    }
    public void setName(EBranch branch) {
        this.name = branch;
    }
}

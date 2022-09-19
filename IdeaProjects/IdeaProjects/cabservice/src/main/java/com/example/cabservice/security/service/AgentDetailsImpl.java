package com.example.cabservice.security.service;

import com.example.cabservice.models.Driver;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.catalina.LifecycleState;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class AgentDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    private String email;

    private String phone;

    private String vehiclename;

    private String vehicletype;

    @JsonIgnore
    private final String password;

    private final Collection<? extends GrantedAuthority> authorities;

    private List<String> branches;

    public AgentDetailsImpl(Long id,
                            String username,
                            String email,
                            String phone,
                            String vehiclename,
                            String vehicletype,
                            String password,
                            Collection<? extends GrantedAuthority> authorities,
                            List<String> branches
                            ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.vehiclename = vehiclename;
        this.vehicletype = vehicletype;
        this.password = password;
        this.authorities = authorities;
        this.branches = branches;
    }
    public static AgentDetailsImpl build (Driver driver) {
        List<GrantedAuthority> authorities = driver.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());
        List<String> branches = driver.getBranches().stream()
                .map(branches1 -> branches1.getName().name())
                .collect(Collectors.toList());

        return new AgentDetailsImpl(
                driver.getId(),
                driver.getUsername(),
                driver.getEmail(),
                driver.getPhone(),
                driver.getVehiclename(),
                driver.getVehicletype(),
                driver.getPassword(),
                authorities,
                branches
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    public List<String> getBranches() {
        return branches;
    }
    public Long getId() {
        return id;
    }
    public String getEmail() {
        return email;
    }
    public String getPhone() {
        return phone;
    }
    public String getVehiclename() {
        return vehiclename;
    }
    public String getVehicletype() {
        return vehicletype;
    }

    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AgentDetailsImpl agent = (AgentDetailsImpl) o;
        return Objects.equals(id, agent.id);
    }
}

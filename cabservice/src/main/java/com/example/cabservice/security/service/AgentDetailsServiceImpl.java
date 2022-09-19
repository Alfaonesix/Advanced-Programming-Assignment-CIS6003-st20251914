package com.example.cabservice.security.service;

import com.example.cabservice.models.Driver;
import com.example.cabservice.repositories.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AgentDetailsServiceImpl implements UserDetailsService {

    @Autowired
    DriverRepository driverRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Driver driver = driverRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Driver Not Found with username: " + username));
        return AgentDetailsImpl.build(driver);
    }
}

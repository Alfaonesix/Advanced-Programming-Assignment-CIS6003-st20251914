package com.example.cabservice.controllers;


import com.example.cabservice.models.*;
import com.example.cabservice.payload.request.AgentSignupRequest;
import com.example.cabservice.payload.request.LoginRequest;
import com.example.cabservice.payload.request.SignupRequest;
import com.example.cabservice.payload.response.AgentInfoResponse;
import com.example.cabservice.payload.response.MessageResponse;
import com.example.cabservice.payload.response.UserInfoResponse;
import com.example.cabservice.repositories.BranchRepository;
import com.example.cabservice.repositories.DriverRepository;
import com.example.cabservice.repositories.RoleRepository;
import com.example.cabservice.repositories.UserRepository;
import com.example.cabservice.security.jwt.JwtUtils;
import com.example.cabservice.security.service.AgentDetailsImpl;
import com.example.cabservice.security.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DriverRepository driverRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    BranchRepository branchRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    //User Login
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(
                        userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        userDetails.getAddress(),
                        userDetails.getPhone(),
                        userDetails.getGender(),
                        roles
                ));
    }

    //User Signup
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        // Create new User's account
        User user = new User(signupRequest.getUsername(),
                signupRequest.getEmail(),
                signupRequest.getAddress(),
                signupRequest.getGender(),
                signupRequest.getPhone(),
                encoder.encode(signupRequest.getPassword()));
        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "driver":
                        Role saleRole = roleRepository.findByName(ERole.ROLE_DRIVER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(saleRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    //Driver Login
    @PostMapping("/driver/signin")
    public ResponseEntity<?> authenticateDriver(@Valid @RequestBody LoginRequest loginRequest) {
        System.out.println(loginRequest.getUsername());
        System.out.println(loginRequest.getPassword());
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        AgentDetailsImpl agentDetails = (AgentDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateAgentJwtCookie(agentDetails);
        List<String> roles = agentDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        List<String> branches = agentDetails.getBranches();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new AgentInfoResponse(
                        agentDetails.getId(),
                        agentDetails.getUsername(),
                        agentDetails.getEmail(),
                        agentDetails.getPhone(),
                        agentDetails.getVehiclename(),
                        agentDetails.getVehicletype(),
                        roles,
                        branches)
                );
    }

    //Create new Driver account
    @PostMapping("/driver/signup")
    public ResponseEntity<?> registerAgent(@Valid @RequestBody AgentSignupRequest agentSignupRequest) {
        if (driverRepository.existsByUsername(agentSignupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }
        if (driverRepository.existsByEmail(agentSignupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        Driver driver = new Driver(
                agentSignupRequest.getUsername(),
                agentSignupRequest.getEmail(),
                agentSignupRequest.getPhone(),
                agentSignupRequest.getVehiclename(),
                agentSignupRequest.getVehicletype(),
                encoder.encode(agentSignupRequest.getPassword()));

        //get roles from request

        Set<String> strAgentRoles = agentSignupRequest.getRoles();
        Set<String> strBranch = agentSignupRequest.getBranches();
        Set<Role> roles = new HashSet<>();
        Set<Branches> branches = new HashSet<>();

        if (strAgentRoles == null && strBranch == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_DRIVER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found"));

            Branches userBranch = branchRepository.findByName(EBranch.BRANCH_COLOMBO)
                    .orElseThrow(() -> new RuntimeException("Error: colombo branch is not found."));
            roles.add(userRole);
            branches.add(userBranch);
        }else {
            strAgentRoles.forEach(role -> {
                if (role.contains("admin")) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Admin Role is not found."));
                    roles.add(adminRole);

                    // admin must be from Colombo branch
                    Branches branchAdmin = branchRepository.findByName(EBranch.BRANCH_COLOMBO)
                            .orElseThrow(() -> new RuntimeException("Error: Admin Branch is not found"));
                    branches.add(branchAdmin);
                }else {
                    Role agentRole = roleRepository.findByName(ERole.ROLE_DRIVER)
                            .orElseThrow(() -> new RuntimeException("Error: Sales driver Role is not found."));
                    roles.add(agentRole);
                }
            });
        }
        strBranch.forEach(branch -> {
            switch (branch) {
                case "galle":
                    Branches branchGalle = branchRepository.findByName(EBranch.BRANCH_GALLE)
                            .orElseThrow(() -> new RuntimeException("Error: galle branch is not found"));
                    branches.add(branchGalle);
                    break;
                case "kandy":
                    Branches branchKandy = branchRepository.findByName(EBranch.BRANCH_KANDY)
                            .orElseThrow(() -> new RuntimeException("Error: Kandy branch is not found"));
                    branches.add(branchKandy);
                    break;
                case "nugegoda":
                    Branches branchNugegoda = branchRepository.findByName(EBranch.BRANCH_NUGEGODA)
                            .orElseThrow(() -> new RuntimeException("Error: nugegoda branch is not found."));
                    branches.add(branchNugegoda);
                    break;
                case "gampaha":
                    Branches branchGampaha = branchRepository.findByName(EBranch.BRANCH_GAMPAHA)
                            .orElseThrow(() -> new RuntimeException("Error: gampaha branch is not found."));
                    branches.add(branchGampaha);
                    break;
                case "kurunegala":
                    Branches branchKurunegala = branchRepository.findByName(EBranch.BRANCH_KURUNEGALA)
                            .orElseThrow(() -> new RuntimeException("Error: kurunegala branch is not found."));
                    branches.add(branchKurunegala);
                    break;
                case "jaffna":
                    Branches branchJaffna = branchRepository.findByName(EBranch.BRANCH_JAFFNA)
                            .orElseThrow(() -> new RuntimeException("Error: kurunegala branch is not found."));
                    branches.add(branchJaffna);
                    break;
            }
        });

        driver.setRoles(roles);
        driver.setBranches(branches);
        driverRepository.save(driver);

        return ResponseEntity.ok(new MessageResponse("driver registered successfully!"));
    }

    @PutMapping("/driver/{id}")
    public ResponseEntity<Driver> updateDriver (@PathVariable Long id, @RequestBody Driver driverDetails){
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not exist with id:" + id));

        driver.setUsername(driverDetails.getUsername());
        driver.setEmail(driverDetails.getEmail());
        driver.setPhone(driverDetails.getPhone());
        driver.setVehiclename(driverDetails.getVehiclename());
        driver.setVehicletype(driverDetails.getVehicletype());

        Driver updateDriver = driverRepository.save(driver);
        return ResponseEntity.ok(updateDriver);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }
}
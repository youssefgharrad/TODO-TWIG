package com.gark.project.Controller;

import com.gark.project.Configuration.JwtUtil;
import com.gark.project.Entity.Role;
import com.gark.project.Entity.User;
import com.gark.project.Rpository.UserRepository;
import com.gark.project.Security.UsrDetails;
import com.gark.project.Service.RoleService;
import com.gark.project.dto.JwtResponse;
import com.gark.project.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {
    @Autowired(required = false)
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    RoleService roleService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        if (userRepository.findUserByUsername(user.getUsername()) != null) {
            return ResponseEntity.ok(user);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(userRepository.save(user));
    }
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        UsrDetails userDetails = (UsrDetails) authentication.getPrincipal();
        User user = userRepository.findUserByUsername(userDetails.getUsername());
        String jwt = jwtUtil.generateToken(userDetails);
        user.setPassword(null);
        return ResponseEntity.ok(new JwtResponse(jwt,user));
    }
}

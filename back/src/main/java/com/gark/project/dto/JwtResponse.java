package com.gark.project.dto;

import com.gark.project.Entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class JwtResponse {
    private String token;
    private User user;

    public JwtResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    // Getter
    public String getToken() {
        return token;
    }
}
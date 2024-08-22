package com.gark.project.Controller;

import com.gark.project.Entity.Role;
import com.gark.project.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    RoleService roleService;

    @PostMapping("/")
    public Role createNewRole(@RequestBody Role role){
        return roleService.createNewRole(role);
    }
}

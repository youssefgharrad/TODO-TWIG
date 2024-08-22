package com.gark.project.Service;

import com.gark.project.Entity.Role;
import com.gark.project.Rpository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired(required = false)
    RoleRepository roleRepository;

    public Role createNewRole(Role role){
        return roleRepository.save(role);
    }

    public Role getRoleByName(String name){
        return roleRepository.findRoleByName(name);
    }
}

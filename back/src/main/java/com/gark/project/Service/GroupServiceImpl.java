package com.gark.project.Service;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Group;
import com.gark.project.Rpository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GroupServiceImpl implements GroupService{

    @Autowired
    private GroupRepository groupRepository;
    @Override
    public List<Group> getAllGroups() {
        return (List<Group>) groupRepository.findAll();
    }

    @Override
    public Group getGroupById(Long id) {
        return groupRepository.findById(id).orElse(null);
    }

    @Override
    public Group saveGroup(Group contract) {
        return groupRepository.save(contract);
    }

    @Override
    public void deleteGroup(Long id) {
        groupRepository.deleteById(id);
    }

    @Override
    public Club findClub(Long id) {
        return groupRepository.findByClub(id);
    }

    public List<Group> getAllGroupsByClubId(Long clubId) {
        return groupRepository.findByClubId(clubId); // Adjust based on your repository method
    }
    public List<Group> getAllGroupById(List<Long> ids) {
        return groupRepository.findAllById(ids);
    }
}

package com.gark.project.Service;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Group;

import java.util.List;

public interface GroupService {

    public List<Group> getAllGroups() ;
    public Group getGroupById(Long id) ;
    public Group saveGroup(Group contract) ;
    public void deleteGroup(Long id) ;
    public Club findClub(Long id);
    List<Group> getAllGroupsByClubId(Long clubId);
}

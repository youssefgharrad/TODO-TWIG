package com.gark.project.Controller;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Group;
import com.gark.project.Service.ClubServiceImpl;
import com.gark.project.Service.GroupServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
@CrossOrigin(origins = "http://localhost:4200")
public class GroupController {
    @Autowired
    private GroupServiceImpl groupService ;

    @Autowired
    private ClubServiceImpl clubService ;

    @GetMapping("/clubs/{clubId}/groups")
    public List<Group> getAllGroupsByClubId(@PathVariable Long clubId) {
        return groupService.getAllGroupsByClubId(clubId);
    }

    @PostMapping("/add/{clubId}/{niveau}")
    public ResponseEntity<Group> createGroup(@PathVariable Long clubId, @PathVariable String niveau, @RequestBody Group group) {
        Club club = clubService.findById(clubId);
        if (club == null) {
            return ResponseEntity.badRequest().body(null); // Handle the case where club is not found
        }

        Group.Niveau enumNiveau;
        try {
            enumNiveau = Group.Niveau.valueOf(niveau);
            System.out.println(enumNiveau+"\n");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Handle invalid niveau value
        }

        Group newGroup = new Group();
        newGroup.setNom(group.getNom());
        newGroup.setNiveau(enumNiveau);
        newGroup.setClub(club);

        groupService.saveGroup(newGroup);

        return ResponseEntity.ok(newGroup);
    }

    @GetMapping("/vu")
    public List<Group> getAllClubs() {
        return groupService.getAllGroups();
    }


}

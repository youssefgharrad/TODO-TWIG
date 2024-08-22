package com.gark.project.Controller;

import com.gark.project.Entity.*;
import com.gark.project.Service.ClubServiceImpl;
import com.gark.project.Service.ExerciseServiceImpl;
import com.gark.project.Service.GroupServiceImpl;
import com.gark.project.Service.SessionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/exercices")
@CrossOrigin(origins = "http://localhost:4200")
public class ExerciseController {

    @Autowired
    private ExerciseServiceImpl exerciseService ;
    @Autowired
    private GroupServiceImpl groupService ;
    @Autowired
    private ClubServiceImpl clubService ;
    @Autowired
    private SessionServiceImpl sessionService ;

    @GetMapping("/view")
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/{id}")
    public Exercise getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
    }

    @PostMapping("/add")
    public void createExercise(
            @RequestBody List<Group> groups,
            @RequestParam("nom") String nom,
            @RequestParam("description") String description,
            @RequestParam("strategie") String strategieStr,
            @RequestParam("durationMax") int durationMax,
            @RequestParam("type") List<String> type,
            @RequestParam("focusArea") String focusAreaStr,
            @RequestParam("duration") List<String> duration,
            @RequestParam("sessionId") Long sessionId
            ) {

        System.out.println("Received parameters:");
        System.out.println("nom: " + nom);
        System.out.println("description: " + description);
        System.out.println("strategie: " + strategieStr);
        System.out.println("durationMax: " + durationMax);
        System.out.println("type: " + type);
        System.out.println("focusArea: " + focusAreaStr);
        System.out.println("duration: " + duration);
        System.out.println("sessionId: " + sessionId);
        System.out.println("groups: " + groups);

        // Your existing logic here
    }








    @GetMapping("/strategies")
    public Map<Exercise.Strategie.Type, List<Exercise.Strategie>> getAllStrategies() {
        return exerciseService.getAllStrategies();
    }

    @GetMapping("/groupsInv")
    public List<Group> getAllGroups() {
        Optional<Club> clubOptional = clubService.getClub();
        Club club = clubOptional.get();

        System.out.println(club.getNom());
        List<Group> groups =  groupService.getAllGroupsByClubId(club.getId());

        return groups;
    }

    @GetMapping("/focusAreas")
    public List<Exercise.FocusArea> getAllFocusAreas() {
        return exerciseService.getAllFocusAreas();
    }
}

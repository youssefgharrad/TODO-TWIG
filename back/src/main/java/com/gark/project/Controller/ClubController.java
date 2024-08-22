package com.gark.project.Controller;

import com.gark.project.Entity.Club;
import com.gark.project.Service.ClubServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/clubs")
@CrossOrigin(origins = "http://localhost:4200")
public class ClubController {

    @Autowired
    private ClubServiceImpl clubService;

    @GetMapping("/view")
    public List<Club> getAllClubs() {
        return clubService.getAllClubs();
    }

    @GetMapping("/{id}")
    public Club getClubById(@PathVariable Long id) {
        return clubService.getClubById(id);
    }

    @PostMapping("/add")
    public Club createClub(@RequestParam("nom") String nom,
                           @RequestParam("president") String president,
                           @RequestParam("foundationYear") Date foundationYear,
                           @RequestParam("location") String location,
                           @RequestParam("image") MultipartFile image) {
        return clubService.createClub(new Club(nom, president, foundationYear, location), image);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteClub(@PathVariable Long id) {
        clubService.deleteClub(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Club> updateClub(@PathVariable Long id, @RequestBody Club updatedClub) {
        System.out.println("Update request received for ID: " + id);
        System.out.println("Received club data: " + updatedClub);

        Club existingClub = clubService.findById(id);
        if (existingClub == null) {
            System.out.println("Club not found");
            return ResponseEntity.notFound().build();
        }

        // Update existing club with new values
        existingClub.setNom(updatedClub.getNom());
        existingClub.setPresident(updatedClub.getPresident());
        existingClub.setFoundationYear(updatedClub.getFoundationYear());
        existingClub.setLocation(updatedClub.getLocation());

        System.out.println("Updating club with ID: " + id);

        Club savedClub = clubService.saveClub(existingClub);
        System.out.println("Club updated successfully");

        return ResponseEntity.ok(savedClub);
    }

}

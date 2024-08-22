package com.gark.project.Controller;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Joueur;
import com.gark.project.Service.JoueurServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/players")
@CrossOrigin(origins = "http://localhost:4200")
public class JoueurController {

    @Autowired
    private JoueurServiceImpl joueurService;

    @GetMapping("/view")
    public List<Joueur> getAllPlayers() {
        return joueurService.getAllPlayers();
    }

    @GetMapping("/{id}")
    public Joueur getPlayerById(@PathVariable Long id) {
        return joueurService.getPlayerById(id);
    }

    @PostMapping("/add")
    public Joueur createPlayer(@RequestParam("fullname") String fullname,
                               @RequestParam("position") String position,
                               @RequestParam("jerseyNumber") int jerseyNumber,
                               @RequestParam("valeur") float valeur,
                               @RequestParam("bday") Date bday,
                               @RequestParam("image") MultipartFile image) {
        return joueurService.createPlayer(new Joueur(fullname, position, jerseyNumber, valeur,bday), image);
    }

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Long id) {
        joueurService.deletePlayer(id);
    }
    @GetMapping("/getByClub/{id}")
    public List<Joueur> getPlayersByClub(@PathVariable Long id) {
        return joueurService.getAllPlayersEachClub(id);
    }
}


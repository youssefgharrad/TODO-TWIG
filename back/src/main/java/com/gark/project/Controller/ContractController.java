package com.gark.project.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gark.project.Entity.Club;
import com.gark.project.Entity.Contract;
import com.gark.project.Entity.Group;
import com.gark.project.Entity.Joueur;
import com.gark.project.Rpository.ClubRepository;
import com.gark.project.Rpository.GroupRepository;
import com.gark.project.Rpository.JoueurRepository;
import com.gark.project.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/contracts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContractController {

    @Autowired
    private ContractServiceImpl contractService;
    @Autowired(required = false)
    private ClubRepository clubRepository;

    @Autowired(required = false)
    private JoueurRepository joueurRepository;

    @Autowired
    private JoueurServiceImpl joueurService;

    @Autowired
    private ClubServiceImpl clubService;
    @Autowired(required = false)
    private GroupRepository groupRepository;

    @Autowired
    private GroupService groupService;


    @GetMapping("/view")
    public List<Contract> getAllContracts() {
        return contractService.getAllContracts();
    }

    @GetMapping("/{id}")
    public Contract getContractById(@PathVariable Long id) {
        return contractService.getContractById(id);
    }

    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Contract createContract(@RequestBody Map<String, Object> payload) {
        // Extract contract and player data from the payload
        Contract body = new ObjectMapper().convertValue(payload.get("contract"), Contract.class);
        Joueur joueur1 = new ObjectMapper().convertValue(payload.get("player"), Joueur.class);

        System.out.println("Received Contract: " + joueur1.getId());

        Optional<Club> clubOptional = clubService.getClub();
        Optional<Joueur> joueurOptional = joueurRepository.findById(joueur1.getId());

        if (clubOptional.isPresent() && joueurOptional.isPresent()) {
            Club club = clubOptional.get();
            Joueur joueur = joueurOptional.get();

            Contract contract = new Contract();
            contract.setDateDebut(body.getDateDebut());
            contract.setDateFin(body.getDateFin());
            contract.setTitre(body.getTitre());
            contract.setDetails(body.getDetails());
            contract.setClub(club);
            contract.setJoueur(joueur);

            // Save the contract first to get an ID
            Contract savedContract = contractService.saveContract(contract);

            System.out.println("Saved Contract: " + savedContract);

            // Determine the player's age
            int age = calculateAge(joueur);

            // Find or create the appropriate group
            Group group = findOrCreateGroupForAge(club, age);

            // Add player to the group
            group.getPlayers().add(joueur);
            joueur.setGroup(group); // Set the group ID in the player

            // Save the updated entities
            joueurService.savePlayer(joueur);
            groupService.saveGroup(group);
            clubService.saveClub(club);

            return savedContract;
        } else {
            throw new RuntimeException("Club or Joueur not found");
        }
    }

    private Group findOrCreateGroupForAge(Club club, int age) {
        String groupName;
        Group.Niveau niveau;

        if (age <= 10) {
            groupName = "U10";
            niveau = Group.Niveau.Poussin;
        } else if (age == 11 || age == 12) {
            groupName = "U12";
            niveau = Group.Niveau.Benjamin;
        } else if (age == 13 || age == 14) {
            groupName = "U14";
            niveau = Group.Niveau.Minim;
        } else if (age == 15 || age == 16 || age == 17) {
            groupName = "U17";
            niveau = Group.Niveau.Cadet;
        } else if (age == 18 || age == 19 || age == 20) {
            groupName = "U20";
            niveau = Group.Niveau.Junior;
        } else {
            groupName = "";
            niveau = Group.Niveau.Senior;
        }

        // Construct the full group name
        String fullGroupName = club.getNom() + " " + groupName;

        Group existingGroup = groupRepository.findByNom(fullGroupName);

        if (existingGroup == null) {
            Group newGroup = new Group();
            newGroup.setNom(fullGroupName);
            newGroup.setNiveau(niveau);
            newGroup.setClub(club);
            return groupService.saveGroup(newGroup);
        } else {
            return existingGroup;
        }
    }


    @DeleteMapping("/{id}")
    public void deleteContract(@PathVariable Long id) {
        contractService.deleteContract(id);
    }

    public int calculateAge(Joueur joueur) {
        Date birthDate = joueur.getBday();  // Assuming joueur.getBday() returns a Date object
        LocalDate birthDateLocal = birthDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate today = LocalDate.now();
        return Period.between(birthDateLocal, today).getYears();
    }
}

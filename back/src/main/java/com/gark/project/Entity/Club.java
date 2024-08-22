package com.gark.project.Entity;


import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@FieldDefaults(level = AccessLevel.PRIVATE)
//@Document(collection = "clubs")
public class Club {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom,president,location,type ;// type ??
    private String logoUrl;
    private Date foundationYear ;


//    @DBRef
//    @JsonManagedReference(value = "club-contracts")
//    private List<Contract> contracts = new ArrayList<>();

//    @DBRef
//    @JsonManagedReference(value = "club-groups")
//    private List<Group> groups = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contract> contracts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Group> groups = new ArrayList<>();


    public Club(Long id, String nom, String president , Date foundationYear, String location, String logoUrl) {
        this.id = id;
        this.nom = nom;
        this.president = president;
        this.location = location;
        this.logoUrl = logoUrl;
        this.foundationYear = foundationYear;
    }

    public Club(String nom, String president, Date foundationYear, String location) {
        this.nom = nom;
        this.president = president;
        this.location = location;
        this.foundationYear = foundationYear;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public void setPresident(String president) {
        this.president = president;
    }


    public void setType(String type) {
        this.type = type;
    }


    public void setFoundationYear(Date foundationYear) {
        this.foundationYear = foundationYear;
    }


    public void setLocation(String location) {
        this.location = location;
    }

    public void setContracts(List<Contract> contracts) {
        this.contracts = contracts;
    }

    public void setId(Long id) {
        this.id = id;
    }

}

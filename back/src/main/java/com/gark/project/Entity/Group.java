package com.gark.project.Entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "groupe")
//@FieldDefaults(level = AccessLevel.PRIVATE)
//@Document(collection = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;// type ??

    private Niveau niveau ;

//    @DBRef
//    @JsonBackReference(value = "club-groups")
//    private Club club ;
//
//    @DBRef
//    @JsonManagedReference
//    private List<Joueur> players = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Joueur> players = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    public Group(String nom) {
        this.nom = nom;
    }

    public Group(String nom, Club club) {

    }

    public Group(String nom, Niveau niveau, Club clubId) {
        this.nom = nom;
        this.club =clubId ;
        this.niveau =niveau ;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public enum Niveau {
        Cadet ,
        Senior,
        Junior,
        Minim,
        Poussin ,
        Benjamin

//                10 ans ou moins : Poussin.
//                11 et 12 ans : Benjamin.
//                13 et 14 ans : Minime.
//                15 à 17 ans : Cadet.
//                18 à 20 ans : Junior.
//                de 21 à 39 ans : Sénior 1.
    }
}

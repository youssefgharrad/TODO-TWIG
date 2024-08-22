package com.gark.project.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;

    @Enumerated(EnumType.STRING)
    private List<Strategie> strategie;

    @Enumerated(EnumType.STRING)
    private List<FocusArea> focusArea;

    private int duration ; // in minutes ???

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SessionType> sessionTypes;

    public enum Strategie {
        // Offensive Strategies
        CONSERVATION_BALLON("Conservation du ballon", Type.OFFENSIVE),
        UTILISATION_CREATION_ESPACES("Utilisation et création des espaces", Type.OFFENSIVE),
        DRIBBLE_ELIMINATION("Dribble et élimination", Type.OFFENSIVE),
        FIXER_JOUER_ZONE("Fixer dans une zone pour jouer dans une autre", Type.OFFENSIVE),
        AGRANDIR_ESPACE_JEU("Agrandir l'espace de jeu effectif", Type.OFFENSIVE),
        DESEQUILIBRER_FINIR("Desequilibrer et finir", Type.OFFENSIVE),
        PROGRESSION_BALLON("Progression du ballon", Type.OFFENSIVE),
        CPA("CPA", Type.OFFENSIVE),
        COUP_FRANC_COURT("Coup franc court", Type.OFFENSIVE),

        // Defensive Strategies
        DEFENSE_INTERIORITE_NUMERIQUE("Défense en intériorité numérique", Type.DEFENSIVE),
        ZONE_DEFENSE("Défense de zone", Type.DEFENSIVE),
        MAN_TO_MAN_MARKING("Marquage individuel", Type.DEFENSIVE),
        PRESSING_HIGH("Pressing haut", Type.DEFENSIVE),
        LOW_BLOCK("Bloc bas", Type.DEFENSIVE),
        COUNTER_PRESSING("Contre-pressing", Type.DEFENSIVE),
        NARROW_DEFENSE("Défense en largeur réduite", Type.DEFENSIVE),
        DEFENSIVE_TRANSITION("Transition défensive", Type.DEFENSIVE),
        BALL_SIDE_OVERLOAD("Surcharge du côté ballon", Type.DEFENSIVE),
        BLOCKING_PASSING_LANES("Blocage des lignes de passe", Type.DEFENSIVE),
        SWEEPER_KEEPER("Gardien-libéro", Type.DEFENSIVE),
        DELAY_AND_CONTAIN("Retarder et contenir", Type.DEFENSIVE),
        TRACKING_RUNNERS("Suivi des courses", Type.DEFENSIVE),
        INTERCEPTION_ANTICIPATION("Interception et anticipation", Type.DEFENSIVE),
        COVER_SUPPORT("Couverture et soutien", Type.DEFENSIVE),
        COMPACT_DEFENSE("Défense compacte", Type.DEFENSIVE);

        private final String description;
        private final Type type;

        Strategie(String description, Type type) {
            this.description = description;
            this.type = type;
        }

        public String getDescription() {
            return description;
        }

        public Type getType() {
            return type;
        }

        public enum Type {
            OFFENSIVE, DEFENSIVE
        }
    }

    public enum FocusArea {
        Possession ("Possession"),
        Mental ("Mental"),
        PriseDInformation ("Prise d'information"),
        Technique ("Technique"),
        Analytique ("Analytique"),
        Conservation ("Conservation"),
        ProgressionAvecBallon ("Progression avec ballon"),
        Adaptatif ("Adaptatif"),
        LaPasse ("La passe"),
        LeTir ("Le tir"),
        JeuDeTeteDefensif ("Jeu de tête défensif"),
        Corner ("Corner"),
        PossessionSousPression ("Possession sous pression"),
        CentreEtTir ("Centre et tir"),
        DribbleEn1Contre1 ("Dribble en 1 contre 1"),
        PressingHautPourRecuperer ("Pressing haut pour récupérer"),
        AttaqueFaceAUnBlocBas ("Attaque face à un bloc bas"),
        JeuSansBallonPourCreerUnEspace ("Jeu sans ballon pour créer un espace"),
        JouerEnPivot ("Jouer en pivot"),
        AttaqueEnSuperiorite ("Attaque en supériorité"),
        ContreAttaqueRapide ("Contre-attaque rapide"),
        TransitionOffensive ("Transition offensive"),
        TransitionDefensive ("Transition défensive"),
        PressionBasse ("Pression basse"),
        RepliDefensif ("Repli défensif"),
        BlocEquipe ("Bloc équipe"),
        JeuDePossession ("Jeu de possession"),
        ConstructionDuJeu ("Construction du jeu"),
        VariationDuJeu ("Variation du jeu");

        private final String description;

        FocusArea(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }




    public Exercise(String nom, String description, List<Strategie> strategie, int duration,List<FocusArea> focusArea,Session session) {
        this.nom = nom;
        this.description = description;
        this.strategie = strategie;
        this.duration = duration;
        this.focusArea=focusArea ;
        this.session=session ;
    }


}

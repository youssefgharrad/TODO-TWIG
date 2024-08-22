package com.gark.project.Service;

import com.gark.project.Entity.Joueur;

import java.util.List;

public interface JoueurService {
    public List<Joueur> getAllPlayers();
    public Joueur getPlayerById(Long id) ;
    public Joueur savePlayer(Joueur player) ;
    public void deletePlayer(Long id) ;
}

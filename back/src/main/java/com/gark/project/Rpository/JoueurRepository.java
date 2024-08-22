package com.gark.project.Rpository;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Joueur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JoueurRepository extends JpaRepository<Joueur, Long> {
    @Query("SELECT j FROM Joueur j WHERE j.group IS NULL")
    public List<Joueur> findAllByGroup();

    @Query("SELECT j FROM Joueur j WHERE j.group.id = :groupId")
    public List<Joueur> findClubJoueur(@Param("groupId") Long groupId);
}

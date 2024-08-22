package com.gark.project.Rpository;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByNom(String nom);
    Club findByClub_Id(Club club) ;
    // Group findByNom(String nom);

    @Query("SELECT Club FROM Group g where g.club.id=:id ")
    public Club findByClub (@Param("id") Long id) ;

    @Query("SELECT g FROM Group g WHERE g.club.id = :id")
    List<Group> findByClubId(@Param("id") Long id);

    //Optional<Group> findByNom(String nom);

//    @Query("SELECT g FROM Group g WHERE g.nom ==nom ")
//    public boolean findByNom(@Param("nom") String nom);
}

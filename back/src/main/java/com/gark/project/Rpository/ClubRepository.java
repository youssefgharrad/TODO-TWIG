package com.gark.project.Rpository;

import com.gark.project.Entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.awt.print.Pageable;
import java.util.Optional;

public interface ClubRepository extends JpaRepository<Club, Long> {
    @Query("SELECT c FROM Club c ORDER BY c.id DESC")
    public Optional<Club> findByClub ();

}

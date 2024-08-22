package com.gark.project.Rpository;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    @Query("SELECT Club FROM Club ORDER BY id DESC LIMIT 1")
    public Optional<Club> findByClub () ;
}

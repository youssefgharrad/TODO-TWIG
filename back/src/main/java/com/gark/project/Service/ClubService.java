package com.gark.project.Service;

import com.gark.project.Entity.Club;

import java.util.List;

public interface ClubService {
    public List<Club> getAllClubs() ;
    public Club getClubById(Long id) ;
    public Club saveClub(Club club) ;
    public void deleteClub(Long id) ;
}

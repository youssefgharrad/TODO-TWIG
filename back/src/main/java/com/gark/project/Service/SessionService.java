package com.gark.project.Service;

import com.gark.project.Entity.Joueur;
import com.gark.project.Entity.Session;

import java.util.List;

public interface SessionService {
    public List<Session> getAllSessions();
    public Session getSessionById(Long id) ;
    public Session saveSession(Session player) ;
    public void deleteSession(Long id) ;
}

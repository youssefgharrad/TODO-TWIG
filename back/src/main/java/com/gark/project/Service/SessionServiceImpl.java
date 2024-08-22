package com.gark.project.Service;

import com.gark.project.Entity.Session;
import com.gark.project.Rpository.SessioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SessionServiceImpl implements SessionService{
    @Autowired
    private SessioRepository SessionSession ;
    public List<Session> getAllSessions() {
        return (List<Session>) SessionSession.findAll();
    }

    public Session getSessionById(Long id) {
        return SessionSession.findById(id).orElse(null);
    }

    public Session saveSession(Session player) {
        return SessionSession.save(player);
    }

    public void deleteSession(Long id) {
        SessionSession.deleteById(id);
    }
}

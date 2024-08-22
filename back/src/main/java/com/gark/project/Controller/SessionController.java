package com.gark.project.Controller;

import com.gark.project.Entity.Exercise;
import com.gark.project.Entity.Session;
import com.gark.project.Service.SessionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/sessions")
@CrossOrigin(origins = "http://localhost:4200")
public class SessionController {

    @Autowired
    private SessionServiceImpl sessionService ;

    @GetMapping("/view")
    public List<Session> getAllSessionts() {
        return sessionService.getAllSessions();
    }

    @GetMapping("/{id}")
    public Session getSessiontById(@PathVariable Long id) {
        return sessionService.getSessionById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
    }

    @PostMapping("/add")
    public Long createSession(@RequestParam("objectif") String objectif,
                                   @RequestParam("date") Date date) {
        Session savedSession = sessionService.saveSession(new Session(objectif,date));
        return savedSession.getId();
    }
}

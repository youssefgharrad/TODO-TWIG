package com.gark.project.Service;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Joueur;
import com.gark.project.Rpository.JoueurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class JoueurServiceImpl implements JoueurService{

    @Autowired(required = false)
    private JoueurRepository JoueurRepository;

    private static final String IMAGE_DIRECTORY = "images/";


    public List<Joueur> getAllPlayers() {
        return (List<Joueur>) JoueurRepository.findAllByGroup();
    }

    public Joueur getPlayerById(Long id) {
        return JoueurRepository.findById(id).orElse(null);
    }

    public Joueur savePlayer(Joueur player) {
        return JoueurRepository.save(player);
    }

    public void deletePlayer(Long id) {
        JoueurRepository.deleteById(id);
    }

    public Joueur createPlayer(Joueur joueur, MultipartFile image) {
        String imageUrl = saveImageLocally(image);
        joueur.setPictureUrl(imageUrl);
        return JoueurRepository.save(joueur);
    }

    private String saveImageLocally(MultipartFile image) {
        String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path imagePath = Paths.get(IMAGE_DIRECTORY, imageName);
        try {
            Files.createDirectories(imagePath.getParent());
            Files.write(imagePath, image.getBytes());
            return imagePath.toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image", e);
        }
    }

    public List<Joueur> getAllPlayersEachClub(Long group) {
        return  JoueurRepository.findClubJoueur(group);
    }
}
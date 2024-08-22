package com.gark.project.Service;

import com.gark.project.Entity.Club;
import com.gark.project.Rpository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


@Service
public class ClubServiceImpl implements ClubService {
    @Autowired
    private ClubRepository clubRepository;

    private static final String IMAGE_DIRECTORY = "images/";


    public List<Club> getAllClubs() {
        return (List<Club>) clubRepository.findAll();
    }

    public Club getClubById(Long id) {
        return clubRepository.findById(id).orElse(null);
    }

    public Club saveClub(Club club) {
        return clubRepository.save(club);
    }

    public void deleteClub(Long id) {
        clubRepository.deleteById(id);
    }

    public Club findById(Long id) {
        return clubRepository.findById(id).orElse(null);
    }

    public Club createClub(Club club, MultipartFile image) {
        String imageUrl = saveImageLocally(image);
        club.setLogoUrl(imageUrl);
        return clubRepository.save(club);
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

    public Optional<Club> getClub(){return clubRepository.findByClub();}
}

package com.gark.project.Service;

import com.gark.project.Entity.Exercise;
import com.gark.project.Rpository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExerciseServiceImpl implements ExerciseService{
    @Autowired
    private ExerciseRepository exerciseRepository ;


    public List<Exercise> getAllExercises() {
        return (List<Exercise>) exerciseRepository.findAll();
    }

    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id).orElse(null);
    }

    public Exercise saveExercise(Exercise player) {
        return exerciseRepository.save(player);
    }

    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }

    public Map<Exercise.Strategie.Type, List<Exercise.Strategie>> getAllStrategies() {
        return Arrays.stream(Exercise.Strategie.values())
                .collect(Collectors.groupingBy(Exercise.Strategie::getType));
    }

    public List<Exercise.FocusArea> getAllFocusAreas() {
        return Arrays.stream(Exercise.FocusArea.values()).toList();
    }
}

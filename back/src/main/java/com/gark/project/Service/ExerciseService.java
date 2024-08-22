package com.gark.project.Service;

import com.gark.project.Entity.Exercise;

import java.util.List;

public interface ExerciseService {
    public List<Exercise> getAllExercises();
    public Exercise getExerciseById(Long id) ;
    public Exercise saveExercise(Exercise player) ;
    public void deleteExercise(Long id) ;
}

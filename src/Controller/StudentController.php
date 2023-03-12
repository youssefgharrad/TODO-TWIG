<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Student ;

class StudentController extends AbstractController
{
    #[Route('/student', name: 'app_student')]
    public function index(): Response
    {
        return $this->render('student/index.html.twig', [
            'controller_name' => 'StudentController',
        ]);
    }

    #[Route('/listerstudent', name: 'listerstudent')]
    public function listerstudent(ManagerRegistry $list): Response
    {
        $classrooms=$list->getRepository(Student::class);
        $result=$classrooms->findAll();

        return $this->render('student/list.html.twig', [
            'p'=>$result,
        ]);
    }

    #[Route('/ajouterstudent', name: 'ajouterstudent')]
    public function ajouterstudent(Request $request, ManagerRegistry $entityManager): Response
    {
        $classe = new Student();
        $form = $this->createFormBuilder($classe)
            ->add('Email', TextType::class)
            ->getForm();
            $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            $classe = $form->getData();
            $entityManager->getManager()->persist($classe);
            $entityManager->getManager()->flush();
            $this->addFlash('success', 'La classe a été ajoutée.');
            return $this->redirectToRoute('listerclass');
        }
        //dd($result); //dd=dump and die
        return $this->render('student/ajouterstudent.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/ListEtudiant', name: 'ListEtudiant')]
    public function search(StudentRepository $studentRepository, Request $request, ClassroomRepository $classroomRepository): Response
    {
        $search = $request->query->get('nsc');
        $classe = $request->query->get('classe');
    
        if ($search) {
            $students = $studentRepository->findBy(['NSC' => $search]);
    
        } elseif ($classe) {
            $classroom = $classroomRepository->findOneBy(['name' => $classe]);
            $students = $classroom->getStudentsClass()->toArray();
        } else {
            $students = $studentRepository->findAllOrderedByEmail();
        }
        
        return $this->render('student/index.html.twig', [
            'students' => $students,
        ]);
    }

    /*#[Route('/studentaff', name: 'studentaff')]
    public function studentaff(): Response
    {
        return $this->render('student/index.html.twig', [
            'controller_name' => 'StudentController',
        ]);
    }*/

    #[Route('/Last3Days', name: 'Last3Days')]
public function lastInscription(StudentRepository $studentRepository, Request $request, ClassroomRepository $classroomRepository): Response
{

        $students = $studentRepository->findLatestStudents();
    

    return $this->render('student/Days.html.twig', [
        'students' => $students,
    ]);
}

#[Route('/students_enabled', name: 'students_enabled')]
public function enabledStudents(StudentRepository $studentRepository): Response
{
    $students = $this->getDoctrine()
        ->getRepository(Student::class)
        ->findBy(['enabled' => true]);

    return $this->render('student/enabled.html.twig', [
        'students' => $students,
    ]);
}


#[Route('/students_between_dates', name: 'students_between_dates')]
public function studentsBetweenDates(EntityManagerInterface $entityManager): Response
{
    $query = $entityManager->createQuery(
        'SELECT s
        FROM App\Entity\Student s
        WHERE s.birthdate BETWEEN :start_date AND :end_date'
    )
    ->setParameter('start_date', '2000-11-02')
    ->setParameter('end_date', '2002-11-02');

    $students = $query->getResult();

    return $this->render('students/between_dates.html.twig', [
        'students' => $students,
    ]);
}

#[Route('/searchMoyenne', name: 'searchMoyenne')]
public function searchMoyenne(Request $request, StudentRepository $studentRepository): Response
{
    $minMoyenne = $request->query->get('minMoyenne');
    $maxMoyenne = $request->query->get('maxMoyenne');

    $students = $studentRepository->findByMoyenne($minMoyenne, $maxMoyenne);

    return $this->render('student/searchMoyenne.html.twig', [
        'students' => $students,
    ]);
}


}

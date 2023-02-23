<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use App\Entity\Classroom ;

class ClassroomController extends AbstractController
{
    #[Route('/classroom', name: 'app_classroom')]
    public function index(): Response
    {
        return $this->render('classroom/index.html.twig', [
            'controller_name' => 'ClassroomController',
        ]);
    }

    #[Route('/listerclass', name: 'listerclass')]
    public function listerclass(ManagerRegistry $list): Response
    {
        $classrooms=$list->getRepository(Classroom::class);
        $result=$classrooms->findAll();

        //$myString = "Hello World"; // votre chaîne
        //$url = $this->generateUrl('modifierclass', ['myString' => $myString]);
        //return new RedirectResponse($url);
        //dd($result); //dd=dump and die
        return $this->render('classroom/list.html.twig', [
            'p'=>$result,
        ]);
    }

    #[Route('/ajouterclass', name: 'ajouterclass')]
    public function ajouterclass(Request $request, ManagerRegistry $entityManager): Response
    {
        $classe = new Classroom();
        $form = $this->createFormBuilder($classe)
            ->add('name', TextType::class)
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
        return $this->render('classroom/ajouterclass.html.twig', [
            'form' => $form->createView(),
        ]);
    }


    #[Route('/modifierclass/{id}/{name}', name: 'modifierclass')]
    public function modifierclass(Request $request, ManagerRegistry $entityManager, $id, $name): Response
{
    $classroom = $entityManager->getRepository(Classroom::class)->find($id);
    $form = $this->createFormBuilder($classroom)
        ->add('name', TextType::class, ['data' => $name])
        ->getForm();
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
        $classroom = $form->getData();
        $entityManager->getManager()->flush();
        $this->addFlash('success', 'La classe a été modifiée.');
        return $this->redirectToRoute('listerclass');
    }

    return $this->render('classroom/modifierclass.html.twig', [
        'form' => $form->createView(),
    ]);
    
}

#[Route('/supprimerclass/{id}', name: 'supprimerclass')]
   /* public function supprimerclass( ManagerRegistry $entityManager, $id): Response
{

    $classroom = $entityManager->getRepository(Classroom::class)->find($id);
    $classroom = $entityManager->getManager()->remove($classroom)
       $entityManager->getManager()->flush();
       return $this->redirectToRoute('listerclass');

    
    
}*/


public function supprimerclass(Request $request, ManagerRegistry $entityManager, $id): Response
{
    $classroom = $entityManager->getRepository(Classroom::class)->find($id);
  $classroom=$entityManager->getManager()->remove($classroom);
  $entityManager->getManager()->flush();
  return $this->redirectToRoute('listerclass');

   

  
}


}

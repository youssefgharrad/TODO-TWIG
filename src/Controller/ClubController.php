<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use App\Entity\Club ;

class ClubController extends AbstractController
{
    #[Route('/club', name: 'app_club')]
    public function index(): Response
    {
        return $this->render('club/index.html.twig', [
            'controller_name' => 'ClubController',
        ]);
    }

    


    #[Route('/listerclub', name: 'listerclub')]
    public function listerclub(ManagerRegistry $list): Response
    {
        return $this->render('club/list.html.twig', [
            'p' => $repo->findAll(),
        ]);
    }

    #[Route('/ajouterclub', name: 'ajouterclub')]
    public function ajouterclub(Request $request, ManagerRegistry $entityManager): Response
    {
        $club = new Club();

        $form = $this->createFormBuilder($club)
            ->add('createdAt', TextType::class, [
                'required' => true,
                'constraints' => [new NotBlank()],
            ])
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // récupérer les données du formulaire soumis
            $club = $form->getData();
            // si le champ createdAt est vide, le remplir avec la date actuelle
            if (empty($club->getCreatedAt())) {
                $club->setCreatedAt();
            }
            // persister l'entité en base de données
            $entityManager->getManager()->persist($club);
            $entityManager->getManager()->flush();
            $this->addFlash('success', 'Le club a été ajouté.');
            // rediriger vers la page d'affichage des clubs
            return $this->redirectToRoute('getClub');
        }
        return $this->render('classroom/ajouterclass.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ClubController extends AbstractController
{
    #[Route('/club', name: 'app_club')]
    public function index(): Response
    {
        return $this->render('club/index.html.twig', [
            'controller_name' => 'ClubController',
        ]);
    }

    #[Route('/getname/{nom}', name: 'getname')]
    public function getname($nom): Response
    {
        return $this->render('club/index.html.twig', [
            't'=>$nom 
        ]);
        
    }

    #[Route('/detailname/{nom}', name: 'detail')]
    public function detail($nom): Response
    {
        return $this->render('club/detail.html.twig', [
            't'=>$nom 
        ]);
        
    }

    #[Route('/formation', name: 'formation')]
    public function list(): Response
    {
        $formations = array(
            array('ref' => 'form147', 'Titre' => 'Formation Symfony
            4','Description'=>'formation pratique',
            'date_debut'=>'12/06/2020', 'date_fin'=>'19/06/2020',
            'nb_participants'=>19) ,
            array('ref'=>'form177','Titre'=>'Formation SOA' ,
            'Description'=>'formation
            theorique','date_debut'=>'03/12/2020','date_fin'=>'10/12/2020',
            'nb_participants'=>0),
            array('ref'=>'form178','Titre'=>'Formation Angular' ,
            'Description'=>'formation
            theorique','date_debut'=>'10/06/2020','date_fin'=>'14/06/2020',
            'nb_participants'=>12)) ;
        return $this->render('club/list.html.twig', [
            'f'=> $formations
        ]);
        
    }

    #[Route('/participer/{m}', name: 'participer')]
    public function participer($m): Response
    {
        return $this->render('club/detail.html.twig', [
            't'=>$m 
        ]);
        
    }
}

<?php

namespace App\Entity;

use App\Repository\ClubRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClubRepository::class)]
class Club
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $REF = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $CreatedAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $CeatedAt = null;

    public function getId(): ?int
    {
        return $this->REF;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->CreatedAt;
    }

    public function setCreatedAt(\DateTimeImmutable $CreatedAt): self
    {
        $this->CreatedAt = $CreatedAt;

        return $this;
    }

    public function getCeatedAt(): ?\DateTimeImmutable
    {
        return $this->CeatedAt;
    }

    public function setCeatedAt(\DateTimeImmutable $CeatedAt): self
    {
        $this->CeatedAt = $CeatedAt;

        return $this;
    }
}

package com.gark.project.Service;

import com.gark.project.Entity.Club;
import com.gark.project.Entity.Contract;
import com.gark.project.Rpository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractServiceImpl implements ContractService{

    @Autowired(required = false)
    private ContractRepository contractRepository;

    public List<Contract> getAllContracts() {
        return (List<Contract>) contractRepository.findAll();
    }

    public Contract getContractById(Long id) {
        return contractRepository.findById(id).orElse(null);
    }

    public Contract saveContract(Contract contract) {
        return contractRepository.save(contract);
    }

    public void deleteContract(Long id) {
        contractRepository.deleteById(id);
    }

    public Optional<Club> getClub(){return contractRepository.findByClub();}
}
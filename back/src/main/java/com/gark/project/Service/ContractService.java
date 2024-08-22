package com.gark.project.Service;

import com.gark.project.Entity.Contract;

import java.util.List;

public interface ContractService {
    public List<Contract> getAllContracts() ;
    public Contract getContractById(Long id) ;
    public Contract saveContract(Contract contract) ;
    public void deleteContract(Long id) ;
}

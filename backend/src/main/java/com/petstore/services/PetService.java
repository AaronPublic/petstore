package com.petstore.services;

import com.petstore.models.Pet;
import com.petstore.models.PetCategory;
import com.petstore.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PetService {

    private final PetRepository petRepository;

    @Autowired
    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getPetsByCategory(PetCategory category) {
        return petRepository.findByCategory(category);
    }

    public Optional<Pet> getPetById(UUID id) {
        return petRepository.findById(id);
    }

    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Optional<Pet> updatePet(UUID id, Pet petDetails) {
        return petRepository.findById(id).map(existingPet -> {
            existingPet.setName(petDetails.getName());
            existingPet.setCategory(petDetails.getCategory());
            existingPet.setBreed(petDetails.getBreed());
            existingPet.setAge(petDetails.getAge());
            existingPet.setPrice(petDetails.getPrice());
            existingPet.setImageUrl(petDetails.getImageUrl());
            existingPet.setDescription(petDetails.getDescription());
            return petRepository.save(existingPet);
        });
    }

    public boolean deletePet(UUID id) {
        return petRepository.findById(id).map(pet -> {
            petRepository.delete(pet);
            return true;
        }).orElse(false);
    }
}

package com.petstore;

import com.petstore.models.Pet;
import com.petstore.models.PetCategory;
import com.petstore.repositories.PetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class PetstoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetstoreApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedData(PetRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				List<Pet> pets = List.of(
						Pet.builder()
								.name("Buddy")
								.category(PetCategory.DOG)
								.breed("Golden Retriever")
								.age(2)
								.price(new BigDecimal("500.00"))
								.imageUrl("https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80")
								.description("Buddy is a friendly and energetic Golden Retriever who loves to play fetch and swim.")
								.build(),
						Pet.builder()
								.name("Luna")
								.category(PetCategory.CAT)
								.breed("Siamese")
								.age(1)
								.price(new BigDecimal("300.00"))
								.imageUrl("https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80")
								.description("Luna is a beautiful Siamese cat with a calm personality and striking blue eyes.")
								.build(),
						Pet.builder()
								.name("Tweety")
								.category(PetCategory.BIRD)
								.breed("Canary")
								.age(1)
								.price(new BigDecimal("50.00"))
								.imageUrl("https://images.unsplash.com/photo-1522850949506-58555ed7f748?auto=format&fit=crop&w=800&q=80")
								.description("Tweety is a cheerful canary that fills the room with beautiful songs.")
								.build(),
						Pet.builder()
								.name("Goldie")
								.category(PetCategory.FISH)
								.breed("Goldfish")
								.age(1)
								.price(new BigDecimal("10.00"))
								.imageUrl("https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80")
								.description("Goldie is a low-maintenance goldfish perfect for beginners.")
								.build(),
						Pet.builder()
								.name("Max")
								.category(PetCategory.DOG)
								.breed("German Shepherd")
								.age(3)
								.price(new BigDecimal("700.00"))
								.imageUrl("https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80")
								.description("Max is a highly trained and loyal German Shepherd, great for protection and companionship.")
								.build()
				);
				repository.saveAll(pets);
			}
		};
	}

}

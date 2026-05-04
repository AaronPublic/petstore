package com.petstore.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PetCategory category;

    @Column(nullable = false)
    private String breed;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(length = 512)
    private String imageUrl;

    @Column(length = 2000)
    private String description;

    public Pet() {}

    public Pet(UUID id, String name, PetCategory category, String breed, Integer age, BigDecimal price, String imageUrl, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.breed = breed;
        this.age = age;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    public static PetBuilder builder() {
        return new PetBuilder();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public PetCategory getCategory() { return category; }
    public void setCategory(PetCategory category) { this.category = category; }
    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public static class PetBuilder {
        private UUID id;
        private String name;
        private PetCategory category;
        private String breed;
        private Integer age;
        private BigDecimal price;
        private String imageUrl;
        private String description;

        public PetBuilder id(UUID id) { this.id = id; return this; }
        public PetBuilder name(String name) { this.name = name; return this; }
        public PetBuilder category(PetCategory category) { this.category = category; return this; }
        public PetBuilder breed(String breed) { this.breed = breed; return this; }
        public PetBuilder age(Integer age) { this.age = age; return this; }
        public PetBuilder price(BigDecimal price) { this.price = price; return this; }
        public PetBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public PetBuilder description(String description) { this.description = description; return this; }
        public Pet build() {
            return new Pet(id, name, category, breed, age, price, imageUrl, description);
        }
    }
}

# Data Model: Core Petstore E-commerce

## Entity: Pet

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| `id` | UUID | Primary Key, Generated | Unique identifier for the pet |
| `name` | String | Not Null, Max 100 | Name of the pet |
| `category` | Enum | Not Null | DOG, CAT, BIRD, FISH |
| `breed` | String | Not Null, Max 100 | Breed of the pet |
| `age` | Integer | Not Null, Min 0 | Age of the pet in years/months |
| `price` | BigDecimal | Not Null, Precision 10, Scale 2 | Selling price |
| `imageUrl` | String | Max 512 | URL to the pet's photo |
| `description` | Text | Max 2000 | Detailed description of the pet |

## Enums

### PetCategory
- `DOG`
- `CAT`
- `BIRD`
- `FISH`

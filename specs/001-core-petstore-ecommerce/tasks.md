# Tasks: Core Petstore E-commerce

**Input**: Design documents from `/specs/001-core-petstore-ecommerce/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app (Primary)**: `backend/src/`, `frontend/src/`
- Paths shown below assume web app structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Create `backend/` and `frontend/` directory structures
- [ ] T002 Initialize Spring Boot project in `backend/` with JPA, Web, and Postgres dependencies
- [ ] T003 Initialize React project in `frontend/` with MUI and Tailwind CSS
- [ ] T004 [P] Configure Docker Compose for local Postgres development

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T005 Create `Pet` entity and `PetCategory` enum in `backend/src/main/java/com/petstore/models/`
- [ ] T006 Create `PetRepository` in `backend/src/main/java/com/petstore/repositories/`
- [ ] T007 Configure database connection in `backend/src/main/resources/application.yml`
- [ ] T008 [P] Setup basic API error handling and logging in `backend/`
- [ ] T009 [P] Configure Tailwind CSS and MUI theme in `frontend/src/styles/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Pets with Filters (Priority: P1) 🎯 MVP

**Goal**: Responsive grid showing pets with category filters

**Independent Test**: Navigate to `/`, see grid, apply filters, verify displayed pets.

### Implementation for User Story 1

- [ ] T010 [US1] Implement `GET /api/pets` with category filtering in `backend/src/main/java/com/petstore/controllers/PetController.java`
- [ ] T011 [US1] Create API client service in `frontend/src/services/petService.ts`
- [ ] T012 [P] [US1] Create `PetCard` component in `frontend/src/components/PetCard.tsx`
- [ ] T013 [P] [US1] Create `FilterBar` component in `frontend/src/components/FilterBar.tsx`
- [ ] T014 [US1] Implement `PetGallery` page in `frontend/src/pages/PetGallery.tsx`
- [ ] T015 [US1] Add basic seed data to Postgres for gallery testing

**Checkpoint**: User Story 1 (MVP) is fully functional and testable independently.

---

## Phase 4: User Story 2 - Manage Pet Inventory (Priority: P2)

**Goal**: CRUD REST endpoints for pet management

**Independent Test**: Use Postman/curl to POST, PUT, DELETE pets; verify database changes.

### Implementation for User Story 2

- [ ] T016 [US2] Implement `POST /api/pets` for creating pets in `PetController.java`
- [ ] T017 [US2] Implement `PUT /api/pets/{id}` for updating pets in `PetController.java`
- [ ] T018 [US2] Implement `DELETE /api/pets/{id}` for removing pets in `PetController.java`
- [ ] T019 [P] [US2] Add validation to Pet entity and DTOs in `backend/`
- [ ] T020 [US2] Implement backend service logic in `backend/src/main/java/com/petstore/services/PetService.java`

**Checkpoint**: User Story 2 is fully functional; inventory can be managed via API.

---

## Phase 5: User Story 3 - View Pet Details (Priority: P3)

**Goal**: Detailed view for a specific pet

**Independent Test**: Click a pet in the gallery, verify navigation to `/pets/{id}` and display of details.

### Implementation for User Story 3

- [ ] T021 [US3] Implement `GET /api/pets/{id}` in `backend/src/main/java/com/petstore/controllers/PetController.java`
- [ ] T022 [US3] Create `PetDetails` page in `frontend/src/pages/PetDetails.tsx`
- [ ] T023 [US3] Configure routing in `frontend/src/App.tsx` for details navigation

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T024 [P] Update `specs/001-core-petstore-ecommerce/quickstart.md` with setup instructions
- [ ] T025 [P] Finalize Tailwind styling for consistent UX across all pages
- [ ] T026 Perform final end-to-end manual testing of the full e-commerce flow

---

## Dependencies & Execution Order

- **Phase 1 & 2** are strictly sequential and block Phase 3-5.
- **Phase 3 (US1)** is the MVP and should be prioritized.
- **Phase 4 & 5** can be worked on in parallel once Phase 2 is complete.

# AI_RULES

## Tech Stack

* Expo Router
* TypeScript
* Axios
* Zustand
* AsyncStorage
* React Hook Form
* Zod

## Architecture

Screen
→ Hook
→ Service

## Folder Responsibilities

app/

* Screen UI only

components/

* Reusable UI only

hooks/

* Business logic only

services/

* API communication only

store/

* Global state only

types/

* Interfaces only

utils/

* Helper functions only

## Coding Standards

1. TypeScript only.
2. Never use any.
3. Functional Components only.
4. Use StyleSheet.create.
5. No inline styles.
6. Prefer reusable components.
7. Strong typing required.
8. Keep components focused.
9. Keep hooks focused.
10. Avoid duplicate logic.

## File Rules

1. Modify only requested files.
2. Return complete file code.
3. Do not rename files.
4. Do not move files.
5. Do not create a new architecture.
6. Follow existing folder structure.

## UI Rules

1. Mobile first.
2. Clean ecommerce style.
3. Consistent spacing.
4. Reuse theme.ts values.
5. Use FlatList for product lists.

## State Management

Use:

* Zustand for global state
* AsyncStorage persistence

Do not use:

* Redux
* Context API for global state

## API Rules

Use:

* Axios
* Service layer

Do not call APIs directly inside reusable components.

## Project Goal

Build a simple, maintainable Ecommerce App suitable for academic submission while following clean code practices.

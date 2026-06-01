@AGENTS.md
# Ecommerce App Project Context

Project Name:
Project_SE193355_EcommerceApp

Project Type:
Academic React Native Ecommerce Application

Tech Stack:

* Expo Router
* React Native
* TypeScript
* Axios
* Zustand
* AsyncStorage
* React Hook Form
* Zod

Architecture:

Screen
→ Hook
→ Service

Folder Structure:

app/
components/
constants/
hooks/
services/
store/
types/
utils/

Responsibilities:

app/

* Screen UI only
* Navigation only

components/

* Reusable UI components only

hooks/

* Business logic
* Data fetching
* Search logic
* Screen helper logic

services/

* API communication only

store/

* Zustand global state

types/

* Interfaces and types

utils/

* Helper functions
* Validation helpers
* Formatting helpers

Project Features:

1. Product List

* Fetch products from FakeStoreAPI
* Loading state
* Error state

2. Product Detail

* Product information
* Add to cart

3. Search

* Search by product title

4. Cart

* Add product
* Remove product
* Increase quantity
* Decrease quantity
* Total price

5. Checkout

* Name
* Email
* Address
* Validation
* Success message

6. Persistence

* Save cart using AsyncStorage

Code Quality Rules:

* TypeScript only
* No any type
* Functional Components only
* No inline styles
* Use StyleSheet.create
* Strong typing
* Reusable components
* Keep code simple
* Academic project level
* Production-style organization
* Return complete file code
* Do not modify unrelated files

Existing Hooks:

* useProducts.ts
* useSearch.ts

Existing Store:

* cartStore.ts

Before generating code:

1. Check current architecture.
2. Follow folder structure exactly.
3. Do not create a different architecture.
4. Do not rename files.
5. Do not create unnecessary folders.
6. Keep implementation simple and maintainable.

# Prompts

This file lists the prompts that were used with an AI assistant to build this project. The prompts are grouped by phase so it is easy to see how the project evolved from an initial idea to a documented, responsive dashboard.

The prompts are kept close to how they were originally written, with minor cleanup for readability.

---

## Phase 1: Initial scaffold

I want to implement a single-page frontend project of a standard dashboard that follows the best practices of a dashboard. It should use mock data from a folder called orders.json. On a single page, there is a table that shows each value of the items to start. Use the Mantine library for UI.

Extend the mock orders.json to 30 records, keeping the same structure as the existing entries.

Now using Mantine, I want to implement pagination with 10 records per page.

---

## Phase 2: Filters, search, and sort

Now I want a search box that searches items based on id and customer.

Now I want a filter on this table to filter the data using enum types: Pending, Processing, Completed, Cancelled.

Now I want to be able to reorder the table's content based on price from most to least, date from latest to furthest, and customer name alphabetically.

Now I want to open a modal on each row's icon click to show all of that row's data.

Only show the data we already have, using the names we defined on the table. Remove all other mock data that is not in our orders.json format.

---

## Phase 3: Modularization

Now let's get into the modularization details. I want to make the search bar, the table, and the modal three decoupled components, following polymorphism and inheritance rules.

---

## Phase 4: TypeScript and linting fixes

In my orders.ts constants file, I get this error on line 2: Order is a type and must be imported using a type-only import when verbatimModuleSyntax is enabled. And in types, the OrderStatus enum says this syntax is not allowed when erasableSyntaxOnly is enabled.

---

## Phase 5: Responsive design

Now I want to also make it responsive for mobile, and keep in mind that we need to have the best practices implemented.

---

## Phase 6: Jalali dates

Now I need to convert the date to Jalali using dayjs and the needed util.

---

## Phase 8: Documentation

I also need a PROMPTS.md file to list the prompts that I gave the AI to help me build the project.

---

## Notes

The prompts above were written iteratively. Each one built on the previous response, and several were corrections after TypeScript or runtime errors surfaced in the code. The overall workflow was:

1. Start with a minimal but correctly structured dashboard.
2. Add one feature at a time (search, filter, sort, modal).
3. Refactor into decoupled, generic components once the features stabilized.
4. Fix TypeScript configuration conflicts and prop type mismatches.
5. Make the layout responsive across mobile, tablet, and desktop.
6. Add Jalali date formatting.
7. Set up the repository and write documentation.

The goal of keeping this file is transparency about how the project was built, and to make it easy for anyone reviewing the code to understand which decisions came from which request.

# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Assumption:

- Custom ID fields for each agent is unique

Tickets:

1.  Backend: Facilities should be able to add custom IDs for agents they work with.

    Acceptance criteria:

        a. To the agent table add a new field named `custom_id` should be added.
        b. Facilities should be able to add and update `custom_id` on the agent profile.
        c. `custom_id` should be marked unique.
        d. An index should be created for `custom_id` column to make the query faster when queried with `custom_id` assuming the database is SQL.

    Implementataion:

        a. Add new field to agents table.
        b. New API end point should be created to give the ability to add and update the custom ID of the agent.
        c. Update  `getShiftByFacility` and `generateReport` function to use custom_id  instead of the database generated internal ID.

    Estimation:

        6 story points.

2.  Frontend: Facilities should be able to add and update the custom id field on the UI.

    Acceptance criteria:

        a. On agent update form custom id field should be added.
        b. On agent create form custom id field should be added.
        c. Custom id field is optional and can be left empty.
        d. Custom id field is displayed instead of internal db id on agent detail page.
        e. Custom id field is displayed instead of internal db id on shifts list page.

    Implementation:

        a. Add a new input field to collect the agent data on create and update form.
        b. Update the shifts and agent detail page with the custom id , if present.

    Estimation:

        2 story points.

3.  Documentation: Update the API doc to list the need and usage of custom id field.

    Acceptance criteria:

        a. Custom id fields usage and need should be documented in reports section.
        b. The impact to APIs should be documented.

    Estimation:

        1 story points.

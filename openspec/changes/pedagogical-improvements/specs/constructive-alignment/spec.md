# Constructive Alignment Specification

## Purpose

Add explicit learning objectives to all 12 unit .qmd headers and create an alignment mapping document linking Objectives → Activities → Assessments for each unit. Currently, units have inconsistent or missing learning objectives, and there's no systematic alignment verification.

## Requirements

### Requirement: Learning Objectives in Unit Headers

The system SHALL add a "🎯 En este tema aprenderás" section to the beginning of every .qmd file across all 12 units. Each file MUST list 3–5 specific, measurable learning objectives using Bloom's taxonomy verbs.

#### Scenario: Every unit file has objectives

- GIVEN there are ~57 .qmd content files across 12 units
- WHEN the alignment pass is complete
- THEN every .qmd file contains a learning objectives section within the first 30 lines
- AND each objective uses an action verb (instalar, configurar,Crear, diagnosticar, etc.)

#### Scenario: Objectives are measurable

- GIVEN a learning objective in a .qmd file
- WHEN an instructor reads it
- THEN the objective specifies what students will DO (not just "understand" or "know")
- AND the objective is testable via quiz, lab, or demonstration

#### Scenario: Objectives match existing content

- GIVEN a .qmd file has existing content
- WHEN objectives are added
- THEN each objective maps to at least one section of the file's content
- AND no objective references content that doesn't exist in the file

### Requirement: Alignment Mapping Document

The system SHALL create `openspec/changes/pedagogical-improvements/alignment-mapping.md` containing a table per unit that maps: Learning Objectives → Quizzes → Labs. This document serves as the authoritative alignment reference.

#### Scenario: Mapping document exists

- WHEN the alignment pass is complete
- THEN `alignment-mapping.md` exists in the change directory
- AND it contains 12 unit sections

#### Scenario: Each unit has complete mapping

- GIVEN a unit section in the mapping document
- WHEN reviewed
- THEN it lists all learning objectives for that unit
- AND maps each objective to at least one quiz question or lab exercise
- AND identifies any objectives with no assessment (gaps)

#### Scenario: Gap identification

- GIVEN the mapping document
- WHEN an objective has no corresponding quiz or lab
- THEN the gap is flagged with ⚠️ marker
- AND a recommendation is provided (add quiz question, add lab exercise, or adjust objective)

### Requirement: Quiz-Objective Cross-Reference

The system SHALL verify that each quiz (quiz_unidad1.qmd through quiz_unidad12.qmd) covers at least 2 learning objectives from its corresponding unit. Quizzes with no objective alignment SHALL be flagged.

#### Scenario: Quizzes reference objectives

- GIVEN quiz_unidadN.qmd exists
- WHEN the alignment check runs
- THEN at least 2 questions map to unit N learning objectives
- AND mapping is documented in alignment-mapping.md

#### Scenario: Insufficient coverage flagged

- GIVEN a quiz covers fewer than 2 unit objectives
- WHEN the alignment check runs
- THEN the quiz is flagged as "insufficient coverage"
- AND recommendation is provided to add questions

## Rationale

Constructive alignment ensures every assessment item ties back to a stated learning objective, and every objective has at least one assessment. Without this, the course risks teaching topics that are never assessed, or assessing topics that were never taught.

# Requirements Document

## Introduction

This feature aims to replace the existing Categories and Adult pages with a unified quick reference homepage that provides immediate access to common drug dosages in a single page format. Instead of navigating through separate category pages or the current multi-step calculation process, healthcare professionals will land directly on a comprehensive drug reference that displays pre-calculated dosages for common medications based on a standard weight input. The drugs will be filterable by complaints/symptoms or medication categories, and the interface will display dosage information in an easily scannable card format. This becomes the new main entry point and homepage for the application.

## Requirements

### Requirement 1

**User Story:** As a healthcare professional, I want the quick reference to be the main homepage of the application, so that I can immediately access common drug dosages without navigating through category pages.

#### Acceptance Criteria

1. WHEN the user visits the application root URL THEN the system SHALL display the quick reference page as the homepage
2. WHEN the user enters a weight value THEN the system SHALL automatically update all displayed dosages in real-time
3. WHEN no weight is entered THEN the system SHALL display dosages for a default weight (e.g., 18kg as shown in the reference image)
4. WHEN displaying drug information THEN each card SHALL show the drug name, dosage calculation, and administration volume with clear visual formatting
5. WHEN the user accesses the application THEN they SHALL no longer see separate Categories or Adult pages as navigation options

### Requirement 2

**User Story:** As a healthcare professional, I want to filter drugs by complaints or symptoms, so that I can quickly find relevant medications for specific clinical situations.

#### Acceptance Criteria

1. WHEN the user views the quick reference page THEN the system SHALL provide filter buttons for different complaint categories (e.g., "All", "Antibiotics", "Symptomatic")
2. WHEN the user selects a complaint filter THEN the system SHALL display only drugs relevant to that complaint category
3. WHEN the user switches between filters THEN the system SHALL maintain the current weight input and update dosages accordingly
4. WHEN no specific filter is selected THEN the system SHALL default to showing all available drugs

### Requirement 3

**User Story:** As a healthcare professional, I want drugs to be tagged with relevant complaints and symptoms, so that the filtering system can accurately categorize medications.

#### Acceptance Criteria

1. WHEN defining drug data THEN each drug SHALL have associated complaint tags (e.g., "respiratory", "infection", "pain", "allergy")
2. WHEN a drug treats multiple conditions THEN it SHALL be tagged with multiple relevant complaint categories
3. WHEN displaying filtered results THEN drugs SHALL appear in all relevant complaint categories they are tagged with
4. WHEN managing drug data THEN the system SHALL support adding new complaint tags without code changes

### Requirement 4

**User Story:** As a healthcare professional, I want the dosage display to be visually clear and color-coded, so that I can quickly distinguish between different types of medications and formulations.

#### Acceptance Criteria

1. WHEN displaying dosage information THEN the system SHALL use color-coded badges to distinguish between different medication types (e.g., red for antibiotics, blue for symptomatic treatments)
2. WHEN showing administration volumes THEN the system SHALL clearly indicate the formulation type (e.g., "mL BD", "mL TDS", "mL OD")
3. WHEN displaying drug names THEN the system SHALL show both the generic name and common dosage information in a readable format
4. WHEN the calculated dose exceeds safe limits THEN the system SHALL display appropriate warnings with distinct visual styling

### Requirement 5

**User Story:** As a healthcare professional, I want the quick reference to work on mobile devices, so that I can access drug information quickly during patient consultations.

#### Acceptance Criteria

1. WHEN accessing the page on mobile devices THEN the system SHALL display drug cards in a responsive grid layout
2. WHEN the screen size is small THEN the system SHALL maintain readability of all dosage information
3. WHEN using touch interfaces THEN filter buttons SHALL be appropriately sized for touch interaction
4. WHEN scrolling through drug cards THEN the weight input and filter controls SHALL remain easily accessible

### Requirement 6

**User Story:** As a healthcare professional, I want to access detailed calculation information when needed, so that I can verify dosages and access additional drug information.

#### Acceptance Criteria

1. WHEN viewing a drug card THEN the user SHALL be able to tap/click to access detailed calculation information
2. WHEN accessing detailed view THEN the system SHALL show the full dosing profile, contraindications, and calculation methodology
3. WHEN in detailed view THEN the user SHALL be able to return to the quick reference view easily
4. WHEN viewing detailed information THEN the system SHALL maintain the current weight and filter settings

### Requirement 7

**User Story:** As a healthcare professional, I want the application navigation to be simplified without separate category pages, so that I can access all functionality from the main quick reference homepage.

#### Acceptance Criteria

1. WHEN the application loads THEN the system SHALL remove the Categories page from the navigation structure
2. WHEN the application loads THEN the system SHALL remove the Adult page from the navigation structure
3. WHEN users access the application THEN the system SHALL redirect any existing bookmarks to category pages to the new homepage
4. WHEN navigating the application THEN users SHALL access all drug categories through the filter system on the homepage
5. WHEN the application displays navigation THEN it SHALL show Calculator, Diagnosis, and Resources as secondary pages accessible from the homepage

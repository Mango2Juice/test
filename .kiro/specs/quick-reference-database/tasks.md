# Implementation Plan

- [x] 1. Set up core database structure and types
  - Create directory structure for quick reference database
  - Define TypeScript interfaces for simplified medication data
  - Create JSON schema for data validation
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 1.1 Create database directory structure
  - Create `src/lib/quick-reference-database/` directory
  - Set up index.ts file for main exports
  - Create types.ts for TypeScript interfaces
  - _Requirements: 1.1, 1.3_

- [x] 1.2 Define simplified medication data interfaces
  - Implement QuickReferenceMedication interface
  - Create QuickReferenceComplaintCategory interface
  - Define QuickReferenceCalculationResult interface
  - Add QuickReferenceDatabaseConfig interface
  - _Requirements: 1.1, 1.2, 4.1, 5.1_

- [x] 1.3 Create JSON data files structure
  - Create medications.json with initial medication entries
  - Create complaint-categories.json with default categories
  - Add database configuration file
  - _Requirements: 1.1, 5.1, 5.3_

- [x] 2. Implement simplified calculation engine
  - Create calculation utilities for simplified dosing formulas
  - Implement weight-based and age-based calculation logic
  - Add volume calculation for different formulations
  - _Requirements: 4.1, 4.2, 4.4_

- [x] 2.1 Create QuickReferenceCalculator class
  - Implement calculatePediatricDose method
  - Implement calculateAdultDose method
  - Add calculateAdminVolume utility function
  - _Requirements: 4.1, 4.2, 4.4_

- [x] 2.2 Add calculation validation and error handling
  - Implement dose validation logic
  - Add age and weight range validation
  - Create warning generation for edge cases
  - _Requirements: 4.1, 4.5_

- [ ]* 2.3 Write unit tests for calculation engine
  - Test pediatric dose calculations with various weights
  - Test adult dose calculations
  - Test volume calculations for different concentrations
  - Test validation and error scenarios
  - _Requirements: 4.1, 4.2, 4.4_

- [x] 3. Create database management utilities
  - Implement data loading from JSON files
  - Create filtering and search functionality
  - Add medication management operations
  - _Requirements: 2.1, 3.1, 5.2, 6.1_

- [x] 3.1 Implement data loading utilities
  - Create loadMedications function to read from JSON
  - Implement loadComplaintCategories function
  - Add error handling for file loading failures
  - _Requirements: 6.1, 6.4_

- [x] 3.2 Create filtering and search functionality
  - Implement getFilteredMedications function
  - Add complaint category filtering logic
  - Create audience-based filtering (pediatric/adult)
  - _Requirements: 3.1, 3.3, 5.2, 5.4_

- [x] 3.3 Add medication management operations
  - Implement updateMedication function
  - Create toggleMedicationEnabled function
  - Add addMedication function for new entries
  - _Requirements: 2.1, 2.2, 3.2_

- [x] 4. Create custom hook for database access
  - Implement useQuickReferenceDatabase hook
  - Add state management for medications and categories
  - Integrate calculation engine with hook
  - _Requirements: 1.1, 4.1, 5.4_

- [x] 4.1 Implement useQuickReferenceDatabase hook
  - Set up state management for medications and categories
  - Add loading and error states
  - Implement data fetching on hook initialization
  - _Requirements: 1.1, 6.1_

- [x] 4.2 Add calculation methods to hook
  - Integrate calculateDose method
  - Add real-time calculation updates
  - Implement calculation result caching
  - _Requirements: 4.1, 4.2_

- [x] 4.3 Implement filtering methods in hook
  - Add getFilteredMedications method
  - Implement getEnabledCategories method
  - Create category-based filtering logic
  - _Requirements: 3.1, 5.2, 5.4_

- [x] 5. Add data validation and error handling
  - Create JSON schema validation
  - Implement runtime data validation
  - Add comprehensive error handling
  - _Requirements: 6.4, 6.1_

- [x] 5.1 Create JSON schema validation
  - Define JSON schema for medication entries
  - Create schema for complaint categories
  - Implement schema validation utilities
  - _Requirements: 6.1, 6.4_

- [x] 5.2 Implement runtime validation
  - Add validateMedication function
  - Create data integrity checks
  - Implement validation result interfaces
  - _Requirements: 6.4_

- [x] 5.3 Add comprehensive error handling
  - Implement graceful error recovery
  - Create user-friendly error messages
  - Add logging for debugging purposes
  - _Requirements: 6.4_

- [x] 6. Integrate with existing quick reference components
  - Modify QuickDrugReferencePage to use new database
  - Update DrugDosageCard for simplified data
  - Integrate with ComplaintFilterBar component
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 6.1 Update QuickDrugReferencePage component
  - Replace existing drug data source with useQuickReferenceDatabase hook
  - Update calculation logic to use simplified engine
  - Maintain compatibility with existing UI components
  - _Requirements: 7.1, 7.2_

- [x] 6.2 Modify DrugDosageCard for simplified data
  - Update component to handle QuickReferenceMedication interface
  - Modify calculation result display logic
  - Ensure backward compatibility with existing features
  - _Requirements: 7.1, 7.3_

- [x] 6.3 Update ComplaintFilterBar integration
  - Modify to use QuickReferenceComplaintCategory data
  - Update filtering logic for new category structure
  - Maintain existing UI behavior and styling
  - _Requirements: 5.1, 5.4_

- [x] 7. Add fallback integration with main database
  - Implement linking between databases
  - Create fallback mechanisms for detailed calculations
  - Add navigation to detailed calculator views
  - _Requirements: 7.2, 7.4, 7.5_

- [x] 7.1 Implement database linking mechanism
  - Add mainDatabaseId field handling
  - Create lookup utilities for main database entries
  - Implement fallback logic when quick reference data is insufficient
  - _Requirements: 7.2, 7.4_

- [x] 7.2 Create detailed calculation fallback
  - Add navigation to full calculator when detailed info needed
  - Pass current parameters to main calculation engine
  - Maintain user context during navigation
  - _Requirements: 7.1, 7.3_

- [x] 7.3 Implement priority system for dual entries
  - Create logic to prioritize quick reference data over main database
  - Add configuration for fallback behavior
  - Ensure consistent user experience
  - _Requirements: 7.5_

- [x] 8. Create initial medication dataset
  - Populate medications.json with common medications
  - Set up complaint categories with appropriate medications
  - Configure initial database settings
  - _Requirements: 2.1, 2.2, 5.1_

- [x] 8.1 Add essential pediatric medications
  - Include common antibiotics (amoxicillin, azithromycin)
  - Add pain/fever medications (paracetamol, ibuprofen)
  - Include respiratory medications (salbutamol, prednisolone)
  - _Requirements: 1.5, 2.1_

- [x] 8.2 Add essential adult medications
  - Include adult dosing for common medications
  - Add adult-specific formulations and concentrations
  - Configure appropriate complaint category associations
  - _Requirements: 1.5, 2.1_

- [x] 8.3 Configure complaint categories and associations
  - Set up default complaint categories
  - Associate medications with appropriate categories
  - Configure category display settings and colors
  - _Requirements: 5.1, 5.3, 5.5_

- [x] 9. Add comprehensive testing
  - Create unit tests for all database utilities
  - Add integration tests for component integration
  - Test data validation and error scenarios
  - _Requirements: 6.4_

- [x] 9.1 Create unit tests for database operations
  - Test medication loading and filtering
  - Test calculation engine accuracy
  - Test validation and error handling
  - _Requirements: 6.4_

- [x] 9.2 Add integration tests
  - Test hook integration with components
  - Test end-to-end calculation workflow
  - Test error recovery and fallback mechanisms
  - _Requirements: 7.1, 7.2_

- [x] 9.3 Create data validation tests
  - Test JSON schema validation
  - Test medication data integrity
  - Test category consistency
  - _Requirements: 6.1, 6.4_

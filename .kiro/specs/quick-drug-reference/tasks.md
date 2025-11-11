# Implementation Plan

- [x] 1. Extend drug data structure with complaint tags and quick reference metadata
  - Add complaintTags array to Drug inteypes.ts
  - Add commonIndications and quickReferenceNotes optional fields to Drug interface
  - Create ComplaintCategory interface and COMPLAINT_CATEGORIES constant
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 1.1 Update existing drug data files with complaint tags
  - Add complaintTags to antimicrobial drugs (amoxicillin, azithromycin, etc.)
  - Add complaintTags to analgesic drugs (paracetamol, ibuprofen, etc.)
  - Add complaintTags to respiratory drugs (salbutamol, bromhexine, etc.)
  - Add complaintTags to gastrointestinal drugs (domperidone, metoclopramide, etc.)
  - Add complaintTags to antihistamine drugs (cetirizine, loratadine, etc.)
  - _Requirements: 3.1, 3.2_

- [x] 2. Create quick reference store and state management
  - Extend calculator store with quick reference mode state
  - Add displayWeight, selectedComplaintFilter, and drugCalculationResults state
  - Implement bulk calculation logic for multiple drugs
  - Add filtering logic by complaint categories
  - _Requirements: 1.2, 1.3, 2.2, 2.3_

- [ ]* 2.1 Write unit tests for quick reference store
  - Test bulk calculation functionality
  - Test complaint filtering logic
  - Test state management for weight changes
  - _Requirements: 1.2, 2.2_

- [x] 3. Implement WeightInputSection component
  - Create weight input component with real-time validation
  - Add default weight suggestions based on audience
  - Implement debounced weight change handling
  - Add proper accessibility attributes and keyboard support
  - _Requirements: 1.2, 1.3, 5.3, 5.4_

- [ ]* 3.1 Write unit tests for WeightInputSection
  - Test weight validation logic
  - Test debounced input handling
  - Test accessibility features
  - _Requirements: 1.2, 5.3_

- [ ] 4. Create ComplaintFilterBar component
  - Implement horizontal scrollable filter buttons
  - Add color-coded styling for different complaint categories
  - Implement active state management and selection logic
  - Add responsive design for mobile and desktop
  - _Requirements: 2.1, 2.2, 2.3, 4.2, 5.1, 5.2_

- [ ]* 4.1 Write unit tests for ComplaintFilterBar
  - Test filter selection logic
  - Test responsive behavior
  - Test accessibility features
  - _Requirements: 2.1, 2.2, 5.1_

- [x] 5. Develop DrugDosageCard component
  - Create card layout with drug name, dosage, and administration details
  - Implement color-coded badges for medication types
  - Add warning indicators for calculation issues
  - Implement click handling for detailed view access
  - _Requirements: 1.1, 1.4, 4.1, 4.2, 4.3, 4.4, 6.1_

- [ ]* 5.1 Write unit tests for DrugDosageCard
  - Test card rendering with various calculation results
  - Test warning display logic
  - Test color coding for different drug types
  - _Requirements: 1.4, 4.1, 4.3, 4.4_

- [x] 6. Build DrugReferenceGrid component
  - Implement responsive grid layout for drug cards
  - Add smooth animations for filtering transitions
  - Implement masonry-style layout for varying card heights
  - Add loading states and empty state handling
  - _Requirements: 1.1, 2.2, 2.3, 5.1, 5.2_

- [ ]* 6.1 Write unit tests for DrugReferenceGrid
  - Test responsive grid behavior
  - Test filtering animations
  - Test loading and empty states
  - _Requirements: 1.1, 2.2, 5.1_

- [x] 7. Create QuickDrugReferencePage main component
  - Implement main page layout and component orchestration
  - Add initialization logic for quick reference mode
  - Implement navigation between quick reference and detailed views
  - Add error boundary and error handling
  - _Requirements: 1.1, 1.2, 6.1, 6.2, 6.3_

- [ ]* 7.1 Write integration tests for QuickDrugReferencePage
  - Test complete workflow from weight input to drug display
  - Test filter interactions and real-time updates
  - Test error handling scenarios
  - _Requirements: 1.1, 1.2, 2.2, 6.1_

- [x] 8. Implement bulk calculation utilities
  - Create utility functions for calculating multiple drug dosages
  - Implement performance optimizations with memoization
  - Add error handling for individual drug calculation failures
  - Implement debouncing for real-time weight updates
  - _Requirements: 1.2, 1.3, 1.4_

- [ ]* 8.1 Write unit tests for bulk calculation utilities
  - Test calculation accuracy for multiple drugs
  - Test performance with large drug datasets
  - Test error handling for invalid calculations
  - _Requirements: 1.2, 1.3, 1.4_

- [x] 9. Replace homepage and remove category pages
  - Update root route (/) to serve QuickDrugReferencePage as homepage
  - Remove Categories page route and components
  - Remove Adult page route and components
  - Add redirect logic for existing category page bookmarks to homepage
  - Update navigation menu to remove category links
  - Add proper page metadata and SEO optimization for new homepage
  - _Requirements: 1.1, 1.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 10. Implement responsive design and mobile optimizations
  - Add mobile-specific styling and touch interactions
  - Implement swipe gestures for filter navigation
  - Optimize performance for mobile devices
  - Add proper viewport handling and touch targets
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 10.1 Write mobile-specific tests
  - Test touch interactions and gestures
  - Test responsive layout on various screen sizes
  - Test performance on mobile devices
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 11. Add accessibility features and compliance
  - Implement keyboard navigation for all interactive elements
  - Add proper ARIA labels and screen reader support
  - Ensure color contrast compliance for all UI elements
  - Add focus management and skip links
  - _Requirements: 4.1, 4.2, 5.3, 5.4, 6.1_

- [ ]* 11.1 Write accessibility tests
  - Test keyboard navigation functionality
  - Test screen reader compatibility
  - Test color contrast and high contrast mode support
  - _Requirements: 4.1, 5.3, 6.1_

- [x] 12. Integrate with existing calculator system
  - Connect quick reference to detailed calculator views
  - Implement state sharing between quick reference and detailed modes
  - Add transition animations between different views
  - Ensure backward compatibility with existing calculator features
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

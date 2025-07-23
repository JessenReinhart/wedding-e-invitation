# Design Document

## Overview

This design outlines the approach for translating all user-facing text content in the wedding invitation website from English to Indonesian. The translation will be implemented by directly replacing English text strings with their Indonesian equivalents throughout the React components and constants file. The admin interface will remain in English as specified in the requirements.

## Architecture

The translation approach will be a direct string replacement strategy rather than implementing a full internationalization system. This approach is chosen for simplicity and meets the current requirement of supporting only Indonesian language.

### Translation Scope

The translation will cover the following areas:

1. **Static UI Text**: Navigation labels, section titles, buttons, and form labels
2. **Wedding Content**: Wedding details, story content, event information
3. **Interactive Elements**: RSVP forms, comment sections, validation messages
4. **User Feedback**: Success messages, error messages, loading states

### Files to be Modified

1. **Components** (all files in `/components/` directory except admin-related):
   - Hero.tsx - Hero section text
   - Header.tsx - Navigation labels
   - OurStory.tsx - Story section (title from constants)
   - EventTimeline.tsx - Event details section
   - RSVPSection.tsx - RSVP call-to-action
   - RSVPPage.tsx - RSVP form labels and messages
   - CommentSection.tsx - Comment section text
   - CommentForm.tsx - Comment form labels
   - GallerySection.tsx - Gallery section text
   - Footer.tsx - Footer content
   - MessageFromCouple.tsx - Message section

2. **Constants File**:
   - constants.ts - Wedding details, story content, event information

3. **Hook Files** (for user-facing messages):
   - useComments.ts - Comment-related messages
   - useRSVP.ts - RSVP-related messages

## Components and Interfaces

### Translation Mapping

The following text elements will be translated:

#### Navigation and UI Elements
- "Home" → "Beranda"
- "Story" → "Cerita"
- "Event" → "Acara"
- "RSVP" → "RSVP"
- "Gallery" → "Galeri"

#### Hero Section
- "You're Invited To Celebrate The Wedding Of" → "Anda Diundang Untuk Merayakan Pernikahan"
- "Dear [Name] & Partner," → "Kepada [Name] & Pasangan,"
- "Discover More" → "Selengkapnya"

#### RSVP Section
- "Kindly RSVP" → "Mohon Konfirmasi Kehadiran"
- "Please let us know if you can celebrate with us by" → "Mohon beri tahu kami apakah Anda dapat merayakan bersama kami sebelum"
- "Click the button to access our RSVP form" → "Klik tombol untuk mengakses formulir RSVP kami"
- "RSVP Online" → "RSVP Online"
- "We can't wait to share our special day with you!" → "Kami tidak sabar untuk berbagi hari istimewa kami dengan Anda!"

#### RSVP Form
- "Thank You!" → "Terima Kasih!"
- "Your RSVP has been received" → "RSVP Anda telah diterima"
- "Back to Home" → "Kembali ke Beranda"
- "We're so excited to celebrate with you!" → "Kami sangat senang dapat merayakan bersama Anda!"
- "Full Name" → "Nama Lengkap"
- "Your full name" → "Nama lengkap Anda"
- "Email Address (Optional)" → "Alamat Email (Opsional)"
- "Will you be attending?" → "Apakah Anda akan hadir?"
- "Yes, I'll be there!" → "Ya, saya akan hadir!"
- "Sorry, I can't make it" → "Maaf, saya tidak bisa hadir"

#### Event Details
- "Event Details" → "Detail Acara"
- "Join us for these special moments" → "Bergabunglah dengan kami untuk momen-momen istimewa ini"
- "The Ceremony" → "Upacara Pernikahan"
- "The Reception" → "Resepsi"

#### Comments Section
- "Guest Comments" → "Komentar Tamu"
- "Leave a message for the happy couple!" → "Tinggalkan pesan untuk pasangan bahagia!"

#### Wedding Details (constants.ts)
- "Our Love Story" → "Kisah Cinta Kami"
- Story content → Indonesian translation
- Event details and descriptions → Indonesian translations

## Data Models

No new data models are required. The existing data structures in `types.ts` will remain unchanged as they primarily define the shape of data rather than user-facing content.

## Error Handling

Error messages and validation feedback will be translated to Indonesian:

- Form validation errors
- Network error messages
- Loading states and feedback messages

## Testing Strategy

### Manual Testing Approach

1. **Visual Testing**: Verify all translated text displays correctly without breaking layouts
2. **Functional Testing**: Ensure all interactive elements work properly with Indonesian text
3. **Content Review**: Verify translations are accurate and culturally appropriate
4. **Responsive Testing**: Check that Indonesian text fits properly on mobile and desktop layouts

### Test Cases

1. **Navigation**: Test all navigation links work with Indonesian labels
2. **Forms**: Test RSVP form submission with Indonesian labels and messages
3. **Comments**: Test comment submission and display with Indonesian interface
4. **Content Display**: Verify all wedding details display correctly in Indonesian
5. **Error States**: Test error messages appear in Indonesian

## Implementation Notes

### Text Length Considerations

Indonesian text may be longer or shorter than English equivalents. The implementation should:

1. Review layout spacing after translation
2. Ensure buttons and form elements accommodate text length changes
3. Verify mobile responsiveness with translated content

### Cultural Appropriateness

Translations should be:

1. Formal and respectful (appropriate for wedding context)
2. Use proper Indonesian wedding terminology
3. Maintain the warm, celebratory tone of the original content

### Maintenance

Since this is a direct replacement approach:

1. Future text changes require updating both the code and ensuring Indonesian accuracy
2. New features should include Indonesian text from the start
3. Consider creating a simple text reference document for future maintenance
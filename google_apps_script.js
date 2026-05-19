/**
 * GOOGLE APPS SCRIPT FOR CONTACT FORM INTEGRATION
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Sheet:
 *    - Go to https://sheets.google.com
 *    - Create a new spreadsheet
 *    - Name it "Team ReNew Contact Submissions"
 * 
 * 2. Set up the Apps Script:
 *    - In your Google Sheet, go to Extensions > Apps Script
 *    - Delete any existing code
 *    - Copy and paste this entire script
 *    - Click the disk icon to save
 * 
 * 3. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Click the gear icon next to "Select type" and choose "Web app"
 *    - Fill in the details:
 *      - Description: "Contact Form Handler"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 *    - Click "Deploy"
 *    - Copy the Web App URL
 * 
 * 4. Update data.js:
 *    - Open data.js in your project
 *    - Find the line: googleSheetUrl: "",
 *    - Replace it with your Web App URL, e.g. googleSheetUrl: "https://script.google.com/macros/s/.../exec",
 * 
 * 5. Test:
 *    - Submit a test form on your website
 *    - Check your Google Sheet for the new row
 */

// Main function to handle POST requests from the contact form
function doPost(e) {
    try {
        // Get the active spreadsheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse the incoming JSON data
        const data = JSON.parse(e.postData.contents);

        // Check if headers exist, if not create them
        if (sheet.getLastRow() === 0) {
            const headers = [
                'Timestamp',
                'Date',
                'Name',
                'Email',
                'Subject',
                'Message'
            ];
            sheet.appendRow(headers);

            // Format header row
            const headerRange = sheet.getRange(1, 1, 1, headers.length);
            headerRange.setBackground('#0ea5e9'); // Team ReNew Blue Theme
            headerRange.setFontColor('#ffffff');
            headerRange.setFontWeight('bold');
            headerRange.setHorizontalAlignment('center');
        }

        // Prepare the row data
        const rowData = [
            data.timestamp || new Date().toISOString(),
            data.date || new Date().toLocaleString(),
            data.name || '',
            data.email || '',
            data.subject || '',
            data.message || ''
        ];

        // Append the new row
        sheet.appendRow(rowData);

        // Auto-resize columns for better readability
        sheet.autoResizeColumns(1, 6);

        // Return success response
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Log error and return error response
        Logger.log('Error: ' + error.toString());
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

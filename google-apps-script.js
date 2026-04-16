// ─────────────────────────────────────────────────────────────────────────────
// M&M Meat Processing — Cut Sheet → Google Sheets
//
// SETUP INSTRUCTIONS (one-time, ~10 minutes)
// ─────────────────────────────────────────────────────────────────────────────
// 1. Open the Google Sheet where you want orders tracked.
// 2. Click Extensions → Apps Script.
// 3. Delete any existing code in the editor.
// 4. Paste this entire file and click Save (disk icon).
// 5. Click Deploy → New deployment.
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Click Deploy. Google will ask you to authorize — click through.
// 7. Copy the Web app URL it gives you (looks like
//    https://script.google.com/macros/s/ABC123.../exec)
// 8. Send that URL to your developer. They paste it into the website and
//    cut sheet submissions will start appearing in your sheet automatically.
//
// RESULT
// ─────────────────────────────────────────────────────────────────────────────
// Each form type gets its own tab: "Beef", "Pork", "Lamb".
// Headers are created automatically on the first submission.
// Timestamps use Eastern time (America/Detroit).
// ─────────────────────────────────────────────────────────────────────────────

// ── Spreadsheet ID (from the URL of your Google Sheet) ───────────────────────
var SPREADSHEET_ID = '1S-mk_TfqLYcoo_ImZqWO9ZGak-JylmGWdL8TsHUfVJU'

// ── Row styling ───────────────────────────────────────────────────────────────
var ROW_HEIGHT      = 36
var COLOR_ODD       = '#ffffff'
var COLOR_EVEN      = '#fdf4f2'  // light warm blush, matches brand
var NAME_COL        = 2          // "Customer Name" is always column B

function doGet(e) {
  try {
    if (!e || !e.parameter || !e.parameter.data) {
      return ContentService.createTextOutput('No data received').setMimeType(ContentService.MimeType.TEXT)
    }
    var data = JSON.parse(e.parameter.data)
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID)
    var now = Utilities.formatDate(
      new Date(),
      'America/Detroit',
      'MM/dd/yyyy HH:mm:ss'
    )

    if (data.formType === 'Beef Cut Sheet') {
      appendBeef(ss, data, now)
    } else if (data.formType === 'Pork Cut Sheet') {
      appendPork(ss, data, now)
    } else if (data.formType === 'Lamb Cut Sheet') {
      appendLamb(ss, data, now)
    }

    return ContentService.createTextOutput('OK').setMimeType(
      ContentService.MimeType.TEXT
    )
  } catch (err) {
    Logger.log(err)
    return ContentService.createTextOutput('Error: ' + err.toString()).setMimeType(
      ContentService.MimeType.TEXT
    )
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name)
  if (!sheet) {
    sheet = ss.insertSheet(name)
    sheet.appendRow(headers)

    // Header row styling
    var headerRange = sheet.getRange(1, 1, 1, headers.length)
    headerRange.setFontWeight('bold')
    headerRange.setFontSize(11)
    headerRange.setBackground('#2d1a16')
    headerRange.setFontColor('#ffffff')
    headerRange.setVerticalAlignment('middle')
    headerRange.setHorizontalAlignment('center')
    sheet.setRowHeight(1, 40)
    sheet.setFrozenRows(1)

    // Column widths
    sheet.setColumnWidth(1, 155)  // Submitted
    sheet.setColumnWidth(2, 160)  // Customer Name
    sheet.setColumnWidth(3, 130)  // Phone
    sheet.setColumnWidth(4, 140)  // Farmer
    // remaining columns auto-sized after first row is written
  }
  return sheet
}

function formatRow(sheet, rowIndex, numCols) {
  var range = sheet.getRange(rowIndex, 1, 1, numCols)

  // Alternating row color
  range.setBackground(rowIndex % 2 === 0 ? COLOR_EVEN : COLOR_ODD)

  // Row height & vertical alignment
  sheet.setRowHeight(rowIndex, ROW_HEIGHT)
  range.setVerticalAlignment('middle')

  // Bold the customer name
  sheet.getRange(rowIndex, NAME_COL).setFontWeight('bold')

  // Auto-size all columns to fit content
  sheet.autoResizeColumns(1, numCols)

  // Keep the first four columns at minimum widths after auto-resize
  if (sheet.getColumnWidth(1) < 155) sheet.setColumnWidth(1, 155)
  if (sheet.getColumnWidth(2) < 160) sheet.setColumnWidth(2, 160)
  if (sheet.getColumnWidth(3) < 130) sheet.setColumnWidth(3, 130)
  if (sheet.getColumnWidth(4) < 140) sheet.setColumnWidth(4, 140)
}

// ── Beef ─────────────────────────────────────────────────────────────────────

function appendBeef(ss, d, now) {
  var headers = [
    'Submitted',
    'Customer Name',
    'Phone',
    'Farmer',
    'Beef Size',
    'Steaks / Package',
    'Steak Thickness',
    'Roast Size',
    'Ribeyes',
    'Loin',
    'Roasts',
    'Sirloin',
    'Sirloin Tip',
    'Round Steak',
    'Round Cubed',
    'Short Ribs',
    'Stew Meat',
    'Flank',
    'Tri Tip',
    'Brisket',
    'Soup Bones',
    'Burger',
    'Patties',
    'Patties (notes)',
    'Organs',
    'Additional Notes',
  ]
  var sheet = getOrCreateSheet(ss, 'Beef', headers)
  sheet.appendRow([
    now,
    d.customerName,
    d.customerPhone,
    d.farmerName,
    d.beefSize,
    d.steaksPerPackage,
    d.steakThickness,
    d.roastSize,
    d.ribeyes,
    d.loin,
    d.roasts,
    d.sirloin,
    d.sirloinTip,
    d.roundSteak,
    d.roundCubed,
    d.shortRibs,
    d.stewMeat,
    d.flank,
    d.triTip,
    d.brisket,
    d.soupBones,
    d.burger,
    d.patties,
    d.pattiesOther,
    d.organs,
    d.specialInstructions,
  ])
  formatRow(sheet, sheet.getLastRow(), headers.length)
}

// ── Pork ─────────────────────────────────────────────────────────────────────

function appendPork(ss, d, now) {
  var headers = [
    'Submitted',
    'Customer Name',
    'Phone',
    'Farmer',
    'Hog Size',
    'Chops / Package',
    'Chop Thickness',
    'Roasts',
    'Loin',
    'Shoulder',
    'Ribs',
    'Belly',
    'Belly Thickness',
    'Hams',
    'Sausage Flavor',
    'Spice Level',
    'Brats',
    'Sausage Links & Patties',
    'Additional Notes',
  ]
  var sheet = getOrCreateSheet(ss, 'Pork', headers)
  sheet.appendRow([
    now,
    d.customerName,
    d.customerPhone,
    d.farmerName,
    d.hogSize,
    d.chopsPerPackage,
    d.chopThickness,
    d.roasts,
    d.loin,
    d.shoulder,
    d.ribs,
    d.belly,
    d.bellyThickness,
    d.hams,
    d.sausageFlavor,
    d.spiceLevel,
    d.brats,
    d.sausageLinks,
    d.additionalNotes,
  ])
  formatRow(sheet, sheet.getLastRow(), headers.length)
}

// ── Lamb ─────────────────────────────────────────────────────────────────────

function appendLamb(ss, d, now) {
  var headers = [
    'Submitted',
    'Customer Name',
    'Phone',
    'Farmer',
    'Loin',
    'Shoulder',
    'Leg',
    'Ribs',
    'Stew Meat',
    'Lamb Shanks',
    'Ground Lamb',
    'Additional Notes',
  ]
  var sheet = getOrCreateSheet(ss, 'Lamb', headers)
  sheet.appendRow([
    now,
    d.customerName,
    d.customerPhone,
    d.farmerName,
    d.loin,
    d.shoulder,
    d.leg,
    d.ribs,
    d.stewMeat,
    d.lambShanks,
    d.groundLamb,
    d.additionalNotes,
  ])
  formatRow(sheet, sheet.getLastRow(), headers.length)
}

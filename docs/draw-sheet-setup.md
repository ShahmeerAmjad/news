# Lucky Draw — entries sheet setup (15 minutes, once)

The `/draw` page posts every entry to `/api/draw`, which forwards it to a Google
Apps Script bound to a spreadsheet you own. The script is also what enforces
"one entry per mobile number".

The page works before any of this is done — entries land in the Vercel function
logs — but you won't have a sheet to hand the sales team, so do this before the
flyers go out.

---

## 1. Create the sheet

1. Go to <https://sheets.new> and name it **Kunjwal City — Lucky Draw Entries**.
2. Rename the first tab to `Entries`.
3. Leave row 1 empty. The script writes the header row itself on first entry.

## 2. Add the script

In the sheet: **Extensions → Apps Script**. Delete whatever is in `Code.gs` and
paste this in full:

```javascript
/**
 * Kunjwal City lucky-draw intake.
 * Receives an entry from /api/draw, dedupes on phone, appends a row.
 */

var SHEET_NAME = 'Entries';
var HEADERS = ['submittedAt', 'entryNo', 'name', 'phone', 'locality', 'area',
               'wantsPlot', 'consent', 'source', 'userAgent'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Two people scanning at the same second must not both append.
  lock.waitLock(20000);
  try {
    var entry = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    // Dedupe on the phone column (D). Phone arrives already normalised to +92…
    var phone = String(entry.phone || '');
    if (phone && sheet.getLastRow() > 1) {
      var existing = sheet.getRange(2, 4, sheet.getLastRow() - 1, 1).getValues();
      for (var i = 0; i < existing.length; i++) {
        if (String(existing[i][0]) === phone) {
          return json({ ok: true, duplicate: true });
        }
      }
    }

    sheet.appendRow(HEADERS.map(function (h) { return entry[h] || ''; }));
    return json({ ok: true, duplicate: false });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy it

1. **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Description: `draw intake`.
4. **Execute as:** `Me`.
5. **Who has access:** `Anyone` — this must be *Anyone*, not "Anyone with Google
   account", or the Vercel function cannot post to it.
6. **Deploy**, approve the permission prompt (choose your account → *Advanced* →
   *Go to … (unsafe)* → *Allow*; the "unsafe" warning is normal for your own
   unpublished script).
7. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfy…/exec`.

## 4. Wire it into Vercel

```bash
vercel env add DRAW_WEBHOOK_URL production
# paste the /exec URL when prompted, then redeploy:
vercel --prod
```

Optional extras, same command:

| Variable | Effect |
|---|---|
| `DRAW_WEBHOOK_URL` | The Apps Script URL above. Enables the sheet **and** duplicate detection. |
| `RESEND_API_KEY` | Also email each entry as a backup trail. |
| `DRAW_EMAIL_TO` | Where those emails go. Defaults to `LEAD_EMAIL_TO`, then `info@kunjwalcity.pk`. |

## 5. Test it end to end

1. Open `https://kunjwalcity.pk/draw` on your phone.
2. Enter a real name, **your own** number, and a village.
3. Check the sheet — one row, with an entry number like `KC-04821`.
4. Submit the same number again. The page should say *آپ پہلے ہی شامل ہیں* and
   show the **same** entry number, and the sheet should still have one row.

## Running the draw on 30 September

1. In the sheet: **Data → Create a filter**, then sort by `submittedAt`.
2. Add a column `rand` with `=RAND()` filled down, sort by it, and take the top
   rows as winners — 1 grand, 2 second, 5 third, 20 fourth.
3. Do it on Facebook Live with the sheet on screen. That's the whole credibility
   of the campaign; don't draw off camera.
4. Winners are called on the number in column D and collect with original CNIC.

## Using the list afterwards

Column `wantsPlot = yes` is your hot list — those people asked for plot
information, hand them to sales first. Everyone else consented to marketing
(column `consent`), so they can go into WhatsApp broadcast and a Meta Custom
Audience. Keep the sheet; consent is only defensible if you can show when and
where it was given, which is what `submittedAt` and `source` are for.

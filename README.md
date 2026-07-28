<img width="1347" height="310" alt="realtools_bf" src="https://github.com/user-attachments/assets/0e7e481b-b29a-410d-a836-4ba7996b2d6a" />
<br><br>

A revived and expanded version of the original **Realtools** browser extension for [Horse Reality](https://www.horsereality.com/).

**Realtools: BLVCK FORK** restores functionality that stopped working in the original extension, expands its preset and placeholder system, improves score tracking, and introduces optional UI improvements for horse profiles.

> [!IMPORTANT]
> Realtools: BLVCK FORK is an unofficial community modification.
>
> It is not affiliated with, or maintained by Horse Reality or the original Realtools maintainer.

<br>

<img width="1800" height="76" alt="about-dark" src="https://github.com/user-attachments/assets/e98202ac-3490-4d55-8e25-4cc39d00d68c" />
<br><br>

The original Realtools extension provided a variety of useful tools for displaying, calculating, and organizing horse information.

As the original extension has not been maintained for several years, some of its functionality eventually stopped working correctly with the current version of Horse Reality.

One of the most significant issues was the placeholder responsible for calculating the horse's total **Genetic Potential (GP)**. Because several other placeholders and formulas relied on that value, those calculations were affected as well.

BLVCK FORK originally started as an attempt to restore this functionality and has since grown to include additional quality-of-life improvements while keeping the general purpose and workflow of Realtools intact.
<br><br>

<img width="1800" height="76" alt="features-dark" src="https://github.com/user-attachments/assets/4737eb81-0e4e-4293-a0fd-a896ea159b48" />
<br>

### Genetic Potential Fix

The total **Genetic Potential (GP)** calculation used by the original Realtools has been restored.

This also restores placeholders and calculations that depend on the total GP value.

The extension can display Genetic Potential alongside the other horse statistics and use it as part of the preset and placeholder system.

---

### Presets & Placeholders

Realtools presets allow horse information to be inserted into predefined text formats using placeholders.

<img width="550" height="346" alt="legacy-presets-preview" src="https://github.com/user-attachments/assets/d667e30f-f94c-43c7-81dd-e5d2c875f4c6" />
<br><br>

BLVCK FORK supports presets for:

- Name
- Tagline
- Private Notes
- Public Notes

Presets can now also be **renamed directly**. There is no longer a need to create a new preset just to change its name — simply use the rename button on the existing preset.

Private Notes and Public Notes have been added to the preset system so that the same placeholder functionality can be used for more detailed breeding records and player-facing information.

<img width="550" height="658" alt="notes-presets-preview" src="https://github.com/user-attachments/assets/55b94a5c-0eba-46f2-b71b-9b18cf5cae80" />
<br><br>

Presets can combine normal text with calculated or extracted horse information.

This allows players to create their own record-keeping format without repeatedly copying or calculating the same information by hand.

---

### Highest & Lowest Score Comparison

BLVCK FORK includes `{hs}` and `{ls}` placeholders for maintaining the highest and lowest observed score values inside a preset.

It is important to clarify how this functionality works:

> [!NOTE]
> **Realtools does not maintain a separate history or database of a horse's scores.**

When a matching preset is applied, the extension compares the horse's **currently visible Best Score** with the value that is already written in the corresponding preset field.

For example:

- `{hs}` compares the current Best Score with the value already present in the preset output and keeps the higher value.
- `{ls}` performs the same comparison and keeps the lower value.

In simple terms:

**Highest Score**

`existing HS ↔ current Best Score → keep the higher value`

**Lowest Score**

`existing LS ↔ current Best Score → keep the lower value`

There is no hidden score history stored elsewhere by the extension.

The previously recorded value exists only because it is already present in the player's text created by the preset.

### Why matching presets matter

Because Realtools does not separately store these historical values, `{hs}` and `{ls}` depend on being able to recognize the existing preset structure.

If the player changes to a different preset, significantly changes its structure, or removes the previously written value, Realtools has no separate stored history from which to recover it.

This is why historical comparison works only when the existing text can be matched to the same preset.

---

### `{range}` Placeholder

BLVCK FORK introduces the new `{range}` placeholder.

It calculates the difference between the current `{hs}` and `{ls}` values:

`{range} = {hs} - {ls}`

Because `{range}` is derived from those two values, it is automatically recalculated whenever the applicable highest or lowest value changes.

Other values that depend on `{hs}` and `{ls}`, such as Breed Total and related calculations, can also be recalculated automatically.

---

### Enhanced Stats Tab

The horse **Stats** tab has been reorganized to make commonly used information easier to read in one place.

The updated Stats interface includes:

- Genetic Potential
- Conformation
- Discipline GP
- Health quality totals
- Discipline GP values and percentages
- Best and Worst Conformation Show results
- Best and Worst Competition results
- Expandable result lists
- Improved result table layouts

The goal is to present information already available through Horse Reality in a more convenient format rather than changing the underlying game functionality.

<img width="1200" height="839" alt="stats-preview" src="https://github.com/user-attachments/assets/5e9e2b65-6a3a-4395-ad8f-139df3a04b09" />
<br><br>
<img width="1200" height="792" alt="achievements-preview" src="https://github.com/user-attachments/assets/bc120ac2-8c6b-454b-b280-b52af084b7a3" />

---

### Optional Passport & Owner's Notes UI

BLVCK FORK includes an optional redesign of the horse **Passport** and **Owner's Notes** sections.

<img width="1200" height="305" alt="info-preview" src="https://github.com/user-attachments/assets/11867142-3b9a-4f84-8d4b-65ee1d474cf9" />
<br><br>

The redesigned interface is **entirely optional** and can be enabled or disabled in the extension settings at any time.

Disabling it restores the normal Horse Reality interface while allowing the other Realtools functionality to remain available.

<br>

<img width="1800" height="85" alt="disclaimer-dark" src="https://github.com/user-attachments/assets/15feb4c1-a368-4436-a32f-b19fd02d0f41" />
<br><br>

> [!IMPORTANT]
> The optional Passport and Owner's Notes redesign in Realtools: BLVCK FORK was inspired by an **official Horse Reality video preview showing their work-in-progress horse profile UI**.

The original design concept and visual direction belong to **Horse Reality**.

I do not claim ownership of Horse Reality's design concept, nor do I intend to present the redesigned interface included in this extension as an original Horse Reality feature or as my own original design concept.

The UI included in BLVCK FORK is an unofficial implementation created for the extension and was developed using Horse Reality's WIP preview as its primary visual inspiration.

This project is not affiliated with the Horse Reality team.

If Horse Reality requests changes to this implementation, I am willing to modify, redesign, or remove the affected UI.

<br>

<img width="1800" height="85" alt="data-dark" src="https://github.com/user-attachments/assets/75c65dfb-dca0-4e0b-882f-82c03fe79b08" />
<br><br>

> [!IMPORTANT]
> **Realtools: BLVCK FORK does not provide access to hidden or Premium-only game information.**

The extension only works with:

1. Information already available to the player through Horse Reality; and
2. Values that can be calculated from publicly available information, such as Breed Total and other derived statistics.

It does **not** access, reveal, unlock, or attempt to obtain:

- Hidden game data
- Premium-only information
- Features requiring Premium, HRC, or DP
- Information that would otherwise be unavailable to the player

Calculated values are derived from information the player already has access to.

Realtools is intended to organize, display, compare, and calculate available information more conveniently — not to provide access to additional game data.

<br>

<img width="1800" height="76" alt="privacy-dark" src="https://github.com/user-attachments/assets/4b656d9b-acd5-4869-afb7-ba916a795327" />
<br><br>

Realtools: BLVCK FORK does not collect or send personal data to third-party services.

The extension does not request access to:

- Passwords
- Account credentials
- Cookies
- Browser history
- Clipboard contents
- Downloads

The extension reads Horse Reality page data only when necessary to provide its functionality.

Private Notes and Public Notes presets are stored locally.

Settings and Name/Tagline presets use browser sync storage.

The extension communicates only with Horse Reality when Horse Reality page/tab data is required for its features.

As explained above, `{hs}` and `{ls}` do **not** create or maintain a separate database of historical horse scores.

<br>

<img width="1800" height="76" alt="install-dark" src="https://github.com/user-attachments/assets/a7e40c36-3f44-48d6-9c8f-155b99bba812" />
<br><br>

1. Download the latest ZIP from the **Releases** section of this repository.
2. Extract the ZIP into a separate folder.
3. Open `chrome://extensions` in your browser.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the extracted folder containing `manifest.json`.
7. Reload any Horse Reality pages that were already open.

<br>

<img width="1800" height="76" alt="bug-dark" src="https://github.com/user-attachments/assets/0d14d2a7-110e-456f-8812-af5a1b744e5e" />
<br><br>

If something is not working correctly, please open an Issue in this repository.

When reporting a bug, screenshots and clear steps for reproducing the problem are greatly appreciated.

Horse Reality updates may change page structures or other functionality that Realtools relies on, so some features may occasionally require updates.

<br>

<img width="1800" height="76" alt="credits-dark" src="https://github.com/user-attachments/assets/6bf89ca8-c23d-4fa7-8e2d-184949364cab" />
<br><br>

### Original Realtools

Realtools: BLVCK FORK is based on the original **Realtools** extension.

Full credit goes to the original Realtools developer for creating the extension and the foundation on which this fork is built.

BLVCK FORK focuses on restoring broken functionality and expanding the existing tools for current Horse Reality players.

---

### Horse Reality

Horse Reality, its game content, and its original interface and design concepts belong to their respective owners.

The optional redesigned Passport and Owner's Notes interfaces were inspired by Horse Reality's official WIP horse profile UI preview, as described in the **UI Design Credit & Disclaimer** section above.

Realtools: BLVCK FORK is an unofficial community project and is not affiliated with or endorsed by Horse Reality.

<br>

<img width="1800" height="76" alt="license-dark" src="https://github.com/user-attachments/assets/943b68d9-b24d-4c15-983e-a2c70746a932" />
<br><br>

This project is distributed under the **GNU General Public License v3.0**.

See [LICENSE](LICENSE) for details.

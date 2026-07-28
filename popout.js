const storage = {};
let settingsRevision = 0;

async function saveSettings() {
    settingsRevision = Math.max(Date.now(), settingsRevision + 1);
    storage._realtoolsSettingsUpdatedAt = settingsRevision;
    const response = await chrome.runtime.sendMessage({
        type: 'realtools-save-settings',
        settings: {...storage},
    });
    if (!response?.ok) throw new Error(response?.error || 'Could not save settings.');
}

const nameFormat = document.querySelector('#settings-name-format');
const nameFormatPreview = document.querySelector('#settings-name-format-preview');
const taglineFormat = document.querySelector('#settings-tagline-format');
const taglineFormatPreview = document.querySelector('#settings-tagline-format-preview');
const NOTE_FORMATS_KEY = 'realtoolsNoteFormatsV1';
const DEFAULT_PRIVATE_NOTES_FORMAT = 'Best Score: {hs}     「 RNG Best: {rng} 」\nWorst Score: {ls}\n————————————————————————\nFinal range: {range}';
const showHintsCheck = document.querySelector('#settings-show-hints');
const infoUiTweaksCheck = document.querySelector('#settings-info-ui-tweaks');

document.querySelectorAll('.popup-tab').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.popup-tab').forEach((item) =>
            item.classList.toggle('active', item === button)
        );
        document.querySelectorAll('.popup-panel').forEach((panel) =>
            panel.classList.toggle('active', panel.id === button.dataset.panel)
        );
    });
});

function applyHintVisibility(enabled) {
    document.body.classList.toggle('show-hints', Boolean(enabled));
}

String.prototype.format = function() {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
}

function updateFormatPreview(element, string) {
    // https://www.horsereality.com/horses/7763268/i-left-my-hat-in-haiti
    const data = {
      vg: 0,
      gs: 0,
      g: 3,
      ag: 3,
      a: 6,
      ba: 3,
      p: 0,
      wal: "A",
      trt: "A",
      can: "A",
      gal: "G",
      pos: "G",
      hea: "G",
      nck: "A",
      bck: "BA",
      sld: "A",
      flg: "BA",
      hdq: "A",
      sck: "BA",
      dr_g: "1/4",
      dr_gs: "0/4",
      dr_ag: "1/4",
      dr_vg: "0/4",
      dv_g: "0/4",
      dv_gs: "0/4",
      dv_ag: "0/4",
      dv_vg: "0/4",
      en_g: "1/6",
      en_gs: "0/6",
      en_ag: "1/6",
      en_vg: "0/6",
      ev_g: "2/6",
      ev_gs: "0/6",
      ev_ag: "2/6",
      ev_vg: "0/6",
      rc_g: "2/7",
      rc_gs: "0/7",
      rc_ag: "2/7",
      rc_vg: "0/7",
      sj_g: "0/5",
      sj_gs: "0/5",
      sj_ag: "0/5",
      sj_vg: "0/5",
      re_g: "1/5",
      re_gs: "0/5",
      re_ag: "1/5",
      re_vg: "0/5",
      ls: 64.199,
      ls_r0: "64",
      ls_r1: "64.2",
      ls_r2: "64.20",
      hs: 70.196,
      hs_r0: "70",
      hs_r1: "70.2",
      hs_r2: "70.20",
      rng: "71.127",
      rng_r0: "71",
      rng_r1: "71.1",
      rng_r2: "71.13",
      range: 5.997,
      range_r0: "6.0",
      range_r1: "6.00",
      range_r2: "5.997",
      gp: "662",
      dr: 190,
      dv: 322,
      en: 280,
      ev: 331,
      rc: 263,
      sj: 335,
      re: 282,
      acc: 63,
      agi: 76,
      bal: 52,
      bas: 61,
      pul: 57,
      spd: 65,
      spr: 73,
      sta: 62,
      str: 62,
      sft: 91,
      drp: "64.25",
      drp_r0: "64",
      drp_r1: "64.3",
      dvp: "63.49",
      dvp_r0: "63",
      dvp_r1: "63.5",
      enp: "68.42",
      enp_r0: "68",
      enp_r1: "68.4",
      evp: "66.61",
      evp_r0: "67",
      evp_r1: "66.6",
      rcp: "65.08",
      rcp_r0: "65",
      rcp_r1: "65.1",
      sjp: "64.88",
      sjp_r0: "65",
      sjp_r1: "64.9",
      rep: "68.75",
      rep_r0: "69",
      rep_r1: "68.8",
      bt: "68.20",
      bt_r0: "68",
      bt_r1: "68.2",
      dr_bt: "66.76",
      dr_bt_r0: "67",
      dr_bt_r1: "66.8",
      dr_obt: "66.58",
      dr_obt_r0: "67",
      dr_obt_r1: "66.6",
      dv_bt: "67.30",
      dv_bt_r0: "67",
      dv_bt_r1: "67.3",
      dv_obt: "66.93",
      dv_obt_r0: "67",
      dv_obt_r1: "66.9",
      en_bt: "70.10",
      en_bt_r0: "70",
      en_bt_r1: "70.1",
      en_obt: "68.80",
      en_obt_r0: "69",
      en_obt_r1: "68.8",
      ev_bt: "68.20",
      ev_bt_r0: "68",
      ev_bt_r1: "68.2",
      ev_obt: "67.53",
      ev_obt_r0: "68",
      ev_obt_r1: "67.5",
      rc_bt: "67.97",
      rc_bt_r0: "68",
      rc_bt_r1: "68.0",
      rc_obt: "67.38",
      rc_obt_r0: "67",
      rc_obt_r1: "67.4",
      sj_bt: "68.60",
      sj_bt_r0: "69",
      sj_bt_r1: "68.6",
      sj_obt: "67.80",
      sj_obt_r0: "68",
      sj_obt_r1: "67.8",
      re_bt: "70.35",
      re_bt_r0: "70",
      re_bt_r1: "70.3",
      re_obt: "68.97",
      re_obt_r0: "69",
      re_obt_r1: "69.0",
      sex_u: "S",
      sex_l: "s",
      ln: "7763268"
    }
    // textContent preserves line breaks in the Notes preview.  innerText
    // normalizes them in the popout, making multi-line presets look like one line.
    element.textContent = string.format(data)
}

function updateInputValues(presetType, title) {
    switch (presetType) {
        case 'name':
            nameFormat.value = storage.nameFormats[title]
            nameFormat.placeholder = nameFormat.value
            updateFormatPreview(nameFormatPreview, nameFormat.value)
            break
        case 'tagline':
            taglineFormat.value = storage.taglineFormats[title]
            taglineFormat.placeholder = taglineFormat.value
            updateFormatPreview(taglineFormatPreview, taglineFormat.value)
            break
        default:
            console.warn(`Unknown preset type ${presetType}`)
            break
    }
}

function populateOptions(toSelect, presetType) {
    if (presetType == 'name' || !presetType) {
        const selectElementName = document.getElementById(`presets-select-name`)
        for (const child of selectElementName.children) {child.remove()}

        for (const title of Object.keys(storage.nameFormats)) {
            const option = document.createElement('option')
            option.id = `name-option-${title}`
            if (!document.getElementById(option.id)) {
                option.innerText = title
                option.value = title
                selectElementName.appendChild(option)
            }
        }
        if (Object.keys(storage.nameFormats).length < 1) {
            const option = document.createElement('option')
            option.id = `name-option-default`
            if (!document.getElementById(option.id)) {
                option.innerText = 'default'
                option.value = 'default'
                option.selected = true
                nameFormat.value = '{ln}'
                nameFormat.placeholder = nameFormat.value
                nameFormat.setAttribute('data-preset-title', 'default')

                selectElementName.appendChild(option)
            }
        }
        const selectedTitle = Object.prototype.hasOwnProperty.call(storage.nameFormats, toSelect)
            ? toSelect : Object.keys(storage.nameFormats)[0]
        selectElementName.value = selectedTitle
        nameFormat.setAttribute('data-preset-title', selectedTitle)
        updateInputValues('name', selectedTitle)
    }

    if (presetType == 'tagline' || !presetType) {
        const selectElementTagline = document.getElementById('presets-select-tagline')
        for (const child of selectElementTagline.children) {child.remove()}

        for (const title of Object.keys(storage.taglineFormats)) {
            const option = document.createElement('option')
            option.id = `tagline-option-${title}`
            if (!document.getElementById(option.id)) {
                option.innerText = title
                option.value = title
                selectElementTagline.appendChild(option)
            }
        }
        if (Object.keys(storage.taglineFormats).length < 1) {
            const option = document.createElement('option')
            option.id = `tagline-option-default`
            if (!document.getElementById(option.id)) {
                option.innerText = 'default'
                option.value = 'default'
                option.selected = true
                taglineFormat.value = '{vg}VG {gs}G+ {g}G {a}A {ba}BA {p}P'
                taglineFormat.placeholder = taglineFormat.value
                taglineFormat.setAttribute('data-preset-title', 'default')

                selectElementTagline.appendChild(option)
            }
        }
        const selectedTitle = Object.prototype.hasOwnProperty.call(storage.taglineFormats, toSelect)
            ? toSelect : Object.keys(storage.taglineFormats)[0]
        selectElementTagline.value = selectedTitle
        taglineFormat.setAttribute('data-preset-title', selectedTitle)
        updateInputValues('tagline', selectedTitle)
    }
}

function newFormatPreset(element, presetType) {
    let presetList = null
    switch (presetType) {
        case 'name':
            presetList = storage.nameFormats
            break
        case 'tagline':
            presetList = storage.taglineFormats
            break
        default:
            console.warn(`Unknown preset type ${presetType}`)
            return
    }

    if (Object.keys(presetList).length >= 15) {
        alert('You can have a maximum of 15 presets.')
        return
    }
    const existingRow = element.parentNode.querySelector('.preset-create-name-row')
    if (existingRow) {
        existingRow.remove()
        element.innerText = 'New'
        document.getElementById(`settings-${presetType}-format`).disabled = false
        return
    }

    const titleInput = document.createElement('input')
    titleInput.placeholder = 'Input a title...'

    const titleSave = document.createElement('button')
    titleSave.id = `save-button-${presetType}`
    titleSave.innerText = 'Save'
    titleSave.classList = 'yellow'
    titleSave.onclick = async () => {
        const title = titleInput.value.trim()
        if (title.length < 1 || title.length > 25) {
            titleSave.innerText = title.length < 1 ? 'Enter a title!' : 'Title is too long!'
            setTimeout(() => {titleSave.innerText = 'Save'}, 1800)
            return
        }
        presetList[title] = ''
        storage[presetType === 'name' ? 'activeNamePreset' : 'activeTaglinePreset'] = title
        await saveSettings()

        titleInputDiv.remove()
        populateOptions(title, presetType)
        updateInputValues(presetType, title)
        element.disabled = false
        element.innerText = 'New'
        if (Object.keys(presetList).length >= 15) {
            document.getElementById(`presets-select-${presetType}-new`).style.display = 'none'
        }
        document.getElementById(`presets-select-${presetType}-del`).style.display = 'unset'
        document.getElementById(`settings-${presetType}-format`).disabled = false
    }

    document.getElementById(`settings-${presetType}-format`).disabled = true
    titleInputDiv = document.createElement('div')
    titleInputDiv.className = 'preset-create-name-row'
    titleInputDiv.appendChild(titleInput)
    titleInputDiv.appendChild(document.createTextNode(' '))
    titleInputDiv.appendChild(titleSave)
    element.parentNode.appendChild(titleInputDiv)
    element.innerText = 'Cancel'
}

function delFormatPreset(title, presetType) {
    let presetList = null
    switch (presetType) {
        case 'name':
            presetList = storage.nameFormats
            break
        case 'tagline':
            presetList = storage.taglineFormats
            break
        default:
            console.warn(`Unknown preset type ${presetType}`)
            return
    }

    delete presetList[title]
    const option = document.getElementById(`${presetType}-option-${title}`)
    if (option) option.remove()
    const nextTitle = Object.keys(presetList)[0]
    storage[presetType === 'name' ? 'activeNamePreset' : 'activeTaglinePreset'] = nextTitle
    updateInputValues(presetType, nextTitle)
    void saveSettings();
    if (Object.keys(presetList).length <= 1) {
        document.getElementById(`presets-select-${presetType}-del`)
        .style.display = 'none'
    }
    if (Object.keys(presetList).length < 15) {
        document.getElementById(`presets-select-${presetType}-new`)
        .style.display = 'unset'
    }
}

function beginRenameFormatPreset(element, presetType) {
    const presetList = presetType === 'name' ? storage.nameFormats : storage.taglineFormats
    const select = document.getElementById(`presets-select-${presetType}`)
    const format = document.getElementById(`settings-${presetType}-format`)
    const currentTitle = select.value
    if (element.parentNode.querySelector('.preset-rename-name-row')) return

    const row = document.createElement('div')
    row.className = 'preset-rename-name-row'
    const titleInput = document.createElement('input')
    titleInput.type = 'text'
    titleInput.value = currentTitle
    titleInput.placeholder = 'Input a title...'
    const titleSave = document.createElement('button')
    titleSave.className = 'yellow rename'
    titleSave.textContent = 'Save'
    titleSave.addEventListener('click', async () => {
        const nextTitle = titleInput.value.trim()
        if (!nextTitle || nextTitle.length > 25) {
            titleSave.textContent = !nextTitle ? 'Enter a title!' : 'Title is too long!'
            setTimeout(() => { titleSave.textContent = 'Save' }, 1800)
            return
        }
        if (nextTitle !== currentTitle && Object.prototype.hasOwnProperty.call(presetList, nextTitle)) {
            titleSave.textContent = 'Already exists!'
            setTimeout(() => { titleSave.textContent = 'Save' }, 1800)
            return
        }
        if (nextTitle !== currentTitle) {
            presetList[nextTitle] = presetList[currentTitle]
            delete presetList[currentTitle]
            storage[presetType === 'name' ? 'activeNamePreset' : 'activeTaglinePreset'] = nextTitle
            await saveSettings()
        }
        row.remove()
        element.disabled = false
        select.disabled = false
        format.disabled = false
        populateOptions(nextTitle, presetType)
        updateInputValues(presetType, nextTitle)
    })
    row.append(titleInput, document.createTextNode(' '), titleSave)
    element.parentNode.appendChild(row)
    element.disabled = true
    select.disabled = true
    format.disabled = true
    titleInput.focus()
}

async function init() {
    const data = await browser.storage.sync.get('realtoolsSettings');
    Object.assign(storage, data.realtoolsSettings || {});
    settingsRevision = Number(storage._realtoolsSettingsUpdatedAt) || 0;
    if (typeof storage.show_hints != 'undefined') {showHintsCheck.checked = Boolean(storage.show_hints)}
    else {
        showHintsCheck.checked = true
        storage.show_hints = true
    }
    if (typeof storage.info_ui_tweaks != 'undefined') {
        infoUiTweaksCheck.checked = Boolean(storage.info_ui_tweaks)
    } else {
        infoUiTweaksCheck.checked = true
        storage.info_ui_tweaks = true
    }
    applyHintVisibility(showHintsCheck.checked)

    // Formatting
    storage.nameFormats = storage.nameFormats || {Default: '{ln}'}
    storage.taglineFormats = storage.taglineFormats || {Default: '{vg}VG {gs}G+ {g}G {a}A {ba}BA {p}P'}
    storage.activeNamePreset = Object.prototype.hasOwnProperty.call(storage.nameFormats, storage.activeNamePreset)
        ? storage.activeNamePreset : Object.keys(storage.nameFormats)[0]
    storage.activeTaglinePreset = Object.prototype.hasOwnProperty.call(storage.taglineFormats, storage.activeTaglinePreset)
        ? storage.activeTaglinePreset : Object.keys(storage.taglineFormats)[0]
    await saveSettings()

    nameFormat.addEventListener('input', (event) => {
        storage.nameFormats[event.target.getAttribute('data-preset-title')] = event.target.value;
        updateFormatPreview(nameFormatPreview, event.target.value)
        void saveSettings();
    })
    taglineFormat.addEventListener('input', (event) => {
        storage.taglineFormats[event.target.getAttribute('data-preset-title')] = event.target.value;
        updateFormatPreview(taglineFormatPreview, event.target.value)
        void saveSettings();
    })
    showHintsCheck.addEventListener('click', (event) => {
        storage.show_hints = event.target.checked;
        applyHintVisibility(event.target.checked);
        void saveSettings();
    })
    infoUiTweaksCheck.addEventListener('click', (event) => {
        storage.info_ui_tweaks = event.target.checked;
        void saveSettings();
    })

    populateOptions(storage.activeNamePreset, 'name')
    populateOptions(storage.activeTaglinePreset, 'tagline')

    if (Object.keys(storage.nameFormats).length <= 1) {
        document.getElementById('presets-select-name-del')
        .style.display = 'none'
    }
    if (Object.keys(storage.nameFormats).length >= 15) {
        document.getElementById('presets-select-name-new')
        .style.display = 'none'
    }
    document.getElementById('presets-select-name-new')
    .addEventListener('click', (event) => {newFormatPreset(event.target, 'name')})
    document.getElementById('presets-select-name-del')
    .addEventListener('click', () => {delFormatPreset(
        document.getElementById('presets-select-name').selectedOptions[0].value,
        'name',
    )})
    document.getElementById('presets-select-name-rename')
    .addEventListener('click', (event) => {beginRenameFormatPreset(event.target, 'name')})

    if (Object.keys(storage.taglineFormats).length <= 1) {
        document.getElementById('presets-select-tagline-del')
        .style.display = 'none'
    }
    if (Object.keys(storage.taglineFormats).length >= 15) {
        document.getElementById('presets-select-tagline-new')
        .style.display = 'none'
    }
    document.getElementById('presets-select-tagline-new')
    .addEventListener('click', (event) => {newFormatPreset(event.target, 'tagline')})
    document.getElementById('presets-select-tagline-del')
    .addEventListener('click', () => {delFormatPreset(
        document.getElementById('presets-select-tagline').selectedOptions[0].value,
        'tagline',
    )})
    document.getElementById('presets-select-tagline-rename')
    .addEventListener('click', (event) => {beginRenameFormatPreset(event.target, 'tagline')})

    document.getElementById('presets-select-name')
    .addEventListener('change', async (event) => {
        const title = event.target.selectedOptions[0].value
        storage.activeNamePreset = title
        nameFormat.setAttribute('data-preset-title', title)
        updateInputValues('name', title)
        await saveSettings()
    })
    nameFormat.setAttribute('data-preset-title', storage.activeNamePreset)

    document.getElementById('presets-select-tagline')
    .addEventListener('change', async (event) => {
        const title = event.target.selectedOptions[0].value
        storage.activeTaglinePreset = title
        taglineFormat.setAttribute('data-preset-title', title)
        updateInputValues('tagline', title)
        await saveSettings()
    })
    taglineFormat.setAttribute('data-preset-title', storage.activeTaglinePreset)
}

init();

// Multiline note presets are stored locally because Chrome's synchronized
// storage has a small per-item limit and notes can be considerably longer than
// Name or Tagline formats.
const noteFormatStorage = {
    privateNotesFormats: {default: DEFAULT_PRIVATE_NOTES_FORMAT},
    publicNotesFormats: {default: ''},
};
const activeNotePresets = {
    'private-notes': 'default',
    'public-notes': 'default',
};
let noteFormatsRevision = 0;
const notePresetConfig = {
    'private-notes': {
        storageKey: 'privateNotesFormats',
        selectId: 'presets-select-private-notes',
        inputId: 'settings-private-notes-format',
        previewId: 'settings-private-notes-format-preview',
    },
    'public-notes': {
        storageKey: 'publicNotesFormats',
        selectId: 'presets-select-public-notes',
        inputId: 'settings-public-notes-format',
        previewId: 'settings-public-notes-format-preview',
    },
};

function notePresetParts(type) {
    const config = notePresetConfig[type];
    return {
        config,
        formats: noteFormatStorage[config.storageKey],
        select: document.getElementById(config.selectId),
        input: document.getElementById(config.inputId),
        preview: document.getElementById(config.previewId),
        add: document.getElementById(`${config.selectId}-new`),
        remove: document.getElementById(`${config.selectId}-del`),
        rename: document.getElementById(`${config.selectId}-rename`),
    };
}

async function saveNoteFormats() {
    noteFormatsRevision = Math.max(Date.now(), noteFormatsRevision + 1);
    const noteFormats = {
        privateNotesFormats: {...noteFormatStorage.privateNotesFormats},
        publicNotesFormats: {...noteFormatStorage.publicNotesFormats},
        activeNotePresets: {...activeNotePresets},
        updatedAt: noteFormatsRevision,
    };
    const response = await chrome.runtime.sendMessage({
        type: 'realtools-save-note-formats',
        noteFormats,
    });
    if (!response?.ok) throw new Error(response?.error || 'Could not save Notes presets.');
}

function beginRenameNotePreset(element, type) {
    const parts = notePresetParts(type);
    const title = parts.select.value;
    if (element.parentNode.querySelector('.preset-rename-name-row')) return;
    const row = document.createElement('div');
    row.className = 'preset-rename-name-row';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = title;
    titleInput.placeholder = 'Input a title...';
    const save = document.createElement('button');
    save.className = 'yellow rename';
    save.textContent = 'Save';
    save.addEventListener('click', async () => {
        const nextTitle = titleInput.value.trim();
        if (!nextTitle || nextTitle.length > 25) {
            save.textContent = !nextTitle ? 'Enter a title!' : 'Title is too long!';
            setTimeout(() => { save.textContent = 'Save'; }, 1800);
            return;
        }
        if (nextTitle !== title && Object.prototype.hasOwnProperty.call(parts.formats, nextTitle)) {
            save.textContent = 'Already exists!';
            setTimeout(() => { save.textContent = 'Save'; }, 1800);
            return;
        }
        if (nextTitle !== title) {
            parts.formats[nextTitle] = parts.formats[title];
            delete parts.formats[title];
            activeNotePresets[type] = nextTitle;
            await saveNoteFormats();
        }
        row.remove();
        element.disabled = false;
        parts.select.disabled = false;
        parts.input.disabled = false;
        renderNotePreset(type, nextTitle);
    });
    row.append(titleInput, document.createTextNode(' '), save);
    element.parentNode.appendChild(row);
    element.disabled = true;
    parts.select.disabled = true;
    parts.input.disabled = true;
    titleInput.focus();
}

function renderNotePreset(type, preferredTitle = activeNotePresets[type]) {
    const parts = notePresetParts(type);
    let titles = Object.keys(parts.formats);
    if (!titles.length) {
        parts.formats.default = '';
        titles = ['default'];
    }
    const selectedTitle = titles.includes(preferredTitle) ? preferredTitle : titles[0];
    activeNotePresets[type] = selectedTitle;
    parts.select.replaceChildren();
    for (const title of titles) {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        option.selected = title === selectedTitle;
        parts.select.appendChild(option);
    }
    parts.input.dataset.presetTitle = selectedTitle;
    parts.input.value = parts.formats[selectedTitle] || '';
    parts.input.placeholder = parts.input.value;
    updateFormatPreview(parts.preview, parts.input.value);
    parts.remove.style.display = titles.length <= 1 ? 'none' : 'unset';
    parts.add.style.display = titles.length >= 15 ? 'none' : 'unset';
}

function beginNewNotePreset(type) {
    const parts = notePresetParts(type);
    const existingRow = parts.add.parentNode.querySelector('.note-preset-name-row');
    if (existingRow) {
        existingRow.remove();
        parts.add.textContent = 'New';
        return;
    }
    if (Object.keys(parts.formats).length >= 15) return;

    const row = document.createElement('div');
    row.className = 'note-preset-name-row';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Input a title...';
    const save = document.createElement('button');
    save.className = 'yellow';
    save.textContent = 'Save';
    save.addEventListener('click', async () => {
        const title = titleInput.value.trim();
        if (!title || title.length > 25) {
            save.textContent = !title ? 'Enter a title!' : 'Title is too long!';
            setTimeout(() => {save.textContent = 'Save'}, 1800);
            return;
        }
        if (Object.prototype.hasOwnProperty.call(parts.formats, title)) {
            save.textContent = 'Already exists!';
            setTimeout(() => {save.textContent = 'Save'}, 1800);
            return;
        }
        parts.formats[title] = '';
        activeNotePresets[type] = title;
        await saveNoteFormats();
        row.remove();
        parts.add.textContent = 'New';
        renderNotePreset(type, title);
    });
    row.append(titleInput, document.createTextNode(' '), save);
    parts.add.parentNode.appendChild(row);
    parts.add.textContent = 'Cancel';
    titleInput.focus();
}

async function initNotePresets() {
    const stored = await browser.storage.local.get(NOTE_FORMATS_KEY);
    const saved = stored[NOTE_FORMATS_KEY] || {};
    noteFormatsRevision = Number(saved.updatedAt) || 0;
    if (saved.privateNotesFormats && typeof saved.privateNotesFormats === 'object') {
        noteFormatStorage.privateNotesFormats = saved.privateNotesFormats;
    }
    if (saved.publicNotesFormats && typeof saved.publicNotesFormats === 'object') {
        noteFormatStorage.publicNotesFormats = saved.publicNotesFormats;
    }
    if (saved.activeNotePresets && typeof saved.activeNotePresets === 'object') {
        for (const type of Object.keys(activeNotePresets)) {
            if (typeof saved.activeNotePresets[type] === 'string') {
                activeNotePresets[type] = saved.activeNotePresets[type];
            }
        }
    }
    const oldDefault = noteFormatStorage.privateNotesFormats.default;
    const legacyPrefix = '\u0412\u044b\u0441\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442';
    if (typeof oldDefault === 'string' && oldDefault.startsWith(legacyPrefix)
        && oldDefault.includes('{hs}') && oldDefault.includes('{rng}') && oldDefault.includes('{range}')) {
        noteFormatStorage.privateNotesFormats.default = DEFAULT_PRIVATE_NOTES_FORMAT;
    }
    for (const type of Object.keys(notePresetConfig)) {
        const parts = notePresetParts(type);
        renderNotePreset(type);
        parts.select.addEventListener('change', async () => {
            activeNotePresets[type] = parts.select.value;
            renderNotePreset(type, parts.select.value);
            await saveNoteFormats();
        });
        parts.input.addEventListener('input', async () => {
            parts.formats[parts.input.dataset.presetTitle] = parts.input.value;
            parts.input.placeholder = parts.input.value;
            updateFormatPreview(parts.preview, parts.input.value);
            await saveNoteFormats();
        });
        parts.add.addEventListener('click', () => beginNewNotePreset(type));
        parts.rename.addEventListener('click', (event) => beginRenameNotePreset(event.target, type));
        parts.remove.addEventListener('click', async () => {
            const titles = Object.keys(parts.formats);
            if (titles.length <= 1) return;
            delete parts.formats[parts.select.value];
            activeNotePresets[type] = Object.keys(parts.formats)[0];
            await saveNoteFormats();
            renderNotePreset(type);
        });
    }
    await saveNoteFormats();
}

initNotePresets();

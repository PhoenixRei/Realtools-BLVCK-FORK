// Edit tab only: name, tagline, private-note, and public-note presets.
async function loadRealtoolsEditTab() {
    const tab = document.getElementById('tab_update2');
    const doc = await getTabContent('tab_update2');
    
    // make sure there's no weird overlap
    if (tab == currentTab) tab.style.display = 'block';
    else tab.style.display = tab.style.display || 'none';

    tab.innerHTML = doc.children[0].innerHTML;

    const formattedStrings = await generateTaglineAndName();

    function installPresetSelector(inputId, selectId, formats, storageKey) {
        const input = document.querySelector(`#${inputId}`)
        if (!input || !storage[storageKey]) return

        input.placeholder = formats.default || ''

        const selector = document.createElement('select')
        const defOption = document.createElement('option')
        defOption.innerText = 'Select a preset'
        defOption.selected = true
        defOption.disabled = true
        defOption.value = null
        selector.appendChild(defOption)

        for (const title of Object.keys(formats)) {
            const option = document.createElement('option')
            option.innerText = title
            option.value = title
            selector.appendChild(option)
        }

        selector.id = selectId
        selector.className = 'realtools-preset-select'
        if (input.tagName === 'TEXTAREA') {
            selector.style.display = 'block'
            selector.style.marginTop = '4px'
            selector.style.maxWidth = '466px'
        } else {
            selector.style.marginLeft = '4px'
        }
        selector.onchange = () => {
            const title = selector.selectedOptions[0].value
            const template = storage[storageKey][title]
            const scoreOverrides = historicalScoreOverrides(template, input.value, highestScore, lowestScore)
            const formatted = template.format(formatDataGenerator(scoreOverrides))
            input.value = formatted
            input.placeholder = formatted
            selector.selectedIndex = 0
        }
        selector.form = null
        input.parentNode.appendChild(selector)
    }

    function tagline() {
        installPresetSelector('changetagline', 'realtools-use-tagline-button', formattedStrings.taglines, 'taglineFormats')
    }

    function name() {
        installPresetSelector('changename', 'realtools-use-name-button', formattedStrings.names, 'nameFormats')
    }

    function privateNotes() {
        installPresetSelector('private_notes', 'realtools-use-private-notes-button', formattedStrings.privateNotes, 'privateNotesFormats')
    }

    function publicNotes() {
        installPresetSelector('public_notes', 'realtools-use-public-notes-button', formattedStrings.publicNotes, 'publicNotesFormats')
    }

    tagline();
    name();
    privateNotes();
    publicNotes();

    if (storage.show_debug_options === true) {
        // Holds the update button
        const container = document.querySelector('.update-horseinfo').parentNode

        const debugButton = document.createElement('button')
        debugButton.innerText = 'Print values'
        debugButton.onclick = () => {
            console.log(formattedStrings)
            console.log(formatDataGenerator())
        }
        debugButton.classList = 'dark'
        debugButton.form = null
        debugButton.style = 'margin-left: 4px;'

        container.appendChild(debugButton)
    }
}

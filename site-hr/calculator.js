// Small profile entry point. Feature implementations live in site-hr/modules/.
async function startRealtoolsCalculator() {
    try {
        const stored = await browser.storage.sync.get('realtoolsSettings')
        setInfoUiTweaksEnabled(stored.realtoolsSettings?.info_ui_tweaks === true)
    } catch {
        setInfoUiTweaksEnabled(true)
    }

    initializeHorseProfile()
    getInitialTab()

    // implement our own listener for tab switching
    const tabs = document.getElementsByClassName('tabclick')
    for (const tab of tabs) {
        tab.addEventListener('click', () => {
            if (currentTab != document.getElementById(tab.lang)) {
                currentTab = document.getElementById(tab.lang)
                setCookie({name: 'selected_horse_tab', value: currentTab.id.replace('tab_','').replace('2','')})
            }
        })
    }
}

browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync' || !changes.realtoolsSettings) return
    setInfoUiTweaksEnabled(changes.realtoolsSettings.newValue?.info_ui_tweaks !== false)
})

if (document.readyState === 'complete') void startRealtoolsCalculator()
else window.addEventListener('load', () => void startRealtoolsCalculator(), {once: true})

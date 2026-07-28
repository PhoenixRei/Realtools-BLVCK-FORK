// Coordinates feature modules without containing their rendering logic.
async function preloadTabs() {
    watchGeneticsTab()
    try {
        geneticsTabDoc = await loadGeneticsTabDoc();
        conformationParagraphs = geneticsTabDoc.getElementsByClassName('curly-quotes')[0]?.innerText?.trim().toLowerCase() || '';
    } catch (error) {
        console.warn('Realtools could not load Colour data', error)
        return
    }

    try {
        await loadRealtoolsStatsTab();
    } catch (error) {
        console.warn('Realtools could not calculate Stats', error)
    }

    try {
        await loadRealtoolsColourTab();
    } catch (error) {
        console.warn('Realtools could not calculate Colour values', error)
    }

    // The Update tab is private to the owner. Public and market profiles must
    // still keep their Colour and Stats calculations when this request is
    // unavailable.
    try {
        await loadRealtoolsEditTab();
    } catch {
        // Owner-only controls are unavailable on public and market profiles.
    }

    // HR sets a cookie whenever you request a new tab, so we reset it
    // here to what we assume was its original value
    setCookie({name: 'selected_horse_tab', value: initialTabCookie});
}

function getInitialTab() {
    initialTabCookie = getCookie('selected_horse_tab');

    // Modern public/market profiles no longer expose the legacy tab selector.
    // Pick the visible profile tab directly and preload the calculation tabs
    // for every horse, regardless of ownership.
    const profileTabs = [
        'tab_summary2',
        'tab_training2',
        'tab_genetics2',
        'tab_achievements2',
        'tab_offspring2',
        'tab_update2',
    ].map((id) => document.getElementById(id)).filter(Boolean)

    const savedTab = initialTabCookie
        ? document.getElementById(`tab_${initialTabCookie}2`)
        : null
    currentTab = savedTab
        || profileTabs.find((tab) => window.getComputedStyle(tab).display !== 'none')
        || document.getElementById('tab_genetics2')
        || null

    preloadTabs().catch((error) => console.warn('Realtools profile calculations failed', error));
}

const ALLOWED_IMAGE_HOSTS = new Set([
    'horse-img.horsereality.com',
    'assets.horsereality.com',
    'www.horsereality.com',
    'v2.horsereality.com',
])

// The popup is destroyed as soon as the user clicks back on the page.  Keep
// Notes writes in the service worker so the last edit is not lost mid-save.
let noteFormatsWrite = Promise.resolve()
let settingsWrite = Promise.resolve()

function saveNoteFormatsFromPopup(noteFormats) {
    if (!noteFormats || typeof noteFormats !== 'object') {
        return Promise.reject(new Error('Invalid Notes preset data.'))
    }
    const revision = Number(noteFormats.updatedAt) || 0
    noteFormatsWrite = noteFormatsWrite.catch(() => {}).then(async () => {
        const stored = await chrome.storage.local.get('realtoolsNoteFormatsV1')
        const savedRevision = Number(stored.realtoolsNoteFormatsV1?.updatedAt) || 0
        if (savedRevision > revision) return
        await chrome.storage.local.set({realtoolsNoteFormatsV1: noteFormats})
    })
    return noteFormatsWrite
}

function saveSettingsFromPopup(settings) {
    if (!settings || typeof settings !== 'object') {
        return Promise.reject(new Error('Invalid settings data.'))
    }
    const revision = Number(settings._realtoolsSettingsUpdatedAt) || 0
    settingsWrite = settingsWrite.catch(() => {}).then(async () => {
        const stored = await chrome.storage.sync.get('realtoolsSettings')
        const savedRevision = Number(stored.realtoolsSettings?._realtoolsSettingsUpdatedAt) || 0
        if (savedRevision > revision) return
        await chrome.storage.sync.set({realtoolsSettings: settings})
    })
    return settingsWrite
}

// Version 3 removed the abandoned adult-preview research tracker. Its local
// databases are no longer used; normal extension settings live in sync storage.
chrome.storage.local.remove([
    'realtoolsExactPredictTrackerV4',
    'realtoolsExactPredictTrackerV3',
    'realtoolsExactPredictTrackerV2',
    'realtoolsPredictTrackerV1',
    'realtoolsShowHistoryV1',
]).catch(() => {})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === 'realtools-save-note-formats') {
        saveNoteFormatsFromPopup(message.noteFormats)
            .then(() => sendResponse({ok: true}))
            .catch((error) => sendResponse({ok: false, error: error.message}))
        return true
    }

    if (message?.type === 'realtools-save-settings') {
        saveSettingsFromPopup(message.settings)
            .then(() => sendResponse({ok: true}))
            .catch((error) => sendResponse({ok: false, error: error.message}))
        return true
    }

    if (message?.type !== 'realtools-fetch-image') return false

    let url
    try {
        url = new URL(message.url)
        if (url.protocol !== 'https:' || !ALLOWED_IMAGE_HOSTS.has(url.hostname)) {
            throw new Error('Image host is not allowed')
        }
    } catch (error) {
        sendResponse({ok: false, error: error.message})
        return false
    }

    fetch(url.href, {credentials: 'omit'})
        .then((response) => {
            if (!response.ok) throw new Error(`Image request failed (${response.status})`)
            return response.blob()
        })
        .then(async (blob) => {
            const bytes = new Uint8Array(await blob.arrayBuffer())
            let binary = ''
            const chunkSize = 0x8000
            for (let index = 0; index < bytes.length; index += chunkSize) {
                binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize))
            }
            sendResponse({
                ok: true,
                dataUrl: `data:${blob.type || 'image/png'};base64,${btoa(binary)}`,
            })
        })
        .catch((error) => sendResponse({ok: false, error: error.message}))

    return true
})

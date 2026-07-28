// Shared profile state, parsing helpers, tab loading, and render recovery.
const adviceSentences = {
    walk: [
        {bracket: 'excellent', sentence: /powerful and balanced step/},
        {bracket: 'good', sentence: /decent amount of elasticity while walking/},
        {bracket: 'average', sentence: /toes are dragging just a touch/},
        {bracket: 'fair', sentence: /four beat walk is a little off/},
        {bracket: 'poor', sentence: /walk is way too wide/}
    ],
    trot: [
        {bracket: 'excellent', sentence: /has an amazing two-beat rhythm/},
        {bracket: 'good', sentence: /impulsion in working trot is off to a good start/},
        {bracket: 'average', sentence: /engagement is lacking a bit when/},
        {bracket: 'fair', sentence: /passable trot but not too fancy/},
        {bracket: 'poor', sentence: /trot, you can see it is flat and lacking suspension/}
    ],
    canter: [
        {bracket: 'excellent', sentence: /that is a very elegant looking canter with a nice three-beat gait/},
        {bracket: 'good', sentence: /canter under control easily/},
        {bracket: 'average', sentence: /needs more motivation to move, seems more like a trot than canter/},
        {bracket: 'fair', sentence: /has a bit of difficulty with changing leads/},
        {bracket: 'poor', sentence: /that canter needs quite some work before it looks like anything really/}
    ],
    gallop: [
        {bracket: 'excellent', sentence: /seems to have a balanced and very smooth gallop/},
        {bracket: 'good', sentence: /gallop is under control and has some nice extended strides/},
        {bracket: 'average', sentence: /could have a bit more impulsion in gallop/},
        {bracket: 'fair', sentence: /has a bit of trouble stopping in gallop\. might wanna work on that/},
        {bracket: 'poor', sentence: /is completely out of control, where are the breaks/}
    ],
    posture: [
        {bracket: 'excellent', sentence: /posture is perfectly balanced/},
        {bracket: 'good', sentence: /seems to stand straight and keeps/},
        {bracket: 'average', sentence: /(seems to stand pretty stable like any other horse|seems to hold up like any other horse)/},
        {bracket: 'fair', sentence: /seems to be leaning a bit\. posture needs work/},
        {bracket: 'poor', sentence: /has a very imbalanced posture and stands instable/}
    ],
    head: [
        {bracket: 'excellent', sentence: /looking closer at (his|her) head, (he|she) shows some nice proportions/},
        {bracket: 'good', sentence: /head looks pretty elegant/},
        {bracket: 'average', sentence: /head seems ok(ay)?\. not too bad/},
        {bracket: 'fair', sentence: /head is somewhat off proportion/},
        {bracket: 'poor', sentence: /that's one funky looking horse head/}
    ],
    neck: [
        {bracket: 'excellent', sentence: /has great elasticity in the shoulder/},
        {bracket: 'good', sentence: /has good shoulder muscles working/},
        {bracket: 'average', sentence: /shoulders? could be a bit more upright/},
        {bracket: 'fair', sentence: /shoulder is a bit lazy/},
        {bracket: 'poor', sentence: /has extremely stiff shoulders/}
    ],
    back: [
        {bracket: 'excellent', sentence: /back will be heaven for a rider, flexible but sturdy/},
        {bracket: 'good', sentence: /back movement is flatter and quieter/},
        {bracket: 'average', sentence: /if you look at (his|her) back, it is a bit stiff, but not too bad/},
        {bracket: 'fair', sentence: /back is kind of too long/},
        {bracket: 'poor', sentence: /lacks flexibility and has a stiff, rigid back/}
    ],
    shoulders: [
        {bracket: 'excellent', sentence: /has great elasticity in the shoulder/},
        {bracket: 'good', sentence: /has good shoulder muscles working/},
        {bracket: 'average', sentence: /shoulders? could be a bit more upright/},
        {bracket: 'fair', sentence: /shoulder is a bit lazy/},
        {bracket: 'poor', sentence: /has extremely stiff shoulders/}
    ],
    hindquarters: [
        {bracket: 'excellent', sentence: /there's great engagement in the hindquarters/},
        {bracket: 'good', sentence: /there's good muscle on the hindquarters/},
        {bracket: 'average', sentence: /i guess those hindquarters are passable/},
        {bracket: 'fair', sentence: /hindquarters are looking a little wonky, they're hanging too much/},
        {bracket: 'poor', sentence: /those are some weak looking hindquarters/}
    ],
    frontlegs: [
        {bracket: 'excellent', sentence: /front legs are practically identical, nice symmetry and standing straight/},
        {bracket: 'good', sentence: /front legs have some solid lines going/},
        {bracket: 'average', sentence: /front legs seem ok(ay)?, nothing wrong with them/},
        {bracket: 'fair', sentence: /front legs are off symmetry/},
        {bracket: 'poor', sentence: /front legs are not really standing straight/}
    ],
    socks: [
        {bracket: 'excellent', sentence: /feathering is amazing and looks thick/},
        {bracket: 'good', sentence: /has a good amount of feathering going on/},
        {bracket: 'average', sentence: /feathering looks ok(ay)?/},
        {bracket: 'fair', sentence: /feathering is a little all over the place, (he|she) looks like a hobbit/},
        {bracket: 'poor', sentence: /see those skimpy legs\? no feathering at all/}
    ]
}
let conformationParagraphs = '';
let qualityResults = {very_good_plus: 0, very_good: 0, very_good_minus: 0, good_plus: 0, good: 0, average: 0, below_average: 0, poor: 0};
let qualityStats = {};
let confTraits = {};
let lowestScore = null;
let highestScore = null;
let lowestResult = null;
let highestResult = null;
let geneticPotential = null;
let rangeAmount = 6.928;
const confScores = {
    dressage: {percentage: 0, average: 0, conformation: 0, max: 0, min: 0},
    driving: {percentage: 0, average: 0, conformation: 0, max: 0, min: 0},
    endurance: {percentage: 0, average: 0, conformation: 0, max: 0, min: 0},
    eventing: {percentage: 0, average: 0, conformation: 0, max: 0, min: 0},
    flat_racing: {percentage: 0, average: 0, conformation: 0, max: 0, min: 0},
    show_jumping: {percentage: 0, average: 0, conformation: 0, max: 0, min: 0},
    western_reining: {percentage: 0, average: 0, conformation: 0, max: 0, min: 0}
}
const gpTraits = {};
let gpResults = [];
let horseIsFoal = false;
const qualityMap = {
    poor: {max: 39, min: 1},
    below_average: {max: 59, min: 40},
    average: {max: 69, min: 60},
    good: {max: 79, min: 70},
    good_plus: {max: 84, min: 80},
    very_good_minus: {max: 89, min: 85},
    very_good: {max: 100, min: 85},
    very_good_plus: {max: 100, min: 91}
}

const traitsGenTraitsMap = {
    dressage: ['walk', 'trot', 'canter', 'posture'],
    driving: ['trot', 'back', 'shoulders', 'hindquarters'],
    endurance: ['walk', 'trot', 'canter', 'head', 'neck', 'back'],
    eventing: ['walk',  'trot', 'canter', 'posture', 'head', 'neck'],
    flat_racing: ['gallop', 'posture', 'neck', 'back', 'shoulders', 'frontlegs', 'hindquarters'],
    show_jumping: ['canter', 'back', 'shoulders', 'frontlegs', 'hindquarters'],
    western_reining: ['head', 'neck', 'shoulders', 'frontlegs', 'hindquarters']
}

function parseTableColumn(column, props={}) {
    const keyClass = props.keyClass || 'genetic_potential';
    const makeNumber = props.makeNumber || false;
    let currentIndex = 0;
    const result = {};
    for (const element of column.children) {
        if (element.classList.contains(keyClass)) {
            const value = column.children[currentIndex+1].innerText;
            if (makeNumber) {
                result[element.innerText.trim().toLowerCase().replace(' ', '_')] = Number(value.trim());
            } else {
                result[element.innerText.trim().toLowerCase().replace(' ', '_')] = value.trim();
            }
        }
        currentIndex += 1;
    }
    return result
}

function replaceInColumn(column, key, newValue, props={}) {
    const keyClass = props.keyClass || 'genetic_potential';
    let currentIndex = 0;
    let replacedElements = [];
    for (const element of column.children) {
        if (element.classList.contains(keyClass) && element.innerText.trim() == key.trim()) {
            column.children[currentIndex+1].innerHTML = newValue;
            replacedElements.push(element);
        }
        currentIndex += 1;
    }
    return replacedElements
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

function escapeRegularExpression(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function scoreNumber(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : null
    if (typeof value !== 'string' || !value.trim()) return null
    const parsed = Number.parseFloat(value.trim().replace(',', '.'))
    return Number.isFinite(parsed) ? parsed : null
}

function scoresFromExistingText(template, existingText) {
    const source = String(template || '')
    const current = String(existingText || '').trim()
    if (!source || !current) return {matched: false, highest: null, lowest: null}

    const placeholders = []
    let pattern = '^\\s*'
    let cursor = 0
    const placeholderPattern = /\{([a-z0-9_]+)\}/gi
    let match

    while ((match = placeholderPattern.exec(source)) !== null) {
        pattern += escapeRegularExpression(source.slice(cursor, match.index))
        const key = match[1].toLowerCase()
        placeholders.push(key)
        pattern += /^(?:hs|ls)(?:_r[0-2])?$/.test(key)
            ? '([-+]?\\d+(?:[.,]\\d+)?)'
            : '([\\s\\S]*?)'
        cursor = match.index + match[0].length
    }
    pattern += escapeRegularExpression(source.slice(cursor)) + '\\s*$'

    let values
    try {
        values = current.match(new RegExp(pattern, 'i'))
    } catch {
        return {matched: false, highest: null, lowest: null}
    }
    if (!values) return {matched: false, highest: null, lowest: null}

    const highs = []
    const lows = []
    placeholders.forEach((key, index) => {
        const value = scoreNumber(values[index + 1])
        if (value === null) return
        if (/^hs(?:_r[0-2])?$/.test(key)) highs.push(value)
        if (/^ls(?:_r[0-2])?$/.test(key)) lows.push(value)
    })

    return {
        matched: true,
        highest: highs.length ? Math.max(...highs) : null,
        lowest: lows.length ? Math.min(...lows) : null,
    }
}

function historicalScoreOverrides(template, existingText, visibleHighest, visibleLowest) {
    const existing = scoresFromExistingText(template, existingText)
    const currentHighest = scoreNumber(visibleHighest)
    const currentLowest = scoreNumber(visibleLowest)

    return {
        matched: existing.matched,
        highestScore: existing.highest === null
            ? visibleHighest
            : currentHighest === null ? existing.highest : Math.max(existing.highest, currentHighest),
        lowestScore: existing.lowest === null
            ? visibleLowest
            : currentLowest === null ? existing.lowest : Math.min(existing.lowest, currentLowest),
    }
}

let currentTab = null;
let initialTabCookie = null;

function getCookie(cookieName) {
    const name = cookieName + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if ((c.indexOf(name)) == 0) {
            return c.substr(name.length);
        }
    }
    return null
}

function setCookie(cookie) {
    document.cookie = `${cookie.name}=${cookie.value}; samesite=lax; path=/`;
}

async function getTabContent(tabName) {
    const response = await fetch(constructEndpointUrl('update_horse_tab'), {
        method: 'POST',
        body: new URLSearchParams({
            hid: horse.lifenumber,
            newtab: tabName,
        })
    })

    if (!response.ok) throw new Error(`Could not load ${tabName}: HTTP ${response.status}`)

    const returnedContent = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(returnedContent, 'text/html');
}

let geneticsTabDoc = null;
let renderedGeneticsHtml = '';
let geneticsRestoreTimer = null;
let geneticsRenderObserver = null;
let renderedAchievementsHtml = '';
let achievementsRestoreTimer = null;
let achievementsRenderObserver = null;

function hasGeneticsData(doc) {
    const block = doc?.getElementsByClassName('grid_6 genetics')?.[1]
    return Boolean(block?.children?.[1]?.children?.[0] && block.children[1].children[1])
}

async function loadGeneticsTabDoc() {
    let lastError = null
    for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
            const doc = await getTabContent('tab_genetics2')
            if (hasGeneticsData(doc)) return doc
            lastError = new Error('Colour response did not contain Genetic potential data')
        } catch (error) {
            lastError = error
        }
        await new Promise((resolve) => window.setTimeout(resolve, 150 * (attempt + 1)))
    }
    throw lastError
}

function restoreRenderedGenetics() {
    const tab = document.getElementById('tab_genetics2')
    if (!tab || !renderedGeneticsHtml || tab.querySelector('[data-realtools-genetics-rendered]')) return
    tab.innerHTML = renderedGeneticsHtml
}

function watchGeneticsTab() {
    if (geneticsRenderObserver || !document.body) return
    geneticsRenderObserver = new MutationObserver(() => {
        const tab = document.getElementById('tab_genetics2')
        if (!renderedGeneticsHtml || !tab || tab.querySelector('[data-realtools-genetics-rendered]')) return
        window.clearTimeout(geneticsRestoreTimer)
        geneticsRestoreTimer = window.setTimeout(restoreRenderedGenetics, 60)
    })
    geneticsRenderObserver.observe(document.body, {childList: true, subtree: true})
}

function restoreRenderedAchievements() {
    const tab = document.getElementById('tab_achievements2')
    if (!tab || !renderedAchievementsHtml || tab.querySelector('[data-realtools-stats-rendered]')) return
    tab.innerHTML = renderedAchievementsHtml
    installStatsSubtabs(tab)
}

function watchAchievementsTab() {
    if (achievementsRenderObserver || !document.body) return
    achievementsRenderObserver = new MutationObserver(() => {
        const tab = document.getElementById('tab_achievements2')
        if (!renderedAchievementsHtml || !tab || tab.querySelector('[data-realtools-stats-rendered]')) return
        window.clearTimeout(achievementsRestoreTimer)
        achievementsRestoreTimer = window.setTimeout(restoreRenderedAchievements, 60)
    })
    achievementsRenderObserver.observe(document.body, {childList: true, subtree: true})
}

// Stats tab only: subtabs, overview cards, Health, Equipment, and Achievements.
const COLLAPSED_RESULTS_LIMIT = 7

const DISCIPLINE_GP_MAXIMUMS = Object.freeze({
    dressage: 300,
    driving: 500,
    endurance: 400,
    eventing: 500,
    flat_racing: 400,
    show_jumping: 500,
    western_reining: 400,
})

function makeStatsSectionIcon(doc, type, className = 'realtools-stats-section-icon') {
    const icon = doc.createElementNS('http://www.w3.org/2000/svg', 'svg')
    icon.setAttribute('viewBox', '0 0 24 24')
    icon.setAttribute('aria-hidden', 'true')
    icon.setAttribute('class', className)

    const paths = {
        conformation: [
            'M4 19h4v-4H4v4Zm6 0h4v-8h-4v8Zm6 0h4V7h-4v12Z',
            'm5 11 4-4 3 2 6-6',
        ],
        genetic: [
            'M7 3c7 4 3 14 10 18M17 3C10 7 14 17 7 21',
            'M9 7h6M8 12h8M9 17h6',
        ],
        discipline: [
            'M8 4h8v3c0 3-1.8 5-4 5S8 10 8 7V4Z',
            'M8 6H5v1c0 2 1 3 3 3M16 6h3v1c0 2-1 3-3 3M12 12v4M8 20h8M9 16h6v4',
        ],
        health: [
            'M20 5.8C17.8 3.5 14 4.2 12 7 10 4.2 6.2 3.5 4 5.8c-2.5 2.6-1.1 7 8 13.2 9.1-6.2 10.5-10.6 8-13.2Z',
            'M7 12h3l1.2-2.5L13 15l1.2-3H17',
        ],
        equipment: [
            'M5 20v-7l3-6 5 2 4-3 2 2-3 5v7M8 13h8M8 20v2M16 20v2',
            'M8 7 6 4M13 9l-1 4',
        ],
        healthRow: [
            'M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10Z',
        ],
        medal: [
            'M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
            'm9 14-1 7 4-2 4 2-1-7',
        ],
        trophy: [
            'M8 4h8v3c0 3-1.8 5-4 5S8 10 8 7V4Z',
            'M8 6H5v1c0 2 1 3 3 3M16 6h3v1c0 2-1 3-3 3M12 12v4M8 20h8M9 16h6v4',
        ],
        horseshoe: [
            'M7 4v7a5 5 0 0 0 10 0V4M7 7H4v4a8 8 0 0 0 16 0V7h-3',
            'M5 4h4M15 4h4',
        ],
    }

    for (const [index, pathData] of (paths[type] || paths.healthRow).entries()) {
        const path = doc.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', pathData)
        if (type === 'conformation' && index === 0) path.setAttribute('fill', 'currentColor')
        icon.appendChild(path)
    }
    return icon
}

function readNumericStat(value) {
    const match = String(value ?? '').replace(',', '.').match(/-?\d+(?:\.\d+)?/)
    return match ? Number(match[0]) : 0
}

function createStatsProgressBar(doc, value, maximum) {
    const safeMaximum = Math.max(1, Number(maximum) || 1)
    const safeValue = Math.max(0, readNumericStat(value))
    const percentage = Math.min(100, (safeValue / safeMaximum) * 100)
    const track = doc.createElement('span')
    track.className = 'realtools-stat-progress'
    track.setAttribute('role', 'progressbar')
    track.setAttribute('aria-valuemin', '0')
    track.setAttribute('aria-valuemax', String(safeMaximum))
    track.setAttribute('aria-valuenow', String(safeValue))

    const fill = doc.createElement('span')
    fill.className = 'realtools-stat-progress-fill'
    fill.style.width = `${percentage}%`
    track.appendChild(fill)
    return track
}

function addStatsQualityClass(element, value) {
    const quality = String(value || '').replace(/\s+/g, ' ').trim().toLowerCase()
    const className = quality.includes('excellent')
        ? 'excellent'
        : quality.includes('very good')
            ? 'very-good'
            : quality.includes('good+') || quality.includes('good plus')
                ? 'good-plus'
                : quality.startsWith('good')
            ? 'good'
            : quality === 'average' || quality === 'moderate'
                ? 'average'
                : quality.includes('below average') || quality === 'fair' || quality === 'weak'
                    ? 'below-average'
                    : quality === 'poor' || quality === 'deficient'
                        ? 'poor'
                        : ''
    if (className) element.classList.add(`realtools-quality-${className}`)
}

function makeStatsChevron(doc, direction = 'down') {
    const icon = doc.createElementNS('http://www.w3.org/2000/svg', 'svg')
    icon.setAttribute('viewBox', '0 0 24 24')
    icon.setAttribute('aria-hidden', 'true')
    icon.setAttribute('class', 'realtools-results-toggle-svg')

    const path = doc.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', direction === 'up' ? 'm7 14 5-5 5 5' : 'm7 10 5 5 5-5')
    icon.appendChild(path)
    return icon
}

function installStatsSubtabs(tab) {
    const buttons = [...tab.querySelectorAll('.realtools-stats-subtab')]
    const panels = [...tab.querySelectorAll('.realtools-stats-panel')]

    const activatePanel = (panelName) => {
        for (const button of buttons) {
            const active = button.dataset.panel === panelName
            button.classList.toggle('active', active)
            button.setAttribute('aria-selected', String(active))
        }

        for (const panel of panels) {
            panel.hidden = panel.dataset.panel !== panelName
        }
    }

    for (const button of buttons) {
        button.onclick = () => activatePanel(button.dataset.panel)
    }

    for (const button of tab.querySelectorAll('.realtools-results-toggle')) {
        button.onclick = () => {
            const card = button.closest('.realtools-results-card')
            if (!card) return

            const expanded = button.getAttribute('aria-expanded') === 'true'
            const nextExpanded = !expanded
            const rows = [...card.querySelectorAll('.realtools-result-row')]
            for (const [index, row] of rows.entries()) {
                row.hidden = !nextExpanded && index >= COLLAPSED_RESULTS_LIMIT
            }

            button.setAttribute('aria-expanded', String(nextExpanded))
            const label = button.ownerDocument.createElement('span')
            label.textContent = nextExpanded
                ? button.dataset.expandedLabel
                : button.dataset.collapsedLabel
            button.replaceChildren(label, makeStatsChevron(button.ownerDocument, nextExpanded ? 'up' : 'down'))
            button.setAttribute('aria-label', nextExpanded ? 'Show fewer results' : 'Show all results')
        }
    }
}

function styleStatsResultsBlock(doc, block, title, best, worst) {
    if (!block) return

    block.classList.add('realtools-results-card')
    block.classList.add(title === 'Competitions'
        ? 'realtools-competitions-results-card'
        : 'realtools-conformation-results-card')
    const header = block.children[0]
    if (header) {
        header.className = 'realtools-results-header'
        header.replaceChildren()

        const heading = doc.createElement('span')
        heading.className = 'realtools-results-title'
        const headingText = doc.createElement('span')
        headingText.textContent = title
        heading.appendChild(headingText)

        const badges = doc.createElement('span')
        badges.className = 'realtools-results-badges'

        const addBadge = (label, value) => {
            if (value === '') return
            const badge = doc.createElement('span')
            badge.className = `realtools-results-badge realtools-results-badge-${label.toLowerCase()}`
            const badgeLabel = doc.createElement('span')
            badgeLabel.textContent = `${label}: `
            const badgeValue = doc.createElement('strong')
            badgeValue.textContent = value
            badge.append(badgeLabel, badgeValue)
            badges.appendChild(badge)
        }

        addBadge('Best', best)
        addBadge('Worst', worst)
        header.append(heading, badges)
    }

    const columnsHeader = [...block.children].find((element) => {
        if (element === header || element.classList.contains('row_460')) return false
        const text = element.textContent?.replace(/\s+/g, ' ').trim() || ''
        return /\bDate\b/i.test(text) && /\bPosition\b/i.test(text)
    })
    if (columnsHeader) columnsHeader.classList.add('realtools-results-columns-header')

    const rows = [...block.children].filter((row) => row.classList.contains('row_460'))
    for (const [index, row] of rows.entries()) {
        row.classList.remove('odd')
        row.classList.add('realtools-result-row')
        if (index % 2 === 1) row.classList.add('realtools-result-row-alt')
        row.hidden = index >= COLLAPSED_RESULTS_LIMIT
    }
    block.classList.toggle('realtools-results-card-empty', rows.length === 0)
    if (rows.length === 0) {
        const emptyMessage = [...block.children].find((element) => {
            if (element === header || element === columnsHeader) return false
            return /hasn't participated in competitions yet/i.test(element.textContent || '')
        })
        if (emptyMessage) {
            const message = emptyMessage.textContent.replace(/\s+/g, ' ').trim()
            emptyMessage.className = 'realtools-results-empty-message'
            const icon = makeStatsSectionIcon(doc, 'horseshoe', 'realtools-results-empty-icon')
            const label = doc.createElement('span')
            label.textContent = message
            emptyMessage.replaceChildren(icon, label)
        }
    }

    if (rows.length > COLLAPSED_RESULTS_LIMIT) {
        const footer = doc.createElement('div')
        footer.className = 'realtools-results-footer'
        const button = doc.createElement('button')
        button.type = 'button'
        button.className = 'realtools-results-toggle'
        button.dataset.collapsedLabel = title === 'Competitions' ? 'View all competitions' : 'View all shows'
        button.dataset.expandedLabel = title === 'Competitions' ? 'Show fewer competitions' : 'Show fewer shows'
        const label = doc.createElement('span')
        label.textContent = button.dataset.collapsedLabel
        button.append(label, makeStatsChevron(doc))
        button.setAttribute('aria-expanded', 'false')
        button.setAttribute('aria-label', 'Show all results')
        footer.appendChild(button)
        block.appendChild(footer)
    }
}

function splitAchievementsBox(doc, achievementsBox) {
    if (!achievementsBox) return null

    const categories = [
        {
            className: 'realtools-ribbons-card',
            entryClassName: 'realtools-ribbon-entry',
            pattern: /day champion|[123](?:st|nd|rd) premium/i,
            title: 'Ribbons',
        },
        {
            className: 'realtools-trophies-card',
            entryClassName: 'realtools-trophy-entry',
            pattern: /[123](?:st|nd|rd) prize/i,
            title: 'Trophies',
        },
    ]

    const allCategoryPattern = /day champion|[123](?:st|nd|rd) premium|[123](?:st|nd|rd) prize/i
    const wrapper = doc.createElement('div')
    wrapper.className = 'realtools-achievements-cards'
    let foundEntries = 0

    const findEntry = (label) => {
        let entry = label
        while (entry.parentElement && entry.parentElement !== achievementsBox) {
            if (entry.querySelector('img')) break
            entry = entry.parentElement
        }

        if (entry === achievementsBox || !entry.querySelector('img')) return null

        while (
            entry.parentElement
            && entry.parentElement !== achievementsBox
            && entry.parentElement.querySelectorAll('img').length === 1
            && !allCategoryPattern.test(entry.parentElement.textContent.replace(/\s+/g, ' ').trim())
        ) {
            entry = entry.parentElement
        }
        return entry
    }

    for (const category of categories) {
        const card = doc.createElement('section')
        card.className = `realtools-achievements-card ${category.className}`

        const header = doc.createElement('div')
        header.className = 'realtools-achievements-card-header'
        const heading = doc.createElement('span')
        heading.className = 'realtools-achievements-card-title'
        const headingText = doc.createElement('span')
        headingText.textContent = category.title
        heading.appendChild(headingText)
        header.appendChild(heading)

        const entries = doc.createElement('div')
        entries.className = 'realtools-achievements-card-entries'

        const labels = [...achievementsBox.querySelectorAll('*')].filter((element) => {
            const ownText = [...element.childNodes]
                .filter((node) => node.nodeType === 3)
                .map((node) => node.textContent)
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim()
            return category.pattern.test(ownText)
        })

        const entryElements = [...new Set(labels.map(findEntry).filter(Boolean))]
        for (const entry of entryElements) {
            entry.classList.add('realtools-achievement-entry', category.entryClassName)
            entries.appendChild(entry)
            foundEntries += 1
        }

        card.append(header, entries)
        wrapper.appendChild(card)
    }

    return foundEntries ? wrapper : achievementsBox
}

function readGeneticPotential(doc, geneticsBlock) {
    const candidates = [
        geneticsBlock?.querySelector('.top .right'),
        geneticsBlock?.querySelector('.top'),
        ...doc.querySelectorAll('.genetics .right'),
    ]

    for (const candidate of candidates) {
        const match = candidate?.textContent?.match(/GP\s*total\s*:\s*([\d.,]+)/i)
        if (match) return match[1].replace(',', '.').trim()
    }
    return ''
}

function extractStatsOverviewRows(source, valuePattern = null) {
    if (!source) return []

    const rows = []
    const seen = new Set()
    const addRow = (label, valueHtml, valueText) => {
        const normalizedLabel = label.replace(/\s+/g, ' ').trim()
        const normalizedValue = valueText.replace(/\s+/g, ' ').trim()
        if (!normalizedLabel || !normalizedValue) return
        const key = `${normalizedLabel.toLowerCase()}\u0000${normalizedValue.toLowerCase()}`
        if (seen.has(key)) return
        seen.add(key)
        rows.push({label: normalizedLabel, valueHtml, valueText: normalizedValue})
    }

    for (const labelElement of source.querySelectorAll('.genetic_potential')) {
        const valueElement = labelElement.nextElementSibling
        if (!valueElement?.classList.contains('genetic_stats')) continue
        addRow(labelElement.textContent, valueElement.innerHTML, valueElement.textContent)
    }

    if (rows.length || !valuePattern) return rows

    const elements = [...source.querySelectorAll('*')]
    for (const valueElement of elements) {
        const valueText = valueElement.textContent?.replace(/\s+/g, ' ').trim() || ''
        if (!valuePattern.test(valueText)) continue

        let labelElement = valueElement.previousElementSibling
        if (!labelElement && valueElement.parentElement?.children.length === 2) {
            labelElement = valueElement.parentElement.children[0]
        }
        if (!labelElement || labelElement === valueElement) continue

        const labelText = labelElement.textContent?.replace(/\s+/g, ' ').trim() || ''
        if (!labelText || valuePattern.test(labelText) || labelText.length > 40) continue
        addRow(labelText, valueElement.innerHTML, valueText)
    }

    return rows
}

function createStatsOverviewCard(doc, {
    title,
    source,
    summaryHtml = '',
    className = '',
    notePattern = null,
    rows = null,
    icon = '',
    maximum = null,
}) {
    if (!source) return null

    const card = doc.createElement('section')
    card.className = `realtools-overview-card ${className}`.trim()

    const header = doc.createElement('div')
    header.className = 'realtools-overview-card-header'

    const heading = doc.createElement('span')
    heading.className = 'realtools-overview-card-title'
    if (icon) heading.appendChild(makeStatsSectionIcon(doc, icon))
    const headingText = doc.createElement('span')
    headingText.textContent = title
    heading.appendChild(headingText)

    const info = doc.createElement('span')
    info.className = 'realtools-overview-card-info'
    info.textContent = 'i'
    info.title = `${title} details`
    heading.appendChild(info)
    header.appendChild(heading)

    if (summaryHtml) {
        const summary = doc.createElement('span')
        summary.className = 'realtools-overview-card-summary'
        summary.innerHTML = summaryHtml
        header.appendChild(summary)
    }

    const body = doc.createElement('div')
    body.className = 'realtools-overview-card-body'
    const overviewRows = rows || extractStatsOverviewRows(source)
    for (const overviewRow of overviewRows) {
        const row = doc.createElement('div')
        row.className = 'realtools-overview-row'

        const rowLabel = doc.createElement('span')
        rowLabel.className = 'realtools-overview-label'
        rowLabel.textContent = overviewRow.label

        const rowValue = doc.createElement('strong')
        rowValue.className = 'realtools-overview-value'
        rowValue.innerHTML = overviewRow.valueHtml

        if (className.includes('realtools-conformation-card')) {
            addStatsQualityClass(rowValue, overviewRow.valueText || rowValue.textContent)
        }

        row.append(rowLabel, rowValue)
        if (maximum != null) {
            row.classList.add('realtools-progress-row')
            const rowMaximum = typeof maximum === 'function'
                ? maximum(overviewRow)
                : maximum
            row.appendChild(createStatsProgressBar(
                doc,
                overviewRow.valueText || rowValue.textContent,
                rowMaximum
            ))
        }
        body.appendChild(row)
    }

    card.append(header, body)

    if (notePattern) {
        const noteElement = [...source.querySelectorAll('p, div')]
            .filter((element) =>
                notePattern.test(element.textContent?.replace(/\s+/g, ' ').trim() || '')
            )
            .sort((first, second) =>
                (first.textContent?.length || 0) - (second.textContent?.length || 0)
            )[0]
        if (noteElement) {
            const note = doc.createElement('p')
            note.className = 'realtools-overview-note'
            note.textContent = noteElement.textContent.replace(/\s+/g, ' ').trim()
            card.appendChild(note)
        }
    }

    return card
}

function refreshDisciplineGpCard() {
    const card = document.querySelector('#tab_achievements2 .realtools-discipline-gp-card')
    const body = card?.querySelector('.realtools-overview-card-body')
    if (!body || !gpResults.length) return

    const disciplineKeys = [
        'dressage',
        'driving',
        'endurance',
        'eventing',
        'flat_racing',
        'show_jumping',
        'western_reining',
    ]
    body.replaceChildren()
    gpResults.forEach((discipline, index) => {
        const percentage = confScores[disciplineKeys[index]]?.percentage
        const row = document.createElement('div')
        row.className = 'realtools-overview-row'

        const label = document.createElement('span')
        label.className = 'realtools-overview-label'
        label.textContent = discipline.trait

        const value = document.createElement('strong')
        value.className = 'realtools-overview-value'
        value.textContent = percentage == null
            ? String(discipline.value)
            : `${discipline.value} — ${percentage}`

        row.classList.add('realtools-progress-row')
        row.append(
            label,
            value,
            createStatsProgressBar(document, discipline.value, DISCIPLINE_GP_MAXIMUMS[disciplineKeys[index]])
        )
        body.appendChild(row)
    })

    const tab = document.getElementById('tab_achievements2')
    if (tab?.querySelector('[data-realtools-stats-rendered]')) {
        renderedAchievementsHtml = tab.innerHTML
    }
}

async function loadRealtoolsStatsTab() {
    const tab = document.getElementById('tab_achievements2');
    if (!tab) return;
    watchAchievementsTab()
    
    // make sure there's no weird overlap
    if (tab == currentTab) tab.style.display = 'block'
    else tab.style.display = tab.style.display || 'none'

    const doc = await getTabContent('tab_achievements2');

    // load data itself
    const conformationBox = doc.querySelector('.conformation');
    const statsContent = conformationBox.parentElement
    const originalStatsBlocks = [...statsContent.children]
    const findStatsBlock = (title) => [...statsContent.children].find((block) =>
        block.children[0]?.textContent?.trim().toLowerCase().startsWith(title)
    )
    const findStatsSection = (title) => {
        const normalizedTitle = title.toLowerCase()
        const labels = [...doc.querySelectorAll('h1, h2, h3, h4, h5, h6, .top, .title, strong')]
        const label = labels.find((element) => {
            const text = element.textContent?.trim().toLowerCase() || ''
            return text === normalizedTitle || text.startsWith(`${normalizedTitle} `)
        })
        return label?.closest('.grid_3, .grid_4, .grid_6, .box, .block, section, article')
            || label?.parentElement
            || null
    }
    const achievementsBox = doc.querySelector('.achievements')
        || findStatsBlock('achievements')
    const healthDataBox = [...doc.querySelectorAll('.grid_3, .grid_4, .grid_6, .box, .block, section, article')]
        .filter((block) => {
            const text = block.textContent?.replace(/\s+/g, ' ').trim() || ''
            return /\bFertility\b/i.test(text) && /\bDigestion\b/i.test(text) && /\bTeeth\b/i.test(text)
        })
        .sort((first, second) =>
            (first.textContent?.length || 0) - (second.textContent?.length || 0)
        )[0]
    const healthBox = doc.querySelector('.health')
        || findStatsBlock('health')
        || findStatsSection('health')
        || healthDataBox
    const equipmentBox = doc.querySelector('.equipment')
        || findStatsBlock('equipment')
        || findStatsSection('equipment')
    equipmentBox?.classList.add('realtools-equipment-card')
    const conformationTable = conformationBox.children[1];
    Object.keys(confTraits).forEach((key) => delete confTraits[key])
    Object.keys(qualityStats).forEach((key) => delete qualityStats[key])
    for (const key of Object.keys(qualityResults)) qualityResults[key] = 0
    Object.assign(confTraits, parseTableColumn(conformationTable.children[0]));
    Object.assign(confTraits, parseTableColumn(conformationTable.children[1]));

    // VG/G+/... counter
    Object.keys(confTraits).forEach((traitName) => {
        const value = confTraits[traitName];
        if (typeof adviceSentences[traitName] == 'undefined') {
            qualityResults[value.toLowerCase().replace(' ', '_')] += 1;
        } else {
            let matchedAdvice = false
            for (const sentenceItem of adviceSentences[traitName]) {
                const match = conformationParagraphs.match(sentenceItem.sentence);
                if (match) {
                    matchedAdvice = true
                    if (value == 'Good' && sentenceItem.bracket == 'excellent') {
                        qualityResults.good_plus += 1;
                        qualityStats[traitName.toLowerCase()] = 'good_plus';
                    } else {
                        qualityResults[value.toLowerCase().replace(' ', '_')] += 1;
                        qualityStats[traitName.toLowerCase()] = value.toLowerCase().replace(' ', '_');//.replace('good+', 'good_plus');
                    }
                    break
                }
            }
            // Advice wording varies between horses and site versions. When it
            // does not match a known sentence, the visible table remains the
            // authoritative rating and must still be included in the summary.
            if (!matchedAdvice) {
                const qualityKey = value.toLowerCase().replaceAll(' ', '_')
                if (typeof qualityResults[qualityKey] === 'number') {
                    qualityResults[qualityKey] += 1
                    qualityStats[traitName.toLowerCase()] = qualityKey
                }
            }
        }
    });
    // Poor has no hidden sub-grades. Reconcile it directly with the visible
    // Conformation table so stale state or unfamiliar advice text can never
    // remove it from the total.
    qualityResults.poor = Object.values(confTraits).filter(
        (value) => value.trim().toLowerCase() === 'poor'
    ).length
    // patch neck/shoulders according to the majority of spreadsheet calculators
    if (qualityStats.neck == 'good' && ['very_good', 'good', 'good_plus'].indexOf(qualityStats.shoulders) != -1 && conformationParagraphs.match(adviceSentences.neck[0].sentence)) {
        qualityResults[qualityStats.neck] -= 1;
        qualityStats.neck = 'good_plus';
        qualityResults.good_plus += 1;
    }
    if (qualityStats.shoulders == 'good' && ['very_good', 'good', 'good_plus'].indexOf(qualityStats.neck) != -1 && conformationParagraphs.match(adviceSentences.shoulders[0].sentence)) {
        qualityResults[qualityStats.shoulders] -= 1;
        qualityStats.shoulders = 'good_plus';
        qualityResults.good_plus += 1;
    }

    // compensate for very good plus: neck
    if (qualityStats.neck == 'very_good' && qualityStats.shoulders == 'good') {
    } else {
        qualityStats.neck = 'very_good_minus'
    }
    if (qualityStats.neck == 'very_good' && qualityStats.shoulders == 'average') {
        qualityStats.neck = 'very_good_plus'
    } else {
        qualityStats.neck = 'very_good'
    }
    // compensate for very good plus: shoulders
    if (qualityStats.shoulders == 'very_good' && qualityStats.neck == 'good') {
    } else {
        qualityStats.shoulders = 'very_good_minus'
    }
    if (qualityStats.shoulders == 'very_good' && qualityStats.neck == 'average') {
        qualityStats.shoulders = 'very_good_plus'
    } else {
        qualityStats.shoulders = 'very_good'
    }

    Object.keys(qualityStats).forEach((traitNameLower) => {
        const value = qualityStats[traitNameLower];
        if (value == 'good_plus') {
            const traitNameUpper = traitNameLower.charAt(0).toUpperCase() + traitNameLower.slice(1);
            replaceInColumn(conformationTable.children[0], traitNameUpper, 'Good<span class="realtools-noselect">+</span>');
            replaceInColumn(conformationTable.children[1], traitNameUpper, 'Good<span class="realtools-noselect">+</span>');
        }
    })

    function createConformationRow(key, value) {
        const row = doc.createElement('div')
        row.className = 'realtools-conformation-row'
        row.append(key, value)
        return row
    }

    function groupConformationColumn(column) {
        const children = Array.from(column.children)
        const rows = []
        for (let index = 0; index + 1 < children.length; index += 2) {
            rows.push(createConformationRow(children[index], children[index + 1]))
        }
        column.replaceChildren(...rows)
        column.classList.add('realtools-conformation-column')
        column.style.width = '50%'
    }

    groupConformationColumn(conformationTable.children[0])
    groupConformationColumn(conformationTable.children[1])

    let conformationSummary = '';
    const veryGoodTotal = qualityResults.very_good_minus + qualityResults.very_good + qualityResults.very_good_plus
    if (veryGoodTotal) conformationSummary += `<span style="color:#16865B">${veryGoodTotal}VG</span> `;
    if (qualityResults.good_plus) conformationSummary += `<span style="color:#5D8F00">${qualityResults.good_plus}G+</span> `;
    if (qualityResults.good) conformationSummary += `<span style="color:#9C8B12">${qualityResults.good}G</span> `;
    if (qualityResults.average) conformationSummary += `<span style="color:#D79200">${qualityResults.average}A</span> `;
    if (qualityResults.below_average) conformationSummary += `<span style="color:#CF4A13">${qualityResults.below_average}BA</span> `;
    if (qualityResults.poor) conformationSummary += `<span style="color:#AD2821">${qualityResults.poor}P</span>`;

    conformationBox.children[0].innerHTML = `Conformation - ${conformationSummary}`

    const gpSource = geneticsTabDoc?.getElementsByClassName('grid_6 genetics')?.[1]
    const gpTotal = readGeneticPotential(geneticsTabDoc, gpSource)

    const healthLabels = {
        excellent: ['E', '#218C5B'],
        'very good': ['VG', '#16865B'],
        good: ['G', '#5D8F00'],
        average: ['A', '#D79200'],
        fair: ['F', '#CF4A13'],
        'below average': ['BA', '#CF4A13'],
        poor: ['P', '#AD2821'],
        strong: ['S', '#16865B'],
        moderate: ['M', '#D79200'],
        weak: ['W', '#CF4A13'],
        deficient: ['D', '#AD2821'],
    }
    const healthRawText = healthBox?.textContent?.replace(/\s+/g, ' ').trim() || ''
    const healthRatings = healthRawText.match(
        /below average|very good|excellent|deficient|moderate|strong|average|fair|good|weak|poor/gi
    ) || []
    const primaryHealthTraits = [
        'Fertility',
        'Digestion',
        'Hoof quality',
        'Bones and Muscles',
        'Respiratory system',
        'Teeth',
    ]
    const alternateHealthTraits = [
        'Fertility',
        'Colic resistance',
        'Hoof quality',
        'Back problems',
        'Respiratory disease',
        'Resistance to lameness',
    ]
    const allHealthTraits = [...new Set([...primaryHealthTraits, ...alternateHealthTraits])]
    const healthRatingPattern = 'Below average|Very good|Excellent|Deficient|Moderate|Strong|Average|Fair|Good|Weak|Poor'
    const explicitHealthRows = allHealthTraits
        .map((traitName) => {
            const escapedName = traitName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const match = healthRawText.match(new RegExp(`${escapedName}\\s*:?\\s*(${healthRatingPattern})`, 'i'))
            return match
                ? {label: traitName, value: match[1], index: match.index}
                : null
        })
        .filter(Boolean)
        .sort((first, second) => first.index - second.index)
    const healthRowsForDisplay = explicitHealthRows.length >= 5
        ? explicitHealthRows
        : primaryHealthTraits.slice(0, healthRatings.length).map((label, index) => ({
            label,
            value: healthRatings[index],
        }))
    const healthCounts = healthRowsForDisplay.reduce((counts, row) => {
        const key = row.value.toLowerCase()
        if (healthLabels[key]) counts[key] = (counts[key] || 0) + 1
        return counts
    }, {})
    const healthSummary = Object.entries(healthLabels)
        .filter(([key]) => healthCounts[key])
        .map(([key, [short, colour]]) => `<span style="color:${colour}">${healthCounts[key]}${short}</span>`)
        .join(' ')

    const overviewGrid = doc.createElement('div')
    overviewGrid.className = 'realtools-stats-overview-grid'

    const conformationCard = createStatsOverviewCard(doc, {
        title: 'Conformation',
        source: conformationBox,
        className: 'realtools-conformation-card',
    })
    conformationCard?.querySelector('.realtools-overview-card-info')?.remove()
    const gpCard = createStatsOverviewCard(doc, {
        title: 'Genetic Potential',
        source: gpSource,
        className: 'realtools-gp-card',
        maximum: 100,
    })
    gpCard?.querySelector('.realtools-overview-card-info')?.remove()
    const disciplineKeys = [
        'dressage',
        'driving',
        'endurance',
        'eventing',
        'flat_racing',
        'show_jumping',
        'western_reining',
    ]
    const disciplineGpRows = gpResults.map((discipline, index) => {
        const percentage = confScores[disciplineKeys[index]]?.percentage
        return {
            label: discipline.trait,
            valueHtml: percentage == null ? String(discipline.value) : `${discipline.value} | ${percentage}`,
            valueText: String(discipline.value),
            maximum: DISCIPLINE_GP_MAXIMUMS[disciplineKeys[index]],
        }
    })
    const disciplineGpCard = createStatsOverviewCard(doc, {
        title: 'Discipline GP',
        source: gpSource || conformationBox,
        className: 'realtools-discipline-gp-card',
        rows: disciplineGpRows,
        maximum: (row) => row.maximum,
    })
    disciplineGpCard?.querySelector('.realtools-overview-card-info')?.remove()
    let healthCard = null
    if (healthBox) {
        healthCard = healthBox
        healthCard.classList.add(
            'realtools-overview-card',
            'realtools-health-card',
            'realtools-health-vanilla-card'
        )
        healthCard.style.removeProperty('float')
        healthCard.style.removeProperty('margin')
        healthCard.style.removeProperty('width')

        const healthHeaderShell = createStatsOverviewCard(doc, {
            title: 'Health',
            source: healthBox,
            rows: [],
        })
        const newHealthHeader = healthHeaderShell.querySelector('.realtools-overview-card-header')
        newHealthHeader?.querySelector('.realtools-overview-card-info')?.remove()
        if (healthRowsForDisplay.length) {
            const healthBody = doc.createElement('div')
            healthBody.className = 'realtools-health-body'

            healthRowsForDisplay.forEach((healthRow, index) => {
                const row = doc.createElement('div')
                row.className = 'realtools-health-row'
                if (index === 0) row.classList.add('realtools-health-fertility-row')

                const label = doc.createElement('span')
                label.className = 'realtools-health-label'
                label.textContent = healthRow.label

                const value = doc.createElement('strong')
                value.className = 'realtools-health-value'
                value.textContent = healthRow.value
                addStatsQualityClass(value, healthRow.value)

                row.append(makeStatsSectionIcon(doc, 'healthRow', 'realtools-health-row-icon'), label, value)
                healthBody.appendChild(row)
            })

            healthCard.replaceChildren(newHealthHeader, healthBody)
        } else {
            const oldHealthHeader = [...healthCard.children].find((element) =>
                /^health\b/i.test(element.textContent?.replace(/\s+/g, ' ').trim() || '')
            ) || healthCard.querySelector('.top')

            if (oldHealthHeader) oldHealthHeader.replaceWith(newHealthHeader)
            else healthCard.prepend(newHealthHeader)
        }
    }
    for (const card of [conformationCard, gpCard, disciplineGpCard]) {
        if (card) overviewGrid.appendChild(card)
    }
    conformationBox.remove()

    // min & max show values
    const scoresBlock = doc.querySelector('.grid_6.half_block');
    if (scoresBlock.children.length < 4) {
        lowestScore = '';
        highestScore = '';
    } else {
        for (const row of scoresBlock.children) {
            if (row.classList.contains('row_460')) {
                let value = row.children[2].innerText;  // col_90, has image and value
                value = Number(value);
                if (!lowestScore) lowestScore = value;
                if (!highestScore) highestScore = value;

                if (value < lowestScore) lowestScore = value;
                else if (value > highestScore) highestScore = value;
            }
        }
    }

    // min & max competition values
    const resultsBlock = doc.getElementsByClassName('half_block')[1];
    if (resultsBlock.children.length < 4) {
        lowestResult = '';
        highestResult = '';
    } else {
        for (const row of resultsBlock.children) {
            if (row.classList.contains('row_460')) {
                let value = row.children[2].innerText;  // col_90, has image and value
                value = Number(value);
                if (!lowestResult) lowestResult = value;
                if (!highestResult) highestResult = value;

                if (value < lowestResult) lowestResult = value;
                else if (value > highestResult) highestResult = value;
            }
        }
    }

    styleStatsResultsBlock(doc, scoresBlock, 'Conformation Shows', highestScore, lowestScore)
    styleStatsResultsBlock(doc, resultsBlock, 'Competitions', highestResult, lowestResult)

    const statsContainer = doc.createElement('div')
    statsContainer.className = 'realtools-stats-subtabs'

    const statsHeading = doc.createElement('div')
    statsHeading.className = 'realtools-stats-heading'

    const titleGroup = doc.createElement('div')
    titleGroup.className = 'realtools-stats-title-group'
    const statsTitle = doc.createElement('h2')
    statsTitle.className = 'realtools-stats-title'
    statsTitle.textContent = 'Statistics'
    titleGroup.appendChild(statsTitle)
    if (conformationSummary) {
        const summary = doc.createElement('span')
        summary.className = 'realtools-stats-conformation-summary'
        summary.innerHTML = conformationSummary
        titleGroup.appendChild(summary)
    }

    const gpTotalCard = doc.createElement('div')
    gpTotalCard.className = 'realtools-stats-gp-total'
    const gpTotalLabel = doc.createElement('span')
    gpTotalLabel.textContent = 'GP total'
    const gpTotalValue = doc.createElement('strong')
    gpTotalValue.textContent = gpTotal || '—'
    gpTotalCard.append(gpTotalLabel, gpTotalValue)
    statsHeading.append(titleGroup, gpTotalCard)

    const statsNavigation = doc.createElement('div')
    statsNavigation.className = 'realtools-stats-subtabs-navigation'
    statsNavigation.setAttribute('role', 'tablist')

    const conformationButton = doc.createElement('button')
    conformationButton.type = 'button'
    conformationButton.className = 'realtools-stats-subtab active'
    conformationButton.dataset.panel = 'conformation'
    conformationButton.textContent = 'Overview'
    conformationButton.setAttribute('role', 'tab')
    conformationButton.setAttribute('aria-selected', 'true')

    const achievementsButton = doc.createElement('button')
    achievementsButton.type = 'button'
    achievementsButton.className = 'realtools-stats-subtab'
    achievementsButton.dataset.panel = 'achievements'
    achievementsButton.textContent = 'Achievements'
    achievementsButton.setAttribute('role', 'tab')
    achievementsButton.setAttribute('aria-selected', 'false')

    statsNavigation.append(conformationButton, achievementsButton)

    const conformationPanel = doc.createElement('div')
    conformationPanel.className = 'realtools-stats-panel realtools-stats-conformation-panel'
    conformationPanel.dataset.panel = 'conformation'
    conformationPanel.appendChild(overviewGrid)
    const bottomGrid = doc.createElement('div')
    bottomGrid.className = 'realtools-stats-bottom-grid'
    if (healthCard) bottomGrid.appendChild(healthCard)
    if (equipmentBox) bottomGrid.appendChild(equipmentBox)
    if (bottomGrid.children.length) conformationPanel.appendChild(bottomGrid)
    for (const block of originalStatsBlocks) {
        if ([conformationBox, healthBox, equipmentBox, achievementsBox, scoresBlock, resultsBlock].includes(block)) continue
        if (block.parentElement === statsContent) conformationPanel.appendChild(block)
    }

    const achievementsPanel = doc.createElement('div')
    achievementsPanel.className = 'realtools-stats-panel realtools-stats-achievements-panel'
    achievementsPanel.dataset.panel = 'achievements'
    achievementsPanel.hidden = true
    const achievementsCards = splitAchievementsBox(doc, achievementsBox)
    if (scoresBlock) achievementsPanel.appendChild(scoresBlock)
    if (resultsBlock) achievementsPanel.appendChild(resultsBlock)
    if (achievementsCards) achievementsPanel.appendChild(achievementsCards)
    if (achievementsCards !== achievementsBox) achievementsBox?.remove()

    statsContainer.append(statsHeading, statsNavigation, conformationPanel, achievementsPanel)
    statsContent.prepend(statsContainer)

    statsContainer.dataset.realtoolsStatsRendered = 'true'
    renderedAchievementsHtml = doc.children[0].innerHTML
    restoreRenderedAchievements();
}

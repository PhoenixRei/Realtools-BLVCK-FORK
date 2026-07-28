// Stats tab only: subtabs, overview cards, Health, Equipment, and Achievements.
const COLLAPSED_RESULTS_LIMIT = 7

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
            button.replaceChildren(makeStatsChevron(button.ownerDocument, nextExpanded ? 'up' : 'down'))
            button.setAttribute('aria-label', nextExpanded ? 'Show fewer results' : 'Show all results')
        }
    }
}

function styleStatsResultsBlock(doc, block, title, best, worst) {
    if (!block) return

    block.classList.add('realtools-results-card')
    const header = block.children[0]
    if (header) {
        header.className = 'realtools-results-header'
        header.replaceChildren()

        const heading = doc.createElement('span')
        heading.className = 'realtools-results-title'
        heading.textContent = title

        const badges = doc.createElement('span')
        badges.className = 'realtools-results-badges'

        const addBadge = (label, value) => {
            if (value === '') return
            const badge = doc.createElement('span')
            badge.className = 'realtools-results-badge'
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
            emptyMessage.replaceChildren(message)
        }
    }

    if (rows.length > COLLAPSED_RESULTS_LIMIT) {
        const footer = doc.createElement('div')
        footer.className = 'realtools-results-footer'
        const button = doc.createElement('button')
        button.type = 'button'
        button.className = 'realtools-results-toggle'
        button.appendChild(makeStatsChevron(doc))
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
        heading.textContent = category.title
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
}) {
    if (!source) return null

    const card = doc.createElement('section')
    card.className = `realtools-overview-card ${className}`.trim()

    const header = doc.createElement('div')
    header.className = 'realtools-overview-card-header'

    const heading = doc.createElement('span')
    heading.className = 'realtools-overview-card-title'
    heading.textContent = title

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

        row.append(rowLabel, rowValue)
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
            : `${discipline.value} | ${percentage}`

        row.append(label, value)
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
    if (veryGoodTotal) conformationSummary += `<span style="color:#218C5B">${veryGoodTotal}VG</span> `;
    if (qualityResults.good_plus) conformationSummary += `<span style="color:#5B8F2F">${qualityResults.good_plus}G+</span> `;
    if (qualityResults.good) conformationSummary += `<span style="color:#85770F">${qualityResults.good}G</span> `;
    if (qualityResults.average) conformationSummary += `<span style="color:#B57900">${qualityResults.average}A</span> `;
    if (qualityResults.below_average) conformationSummary += `<span style="color:#C45F2E">${qualityResults.below_average}BA</span> `;
    if (qualityResults.poor) conformationSummary += `<span style="color:#C43C35">${qualityResults.poor}P</span>`;

    conformationBox.children[0].innerHTML = `Conformation - ${conformationSummary}`

    const gpSource = geneticsTabDoc?.getElementsByClassName('grid_6 genetics')?.[1]
    const gpTotal = readGeneticPotential(geneticsTabDoc, gpSource)

    const healthLabels = {
        excellent: ['E', '#218C5B'],
        'very good': ['VG', '#218C5B'],
        good: ['G', '#5B8F2F'],
        average: ['A', '#B57900'],
        fair: ['F', '#C45F2E'],
        'below average': ['BA', '#C45F2E'],
        poor: ['P', '#C43C35'],
        strong: ['S', '#397C35'],
        moderate: ['M', '#B57900'],
        weak: ['W', '#C45F2E'],
        deficient: ['D', '#C43C35'],
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
        summaryHtml: conformationSummary,
        className: 'realtools-conformation-card',
    })
    conformationCard?.querySelector('.realtools-overview-card-info')?.remove()
    const gpCard = createStatsOverviewCard(doc, {
        title: 'Genetic Potential',
        source: gpSource,
        summaryHtml: gpTotal ? `GP total: <strong>${gpTotal}</strong>` : '',
        className: 'realtools-gp-card',
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
            valueHtml: percentage == null ? String(discipline.value) : `${discipline.value} (${percentage}%)`,
        }
    })
    const disciplineGpCard = createStatsOverviewCard(doc, {
        title: 'Discipline GP',
        source: gpSource || conformationBox,
        className: 'realtools-discipline-gp-card',
        rows: disciplineGpRows,
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
            summaryHtml: healthSummary,
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

                row.append(label, value)
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

    const statsNavigation = doc.createElement('div')
    statsNavigation.className = 'realtools-stats-subtabs-navigation'
    statsNavigation.setAttribute('role', 'tablist')

    const conformationButton = doc.createElement('button')
    conformationButton.type = 'button'
    conformationButton.className = 'realtools-stats-subtab active'
    conformationButton.dataset.panel = 'conformation'
    conformationButton.textContent = 'Statistics'
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

    statsContainer.append(statsNavigation, conformationPanel, achievementsPanel)
    statsContent.prepend(statsContainer)

    statsContainer.dataset.realtoolsStatsRendered = 'true'
    renderedAchievementsHtml = doc.children[0].innerHTML
    restoreRenderedAchievements();
}

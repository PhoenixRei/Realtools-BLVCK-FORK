// Modern shadow-DOM profile cards: Pregnancy, Passport, Notes, and Pedigree.
let realtoolsInfoUiTweaksEnabled = false

function realtoolsPassportText(value = '') {
    const decoder = document.createElement('textarea')
    decoder.innerHTML = value.replace(/\*\*/g, '')
    return decoder.value
}

function realtoolsPassportValue(value = '') {
    const output = document.createDocumentFragment()
    const decoded = realtoolsPassportText(value)
    const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
    let cursor = 0
    let match

    while ((match = linkPattern.exec(decoded))) {
        output.append(document.createTextNode(decoded.slice(cursor, match.index)))
        const link = document.createElement('a')
        link.href = match[2]
        link.textContent = match[1]
        output.append(link)
        cursor = match.index + match[0].length
    }
    output.append(document.createTextNode(decoded.slice(cursor)))
    return output
}

function renderModernPassport() {
    if (!realtoolsInfoUiTweaksEnabled) return

    const horseHost = document.querySelector('horsereality-horse')
    const horseRoot = horseHost?.shadowRoot
    const originalPassport = horseRoot?.querySelector('hr-page-section#passport-section')
    if (!horseRoot || !originalPassport || horseRoot.querySelector('#realtools-passport-layout')) return

    let shadowStyle = horseRoot.querySelector('#realtools-passport-shadow-style')
    if (!shadowStyle) {
        shadowStyle = document.createElement('style')
        shadowStyle.id = 'realtools-passport-shadow-style'
        shadowStyle.textContent = `
            #realtools-passport-layout {
                align-items: start;
                display: grid;
                gap: 15px;
                grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
                margin: 0;
                width: 100%;
            }
            #realtools-passport-layout.rt-both-collapsed {
                align-items: stretch;
            }
            #realtools-passport-layout.rt-both-collapsed > .rt-passport-card.rt-collapsed {
                align-self: stretch;
            }
            #realtools-passport-layout .rt-passport-card {
                background: #F6F7F9;
                border-radius: 9px;
                box-shadow: 0 2px 8px rgba(37, 65, 78, .08);
                color: #3f4548;
                display: flex;
                flex-direction: column;
                min-width: 0;
                overflow: hidden;
                align-self: start;
            }
            #realtools-passport-layout .rt-passport-body {
                box-sizing: border-box;
                flex: 1;
                padding: 20px 19px 0;
            }
            #realtools-passport-layout .rt-passport-heading {
                align-items: center;
                display: flex;
                font-size: 20px;
                font-weight: 700;
                justify-content: space-between;
                margin: 10px 0 23px;
            }
            #realtools-passport-layout .rt-passport-row {
                align-items: center;
                display: grid;
                column-gap: 10px;
                grid-template-columns: 18px 112px minmax(0, 1fr);
                min-height: 41px;
            }
            #realtools-passport-layout .rt-passport-icon {
                color: #657279;
                display: block;
                height: 18px;
                width: 18px;
            }
            #realtools-passport-layout .rt-passport-svg {
                display: inline-block;
                fill: none;
                height: 18px;
                stroke: currentColor;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1.8;
                vertical-align: -3px;
                width: 18px;
            }
            #realtools-passport-layout .rt-passport-label {
                color: #616a6e;
                font-size: 16px;
            }
            #realtools-passport-layout .rt-passport-value {
                color: #3F4548;
                font-size: 15px;
                font-weight: 700;
                line-height: 1.25;
                min-width: 0;
                overflow-wrap: break-word;
                text-align: right;
            }
            #realtools-passport-layout .rt-passport-sex-icon {
                color: #3b9bc7;
                margin-right: 6px;
            }
            #realtools-passport-layout .rt-passport-sex-icon.rt-passport-sex-female {
                color: #ee6fa1;
            }
            #realtools-passport-layout .rt-passport-value a {
                color: #4e7890;
                font-weight: 600;
                text-decoration: none;
            }
            #realtools-passport-layout .rt-passport-value.rt-passport-accent {
                color: #4e7890;
            }
            #realtools-passport-layout .rt-passport-divider {
                border-top: 1px solid #d8e2e6;
                margin: 8px 0;
            }
            #realtools-passport-layout .rt-passport-notes {
                color: #3F4548;
                font-size: 13px;
                line-height: 1.4;
                min-height: 85px;
                overflow-wrap: anywhere;
                white-space: pre-wrap;
            }
            #realtools-passport-layout .rt-notes-tabs {
                display: flex;
                gap: 6px;
                margin: -10px 0 12px;
            }
            #realtools-passport-layout .rt-notes-tab {
                background: #EAF0F2;
                border: 0;
                border-radius: 7px 7px 0px 0px;
                color: #40525b;
                cursor: pointer;
                font-family: inherit;
                font-size: 12px;
                font-weight: 600;
                line-height: 1.2;
                padding: 7px 12px;
            }
            #realtools-passport-layout .rt-notes-tab:hover {
                background: #C3D4E3;
            }
            #realtools-passport-layout .rt-notes-tab.active {
                background: #407F9C;
                color: #fff;
            }
            #realtools-passport-layout .rt-notes-panel[hidden] {
                display: none !important;
            }
            #realtools-passport-layout .rt-passport-footer {
                align-items: center;
                background: #E4E8EC;
                border: 0;
                color: #3F4548;
                cursor: pointer;
                display: flex;
                height: 23px;
                justify-content: center;
                margin-top: 13px;
                padding: 0;
                width: 100%;
            }
            #realtools-passport-layout .rt-passport-card.rt-collapsed .rt-passport-details {
                display: none;
            }
            #realtools-passport-layout .rt-passport-notes-card.rt-collapsed .rt-passport-notes {
                display: block;
                min-height: 85px;
                max-height: 85px;
                overflow: auto;
            }
            #realtools-passport-layout .rt-passport-card.rt-collapsed .rt-passport-footer {
                margin-top: 0;
            }
            @media (max-width: 850px) {
                #realtools-passport-layout {
                    grid-template-columns: minmax(0, 1fr);
                }
            }
        `
        horseRoot.append(shadowStyle)
    }

    const tableValue = (label) => {
        const rows = Array.from(originalPassport.querySelectorAll('hr-table-row[slot="body"]'))
        const row = rows.find((candidate) =>
            candidate.querySelector('hr-table-cell')?.getAttribute('text')?.trim() === label
        )
        return row?.querySelectorAll('hr-table-cell')[1]?.getAttribute('text') || ''
    }
    const rootText = (selector) => horseRoot.querySelector(selector)?.textContent?.trim() || '—'
    const summaryValue = (label) => {
        const labels = Array.from(originalPassport.querySelectorAll('.summary-label'))
        const matchingLabel = labels.find((candidate) => candidate.textContent.trim() === label)
        return matchingLabel?.parentElement?.querySelector('.summary-item')?.textContent?.trim() || '—'
    }

    // The modern profile fills these table cells asynchronously. Building the
    // replacement from an early placeholder produced "undefined cm" and
    // "Invalid Date", so wait until the original Passport contains real data.
    const passportHeight = tableValue('Height')
    const passportBirthday = tableValue('Date of Birth')
    const passportLifeNumber = tableValue('Life number')
    const passportIsReady = passportHeight
        && passportBirthday
        && passportLifeNumber
        && !/undefined|null/i.test(passportHeight)
        && !/invalid date/i.test(passportBirthday)
    if (!passportIsReady) {
        window.setTimeout(renderModernPassport, 100)
        return
    }

    const layout = document.createElement('div')
    layout.id = 'realtools-passport-layout'

    const passportIconPaths = {
        user: '<circle cx="12" cy="8" r="3"></circle><path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6"></path>',
        breeder: '<circle cx="9" cy="7.5" r="2.8"></circle><path d="M3.5 18c.4-3.5 2.3-5.3 5.5-5.3s5.1 1.8 5.5 5.3"></path><circle cx="17" cy="10" r="2.2"></circle><path d="M15.5 14.5c3.2-.7 5 .8 5.5 3.5"></path>',
        horse: '<g transform="scale(0.024)" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path vector-effect="non-scaling-stroke" d="m 709.62047,209.17917 c 0,0 152.69197,183.58341 216.24007,308.91439 C 982.4562,629.71269 866.90317,699.04874 804.94262,663.72463 698.79644,603.21001 606.35481,536.62841 606.35481,536.62841 c 0,0 -130.62664,-70.60899 -60.90026,-225.9488"></path><path vector-effect="non-scaling-stroke" d="m 612.0918,560.45896 c 0,0 -8.38482,163.28331 100.17651,326.56663"></path><path vector-effect="non-scaling-stroke" d="m 710.06178,206.09002 c -1.70633,6.10959 28.87099,-124.665446 1.32392,-125.772279 -21.90596,-0.880175 -103.26566,90.909089 -103.26566,90.909089 0,0 -484.55428,-19.41747 -378.64078,718.4466"></path><path vector-effect="non-scaling-stroke" d="m 603.64425,162.24929 c 0,0 -610.8610436,-138.297759 -487.1394,730.95459 l 111.87948,-0.42696"></path></g>',
        calendar: '<rect x="3.5" y="5.5" width="17" height="15" rx="2"></rect><path d="M7.5 3.5v4M16.5 3.5v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"></path>',
        sex: '<circle cx="9" cy="14" r="4.5"></circle><path d="M12.2 10.8L19 4M14.5 4H19v4.5"></path>',
        sexMale: '<circle cx="9" cy="14" r="4.5"></circle><path d="M12.2 10.8L19 4M14.5 4H19v4.5"></path>',
        sexFemale: '<circle cx="12" cy="8.5" r="4.5"></circle><path d="M12 13v7M8.5 17h7"></path>',
        ruler: '<path d="M4 20V5l15 15H4Z"></path><path d="M7 16h3M7 12h1.5M7 8h1"></path>',
        predicate: '<path d="M12 3l2.3 1.5 2.8-.1.9 2.7 2.2 1.7-.9 2.7.9 2.7-2.2 1.7-.9 2.7-2.8-.1L12 21l-2.3-1.5-2.8.1-.9-2.7-2.2-1.7.9-2.7-.9-2.7L6 7.1l.9-2.7 2.8.1L12 3Z"></path><path d="m9.3 12 1.8 1.8 3.8-4"></path>',
        birthday: '<rect x="3.5" y="5.5" width="17" height="15" rx="2"></rect><path d="M7.5 3.5v4M16.5 3.5v4M3.5 10h17M12 13v5M9.5 15.5h5"></path>',
        location: '<path d="M19 10c0 5.5-7 11-7 11S5 15.5 5 10a7 7 0 1 1 14 0Z"></path><circle cx="12" cy="10" r="2.3"></circle>',
        id: '<rect x="3" y="6" width="18" height="12" rx="2"></rect><circle cx="8" cy="11" r="1.8"></circle><path d="M5.5 15c.4-1.7 1.2-2.5 2.5-2.5s2.1.8 2.5 2.5M13 10h5M13 14h4"></path>',
        up: '<path d="m7 14 5-5 5 5"></path>',
        down: '<path d="m7 10 5 5 5-5"></path>',
    }

    const makePassportIcon = (name, className = '') => {
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        icon.setAttribute('viewBox', '0 0 24 24')
        icon.setAttribute('aria-hidden', 'true')
        icon.setAttribute('class', `rt-passport-svg ${className}`.trim())
        icon.innerHTML = passportIconPaths[name] || ''
        return icon
    }

    const makeHeading = (title) => {
        const heading = document.createElement('div')
        heading.className = 'rt-passport-heading'
        const text = document.createElement('span')
        text.textContent = title
        heading.append(text)
        return heading
    }

    const makeRow = (iconName, label, value, valueNode = null, accent = false) => {
        const row = document.createElement('div')
        row.className = 'rt-passport-row'
        const icon = makePassportIcon(iconName, 'rt-passport-icon')
        const labelElement = document.createElement('span')
        labelElement.className = 'rt-passport-label'
        labelElement.textContent = label
        const valueElement = document.createElement('span')
        valueElement.className = 'rt-passport-value'
        if (accent) valueElement.classList.add('rt-passport-accent')
        valueElement.append(valueNode || realtoolsPassportValue(value || '—'))
        row.append(icon, labelElement, valueElement)
        return row
    }

    const divider = () => {
        const element = document.createElement('div')
        element.className = 'rt-passport-divider'
        return element
    }

    const leftCard = document.createElement('section')
    leftCard.className = 'rt-passport-card rt-collapsed'
    const leftBody = document.createElement('div')
    leftBody.className = 'rt-passport-body'
    const sexSource = horseRoot.querySelector('#sex')
    const sexText = sexSource?.textContent?.replace(/\s+/g, ' ').trim() || '—'
    const isFemale = /\b(?:mare|filly|female)\b/i.test(sexText)
    const sexValue = document.createDocumentFragment()
    sexValue.append(
        makePassportIcon(
            isFemale ? 'sexFemale' : 'sexMale',
            `rt-passport-sex-icon${isFemale ? ' rt-passport-sex-female' : ''}`
        ),
        document.createTextNode(sexText)
    )

    const leftSummary = document.createElement('div')
    leftSummary.className = 'rt-passport-summary'
    leftSummary.append(
        makeRow('user', 'Owner', tableValue('Owner')),
        makeRow('breeder', 'Breeder', tableValue('Breeder'))
    )
    const leftDetails = document.createElement('div')
    leftDetails.className = 'rt-passport-details'
    leftDetails.append(
        divider(),
        makeRow('horse', 'Breed', rootText('#breed'), null, true),
        makeRow('calendar', 'Age', rootText('#age')),
        makeRow('sex', 'Sex', '', sexValue),
        makeRow('ruler', 'Height', passportHeight),
        makeRow('predicate', 'Predicates', summaryValue('Predicates')),
        divider(),
        makeRow('birthday', 'Birthday', passportBirthday),
        makeRow('location', 'Location', tableValue('Location')),
        makeRow('id', 'Life number', passportLifeNumber)
    )
    leftBody.append(makeHeading('Passport'), leftSummary, leftDetails)

    const updateCollapsedCardAlignment = () => {
        const cards = Array.from(layout.children).filter((child) =>
            child.classList.contains('rt-passport-card')
        )
        const bothCollapsed = cards.length === 2
            && cards.every((card) => card.classList.contains('rt-collapsed'))
        layout.classList.toggle(
            'rt-both-collapsed',
            bothCollapsed
        )
        if (bothCollapsed && layout.isConnected) {
            const passportCard = cards.find((card) =>
                !card.classList.contains('rt-passport-notes-card')
            )
            const ownerNotesCard = cards.find((card) =>
                card.classList.contains('rt-passport-notes-card')
            )
            window.requestAnimationFrame(() => {
                const collapsedHeight = ownerNotesCard?.getBoundingClientRect().height || 0
                if (passportCard && collapsedHeight > 0) {
                    passportCard.style.minHeight = `${Math.ceil(collapsedHeight)}px`
                }
            })
        }
    }
    const makeCollapseButton = (card, name) => {
        const footer = document.createElement('button')
        footer.className = 'rt-passport-footer'
        footer.type = 'button'
        footer.title = `Expand ${name}`
        footer.setAttribute('aria-label', `Expand ${name}`)
        footer.setAttribute('aria-expanded', 'false')
        footer.append(makePassportIcon('down'))
        footer.addEventListener('click', () => {
            const isCollapsed = card.classList.toggle('rt-collapsed')
            footer.setAttribute('aria-expanded', String(!isCollapsed))
            footer.setAttribute('aria-label', `${isCollapsed ? 'Expand' : 'Collapse'} ${name}`)
            footer.title = `${isCollapsed ? 'Expand' : 'Collapse'} ${name}`
            footer.firstElementChild?.replaceWith(makePassportIcon(isCollapsed ? 'down' : 'up'))
            updateCollapsedCardAlignment()
        })
        return footer
    }
    const leftFooter = makeCollapseButton(leftCard, 'Passport')
    leftCard.append(leftBody, leftFooter)

    const notesCard = document.createElement('section')
    notesCard.className = 'rt-passport-card rt-passport-notes-card rt-collapsed'
    const notesBody = document.createElement('div')
    notesBody.className = 'rt-passport-body'
    const readNotes = (selector, footerId) => {
        const source = originalPassport.querySelector(selector) || horseRoot.querySelector(selector)
        if (!source) return ''
        return Array.from(source.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE || node.id !== footerId)
            .map((node) => node.textContent)
            .join('')
            .trim()
    }
    const publicNotesContent = readNotes('#public-notes, #public_notes', 'public-notes-footer')
    const isVisible = (element) => {
        if (!element || element.hidden || element.closest('[hidden]')) return false
        for (let current = element; current && current !== horseRoot; current = current.parentElement) {
            const style = window.getComputedStyle(current)
            if (style.display === 'none' || style.visibility === 'hidden') return false
        }
        return element.getClientRects().length > 0
    }
    const hasModernEditTab = Array.from(horseRoot.querySelectorAll('*')).some((element) =>
        element.textContent?.replace(/\s+/g, ' ').trim() === 'Edit'
        && isVisible(element)
    )
    const hasOwnerEditForm = Boolean(
        document.querySelector(
            '#tab_update2 #changename, '
            + '#tab_update2 #private_notes, '
            + '#tab_update2 #public_notes'
        )
        || horseRoot.querySelector(
            '#changename, #private_notes, #public_notes'
        )
    )
    const isOwnedByPlayer = hasModernEditTab || hasOwnerEditForm
    const makeNotesContent = (content, emptyText, asPanel = false) => {
        const panel = document.createElement('div')
        panel.className = `rt-passport-notes${asPanel ? ' rt-notes-panel' : ''}`
        panel.textContent = content || emptyText
        return panel
    }

    notesBody.append(makeHeading("Owner's Notes"))
    if (isOwnedByPlayer) {
        const privateNotesContent = readNotes('#private-notes, #private_notes', 'private-notes-footer')
        const notesTabs = document.createElement('div')
        notesTabs.className = 'rt-notes-tabs'
        notesTabs.setAttribute('role', 'tablist')
        const makeNotesPanel = (type, content, emptyText, active = false) => {
            const button = document.createElement('button')
            button.className = `rt-notes-tab${active ? ' active' : ''}`
            button.type = 'button'
            button.textContent = `${type} Notes`
            button.setAttribute('role', 'tab')
            button.setAttribute('aria-selected', String(active))
            const panel = makeNotesContent(content, emptyText, true)
            panel.hidden = !active
            button.addEventListener('click', () => {
                for (const tabButton of notesTabs.querySelectorAll('.rt-notes-tab')) {
                    const isActive = tabButton === button
                    tabButton.classList.toggle('active', isActive)
                    tabButton.setAttribute('aria-selected', String(isActive))
                }
                for (const notesPanel of notesBody.querySelectorAll('.rt-notes-panel')) {
                    notesPanel.hidden = notesPanel !== panel
                }
            })
            notesTabs.append(button)
            return panel
        }
        const privateNotesPanel = makeNotesPanel('Private', privateNotesContent, 'No private notes.', true)
        const publicNotesPanel = makeNotesPanel('Public', publicNotesContent, 'No public notes.')
        notesBody.append(notesTabs, privateNotesPanel, publicNotesPanel)
    } else {
        notesBody.append(makeNotesContent(publicNotesContent, 'No public notes.'))
    }
    notesCard.append(notesBody, makeCollapseButton(notesCard, "Owner's Notes"))

    layout.append(leftCard, notesCard)
    originalPassport.before(layout)
    updateCollapsedCardAlignment()
    originalPassport.style.display = 'none'
}

function watchModernPassport() {
    if (!realtoolsInfoUiTweaksEnabled) return

    const horseRoot = document.querySelector('horsereality-horse')?.shadowRoot
    if (!horseRoot) {
        window.setTimeout(watchModernPassport, 100)
        return
    }
    if (horseRoot.__realtoolsPassportObserver) return

    const observer = new MutationObserver(() => {
        if (!realtoolsInfoUiTweaksEnabled) {
            restoreOriginalPassport()
            return
        }

        // MutationObserver callbacks run before the next paint. Render here
        // instead of waiting 40 ms, so the game Passport never flashes first
        // when its tab is restored.
        const originalPassport = horseRoot.querySelector('hr-page-section#passport-section')
        const layout = horseRoot.querySelector('#realtools-passport-layout')
        if (!originalPassport) return
        if (layout) {
            originalPassport.style.display = 'none'
            return
        }
        renderModernPassport()
    })
    observer.observe(horseRoot, {childList: true, subtree: true})
    horseRoot.__realtoolsPassportObserver = observer
    renderModernPassport()
}

function restoreOriginalPassport() {
    const horseRoot = document.querySelector('horsereality-horse')?.shadowRoot
    if (!horseRoot) return

    horseRoot.__realtoolsPassportObserver?.disconnect()
    horseRoot.__realtoolsPassportObserver = null
    horseRoot.querySelector('#realtools-passport-layout')?.remove()
    horseRoot.querySelector('#realtools-passport-shadow-style')?.remove()
    horseRoot.querySelector('hr-page-section#passport-section')?.style.removeProperty('display')
}

function setInfoUiTweaksEnabled(enabled) {
    const nextValue = enabled !== false
    if (realtoolsInfoUiTweaksEnabled === nextValue) {
        if (nextValue) watchModernPassport()
        return
    }

    realtoolsInfoUiTweaksEnabled = nextValue
    if (nextValue) watchModernPassport()
    else restoreOriginalPassport()
}

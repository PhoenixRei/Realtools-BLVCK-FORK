// Colour tab only: GP extraction, colour-card recognition, and Colour layout.
async function loadRealtoolsColourTab() {
    const tab = document.getElementById('tab_genetics2');
    const doc = geneticsTabDoc?.cloneNode(true)
    if (!doc || !tab) return
    conformationParagraphs = doc.getElementsByClassName('curly-quotes')[0]?.innerText?.trim().toLowerCase() || '';

    // gp
    const geneticPotentialBlock = doc.getElementsByClassName('grid_6 genetics')[1];
    const geneticPotentialTable = geneticPotentialBlock?.children?.[1];
    if (!geneticPotentialTable?.children?.[0] || !geneticPotentialTable.children[1]) return
    geneticPotential = readGeneticPotential(doc, geneticPotentialBlock);
    Object.assign(gpTraits, parseTableColumn(geneticPotentialTable.children[0], {makeNumber: true}));
    Object.assign(gpTraits, parseTableColumn(geneticPotentialTable.children[1], {makeNumber: true}));
    if (!geneticPotential) {
        geneticPotential = String(Object.values(gpTraits).reduce((total, value) => total + Number(value || 0), 0))
    }
    gpResults = [
        {trait: 'Dressage', value: gpTraits.agility + gpTraits.balance + gpTraits.strength},
        {trait: 'Driving', value: gpTraits.agility + gpTraits.pulling_power + gpTraits.speed + gpTraits.stamina + gpTraits.strength},
        {trait: 'Endurance', value: gpTraits.speed + gpTraits.stamina + gpTraits.strength + gpTraits.surefootedness},
        {trait: 'Eventing', value: gpTraits.balance + gpTraits.bascule + gpTraits.speed + gpTraits.strength + gpTraits.surefootedness},
        {trait: 'Flat Racing', value: gpTraits.acceleration + gpTraits.speed + gpTraits.sprint + gpTraits.stamina},
        {trait: 'Show Jumping', value: gpTraits.acceleration + gpTraits.agility + gpTraits.bascule + gpTraits.sprint + gpTraits.strength},
        {trait: 'Western Reining', value: gpTraits.acceleration + gpTraits.agility + gpTraits.balance + gpTraits.surefootedness}
    ];

    // Keep every label/value pair in its own row.  The site's columns are
    // otherwise just alternating divs, which makes a CSS grid reconnect
    // labels with the wrong values after the tab is rebuilt.
    function createGpRow(key, value) {
        const row = doc.createElement('div');
        row.className = 'realtools-gp-row';
        row.append(key, value);
        return row;
    }

    function groupGpColumn(column) {
        const children = Array.from(column.children);
        const rows = [];
        for (let index = 0; index + 1 < children.length; index += 2) {
            rows.push(createGpRow(children[index], children[index + 1]));
        }
        column.replaceChildren(...rows);
    }

    // Create the calculated disciplines in the same row format as the
    // two existing Genetic potential columns.
    const thirdColumn = doc.createElement('div');
    thirdColumn.classList = ['left realtools-gp-column'];
    thirdColumn.style.width = '43%';

    for (const calculated of gpResults) {
        const traitNameUsable = calculated.trait.toLowerCase().replace(' ', '_');
        // averages
        let divideAmount = 1
        switch (traitNameUsable) {
            case 'dressage':
                divideAmount = 3
                break
            case 'driving':
                divideAmount = 5
                break
            case 'endurance':
                divideAmount = 4
                break
            case 'eventing':
                divideAmount = 5
                break
            case 'flat_racing':
                divideAmount = 4
                break
            case 'show_jumping':
                divideAmount = 5
                break
            case 'western_reining':
                divideAmount = 4
                break
            default:
                break
        }
        confScores[traitNameUsable].value = calculated.value;
        confScores[traitNameUsable].average = calculated.value / divideAmount;

        const acceptableTraits = traitsGenTraitsMap[traitNameUsable];
        for (const type of Object.keys(qualityStats)) {
            const value = qualityStats[type];

            if (acceptableTraits.indexOf(type) != -1) {
                confScores[traitNameUsable].max += qualityMap[value].max;
                confScores[traitNameUsable].min += qualityMap[value].min;
            }
        }

        for (const scoreType of Object.keys(confScores)) {
            // conf average
            const values = confScores[scoreType];

            let min = values.min;

            // the spreadsheet does this for some reason, so we do too
            if (scoreType != 'dressage') {
                const acceptableTraits = traitsGenTraitsMap[scoreType];
                if (qualityStats.shoulders == 'good_plus' && acceptableTraits.indexOf('shoulders') != -1) {
                    min -= 4;
                }
                if (qualityStats.neck == 'good_plus' && acceptableTraits.indexOf('neck') != -1) {
                    min -= 4;
                }
            }

            const divideAmount = traitsGenTraitsMap[scoreType].length * 2;
            confScores[scoreType].conformation = (values.max + min) / divideAmount;
            
            // percentage
            const rawValue = (0.75 * confScores[scoreType].average) + (0.25 * confScores[scoreType].conformation);
            confScores[scoreType].percentage = Number.parseFloat(rawValue).toPrecision(4);
        }
        
        // Calculated label/value pair.
        const rowKey = doc.createElement('div');
        rowKey.classList = ['genetic_potential'];
        rowKey.innerText = calculated.trait;

        const rowValue = doc.createElement('div');
        rowValue.classList = ['genetic_stats'];
        rowValue.innerText = `${calculated.value} (${confScores[traitNameUsable].percentage})`;

        thirdColumn.appendChild(createGpRow(rowKey, rowValue));
    }
    if (typeof refreshDisciplineGpCard === 'function') refreshDisciplineGpCard()
    groupGpColumn(geneticPotentialTable.children[0]);
    groupGpColumn(geneticPotentialTable.children[1]);
    // Give all three columns equal width.
    geneticPotentialTable.children[0].style.width = '27%';
    geneticPotentialTable.children[1].style.width = '30%';
    geneticPotentialTable.children[0].classList.add('realtools-gp-column');
    geneticPotentialTable.children[1].classList = ['left'];
    geneticPotentialTable.children[1].classList.add('realtools-gp-column');
    // add the third column
    geneticPotentialTable.appendChild(thirdColumn)

    // Mark the remaining Colour blocks explicitly. Horse Reality uses the
    // same generic grid classes for all of them, so text-based detection
    // gives the stylesheet stable hooks without rebuilding their contents.
    const colourGridBlocks = Array.from(doc.querySelectorAll('.grid_6'))
    let colourPatternsCard = null
    let colourFoalCard = null
    let colourAdviceCard = null
    for (const colourBlock of colourGridBlocks) {
        const blockTitle = colourBlock.firstElementChild?.textContent
            ?.replace(/\s+/g, ' ')
            .trim()
            .toLowerCase() || ''
        if (blockTitle.includes('colours & patterns')) {
            colourBlock.classList.add('realtools-colour-patterns-card')
            colourPatternsCard = colourBlock
        } else if (
            blockTitle.includes('as a foal')
            || blockTitle.includes('foal version')
            || blockTitle.includes('as a newborn')
            || blockTitle.includes('at birth')
        ) {
            colourBlock.classList.add('realtools-colour-foal-card')
            colourFoalCard = colourBlock
        } else if (blockTitle.includes('breeders advice')) {
            colourBlock.classList.add('realtools-colour-advice-card')
            colourAdviceCard = colourBlock
        }
    }

    // Some breeds use a different heading for the historical foal image.
    // After excluding the known genetics, patterns and advice blocks, the
    // remaining image card is the foal preview regardless of its wording.
    if (!colourFoalCard) {
        const foalCandidates = colourGridBlocks.filter((colourBlock) =>
            colourBlock !== geneticPotentialBlock
            && colourBlock !== colourPatternsCard
            && colourBlock !== colourAdviceCard
        )
        colourFoalCard = foalCandidates.find((colourBlock) =>
            colourBlock.querySelector('img, picture, canvas, [style*="background-image"]')
        ) || (foalCandidates.length === 1 ? foalCandidates[0] : null)
        if (colourFoalCard) {
            colourFoalCard.classList.add('realtools-colour-foal-card')
        }
    }

    // The historical preview is built from transparent horse layers plus a
    // separate profile-background layer. Keep the horse intact and hide only
    // the scenery so the foal is displayed on a transparent background.
    if (colourFoalCard) {
        for (const element of colourFoalCard.querySelectorAll('*')) {
            const imageSource = element.getAttribute('src') || ''
            const sourceSet = element.getAttribute('srcset') || ''
            const inlineBackground = element.style?.backgroundImage || ''
            const isProfileBackground = /(?:profilebg_|profile-bg|profile_background)/i.test(
                `${imageSource} ${sourceSet} ${inlineBackground}`
            )
            if (!isProfileBackground) continue

            if (element.matches('img, source, picture')) {
                element.classList.add('realtools-foal-background-layer')
            } else {
                element.style.setProperty('background-image', 'none', 'important')
                element.style.setProperty('background-color', 'transparent', 'important')
            }
        }
    }

    // The site's section bars retain their fixed vanilla width when the
    // card is moved beside a foal preview. Mark the real text-bearing
    // elements and their parent width contexts with our own stable classes.
    if (colourPatternsCard) {
        colourPatternsCard.classList.add('realtools-colour-patterns-with-foal')
        const sectionLabels = new Set([
            'colours & modifiers',
            'dilutions',
            'white patterns',
        ])
        const sectionElements = Array.from(
            colourPatternsCard.querySelectorAll('*')
        ).filter((element) => {
            const elementText = element.textContent
                ?.replace(/\s+/g, ' ')
                .trim()
                .toLowerCase() || ''
            if (!sectionLabels.has(elementText)) return false
            return !Array.from(element.children).some((child) =>
                sectionLabels.has(
                    child.textContent
                        ?.replace(/\s+/g, ' ')
                        .trim()
                        .toLowerCase() || ''
                )
            )
        })

        for (const sectionElement of sectionElements) {
            sectionElement.classList.add('realtools-colour-section-header')
        }
    }

    // Always build the same two-column layout. If no historical foal image
    // exists, Breeders advice still occupies the fixed right column instead
    // of falling back to the site's float and jumping to the page edge.
    if (
        colourPatternsCard
        && colourAdviceCard
        && colourPatternsCard.parentElement === colourAdviceCard.parentElement
        && (
            !colourFoalCard
            || colourFoalCard.parentElement === colourAdviceCard.parentElement
        )
    ) {
        const colourCardsParent = colourPatternsCard.parentElement
        const colourLayout = doc.createElement('div')
        colourLayout.className = 'realtools-colour-layout'
        const colourRightColumn = doc.createElement('div')
        colourRightColumn.className = 'realtools-colour-right-column'
        colourCardsParent.insertBefore(colourLayout, colourPatternsCard)
        colourLayout.append(colourPatternsCard, colourRightColumn)
        if (colourFoalCard) colourRightColumn.appendChild(colourFoalCard)
        colourRightColumn.appendChild(colourAdviceCard)
    }

    const colourRenderMarker = doc.getElementsByClassName('grid_6 genetics')[0]
    if (colourRenderMarker) colourRenderMarker.dataset.realtoolsGeneticsRendered = 'true'
    geneticPotentialBlock.remove()
    renderedGeneticsHtml = doc.children[0].innerHTML

    restoreRenderedGenetics();
    // The game can finish its own lazy Colour render just after our fetch.
    // Recheck briefly so a late vanilla render cannot leave the active tab
    // empty until the player switches away and back.
    for (const delay of [100, 300, 700, 1500]) {
        window.setTimeout(restoreRenderedGenetics, delay)
    }
}

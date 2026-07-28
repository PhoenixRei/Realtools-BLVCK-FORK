// Conformation calculations and placeholder data for text presets.
function isFoal() {
    const looking_at = document.querySelector('.looking_at');
    if (looking_at && looking_at.classList == 'looking_at') {
        // mare & foal using banner
        horseIsFoal = looking_at.innerText.indexOf('foal') != -1;
    } else if (document.querySelector('.horse_photocon.foal') && document.querySelector('.icon16').alt != 'Mare') {
        // mare & foal but banner is not present
        horseIsFoal = true;
    } else if (document.querySelector('.foal')) {
        // only foal
        horseIsFoal = true;
    }
    return horseIsFoal
}

function getSex() {
    const overall = document.querySelector('.icon16').alt;
    isFoal();
    if (overall == 'Stallion') {
        if (horseIsFoal) {
            return 'C'
        } else {
            return 'S'
        }
    } else if (overall == 'Gelding') {
        if (horseIsFoal) {
            return 'C'  // I don't think this can happen
        } else {
            return 'G'
        }
    } else if (overall == 'Mare') {
        if (horseIsFoal) {
            return 'F'
        } else {
            return 'M'
        }
    }
    return '?'
}

function formatDataGenerator(scoreOverrides = {}) {
    const overriddenHighest = scoreNumber(scoreOverrides.highestScore)
    const overriddenLowest = scoreNumber(scoreOverrides.lowestScore)
    const effectiveHighestScore = overriddenHighest === null ? highestScore : overriddenHighest
    const effectiveLowestScore = overriddenLowest === null ? lowestScore : overriddenLowest
    const breedTotal = (gp, gpStatsCount, round) => {return (((Number(gp) / gpStatsCount) + Number(effectiveHighestScore)) / 2).toPrecision(round)}
    const overallBreedTotal = (gp, gpStatsCount, round) => {return (((Number(geneticPotential) / 10) + Number(effectiveHighestScore) + (Number(gp) / gpStatsCount)) / 3).toPrecision(round)}
    const highScores = (num, round) => {if (num == '') {return num} else {return Number.parseFloat(num).toPrecision(round)}}
    const prettyConformationStat = (stat) => {
        const split = stat.toUpperCase().split('_')
        let firstLetters = ''
        for (const l of split) firstLetters += l[0]

        return stat === 'good_plus'
        ? 'G+'
        : firstLetters
    }
    const sumDiscipline = (discipline, requiredQualities) => {
        let has = 0
        let requiredStats = []

        switch (discipline) {
            case 'dressage':
                requiredStats = ['walk', 'trot', 'canter', 'posture']
                break
            case 'driving':
                requiredStats = ['trot', 'back', 'shoulders', 'hindquarters']
                break
            case 'endurance':
                requiredStats = ['walk', 'trot', 'canter', 'head', 'neck', 'back']
                break
            case 'eventing':
                requiredStats = ['walk', 'trot', 'canter', 'posture', 'head', 'neck']
                break
            case 'flat_racing':
                requiredStats = ['gallop', 'posture', 'neck', 'back', 'shoulders', 'frontlegs', 'hindquarters']
                break
            case 'show_jumping':
                requiredStats = ['canter', 'back', 'shoulders', 'frontlegs', 'hindquarters']
                break
            case 'western_reining':
                requiredStats = ['head', 'neck', 'shoulders', 'frontlegs', 'hindquarters']
                break
            default:
                break
        }

        for (const stat of Object.keys(qualityStats)) {
            const value = qualityStats[stat]
            if (requiredQualities.includes(value)) {
                if (requiredStats.includes(stat)) has += 1
            }
        }

        return `${has}/${requiredStats.length}`
    }

    if (horse.breed === 'Icelandic Horse') rangeAmount = 6.062
    let lowestScorePlusRange = effectiveLowestScore
    if (effectiveLowestScore) lowestScorePlusRange += rangeAmount
    const scoreRange = scoreNumber(effectiveHighestScore) === null || scoreNumber(effectiveLowestScore) === null
        ? ''
        : Number((Number(effectiveHighestScore) - Number(effectiveLowestScore)).toFixed(3))

    return {
        // Conformation
        vg: qualityResults.very_good,
        gs: qualityResults.good_plus,
        g: qualityResults.good,
        ag: qualityResults.good + qualityResults.good_plus,  // all good
        a: qualityResults.average,
        ba: qualityResults.below_average,
        p: qualityResults.poor,

        wal: prettyConformationStat(qualityStats.walk),
        trt: prettyConformationStat(qualityStats.trot),
        can: prettyConformationStat(qualityStats.canter),
        gal: prettyConformationStat(qualityStats.gallop),
        pos: prettyConformationStat(qualityStats.posture),
        hea: prettyConformationStat(qualityStats.head),
        nck: prettyConformationStat(qualityStats.neck),
        bck: prettyConformationStat(qualityStats.back),
        sld: prettyConformationStat(qualityStats.shoulders),
        flg: prettyConformationStat(qualityStats.frontlegs),
        hdq: prettyConformationStat(qualityStats.hindquarters),
        sck: prettyConformationStat(qualityStats.socks),

        dr_g: sumDiscipline('dressage', ['good']),
        dr_gs: sumDiscipline('dressage', ['good_plus']),
        dr_ag: sumDiscipline('dressage', ['good', 'good_plus']),
        dr_vg: sumDiscipline('dressage', ['very_good']),
        dv_g: sumDiscipline('driving', ['good']),
        dv_gs: sumDiscipline('driving', ['good_plus']),
        dv_ag: sumDiscipline('driving', ['good', 'good_plus']),
        dv_vg: sumDiscipline('driving', ['very_good']),
        en_g: sumDiscipline('endurance', ['good']),
        en_gs: sumDiscipline('endurance', ['good_plus']),
        en_ag: sumDiscipline('endurance', ['good', 'good_plus']),
        en_vg: sumDiscipline('endurance', ['very_good']),
        ev_g: sumDiscipline('eventing', ['good']),
        ev_gs: sumDiscipline('eventing', ['good_plus']),
        ev_ag: sumDiscipline('eventing', ['good', 'good_plus']),
        ev_vg: sumDiscipline('eventing', ['very_good']),
        rc_g: sumDiscipline('flat_racing', ['good']),
        rc_gs: sumDiscipline('flat_racing', ['good_plus']),
        rc_ag: sumDiscipline('flat_racing', ['good', 'good_plus']),
        rc_vg: sumDiscipline('flat_racing', ['very_good']),
        sj_g: sumDiscipline('show_jumping', ['good']),
        sj_gs: sumDiscipline('show_jumping', ['good_plus']),
        sj_ag: sumDiscipline('show_jumping', ['good', 'good_plus']),
        sj_vg: sumDiscipline('show_jumping', ['very_good']),
        re_g: sumDiscipline('western_reining', ['good']),
        re_gs: sumDiscipline('western_reining', ['good_plus']),
        re_ag: sumDiscipline('western_reining', ['good', 'good_plus']),
        re_vg: sumDiscipline('western_reining', ['very_good']),

        // scores
        ls: effectiveLowestScore,
        ls_r0: highScores(effectiveLowestScore, 2),
        ls_r1: highScores(effectiveLowestScore, 3),
        ls_r2: highScores(effectiveLowestScore, 4),
        hs: effectiveHighestScore,
        hs_r0: highScores(effectiveHighestScore, 2),
        hs_r1: highScores(effectiveHighestScore, 3),
        hs_r2: highScores(effectiveHighestScore, 4),

        // range
        rng: highScores(lowestScorePlusRange, 5),
        rng_r0: highScores(lowestScorePlusRange, 2),
        rng_r1: highScores(lowestScorePlusRange, 3),
        rng_r2: highScores(lowestScorePlusRange, 4),

        // Difference between the best and worst recorded show score.
        range: scoreRange,
        range_r0: highScores(scoreRange, 2),
        range_r1: highScores(scoreRange, 3),
        range_r2: highScores(scoreRange, 4),

        // Genetic Potential
        gp: geneticPotential.trim(),
        dr: gpResults[0].value,
        dv: gpResults[1].value,
        en: gpResults[2].value,
        ev: gpResults[3].value,
        rc: gpResults[4].value,
        sj: gpResults[5].value,
        re: gpResults[6].value,

        acc: gpTraits.acceleration,
        agi: gpTraits.agility,
        bal: gpTraits.balance,
        bas: gpTraits.bascule,
        pul: gpTraits.pulling_power,
        spd: gpTraits.speed,
        spr: gpTraits.sprint,
        sta: gpTraits.stamina,
        str: gpTraits.strength,
        sft: gpTraits.surefootedness,

        // percentages
        drp: confScores.dressage.percentage,
        drp_r0: Number(confScores.dressage.percentage).toPrecision(2),
        drp_r1: Number(confScores.dressage.percentage).toPrecision(3),
        dvp: confScores.driving.percentage,
        dvp_r0: Number(confScores.driving.percentage).toPrecision(2),
        dvp_r1: Number(confScores.driving.percentage).toPrecision(3),
        enp: confScores.endurance.percentage,
        enp_r0: Number(confScores.endurance.percentage).toPrecision(2),
        enp_r1: Number(confScores.endurance.percentage).toPrecision(3),
        evp: confScores.eventing.percentage,
        evp_r0: Number(confScores.eventing.percentage).toPrecision(2),
        evp_r1: Number(confScores.eventing.percentage).toPrecision(3),
        rcp: confScores.flat_racing.percentage,
        rcp_r0: Number(confScores.flat_racing.percentage).toPrecision(2),
        rcp_r1: Number(confScores.flat_racing.percentage).toPrecision(3),
        sjp: confScores.show_jumping.percentage,
        sjp_r0: Number(confScores.show_jumping.percentage).toPrecision(2),
        sjp_r1: Number(confScores.show_jumping.percentage).toPrecision(3),
        rep: confScores.western_reining.percentage,
        rep_r0: Number(confScores.western_reining.percentage).toPrecision(2),
        rep_r1: Number(confScores.western_reining.percentage).toPrecision(3),

        // Other
        // breed total & overall breed total
        bt: breedTotal(geneticPotential.trim(), 10, 4),
        bt_r0: breedTotal(geneticPotential.trim(), 10, 2),
        bt_r1: breedTotal(geneticPotential.trim(), 10, 3),

        dr_bt: breedTotal(gpResults[0].value, 3, 4),
        dr_bt_r0: breedTotal(gpResults[0].value, 3, 2),
        dr_bt_r1: breedTotal(gpResults[0].value, 3, 3),
        dr_obt: overallBreedTotal(gpResults[0].value, 3, 4),
        dr_obt_r0: overallBreedTotal(gpResults[0].value, 3, 2),
        dr_obt_r1: overallBreedTotal(gpResults[0].value, 3, 3),

        dv_bt: breedTotal(gpResults[1].value, 5, 4),
        dv_bt_r0: breedTotal(gpResults[1].value, 5, 2),
        dv_bt_r1: breedTotal(gpResults[1].value, 5, 3),
        dv_obt: overallBreedTotal(gpResults[1].value, 5, 4),
        dv_obt_r0: overallBreedTotal(gpResults[1].value, 5, 2),
        dv_obt_r1: overallBreedTotal(gpResults[1].value, 5, 3),

        en_bt: breedTotal(gpResults[2].value, 4, 4),
        en_bt_r0: breedTotal(gpResults[2].value, 4, 2),
        en_bt_r1: breedTotal(gpResults[2].value, 4, 3),
        en_obt: overallBreedTotal(gpResults[2].value, 4, 4),
        en_obt_r0: overallBreedTotal(gpResults[2].value, 4, 2),
        en_obt_r1: overallBreedTotal(gpResults[2].value, 4, 3),

        ev_bt: breedTotal(gpResults[3].value, 5, 4),
        ev_bt_r0: breedTotal(gpResults[3].value, 5, 2),
        ev_bt_r1: breedTotal(gpResults[3].value, 5, 3),
        ev_obt: overallBreedTotal(gpResults[3].value, 5, 4),
        ev_obt_r0: overallBreedTotal(gpResults[3].value, 5, 2),
        ev_obt_r1: overallBreedTotal(gpResults[3].value, 5, 3),

        rc_bt: breedTotal(gpResults[4].value, 4, 4),
        rc_bt_r0: breedTotal(gpResults[4].value, 4, 2),
        rc_bt_r1: breedTotal(gpResults[4].value, 4, 3),
        rc_obt: overallBreedTotal(gpResults[4].value, 4, 4),
        rc_obt_r0: overallBreedTotal(gpResults[4].value, 4, 2),
        rc_obt_r1: overallBreedTotal(gpResults[4].value, 4, 3),

        sj_bt: breedTotal(gpResults[5].value, 5, 4),
        sj_bt_r0: breedTotal(gpResults[5].value, 5, 2),
        sj_bt_r1: breedTotal(gpResults[5].value, 5, 3),
        sj_obt: overallBreedTotal(gpResults[5].value, 5, 4),
        sj_obt_r0: overallBreedTotal(gpResults[5].value, 5, 2),
        sj_obt_r1: overallBreedTotal(gpResults[5].value, 5, 3),

        re_bt: breedTotal(gpResults[6].value, 4, 4),
        re_bt_r0: breedTotal(gpResults[6].value, 4, 2),
        re_bt_r1: breedTotal(gpResults[6].value, 4, 3),
        re_obt: overallBreedTotal(gpResults[6].value, 4, 4),
        re_obt_r0: overallBreedTotal(gpResults[6].value, 4, 2),
        re_obt_r1: overallBreedTotal(gpResults[6].value, 4, 3),

        // more other
        sex_u: getSex(),
        sex_l: getSex().toLowerCase(),
        ln: document.querySelector('#hid').value
    }
}

async function generateTaglineAndName() {
    // get storage
    const storageData = await browser.storage.sync.get('realtoolsSettings');
    const noteStorageData = await browser.storage.local.get('realtoolsNoteFormatsV1');

    Object.assign(storage, storageData.realtoolsSettings || {});

    storage.nameFormats = storage.nameFormats || {default: '{ln}'}
    storage.taglineFormats = storage.taglineFormats || {default: '{vg}VG {gs}G+ {g}G {a}A {ba}BA {p}P'}
    const noteFormats = noteStorageData.realtoolsNoteFormatsV1 || {}
    storage.privateNotesFormats = noteFormats.privateNotesFormats || {
        default: 'Highest result: {hs}     「 RNG result: {rng} 」\nLowest result: {ls}\n————————————————————————\nFinal range: {range}'
    }
    const oldDefault = storage.privateNotesFormats.default
    const legacyPrefix = '\u0412\u044b\u0441\u0448\u0438\u0439 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442'
    if (typeof oldDefault === 'string' && oldDefault.startsWith(legacyPrefix)
        && oldDefault.includes('{hs}') && oldDefault.includes('{rng}') && oldDefault.includes('{range}')) {
        storage.privateNotesFormats.default = 'Highest result: {hs}     「 RNG result: {rng} 」\nLowest result: {ls}\n————————————————————————\nFinal range: {range}'
    }
    storage.publicNotesFormats = noteFormats.publicNotesFormats || {default: ''}

    const formattedNames = {}
    const formattedTaglines = {}
    const formattedPrivateNotes = {}
    const formattedPublicNotes = {}
    const formatData = formatDataGenerator()

    for (const title of Object.keys(storage.nameFormats)) {
        formattedNames[title] = storage.nameFormats[title].format(formatData)
    }
    for (const title of Object.keys(storage.taglineFormats)) {
        formattedTaglines[title] = storage.taglineFormats[title].format(formatData)
    }
    for (const title of Object.keys(storage.privateNotesFormats)) {
        formattedPrivateNotes[title] = storage.privateNotesFormats[title].format(formatData)
    }
    for (const title of Object.keys(storage.publicNotesFormats)) {
        formattedPublicNotes[title] = storage.publicNotesFormats[title].format(formatData)
    }

    // compile format data
    return {
        names: formattedNames,
        taglines: formattedTaglines,
        privateNotes: formattedPrivateNotes,
        publicNotes: formattedPublicNotes,
    }
}

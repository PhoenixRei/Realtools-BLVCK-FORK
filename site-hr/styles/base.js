// Shared Horse Reality overrides, image tools, tabs, and utility styles.
{
    const style = document.createElement('style')
    style.id = 'realtools-base-style'
    style.textContent = `
/* Horse Reality overrides */
.horse_left h1 {
    display: inline;
}

.horse_left {
    width: 230px;
}

.looking_at {
    margin-left: 290px;
    width: 630px;
}

button.yellow,
input[type=submit].yellow {
    transition: background-color 0.2s;
}

button.yellow[disabled],
input[type=submit].yellow[disabled] {
    background: gray;
    cursor: not-allowed;
}

.genetic_potential {
    width: 75px;
}

.genetic_stats {
    width: auto;
}

/* Genetic Potential */
.realtools-gp-column {
    display: block !important;
    float: left;
    width: 33.333%;
}

.realtools-gp-row {
    align-items: center;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    width: 100%;
}

.realtools-gp-row .genetic_potential {
    border-left: 3px solid #0B2C41;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 1.2;
    min-width: 0;
    padding: 7px 6px;
    white-space: nowrap;
    width: auto;
}

.realtools-gp-row .genetic_stats {
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1.2;
    padding: 7px 5px;
    text-align: right;
    white-space: nowrap;
}

/* Conformation */
.realtools-conformation-column {
    display: block !important;
    float: left;
    width: 50%;
}

.realtools-conformation-row {
    align-items: center;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    width: 100%;
}

.realtools-conformation-row .genetic_potential {
    border-left: 3px solid #0B2C41;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1.2;
    min-width: 0;
    padding: 7px 6px;
    white-space: nowrap;
    width: auto;
}

.realtools-conformation-row .genetic_stats {
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1.2;
    padding: 7px 5px;
    text-align: right;
    white-space: nowrap;
}

/* Alternating table rows */
.realtools-gp-row:nth-child(odd) > *,
.realtools-conformation-row:nth-child(odd) > * {
    background: #fff;
}

.realtools-gp-row:nth-child(even) > *,
.realtools-conformation-row:nth-child(even) > * {
    background: #eaf0f2;
}

.realtools-gp-column:first-child .genetic_potential,
.realtools-conformation-column:first-child .genetic_potential {
    border-left: 0;
}

/* Realtools tabs */
.realtools-powered-tab {
    float: right;
    margin-right: 1px;
    padding: 5px 10px;
    background-color: #0B2C41;
    text-align: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: #fff;
    font-family: Roboto, Arial, sans-serif;
    font-weight: 700;
}

.realtools-powered-tab:hover {
    background: #46523C;
    text-decoration: none;
}

/* Utility classes */
.realtools-noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.realtools-overview-card-info {
    display: none;
}`
    document.head.appendChild(style)
}

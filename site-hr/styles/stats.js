// Stats, Conformation, Health, Equipment, and Achievements styles only.
{
    const style = document.createElement('style')
    style.id = 'realtools-stats-style'
    style.textContent = `/* Stats subtabs */
.realtools-stats-subtabs {
    clear: both;
    width: 100%;
}

.realtools-stats-subtabs-navigation {
    position: relative;
    display: flex;
    gap: 7px;
    margin-bottom: 12px;
    align-items: flex-end;
    padding: 0 10px;
    border-bottom: none;
}

.realtools-stats-subtabs-navigation::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px; /* Чем больше число, тем выше линия */
    height: 2px;
    background: #EAF0F2;
    z-index: 0;
}

.realtools-stats-subtabs-navigation > * {
    position: relative;
    z-index: 1;
}

.realtools-stats-subtab {
    background: #EAF0F2;
    border: 0;
    border-radius: 9px 9px 0px 0px;
    color: #0B2C41;
    cursor: pointer;
    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0;
    padding: 9px 18px 8px;
}

.realtools-stats-subtab:hover {
    background: #C3D4E3;
}

.realtools-stats-subtab.active {
    background: #0B2C41;
    color: #fff;
}

.realtools-stats-panel {
    clear: both;
    width: 100%;
}

.realtools-stats-panel[hidden] {
    display: none !important;
}

.realtools-stats-conformation-panel {
    box-sizing: border-box;
    display: flow-root;
    padding: 0 10px 10px;
}

.realtools-stats-overview-grid {
    align-items: start;
    box-sizing: border-box;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 100%;
}

.realtools-stats-bottom-grid {
    box-sizing: border-box;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 12px;
    width: 100%;
}

.realtools-overview-card {
    background: #EAF0F2;
    border: 1px solid rgba(8, 27, 40, 1);
    border-radius: 8px;
    box-sizing: border-box;
    color: #37474f;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    padding: 0;
}

.realtools-health-vanilla-card {
    border: 1px solid rgba(8, 27, 40, 1) !important;
    float: none !important;
    margin: 0 !important;
    width: 100% !important;
}

.realtools-health-vanilla-card > *:not(.realtools-overview-card-header) {
    box-sizing: border-box;
    max-width: 100%;
}

.realtools-health-body {
    background: repeating-linear-gradient(
        to bottom,
        #fff 0,
        #fff 27px,
        #EAF0F2 27px,
        #EAF0F2 54px
    );
    flex: 1;
    padding: 0;
}

.realtools-health-row {
    align-items: baseline;
    background: #fff;
    box-sizing: border-box;
    display: grid;
    gap: 10px;
    grid-template-columns: 165px 82px;
    height: 27px;
    justify-content: center;
    min-height: 0;
    padding: 5px 10px 4px;
}

.realtools-health-row:nth-child(even) {
    background: #EAF0F2;
}

.realtools-health-fertility-row {
    border-bottom: 1px solid #d4e0e4;
    margin-bottom: 0;
}

.realtools-health-label {
    color: #65757d;
    font-size: 14px;
    text-align: center;
}

.realtools-health-value {
    color: #263740;
    font-size: 14px;
    font-weight: 700;
    text-align: left;
}

.realtools-overview-card-header {
    align-items: center;
    background: #0B2C41;
    color: #fff;
    display: flex;
    gap: 8px;
    justify-content: space-between;
    margin: 0;
    min-height: 40px;
    padding: 6px 18px;
}

.realtools-overview-card-title {
    align-items: center;
    display: inline-flex;
    font-size: 16px;
    font-weight: 700;
    gap: 6px;
    white-space: nowrap;
}

.realtools-overview-card-info {
    align-items: center;
    border: 1px solid rgba(255, 255, 255, .8);
    border-radius: 50%;
    color: #fff;
    display: inline-flex;
    font-size: 9px;
    font-style: normal;
    font-weight: 700;
    height: 13px;
    justify-content: center;
    width: 13px;
}

.realtools-overview-card-summary {
    background: #fff;
    border-radius: 999px;
    box-sizing: border-box;
    color: #37474f;
    display: inline-flex;
    flex-wrap: nowrap;
    font-size: 14px;
    font-weight: 700;
    gap: 4px;
    justify-content: center;
    min-width: 104px;
    padding: 7px 12px;
    white-space: nowrap;
}

.realtools-overview-card-body {
    align-content: start;
    background: repeating-linear-gradient(
        to bottom,
        #fff 0,
        #fff 27px,
        #EAF0F2 27px,
        #EAF0F2 54px
    );
    display: grid;
    flex: 1;
    gap: 0;
}

.realtools-overview-row {
    align-items: baseline;
    background: #fff;
    box-sizing: border-box;
    display: grid;
    gap: 10px;
    grid-template-columns: 135px 95px;
    height: 27px;
    justify-content: center;
    min-height: 0;
    padding: 5px 10px 4px;
}

.realtools-overview-row:nth-child(even) {
    background: #EAF0F2;
}

.realtools-overview-label {
    color: #65757d;
    font-size: 14px;
    text-align: center;
}

.realtools-overview-value {
    color: #263740;
    font-size: 14px;
    font-weight: 700;
    min-width: 0;
    text-align: left;
}

/* Keep Genetic Potential values visually balanced without affecting other cards. */
.realtools-gp-card .realtools-overview-value {
    transform: translateX(46px);
}

.realtools-overview-note {
    border-top: 1px solid #d4e0e4;
    color: #263740;
    font-size: 11px;
    line-height: 1.35;
    margin: 10px 18px 14px;
    padding-top: 10px;
}

.realtools-stats-conformation-panel > .equipment,
.realtools-stats-conformation-panel > .box,
.realtools-stats-conformation-panel > .block {
    box-sizing: border-box;
    clear: both;
    margin-top: 12px !important;
    width: 100% !important;
}

.realtools-stats-conformation-panel > .realtools-equipment-card,
.realtools-stats-bottom-grid > .realtools-equipment-card {
    background: #fff;
    border: 1px solid rgba(8, 27, 40, 1) !important;
    border-bottom: 1px solid rgba(8, 27, 40, 1) !important;
    border-radius: 8px;
    box-shadow: none !important;
    box-sizing: border-box;
    clear: both;
    display: block;
    float: none !important;
    margin: 12px 0 0 !important;
    max-width: none !important;
    overflow: hidden;
    width: 100% !important;
}

.realtools-stats-bottom-grid > .realtools-equipment-card,
.realtools-stats-bottom-grid > .realtools-health-card {
    margin: 0 !important;
    width: 100% !important;
}

.realtools-stats-conformation-panel > .realtools-equipment-card > :first-child,
.realtools-stats-bottom-grid > .realtools-equipment-card > :first-child {
    align-items: center;
    background: #0B2C41 !important;
    border: 0 !important;
    box-sizing: border-box;
    color: #fff !important;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    margin: 0 !important;
    min-height: 52px;
    padding: 10px 18px !important;
    width: 100%;
}

.realtools-stats-conformation-panel > .realtools-equipment-card > :not(:first-child),
.realtools-stats-bottom-grid > .realtools-equipment-card > :not(:first-child) {
    box-sizing: border-box;
    margin-left: 0;
    margin-right: 0;
}

@media (max-width: 820px) {
    .realtools-stats-overview-grid {
        grid-template-columns: 1fr;
    }

    .realtools-stats-bottom-grid {
        grid-template-columns: 1fr;
    }

    .realtools-overview-card {
        min-height: 0;
    }
}

.realtools-stats-achievements-panel {
    align-items: start;
    box-sizing: border-box;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0 10px;
}

.realtools-achievements-cards {
    box-sizing: border-box;
    display: grid;
    gap: 10px;
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: 4px 0 10px;
    width: 100% !important;
}

.realtools-achievements-card {
    background: #EAF0F2;
    border: 1px solid #0B2C41;
    border-radius: 8px;
    box-sizing: border-box;
    min-height: 190px;
    overflow: hidden;
    padding: 14px 18px;
}

.realtools-achievements-card-header {
    align-items: center;
    color: #37474f;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    gap: 7px;
    margin-bottom: 14px;
}

.realtools-achievements-card-entries {
    align-items: start;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.realtools-trophies-card .realtools-achievements-card-entries {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.realtools-achievement-entry {
    box-sizing: border-box;
    float: none !important;
    margin: 0 !important;
    text-align: center;
    width: auto !important;
}

.realtools-achievement-entry img {
    display: block;
    height: 62px;
    margin: 0 auto 6px;
    max-width: 72px;
    object-fit: contain;
    width: auto;
}

.realtools-stats-achievements-panel .half_block {
    box-sizing: border-box;
    margin: 0 !important;
    width: 100% !important;
}

.realtools-results-card {
    align-self: start;
    background: #EAF0F2 !important;
    border: 1px solid rgba(8, 27, 40, 1) !important;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: none !important;
    display: flex;
    float: none !important;
    flex-direction: column;
    min-height: 362px;
    overflow: hidden;
}

.realtools-results-header {
    align-items: center;
    background: #0B2C41 !important;
    color: #fff !important;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    min-height: 40px;
    padding: 6px 18px !important;
}

.realtools-results-title {
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
}

.realtools-results-badges {
    display: flex;
    gap: 8px;
}

.realtools-results-badge {
    background: #fff;
    border-radius: 999px;
    box-sizing: border-box;
    color: #0B2C41;
    font-size: 12px;
    min-width: 110px;
    padding: 7px 12px;
    text-align: center;
    white-space: nowrap;
}

.realtools-results-columns-header,
.realtools-result-row {
    align-items: center;
    box-sizing: border-box;
    display: grid !important;
    gap: 8px;
    grid-template-columns: 90px minmax(110px, 1fr) 82px 90px;
    padding-left: 18px !important;
    padding-right: 18px !important;
    width: 100% !important;
}

.realtools-results-columns-header {
    background: #4A7A9B !important;
    color: #FFFFFF !important;
    min-height: 29px;
}

.realtools-results-columns-header > * {
    box-sizing: border-box;
    float: none !important;
    margin: 0 !important;
    min-width: 0;
    padding: 0 !important;
    width: auto !important;
    text-align: left !important;
}

.realtools-results-columns-header > :nth-child(3) {
    transform: translateX(3px);
}

.realtools-result-row {
    background: #fff !important;
    min-height: 36px;
    padding-bottom: 5px;
    padding-top: 5px;
}

.realtools-result-row-alt {
    background: #eaf0f2 !important;
}

.realtools-result-row > * {
    float: none !important;
    margin: 0 !important;
    min-width: 0;
    text-align: left !important;
    width: auto !important;
}

.realtools-result-row > :first-child {
    color: #65757d;
}

.realtools-result-row > :nth-child(2),
.realtools-result-row > :nth-child(3),
.realtools-result-row > :last-child {
    overflow-wrap: normal;
    white-space: nowrap;
    word-break: normal;
}

.realtools-result-row > :nth-child(3),
.realtools-result-row > :last-child {
    font-weight: 700;
    text-align: left;
}

.realtools-result-row[hidden] {
    display: none !important;
}

.realtools-results-card-empty > * {
    background: #EAF0F2 !important;
}

.realtools-results-card-empty > .realtools-results-header {
    background: #0B2C41 !important;
}

.realtools-results-card-empty > .realtools-results-columns-header {
    background: #4A7A9B !important;
}

.realtools-results-footer {
    background: #0B2C41;
    margin-top: auto;
    min-height: 28px;
    text-align: center;
}

.realtools-results-toggle {
    align-items: center;
    background: transparent;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: flex;
    height: 28px;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 100%;
}

.realtools-results-toggle-svg {
    fill: none;
    height: 18px;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
    width: 18px;
}

.realtools-results-toggle:hover {
    background: #1C5072;
}

.realtools-results-empty-message {
    align-items: center;
    box-sizing: border-box;
    display: flex !important;
    float: none !important;
    font-size: 16px !important;
    justify-content: center;
    min-height: 46px;
    padding: 10px 18px !important;
    text-align: center;
    width: 100% !important;
}

.realtools-results-empty-message > * {
    float: none !important;
    font-size: inherit !important;
    margin: 0 !important;
    padding: 0 !important;
    text-align: center !important;
    width: auto !important;
}

`
    document.head.appendChild(style)
}

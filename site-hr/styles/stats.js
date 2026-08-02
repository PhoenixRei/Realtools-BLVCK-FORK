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
    gap: 16px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0;
}

.realtools-achievements-cards {
    box-sizing: border-box;
    display: grid;
    gap: 16px;
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: 0;
    width: 100% !important;
}

.realtools-achievements-card {
    background: #fff;
    border: 1px solid #dfe6eb;
    border-radius: 10px;
    box-sizing: border-box;
    min-height: 230px;
    overflow: hidden;
    padding: 18px 20px;
}

.realtools-achievements-card-header {
    align-items: center;
    color: #17202c;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 18px;
}

.realtools-achievements-card-title,
.realtools-results-title {
    align-items: center;
    display: inline-flex;
    gap: 10px;
}

.realtools-achievements-section-icon {
    color: #17202c;
    fill: none;
    flex: 0 0 24px;
    height: 24px;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
    width: 24px;
}

.realtools-achievements-card-entries {
    align-items: start;
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 0 6px 8px;
}

.realtools-trophies-card .realtools-achievements-card-entries {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.realtools-achievement-entry {
    box-sizing: border-box;
    float: none !important;
    font-size: 13px;
    line-height: 1.5;
    margin: 0 !important;
    text-align: center;
    width: auto !important;
}

.realtools-achievement-entry img {
    background: #eef4fb;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: 82px;
    margin: 0 auto 8px;
    max-width: 82px;
    object-fit: contain;
    padding: 10px;
    width: 82px;
}

.realtools-ribbon-entry:nth-child(2) img,
.realtools-trophy-entry:nth-child(3) img {
    background: #fff0ee;
}

.realtools-ribbon-entry:nth-child(3) img,
.realtools-trophy-entry:nth-child(1) img {
    background: #fff7e8;
}

.realtools-trophy-entry:nth-child(2) img {
    background: #f2f4f6;
}

.realtools-stats-achievements-panel .half_block {
    box-sizing: border-box;
    margin: 0 !important;
    width: 100% !important;
}

.realtools-results-card {
    align-self: start;
    background: #fff !important;
    border: 1px solid #dfe6eb !important;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: none !important;
    display: flex;
    float: none !important;
    flex-direction: column;
    min-height: 390px;
    overflow: hidden;
    padding: 18px 18px 0;
}

.realtools-results-header {
    align-items: center;
    background: transparent !important;
    color: #17202c !important;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    min-height: 30px;
    padding: 0 2px 16px !important;
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
    background: #edf7f0;
    border-radius: 999px;
    box-sizing: border-box;
    color: #16865b;
    font-size: 11px;
    min-width: 90px;
    padding: 6px 10px;
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
    padding-left: 6px !important;
    padding-right: 6px !important;
    width: 100% !important;
}

.realtools-results-columns-header {
    background: #fff !important;
    border-bottom: 1px solid #e3e8ec;
    color: #263442 !important;
    font-size: 12px;
    font-weight: 600;
    min-height: 38px;
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
    border-bottom: 1px solid #e8ecef;
    font-size: 12px;
    min-height: 38px;
    padding-bottom: 6px;
    padding-top: 6px;
}

.realtools-result-row-alt {
    background: #fff !important;
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
    background: #fff !important;
}

.realtools-results-card-empty > .realtools-results-header {
    background: transparent !important;
}

.realtools-results-card-empty > .realtools-results-columns-header {
    background: #fff !important;
}

.realtools-results-footer {
    background: #fff;
    margin-top: auto;
    margin-left: -18px;
    margin-right: -18px;
    min-height: 40px;
    text-align: center;
    width: calc(100% + 36px);
}

.realtools-results-toggle {
    align-items: center;
    background: transparent;
    border: 0;
    color: #18456b;
    cursor: pointer;
    display: flex;
    font-size: 12px;
    font-weight: 600;
    gap: 8px;
    height: 40px;
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
    background: #f7fafc;
}

.realtools-results-empty-message {
    align-items: center;
    box-sizing: border-box;
    display: flex !important;
    flex: 1 1 auto;
    flex-direction: column;
    float: none !important;
    font-size: 13px !important;
    gap: 18px;
    justify-content: center;
    min-height: 220px;
    padding: 30px 18px !important;
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

.realtools-results-empty-icon {
    color: #b9c3ce;
    fill: none;
    height: 54px;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    width: 54px !important;
}

.realtools-results-badge-worst {
    background: #fff0f0;
    color: #c63838;
}

/* Statistics overview redesign */
.realtools-stats-subtabs {
    background: #fff;
    box-sizing: border-box;
    color: #172433;
    padding: 6px 12px 14px;
}

.realtools-stats-heading {
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    min-height: 42px;
    padding: 0 12px 4px;
    position: relative;
}

.realtools-stats-title-group {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
}

.realtools-stats-title {
    color: #17202c;
    font-size: 31px;
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
}

.realtools-stats-conformation-summary {
    background: #f0f2f4;
    border-radius: 999px;
    box-sizing: border-box;
    display: inline-flex;
    flex-wrap: nowrap;
    font-size: 13px;
    font-weight: 700;
    gap: 4px;
    padding: 7px 13px;
    white-space: nowrap;
}

.realtools-stats-heading-totals {
    display: flex;
    gap: 12px;
    position: absolute;
    right: 12px;
    top: 0;
}

.realtools-stats-total-card {
    align-items: center;
    background: #fff;
    border: 1px solid #dfe6eb;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 70px;
    min-width: 128px;
    padding: 10px 22px;
}

.realtools-stats-total-card span {
    color: #43505f;
    font-size: 13px;
    line-height: 1.2;
}

.realtools-stats-total-card strong {
    color: #17202c;
    font-size: 27px;
    font-weight: 700;
    line-height: 1.15;
    margin-top: 4px;
}

.realtools-stats-subtabs-navigation {
    align-items: flex-end;
    border-bottom: 1px solid #e3e8ec;
    gap: 18px;
    margin: 0 0 16px;
    padding: 0 12px;
}

.realtools-stats-subtabs-navigation::after {
    display: none;
}

.realtools-stats-subtab {
    background: transparent;
    border-radius: 0;
    color: #465260;
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    padding: 10px 4px 12px;
}

.realtools-stats-subtab:hover {
    background: transparent;
    color: #207d9d;
}

.realtools-stats-subtab.active {
    background: transparent;
    color: #17202c;
    font-weight: 600;
}

.realtools-stats-subtab.active::after {
    background: #2c8bab;
    bottom: -1px;
    content: "";
    height: 3px;
    left: 0;
    position: absolute;
    right: 0;
}

.realtools-stats-conformation-panel {
    padding: 0;
}

.realtools-stats-overview-grid {
    align-items: stretch;
    gap: 12px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.realtools-overview-card {
    background: #fff;
    border: 1px solid #dfe6eb;
    border-radius: 10px;
    color: #263442;
    min-height: 402px;
    padding: 20px;
}

.realtools-overview-card-header {
    background: transparent;
    color: #17202c;
    gap: 10px;
    justify-content: flex-start;
    min-height: 29px;
    padding: 0 0 18px;
}

.realtools-overview-card-title {
    color: #17202c;
    font-size: 16px;
    gap: 10px;
}

.realtools-stats-section-icon {
    color: #2584a4;
    fill: none;
    flex: 0 0 24px;
    height: 24px;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
    width: 24px;
}

.realtools-overview-card-body {
    align-content: stretch;
    background: transparent;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0;
}

.realtools-overview-row,
.realtools-overview-row:nth-child(even) {
    background: transparent;
    flex: 1 1 0;
    gap: 12px;
    grid-template-columns: minmax(110px, 1fr) minmax(92px, .8fr);
    height: auto;
    justify-content: stretch;
    min-height: 27px;
    padding: 4px 0;
}

.realtools-overview-label {
    color: #465260;
    font-size: 13px;
    text-align: left;
}

.realtools-overview-value {
    color: #263442;
    font-size: 13px;
    text-align: left;
}

.realtools-quality-excellent {
    color: #16865b !important;
}

.realtools-quality-good {
    color: #9c8b12 !important;
}

.realtools-quality-good-plus {
    color: #5d8f00 !important;
}

.realtools-quality-very-good {
    color: #16865b !important;
}

.realtools-quality-average {
    color: #d79200 !important;
}

.realtools-quality-below-average {
    color: #cf4a13 !important;
}

.realtools-quality-poor {
    color: #ad2821 !important;
}

/* Conformation uses the same rating-pill treatment as Health. */
.realtools-conformation-card .realtools-overview-value {
    border-radius: 7px;
    box-sizing: border-box;
    font-size: 12px;
    justify-self: end;
    line-height: 1.1;
    padding: 5px 8px;
    text-align: center;
    white-space: nowrap;
    width: 116px;
}

.realtools-conformation-card .realtools-overview-value.realtools-quality-excellent {
    background: #e9f4fb;
}

.realtools-conformation-card .realtools-overview-value.realtools-quality-very-good, {
    background: #eaf6ee;
}

.realtools-conformation-card .realtools-overview-value.realtools-quality-average {
    background: #fff5db;
}

.realtools-conformation-card .realtools-overview-value.realtools-quality-below-average,
.realtools-conformation-card .realtools-overview-value.realtools-quality-poor {
    background: #fff0ea;
}

.realtools-conformation-card .realtools-overview-value.realtools-quality-good-plus,
.realtools-conformation-card .realtools-overview-value.realtools-quality-good {
    background: #EBF1E3;
}

.realtools-conformation-card .realtools-overview-row {
    align-items: center;
    border-bottom: 1px solid #e8ecef;
    flex-basis: 30px;
    min-height: 30px;
    padding-bottom: 3px;
    padding-top: 3px;
}

.realtools-conformation-card .realtools-overview-row:last-child {
    border-bottom: 0;
}

.realtools-overview-row.realtools-progress-row {
    align-items: center;
    grid-template-columns: minmax(108px, 1fr) 34px minmax(105px, 1.3fr);
}

.realtools-progress-row .realtools-overview-value {
    min-width: 0;
    text-align: right;
    transform: none;
}

.realtools-stat-progress {
    background: #dfe4e8;
    border-radius: 999px;
    display: block;
    height: 5px;
    min-width: 60px;
    overflow: hidden;
    width: 100%;
}

.realtools-stat-progress-fill {
    background: #2c86a5;
    border-radius: inherit;
    display: block;
    height: 100%;
    transition: width .18s ease-out;
}

.realtools-discipline-gp-card .realtools-progress-row {
    align-content: center;
    grid-template-columns: minmax(120px, 1fr) auto;
    grid-template-rows: auto 6px;
    padding: 6px 0;
    row-gap: 7px;
}

.realtools-discipline-gp-card .realtools-overview-value {
    min-width: 86px;
    white-space: nowrap;
}

.realtools-discipline-gp-card .realtools-stat-progress {
    grid-column: 1 / -1;
}

.realtools-stats-bottom-grid {
    align-items: stretch;
    gap: 12px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
    margin-top: 12px;
}

.realtools-stats-bottom-grid > .realtools-health-card,
.realtools-stats-bottom-grid > .realtools-equipment-card {
    background: #fff;
    border: 1px solid #dfe6eb !important;
    border-bottom: 1px solid #dfe6eb !important;
    border-radius: 10px;
    box-shadow: none !important;
    box-sizing: border-box;
    min-height: 260px;
    overflow: hidden;
    padding: 20px;
}

.realtools-health-body {
    background: transparent;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0;
}

.realtools-health-row,
.realtools-health-row:nth-child(even) {
    align-items: center;
    background: transparent;
    border-bottom: 1px solid #e8ecef;
    flex: 1 1 0;
    gap: 10px;
    grid-template-columns: 20px minmax(135px, 1fr) 82px;
    height: auto;
    justify-content: stretch;
    min-height: 30px;
    padding: 5px 0;
}

.realtools-health-row:last-child {
    border-bottom: 0;
}

.realtools-health-fertility-row {
    margin: 0;
}

.realtools-health-row-icon {
    color: #657180;
    fill: none;
    height: 16px;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.7;
    width: 16px;
}

.realtools-health-label {
    color: #465260;
    font-size: 13px;
    text-align: left;
}

.realtools-health-value {
    background: #eaf6ee;
    border-radius: 7px;
    box-sizing: border-box;
    color: #16865b;
    font-size: 12px;
    font-weight: 600;
    min-width: 76px;
    padding: 5px 8px;
    text-align: center;
}

.realtools-health-value.realtools-quality-excellent {
    background: #e9f4fb;
    color: #187bc2 !important;
}

.realtools-health-value.realtools-quality-good {
    color: #5d8f00 !important;
}

.realtools-health-value.realtools-quality-average {
    background: #fff5db;
}

.realtools-health-value.realtools-quality-below-average,
.realtools-health-value.realtools-quality-poor {
    background: #fff0ea;
}

.realtools-stats-bottom-grid > .realtools-equipment-card {
    display: block;
    margin: 0 !important;
}

.realtools-stats-bottom-grid > .realtools-equipment-card > :first-child {
    background: transparent !important;
    color: #17202c !important;
    gap: 10px;
    min-height: 29px;
    padding: 0 0 18px !important;
}

.realtools-stats-bottom-grid > .realtools-equipment-card > :not(:first-child) {
    margin-left: 0 !important;
    margin-right: 0 !important;
}

@media (max-width: 920px) {
    .realtools-stats-overview-grid {
        grid-template-columns: 1fr;
    }

    .realtools-stats-bottom-grid {
        grid-template-columns: 1fr;
    }

    .realtools-overview-card {
        min-height: 0;
    }

    .realtools-stats-achievements-panel,
    .realtools-achievements-cards {
        grid-template-columns: 1fr;
    }

    .realtools-results-card,
    .realtools-achievements-card {
        min-height: 0;
    }
}

@media (max-width: 520px) {
    .realtools-stats-heading {
        align-items: flex-start;
        flex-direction: column;
        gap: 14px;
        min-height: 0;
        padding-bottom: 8px;
        padding-left: 4px;
        padding-right: 4px;
    }

    .realtools-stats-title {
        font-size: 25px;
    }

    .realtools-stats-heading-totals {
        align-self: stretch;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        position: static;
        width: 100%;
    }

    .realtools-stats-total-card {
        min-width: 0;
        padding-left: 14px;
        padding-right: 14px;
    }

    .realtools-progress-row {
        grid-template-columns: minmax(95px, 1fr) 32px minmax(70px, 1fr);
    }

    .realtools-results-card {
        padding-left: 10px;
        padding-right: 10px;
    }

    .realtools-results-footer {
        margin-left: -10px;
        margin-right: -10px;
        width: calc(100% + 20px);
    }

    .realtools-results-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .realtools-results-columns-header,
    .realtools-result-row {
        gap: 5px;
        grid-template-columns: 70px minmax(90px, 1fr) 65px 76px;
    }

    .realtools-achievements-card {
        padding-left: 12px;
        padding-right: 12px;
    }

    .realtools-achievement-entry img {
        height: 68px;
        max-width: 68px;
        width: 68px;
    }
}

`
    document.head.appendChild(style)
}

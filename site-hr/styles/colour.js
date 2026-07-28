// Colour tab styles only.
{
    const style = document.createElement('style')
    style.id = 'realtools-colour-style'
    style.textContent = `/* Colour tab */
#tab_genetics2 {
    box-sizing: border-box;
    overflow-x: hidden;
    padding: 0 22px 14px;
}

#tab_genetics2 .realtools-colour-layout {
    align-items: start;
    box-sizing: border-box;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, calc((100% - 20px) / 2));
    margin: 0;
    max-width: none;
    width: 100%;
    position: relative;
    left: -12px;
}

#tab_genetics2 .realtools-colour-right-column {
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: none;
    min-width: 0;
    overflow: hidden;
    padding-top: 2px;
    position: relative;
    left: -10px;
    width: calc(100% - 10px);
}
    
#tab_genetics2 .realtools-colour-patterns-card,
#tab_genetics2 .realtools-colour-foal-card,
#tab_genetics2 .realtools-colour-advice-card {
    background: #fff;
    border: 1px solid rgba(8, 17, 40, 1) !important;
    border-bottom: 1px solid rgba(8, 17, 40, 1) !important;
    border-radius: 8px;
    box-shadow: none !important;
    box-sizing: border-box;
    margin: 0 !important;
    max-width: none !important;
    overflow: hidden;
    width: 100% !important;
}

#tab_genetics2 .realtools-colour-layout > .realtools-colour-patterns-card,
#tab_genetics2 .realtools-colour-right-column > .realtools-colour-foal-card {
    clear: none;
    float: none !important;
    margin-top: 0 !important;
    width: 100% !important;
}

#tab_genetics2 .realtools-colour-layout > .realtools-colour-patterns-card {
    align-self: start;
    justify-self: start;
    margin-top: 2px !important;
    max-width: none !important;
}

#tab_genetics2 .realtools-colour-right-column > .realtools-colour-foal-card {
    align-self: stretch;
}

#tab_genetics2 .realtools-colour-right-column > .realtools-colour-advice-card {
    clear: none;
    float: none !important;
    margin-top: 0 !important;
    width: 100% !important;
}

#tab_genetics2 .realtools-colour-layout .realtools-colour-patterns-card,
#tab_genetics2 .realtools-colour-layout .realtools-colour-foal-card,
#tab_genetics2 .realtools-colour-layout .realtools-colour-advice-card {
    min-width: 0 !important;
    overflow: hidden;
}

#tab_genetics2 .realtools-colour-layout .realtools-colour-patterns-card > *,
#tab_genetics2 .realtools-colour-layout .realtools-colour-foal-card > *,
#tab_genetics2 .realtools-colour-layout .realtools-colour-advice-card > * {
    box-sizing: border-box;
    max-width: 100%;
}

#tab_genetics2 .realtools-colour-foal-card img,
#tab_genetics2 .realtools-colour-foal-card picture,
#tab_genetics2 .realtools-colour-foal-card canvas {
    display: block;
    height: auto !important;
    max-width: 100% !important;
    object-fit: contain;
    width: 100% !important;
}

#tab_genetics2 .realtools-colour-advice-card {
    max-width: none !important;
    overflow-wrap: anywhere;
}

#tab_genetics2 .realtools-colour-foal-card,
#tab_genetics2 .realtools-colour-advice-card {
    clear: none;
    float: none !important;
}

#tab_genetics2 .realtools-colour-patterns-card > :first-child,
#tab_genetics2 .realtools-colour-foal-card > :first-child,
#tab_genetics2 .realtools-colour-advice-card > :first-child {
    align-items: center;
    background: #0B2C41 !important;
    border: 0 !important;
    box-sizing: border-box;
    color: #fff !important;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    justify-content: space-between;
    margin: 0 !important;
    min-height: 40px;
    padding: 6px 18px !important;
    width: 100%;
}

#tab_genetics2 .realtools-colour-patterns-card > :first-child a,
#tab_genetics2 .realtools-colour-patterns-card > :first-child button {
    border: 0;
    border-radius: 5px;
    margin-left: auto;
}

#tab_genetics2 .realtools-colour-patterns-card img,
#tab_genetics2 .realtools-colour-foal-card img {
    display: block;
    height: auto;
    max-width: 100%;
}

#tab_genetics2 .realtools-colour-foal-card .realtools-foal-background-layer {
    display: none !important;
}

#tab_genetics2 .realtools-colour-foal-card .horse_photo,
#tab_genetics2 .realtools-colour-foal-card .horse-photo,
#tab_genetics2 .realtools-colour-foal-card .horse_image,
#tab_genetics2 .realtools-colour-foal-card .horse-image {
    background-color: transparent !important;
    background-image: none !important;
}

#tab_genetics2 .realtools-colour-advice-card > :not(:first-child) {
    box-sizing: border-box;
    font-size: 13px;
    line-height: 1.55;
    padding-left: 14px;
    padding-right: 14px;
}

#tab_genetics2 .realtools-colour-patterns-with-foal .realtools-colour-section-header {
    box-sizing: border-box;
    clear: both;
    display: block;
    margin-right: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
}

#tab_genetics2 .realtools-colour-section-header {
    background: #4a7a9b !important;
    color: #fff !important;
    padding-left: 18px !important;
}

#tab_genetics2 .realtools-colour-patterns-card * {
    border-color: #C6D6DB !important;
}

@media (max-width: 820px) {
    #tab_genetics2 {
        padding-left: 10px;
        padding-right: 10px;
    }

    #tab_genetics2 .realtools-colour-layout {
        display: block;
    }

    #tab_genetics2 .realtools-colour-right-column {
        display: block;
    }

    #tab_genetics2 .realtools-colour-patterns-card,
    #tab_genetics2 .realtools-colour-foal-card,
    #tab_genetics2 .realtools-colour-advice-card {
        clear: both;
        float: none !important;
        margin-top: 10px !important;
        width: 100% !important;
    }
}

`
    document.head.appendChild(style)
}

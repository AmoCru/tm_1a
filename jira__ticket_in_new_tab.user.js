// ==UserScript==
// @name         === Jira === / Open Tickets in new tab \
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Open tickets in board in new tab when cliking of the ticket's name
// @author       Amaury CRUNELLE
// @match        https://jira.amadeus.com/agile/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amadeus.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const applyChange = function(strSelector, fctChange, delay = 200, max = 5000) {
        setTimeout(() => {
            const element = document.querySelector(strSelector);
            if (element) {
                fctChange(element);
            } else if (max > 0) {
                applyChange(strSelector, fctChange, delay, max-delay);
            }
        }, delay);
    };

    const applyChangeAll = function(strSelector, fctChange, delay = 200, max = 5000) {
        setTimeout(() => {
            const elements = document.querySelectorAll(strSelector);
            if (elements?.length > 0) {
                elements.forEach(element => fctChange(element));
            } else if (max > 0) {
                applyChangeAll(strSelector, fctChange, delay, max-delay);
            }
        }, delay);
    };

    const applyChangeScrollingAll = function(scrollContainerSelector, strSelector, fctChange, delay = 200, max = 5000) {
        applyChange(scrollContainerSelector, (scrollContainer) => {
            applyChangeAll(strSelector, fctChange, delay, max);
            scrollContainer.addEventListener('scroll', (_event) => {
                applyChangeAll(strSelector, fctChange, delay, max);
            })
        }, delay, max)
    }

    applyChangeScrollingAll('#ghx-pool-column', '.ghx-key-link', (elt) => {elt.onclick = (() => window.open(elt.href))});
    applyChangeScrollingAll('#ghx-pool-column', '.ghx-parent-key', (elt) => {elt.onclick = (() => window.open(elt.href))});
})();

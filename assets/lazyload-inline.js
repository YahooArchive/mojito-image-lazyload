/*
 * Copyright (c) 2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint browser: true, plusplus: true */

(function () {
    'use strict';

    function addEventListener(el, type, fn, capture) {
        if (el && el.addEventListener) {
            el.addEventListener(type, fn, capture);
        } else if (el && el.attachEvent) {
            el.attachEvent('on' + type, fn);
        }
    }

    addEventListener(window, 'load', function () {
        var images = document.getElementsByTagName('img'),
            img,
            src,
            i;

        for (i = 0; i < images.length; i++) {
            img = images[i];
            src = img.getAttribute('data-src');
            if (src) {
                img.setAttribute('src', src);
                img.removeAttribute('data-src');
            }
        }
    });
}());

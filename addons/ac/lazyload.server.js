/*
 * Copyright (c) 2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint indent: 4, regexp: true, plusplus: true */
/*global YUI */

/**
 * Utility to replace img src with data-src for images with class="lazyload"
 *
 * @module yahoo.addons.lazyload
 */

YUI.add('yahoo.addons.lazyload', function (Y, NAME) {
    'use strict';

    var LAZY_LOADING_REGEX = /<img([^>]*) src([^>]*(lazyload-candidate)[^>]*)>/g,
        LAZY_LOADING_REPL = '<img$1 data-src$2>',
        JS_ENABLED = 'enabled',
        L = Y.Lang;

    function NOOP(data) {
        return data;
    }

    function Addon(command, adapter, ac) {
        var config = ac.config.getAppConfig();

        if (config && config.lazyload && config.lazyload.enabled === false) {
            Y.log('Lazyload appears to be disabled', 'debug', NAME);
            this.run = NOOP;
            return;
        }

        if (ac.jscheck.status() !== JS_ENABLED) {
            Y.log('The user agent does not appear to have JavaScript enabled', 'debug', NAME);
            this.run = NOOP;
            return;
        }
    }

    Addon.prototype = {

        namespace: 'lazyload',

        run: function (data) {
            var i, l, key, value;

            if (typeof data === 'string') {
                data = data.replace(LAZY_LOADING_REGEX, LAZY_LOADING_REPL);
            } else if (L.isObject(data)) {
                for (key in data) {
                    if (data.hasOwnProperty(key)) {
                        value = data[key];
                        if (L.isArray(value)) {
                            for (i = 0, l = value.length; i < l; i++) {
                                value[i] = this.run(value[i]);
                            }
                        } else {
                            data[key] = this.run(value);
                        }
                    }
                }
            }

            return data;
        }
    };

    Y.mojito.addons.ac.lazyload = Addon;

}, '0.1.0', {
    requires: [
        'mojito',
        'mojito-config-addon',
        'mojito-jscheck-addon'
    ]
});

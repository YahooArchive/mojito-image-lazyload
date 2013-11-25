/*jslint nomen:true, indent: 4 */
/*global YUI, YUITest */

YUI.add('yahoo.addons.lazyload-tests', function (Y, NAME) {
    'use strict';

    var A = YUITest.Assert,

        suite = new YUITest.TestSuite(NAME),

        command = {},
        adapter = {},
        ac,

        data,

        JS_ENABLED = 'enabled',
        JS_DISABLED = 'disabled';

    suite.add(new YUITest.TestCase({

        name: 'unit tests',

        setUp: function () {

            ac = new Y.mojito.MockActionContext({
                addons: ['config', 'jscheck']
            });

            data = {
                'some-mojit': [ '<div id="someMojit"><img src="foo"><img src="bar" class="lazyload-candidate"></div>' ]
            };
        },

        'nothing should happen if lazyload is disabled': function () {

            ac.config.expect({
                method: 'getAppConfig',
                returns: {
                    'lazyload': {
                        'enabled': false
                    }
                }
            });

            ac.lazyload = new Y.mojito.addons.ac.lazyload(command, adapter, ac);

            var output = ac.lazyload.run(data);
            A.areSame(output, data);
        },

        'nothing should happen if jscheck reports that JavaScript is disabled': function () {

            ac.config.expect({
                method: 'getAppConfig',
                returns: {
                    'lazyload': {
                        'enabled': true
                    }
                }
            });

            ac.jscheck.expect({
                method: 'status',
                returns: JS_DISABLED
            });

            ac.lazyload = new Y.mojito.addons.ac.lazyload(command, adapter, ac);

            var output = ac.lazyload.run(data);
            A.areSame(output, data);
        },

        'call run function should transform src into data-src for images tagged as lazyload-candidate': function () {

            ac.config.expect({
                method: 'getAppConfig',
                returns: {
                    'lazyload': {
                        'enabled': true
                    }
                }
            });

            ac.jscheck.expect({
                method: 'status',
                returns: JS_ENABLED
            });

            ac.lazyload = new Y.mojito.addons.ac.lazyload(command, adapter, ac);

            var output = ac.lazyload.run(data);
            A.areSame('<div id="someMojit"><img src="foo"><img data-src="bar" class="lazyload-candidate"></div>', output['some-mojit'][0]);
        }
    }));

    YUITest.TestRunner.add(suite);

}, '0.0.1', {
    requires: ['yahoo.addons.lazyload']
});

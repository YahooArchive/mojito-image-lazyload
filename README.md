# LazyLoad

[![Build Status](https://secure.travis-ci.org/yahoo/mojito-image-lazyload.png)](http://travis-ci.org/yahoo/mojito-image-lazyload)

[![NPM](https://nodei.co/npm/mojito-image-lazyload.png)](https://nodei.co/npm/mojito-image-lazyload/)

The mojito-image-lazyload module prepares images for lazy-loading, converting their "src" property to "data-src".

## Usage

The add-on currently has but one method: run(data). Pass data through this api before ac.done is called. For example:

    data = ac.lazyload.run(data);
    ac.done(data);

Only images with a class set to `lazyload-candidate` will potentially be lazy loaded.

## App-level configuration

Configuration is used to easily turn lazy loading on or off:

    "lazyload": {
        "enabled": true|false
    }

Lazy loading is dependent upon mojito-jscheck, which must be enabled:

    "jscheck": {
        "enabled": true
    }

If JSCheck is disabled nothing will break, but lazy-loading will not happen. Images will load normally.

## Reconstitution

An inline script and a YUI module are provided to reconstitute the img src.

## Broken image handling

Sometimes images will be broken. To handle this without disturbing the DOM, the broken image is replaced with a transparent pixel, and a CSS class of "broken" is applied to the image. You can style it however you like. For example:

    img.broken {
        background: black url(http://l.yimg.com/pv/static/img/broken-warn-201303041841.png) center center no-repeat;
    }

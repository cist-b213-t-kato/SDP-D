cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/lib/underscore-min-1.6.js",
        "id": "com.unarin.cordova.beacon.underscorejs",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/lib/q.min.js",
        "id": "com.unarin.cordova.beacon.Q",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/LocationManager.js",
        "id": "com.unarin.cordova.beacon.LocationManager",
        "merges": [
            "cordova.plugins"
        ]
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/Delegate.js",
        "id": "com.unarin.cordova.beacon.Delegate",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/Region.js",
        "id": "com.unarin.cordova.beacon.Region",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/Regions.js",
        "id": "com.unarin.cordova.beacon.Regions",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/CircularRegion.js",
        "id": "com.unarin.cordova.beacon.CircularRegion",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/BeaconRegion.js",
        "id": "com.unarin.cordova.beacon.BeaconRegion",
        "runs": true
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-core.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Core",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-util.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Util",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.1.0",
    "com.unarin.cordova.beacon": "3.3.0",
    "de.appplant.cordova.plugin.local-notification": "0.8.2-dev",
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-android-support-v4": "21.0.1"
}
// BOTTOM OF METADATA
});
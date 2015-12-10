
// Nearest ranged beacon.
var mNearestBeacon = null;

var app = (function()
{
	// Application object.
	var app = {};

	// History of enter/exit events.
	var mRegionEvents = [];


	// Timer that displays nearby beacons.
	var mNearestBeaconDisplayTimer = null;

	// Background flag.
	var mAppInBackground = false;

	// Background notification id counter.
	var mNotificationId = 0;

	// Mapping of region event state names.
	// These are used in the event display string.
	var mRegionStateNames =
	{
		'CLRegionStateInside': 'Enter',
		'CLRegionStateOutside': 'Exit'
	};

	// Here monitored regions are defined.
	// TODO: Update with uuid/major/minor for your beacons.
	// You can add as many beacons as you want to use.
	var mRegions =
		[   
			{   
                id: 'region1',
                uuid: '00000000-91FD-1001-B000-001C4D67D34C',
                major: 1,
                minor: 1 
			},  
			{ 
                id: 'region2',
                uuid: '00000000-91FD-1001-B000-001C4D67D34C',
                major: 1,
                minor: 2
			} 
		];

	// Region data is defined here. Mapping used is from
	// region id to a string. You can adapt this to your
	// own needs, and add other data to be displayed.
	// TODO: Update with major/minor for your own beacons.
	var mRegionData =
	{
		'region1': 'Region One',
		'region2': 'Region Two'
	};
    
    
    var mHoge = new Object();

	app.initialize = function()
	{
		document.addEventListener('deviceready', onDeviceReady, false);
		document.addEventListener('pause', onAppToBackground, false);
		document.addEventListener('resume', onAppToForeground, false);
	};

	function onDeviceReady()
	{
		startMonitoringAndRanging();
		startNearestBeaconDisplayTimer();
		displayRegionEvents();
	}

	function onAppToBackground()
	{
		mAppInBackground = true;
		stopNearestBeaconDisplayTimer();
	}

	function onAppToForeground()
	{
		mAppInBackground = false;
		startNearestBeaconDisplayTimer();
		displayRegionEvents();
	}

	function startNearestBeaconDisplayTimer()
	{
		mNearestBeaconDisplayTimer = setInterval(displayNearestBeacon, 1000);
	}

	function stopNearestBeaconDisplayTimer()
	{
		clearInterval(mNearestBeaconDisplayTimer);
		mNearestBeaconDisplayTimer = null;
	}

	function startMonitoringAndRanging()
	{
		function onDidDetermineStateForRegion(result)
		{
			saveRegionEvent(result.state, result.region.identifier);
			displayRecentRegionEvent();
		}

		function onDidRangeBeaconsInRegion(result)
		{
			updateNearestBeacon(result.beacons);
		}

		function onError(errorMessage)
		{
			console.log('Monitoring beacons did fail: ' + errorMessage);
		}

		// Request permission from user to access location info.
		cordova.plugins.locationManager.requestAlwaysAuthorization();

		// Create delegate object that holds beacon callback functions.
		var delegate = new cordova.plugins.locationManager.Delegate();
		cordova.plugins.locationManager.setDelegate(delegate);

		// Set delegate functions.
		delegate.didDetermineStateForRegion = onDidDetermineStateForRegion;
		delegate.didRangeBeaconsInRegion = onDidRangeBeaconsInRegion;

		// Start monitoring and ranging beacons.
		startMonitoringAndRangingRegions(mRegions, onError);
	}

	function startMonitoringAndRangingRegions(regions, errorCallback)
	{
		// Start monitoring and ranging regions.
		for (var i in regions)
		{
			startMonitoringAndRangingRegion(regions[i], errorCallback);
		}
	}

	function startMonitoringAndRangingRegion(region, errorCallback)
	{
		// Create a region object.
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
			region.id,
			region.uuid,
			region.major,
			region.minor);

		// Start ranging.
		cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
			.fail(errorCallback)
			.done();

		// Start monitoring.
		cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
			.fail(errorCallback)
			.done();
	}

	function saveRegionEvent(eventType, regionId)
	{
		// Save event.
		mRegionEvents.push(
		{
			type: eventType,
			time: getTimeNow(),
			regionId: regionId
		});
        
        mHoge[regionId] = {
			type: eventType,
			time: getTimeNow(),
			regionId: regionId,
        };

		// Truncate if more than ten entries.
		if (mRegionEvents.length > 10)
		{
			mRegionEvents.shift();
		}
	}

	function getBeaconId(beacon)
	{
		return beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
	}

	function isSameBeacon(beacon1, beacon2)
	{
		return getBeaconId(beacon1) == getBeaconId(beacon2);
	}

	function isNearerThan(beacon1, beacon2)
	{
		return beacon1.accuracy > 0
			&& beacon2.accuracy > 0
			&& beacon1.accuracy < beacon2.accuracy;
	}

	function updateNearestBeacon(beacons)
	{
		for (var i = 0; i < beacons.length; ++i)
		{
			var beacon = beacons[i];
			if (!mNearestBeacon)
			{
				mNearestBeacon = beacon;
                state = 1;
			}
			else
			{
				if (isSameBeacon(beacon, mNearestBeacon) ||
					isNearerThan(beacon, mNearestBeacon))
				{
					mNearestBeacon = beacon;
				}
			}
		}
	}

	function displayNearestBeacon()
	{
		if (!mNearestBeacon) { return; }

		// Clear element.
		$('#beacon').empty();

		// Update element.
		var element = $(
			'<li>'
			+	'<strong>Nearest Beacon</strong><br />'
			+	'UUID: ' + mNearestBeacon.uuid + '<br />'
			+	'Major: ' + mNearestBeacon.major + '<br />'
			+	'Minor: ' + mNearestBeacon.minor + '<br />'
			+	'Proximity: ' + mNearestBeacon.proximity + '<br />'
			+	'Distance: ' + mNearestBeacon.accuracy + '<br />'
			+	'RSSI: ' + mNearestBeacon.rssi + '<br />'
			+ '</li>'
        );
		$('#beacon').append(element);
        
        //DOM Storage
        localStorage.setItem('beaconMinor', mNearestBeacon.minor);
        
        $("img#viewer").attr({"src":laboratory[mNearestBeacon.minor].imagePath});
        
	}

	function displayRecentRegionEvent()
	{
		if (mAppInBackground)
		{
			// Set notification title.
			var event = mRegionEvents[mRegionEvents.length - 1];
			if (!event) { return; }
			var title = getEventDisplayString(event);

			// Create notification.
			cordova.plugins.notification.local.schedule({
    			id: ++mNotificationId,
    			title: title });
		}
		else
		{
			displayRegionEvents();
		}
	}

	function displayRegionEvents()
	{
		// Clear list.
		$('#events').empty();

		// Update list.
//		for (var i = mRegionEvents.length - 1; i >= 0; --i)
//		{
//			var event = mRegionEvents[i];
//			var title = getEventDisplayString(event);
//			var element = $(
//				'<li>'
//				+ '<strong>' + title + '</strong>'
//				+ '</li>'
//				);
//			$('#events').append(element);
//		}
        
        for(var regionId in mHoge){
            var element = $(
                '<li>'
                + '<strong>'
                + mHoge[regionId].time + ': '
                + mRegionData[mHoge[regionId].regionId] + ' '
                + mRegionStateNames[mHoge[regionId].type]
                + '</strong>'
                + 
                + '</li>'
            );
            
            $('#events').append(element);
        }

		// If the list is empty display a help text.
		if (mRegionEvents.length <= 0)
		{
			var element = $(
				'<li>'
				+ '<strong>'
				+	'Waiting for region events, please move into or out of a beacon region.'
				+ '</strong>'
				+ '</li>'
				);
			$('#events').append(element);
		}
	}

	function getEventDisplayString(event)
	{
		return event.time + ': '
			+ mRegionStateNames[event.type] + ' '
			+ mRegionData[event.regionId];
	}

	function getTimeNow()
	{
		function pad(n)
		{
			return (n < 10) ? '0' + n : n;
		}

		function format(h, m, s)
		{
			return pad(h) + ':' + pad(m)  + ':' + pad(s);
		}

		var d = new Date();
		return format(d.getHours(), d.getMinutes(), d.getSeconds());
	}

	return app;

})();

app.initialize();

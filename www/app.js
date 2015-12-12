
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
                id: '1',
                uuid: '00000000-91FD-1001-B000-001C4D67D34C',
                major: 1,
                minor: 1 
			},  
			{ 
                id: '2',
                uuid: '00000000-91FD-1001-B000-001C4D67D34C',
                major: 1,
                minor: 2
			} 
		];
    
    var mHoge = new Object();
    
    var mBeacons;

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
            //beaconsをもらう？
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
        // この方式は代入ではなく追加
		mRegionEvents.push(
		{
			type: eventType,
			time: getTimeNow(),
			regionId: regionId
		});
        
        //
        mHoge[regionId] = {
            type: eventType,
            time: getTimeNow(),
            regionId: regionId
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
        mBeacons = beacons;
        
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

//        for(var i=0; i<mBeacons.length; i++){
            // Update element.
            var beacon = mNearestBeacon;
            var element = $(
                '<li>'
                +	'<strong>Nearest Beacon</strong><br />'
                +	'UUID: ' + beacon.uuid + '<br />'
                +	'Major: ' + beacon.major + '<br />'
                +	'Minor: ' + beacon.minor + '<br />'
                +	'Proximity: ' + beacon.proximity + '<br />'
                +	'Distance: ' + beacon.accuracy + '<br />'
                +	'RSSI: ' + beacon.rssi + '<br />'
                + '</li>'
            );
            $('#beacon').append(element);
//        }
        
        //DOM Storageを使う
        localStorage.setItem('regionId', mNearestBeacon.minor);
        
        //スタンプの表示
//        $("img#viewer").attr({"src":mRegionData[mNearestBeacon.minor].imagePath});
        
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

//        $('#events').append('mHoge length: ' + mHoge.length);
        
		// Update list.
        for(var regionId in mHoge){
            var state = mRegionStateNames[mHoge[regionId].type];
            //電波の届かなくなったイベントは表示しない（ただしリストには残る）
            if(state == 'Exit'){
               continue;
            }
            var imagePath = mRegionData[regionId].imagePath;
            var time = mHoge[regionId].time;
            var stampName = mRegionData[regionId].name;
            var tagId = 'region'+regionId;
            var element = $(
//                '<li>'
                '<div class="stampBox" id="' + tagId + '">'
                + '<img src="' + imagePath
                + '" width="100" height="100"/><br/>'
                + '<strong>'
                + time + ' ' + stampName + ' ' + state + ' '
                + '</strong>'
                + '</div>'
//                + '</li>'
            );    
            $('#events').append(element);
            
            $('#'+tagId).click(function(){
                location.href = './stamp.html';
                return false;
            });
            
        }
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

<?php
//turn on error display so we can see PHP warnings/notices during development
ini_set('display_errors', 'On');
error_reporting(E_ALL);

//record the start time to measure how long the script takes to run
$executionStartTime = microtime(true);

//build the API url using values sent from JavaScript(north, south, east, west)
// http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=demo

$url = 'http://api.geonames.org/earthquakesJSON?north=' . $_REQUEST['north'] . '&south=' . $_REQUEST['south'] . '&east=' . $_REQUEST['east'] . '&west=' . $_REQUEST['west'] . '&username=savvy_2026&style=full';

//initialize a curl session(used to call external APIs)
$ch = curl_init();

//disable SSL certificate verification(not recommended for production)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

//tell cURL to return the API response as a string instead of printing it
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//set the URL that cURL should request
curl_setopt($ch, CURLOPT_URL, $url);

//execute the API request and store the response
$result = curl_exec($ch);

//close the cURL session to free system resources
curl_close($ch);

//convert the JSON response into a PHP associative array
$decode = json_decode($result, true);

//build the output array that will be returned to Javascript

$output['status']['code'] = "200"; //HTTP like status code
$output['status']['name'] = "ok";   //status name
$output['status']['description'] = "success";   //description
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";   // execution time
$output['data'] = $decode['earthquakes'];   //actual earthquake data

//tell the browser response is in Json
header('Content-Type: application/json; charset=UTF-8');

//conver the output array back to json and send it to the client
echo json_encode($output);
